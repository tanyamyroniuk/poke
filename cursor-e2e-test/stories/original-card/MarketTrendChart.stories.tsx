import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MarketTrendChart, generateTrendBars } from "@/components/original-card/market-trend-chart"

const meta: Meta<typeof MarketTrendChart> = {
  title: "Success Card/MarketTrendChart",
  component: MarketTrendChart,
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
type Story = StoryObj<typeof MarketTrendChart>

/** Random on every Storybook reload — same behaviour as in the live screen. */
export const Default: Story = {}

/** Fixed bars — pin a specific shape for design review. */
export const Rising: Story = {
  args: {
    trend: "+8.3% vs Last Mo",
    bars: [
      { label: "9/25", height: 18 },
      { label: "10/25", height: 22 },
      { label: "11/25", height: 28 },
      { label: "12/25", height: 36 },
      { label: "1/26", height: 44 },
      { label: "2/26", height: 54 },
      { label: "3/26", height: 68, highlighted: true },
      { label: "4/26", height: 72, faded: true },
    ],
  },
}

export const Falling: Story = {
  args: {
    trend: "-9.1% vs Last Mo",
    bars: [
      { label: "9/25", height: 72 },
      { label: "10/25", height: 64 },
      { label: "11/25", height: 58 },
      { label: "12/25", height: 48 },
      { label: "1/26", height: 40 },
      { label: "2/26", height: 32 },
      { label: "3/26", height: 22, highlighted: true },
      { label: "4/26", height: 18, faded: true },
    ],
  },
}

export const Dip: Story = {
  args: (() => {
    const { bars, trend } = generateTrendBars()
    // Force a dip shape for the story by using the live generator as a baseline.
    return {
      trend,
      bars: [
        { label: "9/25", height: 52 },
        { label: "10/25", height: 40 },
        { label: "11/25", height: 28 },
        { label: "12/25", height: 18 },
        { label: "1/26", height: 26 },
        { label: "2/26", height: 42 },
        { label: "3/26", height: 58, highlighted: true },
        { label: "4/26", height: 62, faded: true },
      ],
    }
  })(),
}
