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
  /** Optional node rendered above the sheet (e.g. Cancel Analysis). */
  floatingAction?: ReactNode
  className?: string
  /** Override default sheet height (px). Defaults to SHEET_HEIGHT_PX. */
  sheetHeightPx?: number
  /** Override hero image container height (%). Defaults to HERO_HEIGHT_PERCENT. */
  heroHeightPercent?: number
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
  floatingAction,
  className,
  sheetHeightPx = SHEET_HEIGHT_PX,
  heroHeightPercent = HERO_HEIGHT_PERCENT,
  "data-name": dataName,
}: CardScreenShellProps) {
  const sheetStyle: CSSProperties = {
    bottom: 0,
    height: sheetHeightPx,
  }

  return (
    <div
      className={cn(
        "relative mx-auto h-full min-h-0 w-full max-w-[440px] shrink-0 overflow-hidden bg-white",
        className,
      )}
      data-name={dataName}
    >
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden bg-neutral-200"
        style={{ height: `${heroHeightPercent}%` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-contain object-center"
            sizes={`${ARTBOARD_W}px`}
          />
        </div>
        <HeroPeachBlur />
      </div>

      <div
        className="absolute inset-x-0 z-[10] flex min-h-0 flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.06)]"
        style={sheetStyle}
      >
        {sheet}
      </div>

      <Link
        href={backHref}
        className="absolute z-[30] flex size-12 items-center justify-center rounded-[14px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-0 transition hover:bg-zinc-50"
        style={{ left: BACK_INSET, top: BACK_TOP }}
        aria-label={backLabel}
      >
        <ArrowLeft className="size-6 text-zinc-900" strokeWidth={2} />
      </Link>

      {floatingAction}

      <div
        className="absolute left-1/2 z-[12] h-[5px] w-[204px] -translate-x-1/2 rounded-[24px] bg-[#212121]"
        style={{ bottom: HOME_BAR_BOTTOM }}
        aria-hidden
      />
    </div>
  )
}
