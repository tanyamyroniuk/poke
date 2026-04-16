import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { NewCollectionForm } from "@/components/save-to-collection/new-collection-form"

const meta: Meta<typeof NewCollectionForm> = {
  title: "Saving Card/NewCollectionForm",
  component: NewCollectionForm,
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
type Story = StoryObj<typeof NewCollectionForm>

export const Empty: Story = {
  args: {
    value: "",
    onChange: () => undefined,
    onCancel: () => undefined,
    onSubmit: () => undefined,
  },
}

export const Filled: Story = {
  args: {
    value: "Want Original",
    onChange: () => undefined,
    onCancel: () => undefined,
    onSubmit: () => undefined,
  },
}

export const Interactive: Story = {
  name: "Interactive",
  render: () => {
    const [value, setValue] = useState("")
    return (
      <NewCollectionForm
        value={value}
        onChange={setValue}
        onCancel={() => alert("Cancelled")}
        onSubmit={() => alert(`Created: "${value}"`)}
      />
    )
  },
}
