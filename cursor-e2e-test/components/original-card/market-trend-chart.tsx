"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export type MarketTrendBar = {
  label: string
  /** Height in px within the 72px canvas. */
  height: number
  highlighted?: boolean
  /** Faded = projected / current incomplete bar. */
  faded?: boolean
}

export type MarketTrendChartProps = {
  /** Override computed trend label (e.g. "+12.4% vs Last Mo"). */
  trend?: string
  /** Override generated bars. When omitted, bars are randomised on mount. */
  bars?: MarketTrendBar[]
  className?: string
}

// ---------------------------------------------------------------------------
// Trend generator
// ---------------------------------------------------------------------------

type Regime = "rising" | "falling" | "dip" | "peak"

const REGIMES: Regime[] = ["rising", "falling", "dip", "peak"]
const LABELS = ["9/25", "10/25", "11/25", "12/25", "1/26", "2/26", "3/26", "4/26"]
const MIN_H = 12
const MAX_H = 72

/**
 * Generates 8 bars with realistic month-to-month price movement.
 * Regime is randomly picked; each step drifts 5–10 % in the regime direction
 * plus ±4 % noise. The second-to-last bar is highlighted (latest complete month)
 * and the last bar is faded (current / projected month).
 *
 * The returned `trend` string reflects the one-month change into the highlighted bar.
 */
export function generateTrendBars(labels = LABELS): { bars: MarketTrendBar[]; trend: string } {
  const regime = REGIMES[Math.floor(Math.random() * REGIMES.length)]
  const count = labels.length

  // Build raw normalised values (0–1)
  let val = 0.3 + Math.random() * 0.4 // start anywhere between 30–70 %
  const rawVals: number[] = [val]

  for (let i = 1; i < count; i++) {
    const progress = i / (count - 1)

    // Per-step drift based on regime (roughly 6–9 % per bar)
    let drift = 0
    const mag = 0.06 + Math.random() * 0.03
    if (regime === "rising") {
      drift = mag
    } else if (regime === "falling") {
      drift = -mag
    } else if (regime === "dip") {
      drift = progress < 0.5 ? -mag : mag
    } else {
      // peak
      drift = progress < 0.5 ? mag : -mag
    }

    // Small noise ±4 %
    const noise = (Math.random() - 0.5) * 0.08

    val = Math.max(0.08, Math.min(1, val + drift + noise))
    rawVals.push(val)
  }

  // Scale raw values to px heights (MIN_H … MAX_H)
  const lo = Math.min(...rawVals)
  const hi = Math.max(...rawVals)
  const span = hi - lo || 0.01

  const bars: MarketTrendBar[] = labels.map((label, i) => {
    const normalised = (rawVals[i] - lo) / span
    const height = Math.round(MIN_H + normalised * (MAX_H - MIN_H))
    return {
      label,
      height,
      highlighted: i === count - 2,
      faded: i === count - 1,
    }
  })

  // Trend = % change from bar before highlighted → highlighted
  const highlightedRaw = rawVals[count - 2]
  const prevRaw = rawVals[count - 3]
  const pct = ((highlightedRaw - prevRaw) / prevRaw) * 100
  const sign = pct >= 0 ? "+" : ""
  const trend = `${sign}${pct.toFixed(1)}% vs Last Mo`

  return { bars, trend }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Bar chart for card market trend with realistic random movement (Figma 27064:113649). */
export function MarketTrendChart({ trend: trendProp, bars: barsProp, className }: MarketTrendChartProps) {
  // Stable random data — computed once on mount, re-randomised only on full page reload.
  const [{ bars, trend }] = useState(() => {
    const generated = generateTrendBars()
    return {
      bars: barsProp ?? generated.bars,
      trend: trendProp ?? generated.trend,
    }
  })

  const isPositive = trend.startsWith("+")

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex w-fit items-center rounded-md px-2 py-1",
          isPositive ? "bg-[#d6f7e7]" : "bg-red-100",
        )}
      >
        <p className={cn("text-xs font-medium leading-4", isPositive ? "text-green-700" : "text-red-700")}>
          {trend}
        </p>
      </div>

      <div className="w-full">
        {/* Bars */}
        <div className="flex h-[72px] w-full items-end gap-1 px-1">
          {bars.map((bar) => (
            <div
              key={bar.label}
              className={cn(
                "flex-1 min-w-0 rounded-t-[2px] transition-none",
                bar.highlighted && "bg-[#a93200]",
                bar.faded && "bg-[rgba(169,50,0,0.4)]",
                !bar.highlighted && !bar.faded && "bg-[#e1e3e4]",
              )}
              style={{ height: bar.height }}
              aria-label={`${bar.label}`}
            />
          ))}
        </div>
        {/* Labels */}
        <div className="mt-1 flex w-full items-start gap-1 px-1">
          {bars.map((bar) => (
            <p
              key={bar.label}
              className="flex-1 min-w-0 truncate text-center text-[10px] leading-4 text-gray-400"
            >
              {bar.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
