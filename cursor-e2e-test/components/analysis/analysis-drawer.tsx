"use client"

import { AnalysisDrawerHeader } from "@/components/analysis/analysis-drawer-header"
import { AnalysisStepRow, type AnalysisStepStatus } from "@/components/analysis/analysis-step-row"

const FIGMA_FRAME_H = 756
const ARTBOARD_H = 956
const Y = (n: number) => Math.round((n * ARTBOARD_H) / FIGMA_FRAME_H)

const DRAWER_HEADER_TOP = Y(30)
const STEP_STACK_GAP_PX = 12

const PENDING = "#9ca3af"
const ACTIVE = "#dc2626"
const DONE = "#059669"

function DetectionIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16.4104 5.49719C16.0551 6.27879 14.9449 6.27879 14.5896 5.49719L14.25 4.75L13.5028 4.41037C12.7212 4.0551 12.7212 2.9449 13.5028 2.58963L14.25 2.25L14.5896 1.50281C14.9449 0.72121 16.0551 0.72121 16.4104 1.50281L16.75 2.25L17.4972 2.58963C18.2788 2.9449 18.2788 4.0551 17.4972 4.41037L16.75 4.75L16.4104 5.49719ZM16.9104 18.4972C16.5551 19.2788 15.4449 19.2788 15.0896 18.4972L14.75 17.75L14.0028 17.4104C13.2212 17.0551 13.2212 15.9449 14.0028 15.5896L14.75 15.25L15.0896 14.5028C15.4449 13.7212 16.5551 13.7212 16.9104 14.5028L17.25 15.25L17.9972 15.5896C18.7788 15.9449 18.7788 17.0551 17.9972 17.4104L17.25 17.75L16.9104 18.4972ZM8.91037 16.4972C8.5551 17.2788 7.4449 17.2788 7.08963 16.4972L5.5 13L2.00281 11.4104C1.22121 11.0551 1.22121 9.9449 2.00281 9.58963L5.5 8L7.08963 4.50281C7.4449 3.72121 8.5551 3.72121 8.91037 4.50281L10.5 8L13.9972 9.58963C14.7788 9.9449 14.7788 11.0551 13.9972 11.4104L10.5 13L8.91037 16.4972ZM8 13.65L9 11.5L11.15 10.5L9 9.5L8 7.35L7 9.5L4.85 10.5L7 11.5L8 13.65Z" fill={color} />
    </svg>
  )
}

function ValuationIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.10118 11.2988C1.71393 11.6861 1.08607 11.6861 0.698822 11.2988C0.312493 10.9125 0.311439 10.2865 0.696465 9.89883L6.6929 3.86188C7.08304 3.46911 7.71804 3.46804 8.10949 3.85949L11.4 7.15L16.6 2H15C14.4477 2 14 1.55228 14 1C14 0.447715 14.4477 0 15 0H19C19.5523 0 20 0.447715 20 1V5C20 5.55228 19.5523 6 19 6C18.4477 6 18 5.55228 18 5V3.4L12.1071 9.29289C11.7166 9.68342 11.0834 9.68342 10.6929 9.29289L7.4 6L2.10118 11.2988Z" fill={color} />
    </svg>
  )
}

function FinalizationIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke={color} strokeWidth="2" strokeLinejoin="bevel" />
      <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke={color} strokeWidth="2" strokeLinejoin="bevel" />
      <path d="M9 12H15" stroke={color} strokeWidth="2" strokeLinejoin="bevel" />
      <path d="M9 16H15" stroke={color} strokeWidth="2" strokeLinejoin="bevel" />
    </svg>
  )
}

const STEPS = [
  {
    label: "Detection",
    title: "Checking Authenticity...",
    pendingLeft: <DetectionIcon color={PENDING} />,
    activeLeft: <DetectionIcon color={ACTIVE} />,
    completedLeft: <DetectionIcon color={DONE} />,
  },
  {
    label: "Valuation",
    title: "Estimating Market Value...",
    pendingLeft: <ValuationIcon color={PENDING} />,
    activeLeft: <ValuationIcon color={ACTIVE} />,
    completedLeft: <ValuationIcon color={DONE} />,
  },
  {
    label: "Finalization",
    title: "Generating Report...",
    pendingLeft: <FinalizationIcon color={PENDING} />,
    activeLeft: <FinalizationIcon color={ACTIVE} />,
    completedLeft: <FinalizationIcon color={DONE} />,
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
              completedLeft={step.completedLeft}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
