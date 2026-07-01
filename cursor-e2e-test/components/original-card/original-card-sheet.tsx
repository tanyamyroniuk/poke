"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OriginalCardStatusHeader } from "@/components/original-card/original-card-status-header"
import { CardDetailTile } from "@/components/original-card/card-detail-tile"
import { MarketTrendChart } from "@/components/original-card/market-trend-chart"
import { conditionLabelFromScore } from "@/lib/types/card-analysis"

export type OriginalCardSheetProps = {
  cardName?: string
  verdictLabel?: string
  setLine?: string
  /** Short friendly intro about the card, shown under the verdict badge. */
  intro?: string
  collectorPrice?: string
  /** 0–100 condition score from the AI analysis. */
  conditionScore?: number
  rarity?: string
  setNumber?: string
  cardType?: string
  /** Positive authenticity indicators from the AI analysis. */
  checkItems?: readonly string[]
  aboutText?: string
  onSave?: () => void
  onDiscard?: () => void
  /** When true, hides the Save / Discard footer (used on the saved card profile page). */
  viewOnly?: boolean
}

/**
 * Scrollable body for the original-card result sheet (Figma 27029:33496).
 */
export function OriginalCardSheet({
  cardName = "Pokémon Card",
  verdictLabel,
  setLine,
  intro,
  collectorPrice,
  conditionScore,
  rarity,
  setNumber,
  cardType,
  checkItems,
  aboutText,
  onSave,
  onDiscard,
  viewOnly = false,
}: OriginalCardSheetProps) {
  const conditionLabel = conditionLabelFromScore(conditionScore)
  const cardDetails = [
    { label: "Condition", value: conditionLabel },
    { label: "Rarity", value: rarity?.trim() || "Unknown" },
    { label: "Set number", value: setNumber?.trim() || "Unknown" },
    { label: "Type", value: cardType?.trim() || "Unknown" },
  ]
  const router = useRouter()
  const handleSave = () => {
    if (onSave) { onSave(); return }
    sessionStorage.setItem("cardResultType", "original")
    router.push("/save-to-collection")
  }
  const handleDiscard = () => {
    if (onDiscard) onDiscard()
    else router.push("/home")
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Scrollable body */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 pt-6">
        <OriginalCardStatusHeader
          cardName={cardName}
          verdictLabel={verdictLabel}
          setLine={setLine}
          intro={intro}
          checkItems={checkItems}
        />

        {/* Card Details */}
        <p className="mt-8 font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Card Details
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {cardDetails.map((d) => (
            <CardDetailTile key={d.label} label={d.label} value={d.value} />
          ))}
        </div>

        <div className="my-8 h-px w-full bg-neutral-100" />

        {/* Collector's Value */}
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Collector&apos;s value
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[30px] font-medium leading-9 text-black">{collectorPrice ?? "Unknown"}</span>
          {conditionLabel !== "Unknown" && (
            <span className="rounded-md bg-[#dc2626] px-2 py-1 text-sm font-medium text-white">
              {conditionLabel}
            </span>
          )}
        </div>

        {/* Market Trend */}
        <p className="mt-8 font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Market trend
        </p>
        <div className="mt-3">
          <MarketTrendChart />
        </div>

        {aboutText && (
          <>
            <div className="my-8 h-px w-full bg-neutral-100" />

            {/* About */}
            <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
              About this card
            </p>
            <p className="mt-4 pb-6 text-base font-normal leading-relaxed text-black">{aboutText}</p>
          </>
        )}
      </div>

      {/* Sticky footer */}
      {!viewOnly && (
        <div className="shrink-0 space-y-3 border-t border-neutral-100 bg-white px-6 pt-4 pb-10">
          <Button
            type="button"
            className="h-16 w-full rounded-2xl border-0 bg-[#dc2626] text-lg font-medium text-white hover:bg-[#b91c1c]"
            onClick={handleSave}
          >
            Save to Collection
          </Button>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center text-lg font-semibold text-gray-400 hover:text-gray-600"
            onClick={handleDiscard}
          >
            Discard Result
          </button>
        </div>
      )}
    </div>
  )
}
