import type { ReactNode } from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type AnalysisStepStatus = "pending" | "active" | "completed"

export type AnalysisStepRowProps = {
  label: string
  title: string
  status: AnalysisStepStatus
  /** Icon in the left circle when pending or completed (completed reuses this). */
  pendingLeft: ReactNode
  /** Icon when step is active (often accent-colored). */
  activeLeft: ReactNode
  className?: string
}

/**
 * Single row in the analysis progress list: pending (grey), active (spinner), or completed (check).
 */
export function AnalysisStepRow({
  label,
  title,
  status,
  pendingLeft,
  activeLeft,
  className,
}: AnalysisStepRowProps) {
  const completed = status === "completed"
  const active = status === "active"

  const leftIcon = completed ? pendingLeft : active ? activeLeft : pendingLeft

  const trailing = completed ? (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
      <Check className="size-5 text-emerald-600" strokeWidth={2.5} aria-hidden />
    </div>
  ) : active ? (
    <div className="flex size-10 shrink-0 items-center justify-center">
      <Loader2 className="size-8 animate-spin text-[#dc2626]" strokeWidth={2.5} aria-hidden />
    </div>
  ) : null

  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-center gap-2 rounded-lg border-2 border-solid px-3 pb-2 pt-2 transition-colors duration-300",
        completed && "border-emerald-200 bg-emerald-50",
        active && "border-[#fef5f5] bg-[#fff9f9]",
        !completed && !active && "border-transparent bg-[#fbfbfb]",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
          active && "bg-[#fee2e2]",
          !active && "bg-[#eff4f6]",
        )}
      >
        {leftIcon}
      </div>
      <div
        className={cn(
          "flex min-h-px min-w-0 flex-1 flex-col pb-1 leading-7",
          completed && "text-emerald-900",
          !active && !completed && "text-[#9ca3af]",
        )}
      >
        <p
          className={cn(
            "w-full text-xs font-normal leading-7",
            completed && "text-emerald-700",
            active && "text-[#6b7280]",
            !active && !completed && "text-[#9ca3af]",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "whitespace-nowrap text-base font-medium leading-7",
            completed && "text-emerald-950",
            active && "text-black",
            !active && !completed && "text-[#9ca3af]",
          )}
        >
          {title}
        </p>
      </div>
      {trailing}
    </div>
  )
}
