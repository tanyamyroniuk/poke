import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AnalysisDrawerHeader } from "@/components/analysis/analysis-drawer-header"

const meta: Meta<typeof AnalysisDrawerHeader> = {
  title: "Analysis/AnalysisDrawerHeader",
  component: AnalysisDrawerHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    hideLoader: { control: "boolean" },
    title: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof AnalysisDrawerHeader>

/** Default copy and Pokéball loader as on the analysis screen. */
export const Default: Story = {}

/** Tweak title and caption without the loader (layout-only). */
export const TextOnly: Story = {
  args: {
    hideLoader: true,
    title: "Scanning edges…",
    description: (
      <>
        Usually finishes in{" "}
        <span className="font-medium text-[#dc2626]">under 30s</span>
      </>
    ),
  },
}

export const LongTitle: Story = {
  args: {
    title: "Analyzing your card and comparing to known prints…",
    description: "This can take a minute on slower connections.",
  },
}
