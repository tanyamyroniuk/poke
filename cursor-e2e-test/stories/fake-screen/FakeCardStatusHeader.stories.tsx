import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FakeCardStatusHeader } from "@/components/fake-card/fake-card-status-header"

const meta: Meta<typeof FakeCardStatusHeader> = {
  title: "Fake screen/FakeCardStatusHeader",
  component: FakeCardStatusHeader,
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
type Story = StoryObj<typeof FakeCardStatusHeader>

export const Default: Story = {
  args: {
    cardName: "Charizard",
    verdictLabel: "Fake – 87.4%",
    setLine: "Base Set, 2010",
  },
}

export const NoSetLine: Story = {
  args: {
    cardName: "Pikachu",
    verdictLabel: "Fake – 62.1%",
  },
}
