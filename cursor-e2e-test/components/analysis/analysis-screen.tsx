"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnalysisDrawer } from "@/components/analysis/analysis-drawer"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/**
 * Figma frame 27055:274 — height 756px, width 440px.
 * Implementation height 956px: Y(n) = round(n × 956 / 756).
 */
const ARTBOARD_W = 440
const ARTBOARD_H = 956
const FIGMA_FRAME_H = 756
const Y = (n: number) => Math.round((n * ARTBOARD_H) / FIGMA_FRAME_H)

/** White analysis panel — Figma drawer height 438px; spec asks 440px fixed to viewport bottom. */
const SHEET_HEIGHT_PX = 440
/** Gap from top of sheet to bottom edge of Cancel button. */
const CANCEL_ABOVE_SHEET_PX = 24
const STEP_ADVANCE_MS = 2800

/** Image frame height as % of artboard (~green box); tuned for vertical phone photos. */
const HERO_HEIGHT_PERCENT = 60

/** Figma 27055:277 — blur band vs hero height (394px on 760px reference). */
const BLUR_BAND_H = Math.round(
  (394 * (ARTBOARD_H * (HERO_HEIGHT_PERCENT / 100))) / 760,
)

function HeroPeachBlurOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-b from-transparent to-[#ffddc7] backdrop-blur-[3.277px]"
      style={{
        height: BLUR_BAND_H,
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,1) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,1) 100%)",
      }}
      aria-hidden
    />
  )
}

/** Figma absolute tops (756px frame) → scaled */
const BACK_TOP = Y(32)
const BACK_INSET = 24
/** Figma 27029:33527 — home indicator from bottom of screen. */
const HOME_BAR_BOTTOM = Y(16)

export function AnalysisScreen() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStep((s) => (s >= 3 ? 0 : s + 1))
    }, STEP_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [])

  const sheetStyle: CSSProperties = {
    bottom: 0,
    height: SHEET_HEIGHT_PX,
  }

  return (
    <div
      className="relative mx-auto h-full min-h-0 w-full max-w-[440px] shrink-0 overflow-hidden bg-white"
      data-name="Forth screen"
    >
      {/* Image container — top ~60% of screen (portrait photos); object-contain avoids distortion. */}
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden bg-neutral-200"
        style={{ height: `${HERO_HEIGHT_PERCENT}%` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={pokecardMock}
            alt="Card image for analysis"
            fill
            priority
            className="object-contain object-center"
            sizes={`${ARTBOARD_W}px`}
          />
        </div>

        <HeroPeachBlurOverlay />
      </div>

      {/* Bottom sheet — fixed 440px, anchored to bottom (Figma 27084:176898). */}
      <div
        className="absolute inset-x-0 z-[10] flex min-h-0 flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.06)]"
        style={sheetStyle}
      >
        <AnalysisDrawer activeStep={activeStep} />
      </div>

      {/* Back (27055:278) */}
      <Link
        href="/home"
        className="absolute z-[30] flex size-12 items-center justify-center rounded-[14px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-0 transition hover:bg-zinc-50"
        style={{ left: BACK_INSET, top: BACK_TOP }}
        aria-label="Back to home"
      >
        <ArrowLeft className="size-6 text-zinc-900" strokeWidth={2} />
      </Link>

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

      <div
        className="absolute left-1/2 z-[12] h-[5px] w-[204px] -translate-x-1/2 rounded-[24px] bg-black"
        style={{ bottom: HOME_BAR_BOTTOM }}
        aria-hidden
      />
    </div>
  )
}
