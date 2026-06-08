"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnalysisDrawer } from "@/components/analysis/analysis-drawer"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { SHEET_HEIGHT_PX } from "@/components/card-screen/constants"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

const CANCEL_ABOVE_SHEET_PX = 24
const STEP_ADVANCE_MS = 2800
const STEP_COUNT = 3 // steps 0-2; value 3 means all complete

export function AnalysisScreen() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)
  }, [])

  // Advance one step at a time; stop when all steps complete
  useEffect(() => {
    if (activeStep >= STEP_COUNT) return
    const id = window.setTimeout(() => setActiveStep((s) => s + 1), STEP_ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [activeStep])

  // Navigate once all steps are done: 70% → original card, 30% → fake card
  useEffect(() => {
    if (activeStep < STEP_COUNT) return
    const destination = Math.random() < 0.7 ? "/original-card" : "/fake-card"
    const id = window.setTimeout(() => router.push(destination), 800)
    return () => window.clearTimeout(id)
  }, [activeStep, router])

  return (
    <CardScreenShell
      data-name="Forth screen"
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card image for analysis"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      sheet={<AnalysisDrawer activeStep={activeStep} />}
      sheetHeightPx={SHEET_HEIGHT_PX}
      backHref="/home"
      backLabel="Back to home"
      floatingAction={
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
            bottom: SHEET_HEIGHT_PX + CANCEL_ABOVE_SHEET_PX,
            boxShadow:
              "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
          }}
          onClick={() => router.push("/home")}
        >
          Cancel Analysis
        </Button>
      }
    />
  )
}
