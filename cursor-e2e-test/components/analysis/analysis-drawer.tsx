"use client"

import type { ReactNode } from "react"
import {
  Check,
  ClipboardList,
  LineChart,
  Loader2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PokeballLoader } from "@/components/analysis/pokeball-loader"

/**
 * Figma component `drawer` — node 27084:176898.
 * Bottom sheet body: header at 30px, step list at 148px from sheet top (756px frame → scaled).
 */
const FIGMA_FRAME_H = 756
const ARTBOARD_H = 956
const Y = (n: number) => Math.round((n * ARTBOARD_H) / FIGMA_FRAME_H)

const DRAWER_HEADER_TOP = Y(30)
const STEP_STACK_GAP_PX = 12

type StepStatus = "pending" | "active" | "completed"

const STEPS = [
  {
    label: "Detection",
    title: "Checking Authenticity...",
    pendingLeft: (
      <Sparkles className="size-5 text-[#9ca3af]" strokeWidth={2} aria-hidden />
    ),
    activeLeft: (
      <Sparkles className="size-5 text-white" strokeWidth={2} aria-hidden />
    ),
  },
  {
    label: "Valuation",
    title: "Estimating Market Value...",
    pendingLeft: (
      <LineChart className="h-3 w-5 text-[#9ca3af]" strokeWidth={2} aria-hidden />
    ),
    activeLeft: (
      <LineChart className="h-3 w-5 text-[#dc2626]" strokeWidth={2} aria-hidden />
    ),
  },
  {
    label: "Finalization",
    title: "Generating Report...",
    pendingLeft: (
      <ClipboardList className="size-6 text-[#9ca3af]" strokeWidth={2} aria-hidden />
    ),
    activeLeft: (
      <ClipboardList className="size-6 text-[#dc2626]" strokeWidth={2} aria-hidden />
    ),
  },
] as const

function stepStatus(activeStep: number, index: number): StepStatus {
  if (activeStep === 3) return "completed"
  if (index < activeStep) return "completed"
  if (index === activeStep) return "active"
  return "pending"
}

function StepRow({
  label,
  title,
  status,
  pendingLeft,
  activeLeft,
}: {
  label: string
  title: string
  status: StepStatus
  pendingLeft: ReactNode
  activeLeft: ReactNode
}) {
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
          active && "",
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

export type AnalysisDrawerProps = {
  activeStep: number
}

export function AnalysisDrawer({ activeStep }: AnalysisDrawerProps) {
  return (
    <div
      className="flex h-full min-h-0 w-full flex-col"
      data-name="drawer"
      data-node-id="27084:176898"
    >
      {/* 27062:113364 — fixed header; 27062:113372 scrolls below */}
      <div
        className="flex w-full max-w-[calc(100%-48px)] shrink-0 flex-col items-center gap-3 self-center"
        style={{ paddingTop: DRAWER_HEADER_TOP }}
      >
        <PokeballLoader />
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-xl font-semibold leading-none text-black">Analyzing card..</p>
          <p className="text-center text-sm font-medium leading-5 text-[#9ca3af]">
            The process might take up to{" "}
            <span className="font-medium text-[#dc2626]">1 min</span>
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 pb-4 pt-4">
        <div
          className="mx-auto flex w-full max-w-[392px] flex-col"
          style={{ gap: STEP_STACK_GAP_PX }}
        >
          {STEPS.map((step, i) => (
            <StepRow
              key={step.label}
              label={step.label}
              title={step.title}
              status={stepStatus(activeStep, i)}
              pendingLeft={step.pendingLeft}
              activeLeft={step.activeLeft}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
