import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SaveToCollectionScreen } from "@/components/save-to-collection/save-to-collection-screen"

const meta: Meta<typeof SaveToCollectionScreen> = {
  title: "Saving Card/SaveToCollectionScreen",
  component: SaveToCollectionScreen,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-dvh w-full max-w-[440px] flex-col overflow-hidden bg-white">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SaveToCollectionScreen>

export const Default: Story = {}
