import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AnalysisDrawer } from "@/components/analysis/analysis-drawer"

const meta: Meta<typeof AnalysisDrawer> = {
  title: "Analysis/AnalysisDrawer",
  component: AnalysisDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-[440px] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[24px] bg-white shadow-lg">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeStep: {
      control: { type: "range", min: 0, max: 3, step: 1 },
      description: "0–2 = in progress; 3 = all steps completed",
    },
  },
}

export default meta
type Story = StoryObj<typeof AnalysisDrawer>

/** Full header + scrollable steps, same as the analysis bottom sheet body. */
export const Default: Story = {
  args: {
    activeStep: 0,
  },
}

export const Step2Active: Story = {
  args: {
    activeStep: 1,
  },
}

export const AllComplete: Story = {
  args: {
    activeStep: 3,
  },
}
