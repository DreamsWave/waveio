import type { Meta, StoryObj } from '@storybook/react';
import BackgroundImage from '@/assets/storybook/placeholder-background-image.jpg';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ratio: {
      control: 'number',
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: args => (
    <div className="w-[400px]">
      <AspectRatio {...args}>
        <Image
          src={BackgroundImage}
          alt="Background"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: args => (
    <div className="w-[200px]">
      <AspectRatio className="w-[200px]" {...args}>
        <Image
          src={BackgroundImage}
          alt="Background"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
