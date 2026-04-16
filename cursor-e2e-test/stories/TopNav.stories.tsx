import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BottomNav } from '@/components/home/bottom-nav'

const meta: Meta<typeof BottomNav> = {
  title: 'Home/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['scan', 'collections'],
    },
  },
}

export default meta
type Story = StoryObj<typeof BottomNav>

export const ScanActive: Story = {
  args: {
    activeTab: 'scan',
  },
}

export const CollectionsActive: Story = {
  args: {
    activeTab: 'collections',
  },
}
