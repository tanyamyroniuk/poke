import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OrSeparator } from '@/components/home/or-separator'

const meta: Meta<typeof OrSeparator> = {
  title: 'Home/OrSeparator',
  component: OrSeparator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof OrSeparator>

export const Default: Story = {}
