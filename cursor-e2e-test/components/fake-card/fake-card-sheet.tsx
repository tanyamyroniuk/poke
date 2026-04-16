"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FakeCardStatusHeader } from "@/components/fake-card/fake-card-status-header"
import { FakeDiscrepancyItem } from "@/components/fake-card/fake-discrepancy-item"

const INTRO_LINES = [
  "Our AI vision system has detected significant",
  "discrepancies compared to master database",
  "entries to identify this card as fake.",
] as const

const DEFAULT_DISCREPANCIES = [
  {
    title: "Low resolution printing",
    description:
      "Dithering patterns detected in the character artwork outline, characteristic of non-industrial printers.",
  },
  {
    title: "Incorrect back color saturation",
    description:
      "Blue channel levels are 12% higher than standard 1999 Base Set printing specifications.",
  },
  {
    title: "Font type mismatch",
    description:
      "The 'HP' text utilizes a Gill Sans variant instead of the authentic custom typeface.",
  },
] as const

export type FakeCardSheetProps = {
  cardName?: string
  verdictLabel?: string
  setLine?: string
  introLines?: readonly string[]
  discrepancies?: ReadonlyArray<{ title: string; description: string }>
  /** Primary actions; defaults to navigating home (Storybook can pass a stub). */
  onExit?: () => void
}

/**
 * Scrollable body for the fake-card result sheet (Figma 27064:113681).
 */
export function FakeCardSheet({
  cardName = "Charizard",
  verdictLabel = "Fake – 87.4%",
  setLine = "Base Set, 2010",
  introLines = INTRO_LINES,
  discrepancies = DEFAULT_DISCREPANCIES,
  onExit,
}: FakeCardSheetProps) {
  const router = useRouter()
  const handleExit = () => {
    if (onExit) onExit()
    else router.push("/home")
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 pt-6">
        <FakeCardStatusHeader cardName={cardName} verdictLabel={verdictLabel} setLine={setLine} />

        <div className="mt-8 space-y-0 text-base font-medium leading-6 text-[#191c1d]">
          {introLines.map((line, i) => (
            <p key={i} className="mb-0">
              {line}
            </p>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          AI Analysis details
        </p>

        <div className="mt-3 flex flex-col gap-3 pb-4">
          {discrepancies.map((d) => (
            <FakeDiscrepancyItem key={d.title} title={d.title} description={d.description} />
          ))}
        </div>
      </div>

      <div className="shrink-0 space-y-3 border-t border-neutral-100 bg-white px-6 py-4">
        <Button
          type="button"
          variant="secondary"
          className="h-16 w-full rounded-2xl border-0 bg-gray-100 text-lg font-medium text-black hover:bg-gray-200"
          onClick={handleExit}
        >
          Discard Result
        </Button>
        <Button
          type="button"
          className="h-16 w-full rounded-2xl border-0 bg-[#dc2626] text-lg font-medium text-white hover:bg-[#b91c1c]"
          onClick={handleExit}
        >
          Save to Collection Anyway
        </Button>
      </div>
    </div>
  )
}
