import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CardsStackIcon } from "@/components/save-to-collection/cards-stack-icon"

const meta: Meta<typeof CardsStackIcon> = {
  title: "Saving Card/CardsStackIcon",
  component: CardsStackIcon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof CardsStackIcon>

export const Default: Story = { args: { size: 128 } }
export const Small: Story = { args: { size: 64 } }
export const Large: Story = { args: { size: 192 } }
