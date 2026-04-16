import { CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export type OriginalCheckItemProps = {
  label: string
  className?: string
}

/** Single positive verification row — green checkmark + label (Figma 27062:113614). */
export function OriginalCheckItem({ label, className }: OriginalCheckItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <CircleCheck className="size-[18px] shrink-0 text-green-600" strokeWidth={2} aria-hidden />
      <p className="text-base font-medium leading-6 text-[#191c1d]">{label}</p>
    </div>
  )
}
