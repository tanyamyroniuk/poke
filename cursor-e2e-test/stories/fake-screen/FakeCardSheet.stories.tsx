import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"

const meta: Meta<typeof FakeCardSheet> = {
  title: "Fake screen/FakeCardSheet",
  component: FakeCardSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-[440px] w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    onExit: () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof FakeCardSheet>

export const Default: Story = {}

export const CustomVerdict: Story = {
  args: {
    cardName: "Mewtwo",
    verdictLabel: "Fake – 91.2%",
    setLine: "Promo, 1999",
  },
}
