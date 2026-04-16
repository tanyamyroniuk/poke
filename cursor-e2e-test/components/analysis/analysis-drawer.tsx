"use client"

import {
  ClipboardList,
  LineChart,
  Sparkles,
} from "lucide-react"
import { AnalysisDrawerHeader } from "@/components/analysis/analysis-drawer-header"
import { AnalysisStepRow, type AnalysisStepStatus } from "@/components/analysis/analysis-step-row"

/**
 * Figma component `drawer` — node 27084:176898.
 * Bottom sheet body: header at 30px, step list at 148px from sheet top (756px frame → scaled).
 */
const FIGMA_FRAME_H = 756
const ARTBOARD_H = 956
const Y = (n: number) => Math.round((n * ARTBOARD_H) / FIGMA_FRAME_H)

const DRAWER_HEADER_TOP = Y(30)
const STEP_STACK_GAP_PX = 12

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

function stepStatus(activeStep: number, index: number): AnalysisStepStatus {
  if (activeStep === 3) return "completed"
  if (index < activeStep) return "completed"
  if (index === activeStep) return "active"
  return "pending"
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
      <div
        className="flex w-full max-w-[calc(100%-48px)] shrink-0 flex-col self-center"
        style={{ paddingTop: DRAWER_HEADER_TOP }}
      >
        <AnalysisDrawerHeader />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 pb-4 pt-4">
        <div
          className="mx-auto flex w-full max-w-[392px] flex-col"
          style={{ gap: STEP_STACK_GAP_PX }}
        >
          {STEPS.map((step, i) => (
            <AnalysisStepRow
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
