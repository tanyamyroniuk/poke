import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OriginalCardStatusHeader } from "@/components/original-card/original-card-status-header"

const meta: Meta<typeof OriginalCardStatusHeader> = {
  title: "Success Card/OriginalCardStatusHeader",
  component: OriginalCardStatusHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[392px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OriginalCardStatusHeader>

export const Default: Story = {
  args: {
    cardName: "Charizard",
    verdictLabel: "Original – 98.2%",
    setLine: "Base Set, 2010",
  },
}

export const NoSetLine: Story = {
  args: {
    cardName: "Pikachu",
    verdictLabel: "Original – 94.7%",
  },
}

export const HighConfidence: Story = {
  args: {
    cardName: "Mewtwo",
    verdictLabel: "Original – 99.9%",
    setLine: "Base Set, 1999",
    checkItems: ["Correct font kerning", "Holographic layering matches", "Micro-print verified", "Back color saturation within spec"],
  },
}
