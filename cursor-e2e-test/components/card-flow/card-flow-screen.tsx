"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { AnalysisDrawer } from "@/components/analysis/analysis-drawer"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"
import { SaveToCollectionSheet } from "@/components/save-to-collection/save-to-collection-sheet"
import { SHEET_HEIGHT_PX } from "@/components/card-screen/constants"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type FlowStep = "analysis" | "original" | "fake" | "save"

const FADE_MS = 180      // content fade out/in
const RESIZE_MS = 400    // hero + sheet resize
const STEP_ADVANCE_MS = 2800
const STEP_COUNT = 3

interface StepConfig {
  heroHeightPx?: number
  heroHeightPercent?: number
  sheetHeightPx?: number
}

const STEP_CONFIG: Record<FlowStep, StepConfig> = {
  analysis: { heroHeightPercent: 60, sheetHeightPx: SHEET_HEIGHT_PX },
  original: { heroHeightPx: 200 },
  fake:     { heroHeightPx: 200 },
  save:     { heroHeightPx: 280 },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Unified card-flow screen.
 * Keeps CardScreenShell mounted across all four steps so the hero image and
 * sheet animate in place rather than hard-navigating between pages.
 *
 * Transition sequence on each step change:
 *  1. Sheet content fades out (FADE_MS)
 *  2. Hero height + sheet top resize via CSS transition (RESIZE_MS)
 *  3. New sheet content fades in (FADE_MS)
 */
export function CardFlowScreen() {
  const router = useRouter()

  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [step, setStep] = useState<FlowStep>("analysis")
  const [resultStep, setResultStep] = useState<"original" | "fake">("original")
  const [contentVisible, setContentVisible] = useState(true)
  const [analysisStep, setAnalysisStep] = useState(0)

  // Load captured image from camera flow
  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)
  }, [])

  // Advance analysis steps one at a time
  useEffect(() => {
    if (step !== "analysis" || analysisStep >= STEP_COUNT) return
    const id = window.setTimeout(() => setAnalysisStep((s) => s + 1), STEP_ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [step, analysisStep])

  // After analysis completes, transition to result step
  useEffect(() => {
    if (step !== "analysis" || analysisStep < STEP_COUNT) return
    const next: "original" | "fake" = Math.random() < 0.7 ? "original" : "fake"
    sessionStorage.setItem("cardResultType", next)
    setResultStep(next)
    const id = window.setTimeout(() => transitionTo(next), 800)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, analysisStep])

  const transitionTo = useCallback((nextStep: FlowStep) => {
    // 1. Fade out current content
    setContentVisible(false)
    setTimeout(() => {
      // 2. Swap step — hero + sheet animate via CSS transition
      setStep(nextStep)
      // 3. Fade in new content after resize completes
      setTimeout(() => setContentVisible(true), RESIZE_MS)
    }, FADE_MS)
  }, [])

  const cfg = STEP_CONFIG[step]

  // Sheet content — wrapped in a fade container so only the content transitions
  const sheetContent = (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{
        opacity: contentVisible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease-in-out`,
      }}
    >
      {step === "analysis" && (
        <AnalysisDrawer activeStep={analysisStep} />
      )}

      {step === "original" && (
        <OriginalCardSheet
          onSave={() => transitionTo("save")}
          onDiscard={() => router.push("/home")}
        />
      )}

      {step === "fake" && (
        <FakeCardSheet
          onDiscard={() => router.push("/home")}
          onSaveAnyway={() => transitionTo("save")}
        />
      )}

      {step === "save" && (
        <SaveToCollectionSheet
          onSave={(collectionId) => router.push(`/collections/${collectionId}`)}
          onBack={() => transitionTo(resultStep)}
        />
      )}
    </div>
  )

  return (
    <CardScreenShell
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card being analyzed"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      heroHeightPx={cfg.heroHeightPx}
      heroHeightPercent={cfg.heroHeightPercent ?? 60}
      sheetHeightPx={cfg.sheetHeightPx}
      sheet={sheetContent}
      backHref="/home"
      backLabel="Back"
      onBack={step === "save" ? () => transitionTo(resultStep) : undefined}
      floatingAction={
        step === "analysis" ? (
          <Button
            type="button"
            className={cn(
              "absolute z-[20] h-auto rounded-full border-0 px-8 py-4 text-sm font-medium text-white",
              "bg-[#dc2626] hover:bg-[#b91c1c] active:bg-[#991b1b]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2",
            )}
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              bottom: SHEET_HEIGHT_PX + 24,
              boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
            }}
            onClick={() => router.push("/home")}
          >
            Cancel Analysis
          </Button>
        ) : undefined
      }
    />
  )
}
