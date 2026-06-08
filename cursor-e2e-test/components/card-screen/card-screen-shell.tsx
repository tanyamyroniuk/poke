"use client"

import type { CSSProperties, ReactNode } from "react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  ARTBOARD_W,
  BACK_INSET,
  BACK_TOP,
  HERO_HEIGHT_PERCENT,
  HOME_BAR_BOTTOM,
  SHEET_HEIGHT_PX,
} from "@/components/card-screen/constants"
import { HeroPeachBlur } from "@/components/card-screen/hero-peach-blur"
import { cn } from "@/lib/utils"

export type CardScreenShellProps = {
  imageSrc: StaticImageData | string
  imageAlt: string
  /** Main content inside the fixed bottom sheet. */
  sheet: ReactNode
  backHref?: string
  backLabel?: string
  /** When provided, renders a button instead of a Link for the back arrow. */
  onBack?: () => void
  /** Optional node rendered above the sheet (e.g. Cancel Analysis). */
  floatingAction?: ReactNode
  className?: string
  /** Override default sheet height (px). Defaults to SHEET_HEIGHT_PX. */
  sheetHeightPx?: number
  /** Override hero image container height (%). Defaults to HERO_HEIGHT_PERCENT. */
  heroHeightPercent?: number
  /**
   * When provided the hero shows this image as a full-bleed background and
   * renders imageSrc as a floating card on top (Figma 27065:114035–114037).
   */
  backgroundImageSrc?: StaticImageData | string
  /** How to fit imageSrc in the hero when backgroundImageSrc is not set. Defaults to "contain". */
  heroObjectFit?: "contain" | "cover"
  /** Fixed pixel height for the hero. Overrides heroHeightPercent when set. */
  heroHeightPx?: number
  /** Optional design marker (e.g. Figma frame name). */
  /** Optional design marker (e.g. Figma frame name). */
  "data-name"?: string
}

/**
 * Shared chrome for card flows: portrait hero (object-contain) + peach blur + fixed-height bottom sheet + back + home indicator.
 */
export function CardScreenShell({
  imageSrc,
  imageAlt,
  sheet,
  backHref = "/home",
  backLabel = "Back",
  onBack,
  floatingAction,
  className,
  sheetHeightPx,
  heroHeightPercent = HERO_HEIGHT_PERCENT,
  backgroundImageSrc,
  heroObjectFit = "contain",
  heroHeightPx,
  "data-name": dataName,
}: CardScreenShellProps) {
  const heroSize = heroHeightPx != null ? heroHeightPx : `${heroHeightPercent}%`

  // Sheet overlaps the hero by this amount so its rounded top corners sit on top of the image.
  const SHEET_OVERLAP_PX = 32

  // When sheetHeightPx is provided, use a fixed height (analysis-style overlap effect).
  // Otherwise anchor the sheet so it overlaps the hero bottom, showing rounded corners over the image.
  const sheetTop = heroHeightPx != null
    ? heroHeightPx - SHEET_OVERLAP_PX
    : `calc(${heroHeightPercent}% - ${SHEET_OVERLAP_PX}px)`
  const sheetStyle: CSSProperties = sheetHeightPx != null
    ? { bottom: 0, height: sheetHeightPx }
    : { top: sheetTop, bottom: 0 }

  return (
    <div
      className={cn(
        "relative mx-auto h-full min-h-0 w-full shrink-0 overflow-hidden bg-white",
        className,
      )}
      data-name={dataName}
    >
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden bg-neutral-200"
        style={{ height: heroSize, transition: "height 0.4s ease-out" }}
      >
        {backgroundImageSrc ? (
          <>
            {/* Full-bleed background photo */}
            <Image
              src={backgroundImageSrc}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes={`${ARTBOARD_W}px`}
            />
            {/* Floating card — centered, shifted slightly downward to match Figma */}
            <div
              className="absolute overflow-hidden rounded-[8px] border-2 border-white shadow-[0px_12px_32px_-8px_rgba(106,68,18,0.25)]"
              style={{
                width: "53.6%",
                aspectRatio: "5 / 7",
                top: "calc(50% + 45px)",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="236px"
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              unoptimized={typeof imageSrc === "string" && imageSrc.startsWith("data:")}
              className={heroObjectFit === "cover" ? "object-cover object-center" : "object-contain object-center"}
              sizes={`${ARTBOARD_W}px`}
            />
          </div>
        )}
      </div>

      <div
        className="absolute inset-x-0 z-[10] flex min-h-0 flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom-8 duration-500 ease-out"
        style={{ ...sheetStyle, transition: "top 0.4s ease-out, height 0.4s ease-out" }}
      >
        {sheet}
      </div>

      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="absolute z-[30] flex size-12 items-center justify-center rounded-[14px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-0 transition hover:bg-zinc-50"
          style={{ left: BACK_INSET, top: BACK_TOP }}
          aria-label={backLabel}
        >
          <ArrowLeft className="size-6 text-zinc-900" strokeWidth={2} />
        </button>
      ) : (
        <Link
          href={backHref}
          className="absolute z-[30] flex size-12 items-center justify-center rounded-[14px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-0 transition hover:bg-zinc-50"
          style={{ left: BACK_INSET, top: BACK_TOP }}
          aria-label={backLabel}
        >
          <ArrowLeft className="size-6 text-zinc-900" strokeWidth={2} />
        </Link>
      )}

      {floatingAction}

      <div
        className="absolute left-1/2 z-[12] h-[5px] w-[204px] -translate-x-1/2 rounded-[24px] bg-[#212121]"
        style={{ bottom: HOME_BAR_BOTTOM }}
        aria-hidden
      />
    </div>
  )
}
