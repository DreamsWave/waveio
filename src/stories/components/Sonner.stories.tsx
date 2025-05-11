import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from '@/components/ui/sonner';

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast('This is a toast message')}
      >
        Show Toast
      </Button>
    </>
  ),
};
