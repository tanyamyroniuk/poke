import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ClipboardList, LineChart, Sparkles } from "lucide-react"
import {
  AnalysisStepRow,
  type AnalysisStepStatus,
} from "@/components/analysis/analysis-step-row"

const meta: Meta<typeof AnalysisStepRow> = {
  title: "Analysis/AnalysisStepRow",
  component: AnalysisStepRow,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[392px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    status: {
      control: "select",
      options: ["pending", "active", "completed"] satisfies AnalysisStepStatus[],
    },
  },
}

export default meta
type Story = StoryObj<typeof AnalysisStepRow>

const detectionIcons = {
  pendingLeft: <Sparkles className="size-5 text-[#9ca3af]" strokeWidth={2} aria-hidden />,
  activeLeft: <Sparkles className="size-5 text-white" strokeWidth={2} aria-hidden />,
}

export const Pending: Story = {
  args: {
    label: "Detection",
    title: "Checking Authenticity...",
    status: "pending",
    ...detectionIcons,
  },
}

export const Active: Story = {
  args: {
    label: "Detection",
    title: "Checking Authenticity...",
    status: "active",
    ...detectionIcons,
  },
}

export const Completed: Story = {
  args: {
    label: "Detection",
    title: "Checking Authenticity...",
    status: "completed",
    ...detectionIcons,
  },
}

export const ValuationActive: Story = {
  name: "Valuation (active)",
  args: {
    label: "Valuation",
    title: "Estimating Market Value...",
    status: "active",
    pendingLeft: <LineChart className="h-3 w-5 text-[#9ca3af]" strokeWidth={2} aria-hidden />,
    activeLeft: <LineChart className="h-3 w-5 text-[#dc2626]" strokeWidth={2} aria-hidden />,
  },
}

export const FinalizationPending: Story = {
  name: "Finalization (pending)",
  args: {
    label: "Finalization",
    title: "Generating Report...",
    status: "pending",
    pendingLeft: <ClipboardList className="size-6 text-[#9ca3af]" strokeWidth={2} aria-hidden />,
    activeLeft: <ClipboardList className="size-6 text-[#dc2626]" strokeWidth={2} aria-hidden />,
  },
}
