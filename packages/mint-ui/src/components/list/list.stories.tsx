import { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./list";
import { ListItem } from "./list-item";
import { ListGroup } from "./list-group";
import {
  LuFactory,
  LuHouse,
  LuLayoutGrid,
  LuSquareUserRound,
  LuUserCog,
} from "react-icons/lu";

const meta = {
  title: "Common / List",
  component: List,
  subcomponents: {
    ListItem: ListItem as React.ComponentType<unknown>,
    ListGroup: ListGroup as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <List {...args}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    );
  },
};

export const Group: Story = {
  args: {},
  render: (args) => {
    return (
      <List {...args}>
        <ListGroup>
          <ListItem selected>
            <LuHouse /> Home
          </ListItem>
          <ListItem>
            <LuSquareUserRound />
            Team
          </ListItem>
          <ListItem>
            <LuLayoutGrid /> Projects
          </ListItem>
        </ListGroup>
        <ListGroup title="Settings">
          <ListItem>
            <LuLayoutGrid />
            Project Settings
          </ListItem>
          <ListItem>
            <LuFactory /> Organisation Settings
          </ListItem>
          <ListItem>
            <LuUserCog /> Account Settings
          </ListItem>
        </ListGroup>
      </List>
    );
  },
};
