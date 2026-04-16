import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PokeballLoader } from "@/components/analysis/pokeball-loader"

const meta: Meta<typeof PokeballLoader> = {
  title: "Analysis/PokeballLoader",
  component: PokeballLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof PokeballLoader>

/** Spinning Pokéball used while analysis runs. */
export const Default: Story = {}

/** Larger preview for tweaking SVG stroke and colors. */
export const Large: Story = {
  args: {
    className: "size-16",
  },
}
