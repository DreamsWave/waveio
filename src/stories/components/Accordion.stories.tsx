import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    defaultValue: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    value: 'item-1',
    trigger: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    trigger: 'Is it styled?',
    content: 'Yes. It comes with default styles that matches the other components\' aesthetic.',
  },
  {
    value: 'item-3',
    trigger: 'Is it animated?',
    content: 'Yes. It\'s animated by default, but you can disable it if you prefer.',
  },
];

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: args => (
    <Accordion className="w-[300px]" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{items[0]?.trigger ?? ''}</AccordionTrigger>
        <AccordionContent>{items[0]?.content ?? ''}</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: args => (
    <Accordion className="w-[300px]" {...args}>
      {items.map(item => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
