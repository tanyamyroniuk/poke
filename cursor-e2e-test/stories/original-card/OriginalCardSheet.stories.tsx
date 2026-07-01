import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"

const meta: Meta<typeof OriginalCardSheet> = {
  title: "Success Card/OriginalCardSheet",
  component: OriginalCardSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-[820px] w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    onSave: () => undefined,
    onDiscard: () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof OriginalCardSheet>

export const Default: Story = {}

export const CustomCard: Story = {
  args: {
    cardName: "Mewtwo",
    verdictLabel: "Original – 99.9%",
    setLine: "Base Set",
    collectorPrice: "$1,800",
    conditionScore: 60,
    rarity: "Rare Holo",
    setNumber: "10/102",
    cardType: "Psychic",
    checkItems: ["Sharp print quality", "Correct holographic pattern", "Authentic font weight"],
  },
}
