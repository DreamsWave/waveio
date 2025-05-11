import type { Meta, StoryObj } from '@storybook/react';
import AvatarImageJPG from '@/assets/storybook/placeholder-avatar.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src={AvatarImageJPG.src} alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  render: () => (
    <Avatar className="size-12">
      <AvatarImage src={AvatarImageJPG.src} alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
