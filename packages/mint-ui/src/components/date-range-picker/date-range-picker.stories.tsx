import { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker } from './date-range-picker';
import { ControlledDateRangePicker } from './controlled-date-range-picker';
import { ControlledForm } from '../form';
import { Button } from '../button';
import { object, date } from 'zod';

const meta = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  render: () => {
    return (
      <div className="flex flex-col gap-4 w-80">
        <DateRangePicker
          label="Effective Period"
          placeholder="Select date range"
        />
        <DateRangePicker
          label="Required Field"
          placeholder="Select date range"
          required
        />
        <DateRangePicker
          label="With Error"
          placeholder="Select date range"
          error="This field is required"
          required
        />
        <DateRangePicker
          label="Disabled"
          placeholder="Select date range"
          disabled
        />
        <DateRangePicker
          label="Single Month"
          placeholder="Select date range"
          numberOfMonths={1}
        />
        <DateRangePicker
          label="Custom Format"
          placeholder="Select date range"
          dateFormat="dd/MM/yyyy"
          separator=" to "
        />
        <DateRangePicker
          label="With Min Date"
          placeholder="Select date range"
          minDate={new Date()}
        />
        <DateRangePicker
          label="Not Clearable"
          placeholder="Select date range"
          clearable={false}
        />
      </div>
    );
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

export const InForm: Story = {
  render: () => {
    const schema = object({
      effectivePeriod: object({
        from: date(),
        to: date(),
      }).optional(),
    });

    const defaultValues = {
      effectivePeriod: undefined,
    };

    interface FormData {
      effectivePeriod?: {
        from?: Date;
        to?: Date;
      };
    }

    const handleSubmit = (data: FormData) => {
      console.log('Form data:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <div className="w-80">
        <ControlledForm
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <ControlledDateRangePicker
              name="effectivePeriod"
              label="Effective Period"
              placeholder="Select effective period"
              required
              minDate={new Date()}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </ControlledForm>
      </div>
    );
  },
};
