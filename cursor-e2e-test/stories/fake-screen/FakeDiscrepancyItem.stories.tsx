import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FakeDiscrepancyItem } from "@/components/fake-card/fake-discrepancy-item"

const meta: Meta<typeof FakeDiscrepancyItem> = {
  title: "Fake screen/FakeDiscrepancyItem",
  component: FakeDiscrepancyItem,
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
type Story = StoryObj<typeof FakeDiscrepancyItem>

export const Default: Story = {
  args: {
    title: "Low resolution printing",
    description:
      "Dithering patterns detected in the character artwork outline, characteristic of non-industrial printers.",
  },
}

export const LongBody: Story = {
  args: {
    title: "Incorrect back color saturation",
    description:
      "Blue channel levels are 12% higher than standard 1999 Base Set printing specifications.",
  },
}
