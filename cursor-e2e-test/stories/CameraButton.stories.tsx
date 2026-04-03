import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CameraButton } from '@/components/home/camera-button'

const meta: Meta<typeof CameraButton> = {
  title: 'Home/CameraButton',
  component: CameraButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof CameraButton>

export const Default: Story = {
  args: {
    label: 'Scan with Camera',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const CustomLabel: Story = {
  args: {
    label: 'Open Camera',
  },
}
