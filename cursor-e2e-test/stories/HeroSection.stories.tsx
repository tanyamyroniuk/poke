import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeroSection } from '@/components/home/hero-section'

const meta: Meta<typeof HeroSection> = {
  title: 'Home/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    iconSrc: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {}

export const CustomTitle: Story = {
  args: {
    title: 'Find your Pokemon card',
    description: 'Search our directory of thousands of Pokémon cards.',
  },
}
