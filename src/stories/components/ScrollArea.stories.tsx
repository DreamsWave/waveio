import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] border rounded-md p-4">
      {Array.from({ length: 20 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={i} className="py-2">
          Item
          {' '}
          {i + 1}
        </div>
      ))}
    </ScrollArea>
  ),
};

export const WithCustomScrollBar: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] border rounded-md p-4">
      {Array.from({ length: 20 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={i} className="py-2">
          Item
          {' '}
          {i + 1}
        </div>
      ))}
      <ScrollBar className="bg-blue-500" />
    </ScrollArea>
  ),
};
