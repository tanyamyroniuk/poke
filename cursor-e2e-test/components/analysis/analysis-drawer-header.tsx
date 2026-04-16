import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { PokeballLoader } from "@/components/analysis/pokeball-loader"

export type AnalysisDrawerHeaderProps = {
  className?: string
  /** Hide the spinning Pokéball (e.g. when embedding in a different layout). */
  hideLoader?: boolean
  title?: ReactNode
  /** Secondary line under the title (e.g. time estimate). */
  description?: ReactNode
}

const defaultTitle = "Analyzing card.."

const defaultDescription = (
  <>
    The process might take up to{" "}
    <span className="font-medium text-[#dc2626]">1 min</span>
  </>
)

/**
 * Header block for the analysis bottom sheet: loader + title + caption.
 */
export function AnalysisDrawerHeader({
  className,
  hideLoader = false,
  title = defaultTitle,
  description = defaultDescription,
}: AnalysisDrawerHeaderProps) {
  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      {!hideLoader && <PokeballLoader />}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-xl font-semibold leading-none text-black">{title}</p>
        <p className="text-center text-sm font-medium leading-5 text-[#9ca3af]">{description}</p>
      </div>
    </div>
  )
}
