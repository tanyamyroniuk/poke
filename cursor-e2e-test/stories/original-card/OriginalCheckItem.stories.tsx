import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OriginalCheckItem } from "@/components/original-card/original-check-item"

const meta: Meta<typeof OriginalCheckItem> = {
  title: "Success Card/OriginalCheckItem",
  component: OriginalCheckItem,
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
type Story = StoryObj<typeof OriginalCheckItem>

export const Default: Story = {
  args: { label: "Correct font kerning" },
}

export const LongLabel: Story = {
  args: { label: "Holographic layering matches master database reference" },
}
