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

export function AnalysisScreen() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStep((s) => (s >= 3 ? 0 : s + 1))
    }, STEP_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <CardScreenShell
      data-name="Forth screen"
      imageSrc={pokecardMock}
      imageAlt="Card image for analysis"
      sheet={<AnalysisDrawer activeStep={activeStep} />}
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
