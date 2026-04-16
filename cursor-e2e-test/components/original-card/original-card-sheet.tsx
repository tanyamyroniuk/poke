"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OriginalCardStatusHeader } from "@/components/original-card/original-card-status-header"
import { CardDetailTile } from "@/components/original-card/card-detail-tile"
import { MarketTrendChart } from "@/components/original-card/market-trend-chart"

const CARD_DETAILS = [
  { label: "Condition", value: "Near Mint (NM)" },
  { label: "Edition", value: "1st Edition" },
  { label: "Rarity", value: "Ultra Rare" },
  { label: "Set number", value: "4/102" },
] as const

const GRADE_PRICES = [
  { label: "Near Mint", value: "$9,200" },
  { label: "Excellent", value: "$6,100" },
  { label: "Good", value: "$1,500" },
  { label: "Poor", value: "$450" },
] as const

const ABOUT_TEXT =
  "The 1st Edition Base Set Charizard is the most iconic trading card in history. The illustrator, Mitsuhiro Arita, created one of just a handful of holographic designs for the original set. Its shadowless print — missing the drop shadow on the right side of the card frame — is a printing quirk from the very first production run, making it one of the rarest variants. A PSA 10 copy sold for $420,000 in 2022."

export type OriginalCardSheetProps = {
  cardName?: string
  verdictLabel?: string
  setLine?: string
  collectorPrice?: string
  conditionLabel?: string
  aboutText?: string
  onSave?: () => void
  onDiscard?: () => void
}

/**
 * Scrollable body for the original-card result sheet (Figma 27029:33496).
 */
export function OriginalCardSheet({
  cardName = "Charizard",
  verdictLabel = "Original – 98.2%",
  setLine = "Base Set, 2010",
  collectorPrice = "$4,500",
  conditionLabel = "Very Good, Avg $",
  aboutText = ABOUT_TEXT,
  onSave,
  onDiscard,
}: OriginalCardSheetProps) {
  const router = useRouter()
  const handleSave = () => {
    if (onSave) onSave()
    else router.push("/home")
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
        />

        {/* Card Details */}
        <p className="mt-8 font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Card Details
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {CARD_DETAILS.map((d) => (
            <CardDetailTile key={d.label} label={d.label} value={d.value} />
          ))}
        </div>

        <div className="my-8 h-px w-full bg-neutral-100" />

        {/* Collector's Value */}
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Collector&apos;s value
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[30px] font-medium leading-9 text-black">{collectorPrice}</span>
          <span className="rounded-md bg-[#dc2626] px-2 py-1 text-sm font-medium text-white">
            {conditionLabel}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {GRADE_PRICES.map((g) => (
            <CardDetailTile key={g.label} label={g.label} value={g.value} center />
          ))}
        </div>
        <div className="mt-3">
          <CardDetailTile label="PSA 10 – Gem Mint" value="$350,000+" center variant="psa" className="h-16" />
        </div>

        {/* Market Trend */}
        <p className="mt-8 font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Market trend
        </p>
        <div className="mt-3">
          <MarketTrendChart />
        </div>

        <div className="my-8 h-px w-full bg-neutral-100" />

        {/* About */}
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          About this card
        </p>
        <p className="mt-4 pb-6 text-base font-normal leading-relaxed text-black">{aboutText}</p>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 space-y-3 border-t border-neutral-100 bg-white px-6 py-4">
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
    </div>
  )
}
