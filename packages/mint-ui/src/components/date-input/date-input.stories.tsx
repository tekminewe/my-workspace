import { Meta, StoryObj } from "@storybook/react-vite";
import { DateInput } from "./date-input";

const meta = {
  title: "Form / DateInput",
  component: DateInput,
  tags: ["autodocs"],
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <DateInput label="Date of birth" placeholder="Select your birth date" />
        <DateInput label="Post Date" value={new Date("2021-01-01T00:00:00")} />
        <DateInput
          label="Date of birth"
          placeholder="Select your birth date"
          clearable={false}
        />
        <DateInput
          label="Date of birth"
          placeholder="Select your birth date"
          error="You must be 18 years or older to sign up"
          value={new Date("2021-01-01T00:00:00")}
        />
        <DateInput
          label="RSVP Date and time"
          placeholder="Select your rsvp date"
          showTime
          value={new Date("2021-01-01T00:00:00")}
        />
      </div>
    );
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
