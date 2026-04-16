import { CircleX } from "lucide-react"
import { cn } from "@/lib/utils"

export type FakeCardStatusHeaderProps = {
  cardName: string
  /** e.g. "Fake – 87.4%" */
  verdictLabel: string
  /** e.g. "Base Set, 2010" */
  setLine?: string
  className?: string
}

/** Title row + red fake verdict badge (Figma 27064:113689–113694). */
export function FakeCardStatusHeader({
  cardName,
  verdictLabel,
  setLine,
  className,
}: FakeCardStatusHeaderProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <h1 className="min-w-0 text-[30px] font-medium leading-9 text-black">{cardName}</h1>
        {setLine ? (
          <p className="shrink-0 whitespace-nowrap pt-0.5 text-sm leading-none text-gray-500">{setLine}</p>
        ) : null}
      </div>
      <div className="flex w-fit items-center gap-1.5 rounded-md bg-red-100 px-2.5 py-2.5">
        <CircleX className="size-5 shrink-0 text-red-700" strokeWidth={2} aria-hidden />
        <p className="text-xl font-semibold leading-7 text-red-700">{verdictLabel}</p>
      </div>
    </div>
  )
}
