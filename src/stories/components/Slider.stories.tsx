import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/ui/slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    defaultValue: {
      control: 'object',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
  render: args => (
    <div className="flex items-center justify-center w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    step: 1,
  },
  render: args => (
    <div className="flex items-center justify-center w-[300px]">
      <Slider {...args} />
    </div>
  ),
};
