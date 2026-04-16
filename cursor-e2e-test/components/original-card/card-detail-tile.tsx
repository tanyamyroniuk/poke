import { cn } from "@/lib/utils"

export type CardDetailTileProps = {
  label: string
  value: string
  /** Center-align label & value — used in the Collector's Value grid. */
  center?: boolean
  /** Distinct styling for the PSA / graded row. */
  variant?: "default" | "psa"
  className?: string
}

/** Slate-100 info tile used in Card Details and Collector's Value grids (Figma 27037:193). */
export function CardDetailTile({ label, value, center = false, variant = "default", className }: CardDetailTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-lg pb-4 pt-2 px-4",
        variant === "default" && "bg-slate-100",
        variant === "psa" && "border border-[#d5d4ce] bg-[#f5f4ec]",
        center && "items-center text-center",
        className,
      )}
    >
      <p className="text-xs font-normal leading-7 text-gray-500">{label}</p>
      <p className="text-base font-medium leading-5 text-black">{value}</p>
    </div>
  )
}
