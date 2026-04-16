import { CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { OriginalCheckItem } from "@/components/original-card/original-check-item"

const DEFAULT_CHECK_ITEMS = [
  "Correct font kerning",
  "Holographic layering matches",
  "Micro-print verified",
] as const

export type OriginalCardStatusHeaderProps = {
  cardName?: string
  verdictLabel?: string
  setLine?: string
  checkItems?: readonly string[]
  className?: string
}

/** Title row + green verdict badge + check list (Figma 27029:33496 header area). */
export function OriginalCardStatusHeader({
  cardName = "Charizard",
  verdictLabel = "Original – 98.2%",
  setLine,
  checkItems = DEFAULT_CHECK_ITEMS,
  className,
}: OriginalCardStatusHeaderProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <h1 className="min-w-0 text-[30px] font-medium leading-9 text-black">{cardName}</h1>
        {setLine ? (
          <p className="shrink-0 whitespace-nowrap pt-0.5 text-sm leading-none text-gray-500">{setLine}</p>
        ) : null}
      </div>

      <div className="flex w-fit items-center gap-1.5 rounded-md bg-[#d6f7e7] px-2.5 py-2.5">
        <CircleCheck className="size-4 shrink-0 text-green-800" strokeWidth={2.5} aria-hidden />
        <p className="text-base font-semibold leading-none text-green-800">{verdictLabel}</p>
      </div>

      {checkItems.length > 0 && (
        <div className="flex flex-col gap-3">
          {checkItems.map((item) => (
            <OriginalCheckItem key={item} label={item} />
          ))}
        </div>
      )}
    </div>
  )
}
