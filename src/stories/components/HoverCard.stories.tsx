import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-blue-500 cursor-pointer">Hover me</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>This is a hover card content.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithCustomAlignment: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-blue-500 cursor-pointer">Hover me</span>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p>Aligned to the start.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
