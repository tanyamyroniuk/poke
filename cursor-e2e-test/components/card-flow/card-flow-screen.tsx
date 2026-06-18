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
import type { CardAnalysisResult } from "@/lib/types/card-analysis"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type FlowStep = "analysis" | "original" | "fake" | "not_pokemon_card" | "unknown" | "save"

const FADE_MS = 180
const RESIZE_MS = 400
const STEP_ADVANCE_MS = 1100
const STEP_COUNT = 3

interface StepConfig {
  heroHeightPx?: number
  heroHeightPercent?: number
  sheetHeightPx?: number
}

const STEP_CONFIG: Record<FlowStep, StepConfig> = {
  analysis:         { heroHeightPercent: 60, sheetHeightPx: SHEET_HEIGHT_PX },
  original:         { heroHeightPx: 200 },
  fake:             { heroHeightPx: 200 },
  not_pokemon_card: { heroHeightPx: 200 },
  unknown:          { heroHeightPx: 200 },
  save:             { heroHeightPx: 280 },
}

function mapResultType(r: CardAnalysisResult | null): FlowStep {
  if (!r) return "unknown"
  if (r.resultType === "not_pokemon_card") return "not_pokemon_card"
  if (r.resultType === "pokemon_original") return "original"
  if (r.resultType === "pokemon_fake") return "fake"
  return "unknown"
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CardFlowScreen() {
  const router = useRouter()

  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [step, setStep] = useState<FlowStep>("analysis")
  const [resultStep, setResultStep] = useState<FlowStep>("original")
  const [contentVisible, setContentVisible] = useState(true)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [aiResult, setAiResult] = useState<CardAnalysisResult | null>(null)
  const [aiError, setAiError] = useState(false)

  // Load image and kick off AI analysis immediately on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)

    fetch("/api/analyze-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData: stored }),
    })
      .then((r) => r.json())
      .then(setAiResult)
      .catch(() => setAiError(true))
  }, [])

  // Advance animation steps one at a time (unchanged)
  useEffect(() => {
    if (step !== "analysis" || analysisStep >= STEP_COUNT) return
    const id = window.setTimeout(() => setAnalysisStep((s) => s + 1), STEP_ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [step, analysisStep])

  // Transition to result — wait for BOTH animation complete AND AI result
  useEffect(() => {
    if (step !== "analysis" || analysisStep < STEP_COUNT) return
    if (!aiResult && !aiError) return // still waiting for AI
    const result = aiError ? null : aiResult
    const next = mapResultType(result)
    // Store result type for save flow collection pre-selection
    const resultType = next === "original" ? "original" : "fake"
    sessionStorage.setItem("cardResultType", resultType)
    if (result) sessionStorage.setItem("cardAnalysisResult", JSON.stringify(result))
    setResultStep(next)
    const id = window.setTimeout(() => transitionTo(next), 500)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, analysisStep, aiResult, aiError])

  const transitionTo = useCallback((nextStep: FlowStep) => {
    setContentVisible(false)
    setTimeout(() => {
      setStep(nextStep)
      setTimeout(() => setContentVisible(true), RESIZE_MS)
    }, FADE_MS)
  }, [])

  const cfg = STEP_CONFIG[step]

  const verdictLabel = aiResult
    ? `${aiResult.resultType === "pokemon_original" ? "Original" : "Fake"} – ${aiResult.authenticityScore}%`
    : undefined

  const sheetContent = (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{ opacity: contentVisible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
    >
      {step === "analysis" && <AnalysisDrawer activeStep={analysisStep} />}

      {step === "original" && (
        <OriginalCardSheet
          cardName={aiResult?.cardName}
          verdictLabel={verdictLabel}
          setLine={aiResult?.setName !== "unknown" ? `${aiResult?.setName}` : undefined}
          collectorPrice={aiResult?.estimatedValueRange !== "unknown" ? aiResult?.estimatedValueRange : undefined}
          aboutText={aiResult?.funFact !== "unknown" ? aiResult?.funFact : undefined}
          onSave={() => transitionTo("save")}
          onDiscard={() => router.push("/home")}
        />
      )}

      {step === "fake" && (
        <FakeCardSheet
          cardName={aiResult?.cardName}
          verdictLabel={verdictLabel}
          setLine={aiResult?.setName !== "unknown" ? aiResult?.setName : undefined}
          discrepancies={
            aiResult?.suspiciousIndicators?.length
              ? aiResult.suspiciousIndicators.map((s) => ({ title: s, description: "" }))
              : undefined
          }
          onDiscard={() => router.push("/home")}
          onSaveAnyway={() => transitionTo("save")}
        />
      )}

      {step === "not_pokemon_card" && (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 pb-10 text-center">
          <p className="text-2xl font-semibold text-[#171717]">Not a Pokémon card</p>
          <p className="text-base text-slate-500">
            {aiResult?.userMessage ?? "This doesn't look like a readable Pokémon TCG card. Try a clearer photo."}
          </p>
          <Button
            type="button"
            className="mt-4 h-14 w-full rounded-2xl border-0 bg-[#dc2626] text-base font-medium text-white hover:bg-[#b91c1c]"
            onClick={() => router.push("/home")}
          >
            Try Again
          </Button>
        </div>
      )}

      {step === "unknown" && (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 pb-10 text-center">
          <p className="text-2xl font-semibold text-[#171717]">Couldn&apos;t verify</p>
          <p className="text-base text-slate-500">
            {aiResult?.userMessage ?? "We couldn't confidently verify this card. The image may be unclear."}
          </p>
          <Button
            type="button"
            className="mt-4 h-14 w-full rounded-2xl border-0 bg-[#dc2626] text-base font-medium text-white hover:bg-[#b91c1c]"
            onClick={() => transitionTo("save")}
          >
            Save Anyway
          </Button>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center text-base font-semibold text-gray-400 hover:text-gray-600"
            onClick={() => router.push("/home")}
          >
            Discard
          </button>
        </div>
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
