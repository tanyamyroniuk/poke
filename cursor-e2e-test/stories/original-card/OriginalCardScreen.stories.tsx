import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OriginalCardScreen } from "@/components/original-card/original-card-screen"

const meta: Meta<typeof OriginalCardScreen> = {
  title: "Success Card/OriginalCardScreen",
  component: OriginalCardScreen,
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
type Story = StoryObj<typeof OriginalCardScreen>

export const Default: Story = {}
