import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, AlertTriangle, CircleCheck } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>This is a default informational alert.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert>
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Just a title, no description.</AlertTitle>
    </Alert>
  ),
}
