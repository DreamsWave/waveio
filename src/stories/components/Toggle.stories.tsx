import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/components/ui/toggle';
import { BoldIcon } from 'lucide-react';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Toggle',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: <BoldIcon className="size-4" />,
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Outline Toggle',
  },
};
