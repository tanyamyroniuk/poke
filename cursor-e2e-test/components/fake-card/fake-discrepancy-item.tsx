import { cn } from "@/lib/utils"

export type FakeDiscrepancyItemProps = {
  title: string
  description: string
  className?: string
}

/** Single AI discrepancy callout (Figma 27064:113992). */
export function FakeDiscrepancyItem({ title, description, className }: FakeDiscrepancyItemProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1 rounded-xl bg-[rgba(254,242,242,0.7)] px-6 py-4",
        className,
      )}
    >
      <p className="text-sm font-bold leading-5 text-black">{title}</p>
      <p className="text-xs font-normal leading-4 text-slate-600">{description}</p>
    </div>
  )
}
