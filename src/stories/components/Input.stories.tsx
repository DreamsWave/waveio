import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email',
  },
};

export const InputNumber: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    disabled: true,
    placeholder: 'Disabled input',
  },
};
