import { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";
import { Display } from "./display";
import { Title } from "./title";
import { Caption } from "./caption";
import { Text } from "./text";

const meta = {
  title: "Typography / Typography",
  tags: ["autodocs"],
  component: Display,
  render: () => {
    return (
      <div>
        <Display>Display</Display>
        <Header>Header</Header>
        <Title>Title</Title>
        <Text>Text</Text>
        <Caption>Caption</Caption>
        <br />
        <a href="#" className="link">
          Link
        </a>
      </div>
    );
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
