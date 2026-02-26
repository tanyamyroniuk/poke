import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This is the card content area.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>With Footer</CardTitle>
        <CardDescription>A card with action buttons in the footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Some content inside the card.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <p className="text-sm">A minimal card with just content padding.</p>
    </Card>
  ),
}
