import type { DateRange } from '@/components/ui/calendar';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const CalendarComponent = () => {
      const [date, setDate] = useState<Date | undefined>(() => new Date());
      return <Calendar mode="single" selected={date} onSelect={setDate} />;
    };
    return <CalendarComponent />;
  },
};

export const RangeSelection: Story = {
  render: () => {
    const RangeSelectionComponent = () => {
      const [range, setRange] = useState<DateRange | undefined>(undefined);

      const handleSelect = (value: DateRange | undefined) => {
        setRange(value);
      };

      return <Calendar mode="range" selected={range} onSelect={handleSelect} />;
    };
    return <RangeSelectionComponent />;
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const WithDisabledDatesComponent = () => {
      const [date, setDate] = useState<Date | undefined>(() => new Date(2025, 3, 25));
      const disabledDays = [
        new Date(2025, 3, 27),
        new Date(2025, 3, 28),
        { before: new Date(2025, 3, 25) },
      ];
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
        />
      );
    };
    return <WithDisabledDatesComponent />;
  },
};

export const WithCustomStyles: Story = {
  render: () => {
    const WithCustomStylesComponent = () => {
      const [date, setDate] = useState<Date | undefined>(() => new Date());
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          classNames={{
            day_selected: 'bg-blue-500 text-white',
            day_today: 'bg-green-200',
          }}
        />
      );
    };
    return <WithCustomStylesComponent />;
  },
};
