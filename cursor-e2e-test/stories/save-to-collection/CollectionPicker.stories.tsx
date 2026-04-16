import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import {
  type Collection,
  CollectionPickerTrigger,
  CollectionDropdown,
} from "@/components/save-to-collection/collection-picker"

const COLLECTIONS: Collection[] = [
  { id: "fake-cards", name: "Fake Cards Collection" },
  { id: "original-cards", name: "Original Cards Collection" },
  { id: "expensive", name: "Expensive cards" },
]

// ---------------------------------------------------------------------------
// Trigger stories
// ---------------------------------------------------------------------------

const triggerMeta: Meta<typeof CollectionPickerTrigger> = {
  title: "Saving Card/CollectionPickerTrigger",
  component: CollectionPickerTrigger,
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

export default triggerMeta
type TriggerStory = StoryObj<typeof CollectionPickerTrigger>

export const Closed: TriggerStory = {
  args: { collection: COLLECTIONS[0], open: false },
}

export const OpenState: TriggerStory = {
  args: { collection: COLLECTIONS[0], open: true },
}

// ---------------------------------------------------------------------------
// Dropdown story (interactive)
// ---------------------------------------------------------------------------

export const WithDropdown: TriggerStory = {
  name: "With Dropdown (interactive)",
  render: () => {
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(COLLECTIONS[0].id)
    const selected = COLLECTIONS.find((c) => c.id === selectedId) ?? COLLECTIONS[0]
    return (
      <div className="relative mx-auto w-full max-w-[392px]">
        <CollectionPickerTrigger
          collection={selected}
          open={open}
          onClick={() => setOpen((o) => !o)}
        />
        {open && (
          <CollectionDropdown
            collections={COLLECTIONS}
            selectedId={selectedId}
            onSelect={(id) => { setSelectedId(id); setOpen(false) }}
          />
        )}
      </div>
    )
  },
}
