import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => (
    <div className="flex flex-col gap-4">
      <p>Above</p>
      <Separator {...args} />
      <p>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <div className="flex items-center gap-4">
      <p>Left</p>
      <Separator {...args} className="h-10" />
      <p>Right</p>
    </div>
  ),
};
