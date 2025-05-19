import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: args => (
    <Alert className="w-[400px]" {...args}>
      <AlertTriangle />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your session is about to expire. Save your work to avoid losing
        progress.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: args => (
    <Alert className="w-[400px]" {...args}>
      <AlertTriangle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to save changes. Please check your connection and try again.
      </AlertDescription>
    </Alert>
  ),
};
