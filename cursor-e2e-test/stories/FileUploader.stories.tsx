import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FileUploader } from '@/components/home/file-uploader'

const meta: Meta<typeof FileUploader> = {
  title: 'Home/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    maxSizeMB: {
      control: { type: 'number', min: 1, max: 100 },
    },
    accept: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof FileUploader>

export const Default: Story = {}

export const LargerLimit: Story = {
  args: {
    maxSizeMB: 25,
  },
}

export const WithCallback: Story = {
  args: {
    onFileSelect: (file: File) => alert(`Selected: ${file.name}`),
  },
}
