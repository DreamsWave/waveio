import type { Meta, StoryObj } from '@storybook/react';
import { Loader2, MailOpen, Maximize, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button>Default</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive" active>Active</Button>
      <Button variant="destructive" disabled>Disabled</Button>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button variant="outline">Outline</Button>
      <Button variant="outline" active>Active</Button>
      <Button variant="outline" disabled>Disabled</Button>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button variant="ghost" size="sm">Ghost</Button>
      <Button variant="ghost" size="sm" active>Active</Button>
      <Button variant="ghost" size="sm" disabled>Disabled</Button>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button variant="rounded">Rounded</Button>
      <Button variant="rounded" active>Active</Button>
      <Button variant="rounded" disabled>Disabled</Button>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button size="sm">Small</Button>
      <Button size="sm" active>Active</Button>
      <Button size="sm" disabled>Disabled</Button>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button size="lg">Large</Button>
      <Button size="lg" active>Active</Button>
      <Button size="lg" disabled>Disabled</Button>
    </div>
  ),
};

export const Icon: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button size="icon"><Minus className="h-6 w-6" /></Button>
      <Button size="icon" active><Maximize className="h-6 w-6" /></Button>
      <Button size="icon" disabled><X className="h-6 w-6" /></Button>
    </div>
  ),
};

export const IconSecondary: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button size="icon" className="bordered-secondary"><Minus className="h-6 w-6" /></Button>
      <Button size="icon" className="bordered-secondary" active><Maximize className="h-6 w-6" /></Button>
      <Button size="icon" className="bordered-secondary" disabled><X className="h-6 w-6" /></Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <MailOpen className="h-4 w-4" />
        {' '}
        Login with Email
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="animate-spin h-4 w-4" />
        Please wait
      </>
    ),
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="https://localhost:3001">Login</a>,
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};
