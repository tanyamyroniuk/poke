import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TopNav } from '@/components/home/top-nav'

const meta: Meta<typeof TopNav> = {
  title: 'Home/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['home', 'collections', 'directory'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TopNav>

export const HomeActive: Story = {
  args: {
    activeTab: 'home',
  },
}

export const CollectionsActive: Story = {
  args: {
    activeTab: 'collections',
  },
}

export const DirectoryActive: Story = {
  args: {
    activeTab: 'directory',
  },
}
