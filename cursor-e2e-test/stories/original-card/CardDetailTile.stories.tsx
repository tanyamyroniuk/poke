import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CardDetailTile } from "@/components/original-card/card-detail-tile"

const meta: Meta<typeof CardDetailTile> = {
  title: "Success Card/CardDetailTile",
  component: CardDetailTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[200px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CardDetailTile>

export const Default: Story = {
  args: { label: "Condition", value: "Near Mint (NM)" },
}

export const Centered: Story = {
  args: { label: "Near Mint", value: "$9,200", center: true },
}

export const PSAVariant: Story = {
  args: { label: "PSA 10 – Gem Mint", value: "$350,000+", center: true, variant: "psa" },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[392px]">
        <Story />
      </div>
    ),
  ],
}
