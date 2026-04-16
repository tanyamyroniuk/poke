import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FakeCardScreen } from "@/components/fake-card/fake-card-screen"

const meta: Meta<typeof FakeCardScreen> = {
  title: "Fake screen/FakeCardScreen",
  component: FakeCardScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[min(956px,100dvh)] justify-center bg-neutral-300 py-4">
        <div className="flex h-[min(956px,100dvh)] w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-xl">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FakeCardScreen>

/** Full page: shared hero + 440px sheet (matches /fake-card). */
export const Default: Story = {}
