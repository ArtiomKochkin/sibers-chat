import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";

type Story = StoryObj<typeof Header>

const meta: Meta<typeof Header> = {
  title: "Widgets/Header",
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    name: {
      description: "The name of the current user"
    },
    params: {
      description: "The data about current session"
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export default meta;

export const Default: Story = {
  args: {
    name: "Username",
    params: {
      room: 'room',
      name: "name"
    },
    toggleVisibility: (() => {})
  },
  parameters: {
    docs: {
      description: {
        story: "Default header"
      }
    }
  }
}