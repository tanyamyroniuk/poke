import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'you@example.com',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello Pokemon World',
  },
}
