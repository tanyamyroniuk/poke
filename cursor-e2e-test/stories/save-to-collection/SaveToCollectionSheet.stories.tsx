import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SaveToCollectionSheet } from "@/components/save-to-collection/save-to-collection-sheet"

const meta: Meta<typeof SaveToCollectionSheet> = {
  title: "Saving Card/SaveToCollectionSheet",
  component: SaveToCollectionSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-[814px] w-full max-w-[440px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    onSave: (id: string) => alert(`Saved to: ${id}`),
    onBack: () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof SaveToCollectionSheet>

/** Screen 1 — idle, collection selected */
export const Idle: Story = { args: { initialState: "idle" } }

/** Screen 2 — dropdown open */
export const Selecting: Story = { args: { initialState: "selecting" } }

/** Screen 3 — create new collection form */
export const Creating: Story = { args: { initialState: "creating" } }

/** Screen 4 — new collection created toast */
export const Created: Story = {
  args: {
    initialState: "created",
    initialCollections: [
      { id: "fake-cards", name: "Fake Cards Collection" },
      { id: "original-cards", name: "Original Cards Collection" },
      { id: "expensive", name: "Expensive cards" },
      { id: "custom-1", name: "Want Original" },
    ],
  },
}
