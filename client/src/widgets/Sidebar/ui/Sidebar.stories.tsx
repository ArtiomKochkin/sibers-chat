import { Meta, StoryObj } from "@storybook/react";
import { IUser } from "@shared/types";
import { Sidebar } from "./Sidebar";

type Story = StoryObj<typeof Sidebar>;

const meta: Meta<typeof Sidebar> = {
  title: "Widgets/Sidebar",
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    room: {
      description: "The name of the room"
    },
    users: {
      description: "The array of users"
    },
    isAdmin: {
      description: "The parameter determines whether the current user is an admin"
    },
    isOpen: {
      description: "The parameter determines whether a sidebar is open"
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

const mockUsers: IUser[] = [
  { name: "John", isAdmin: true },
  { name: "Artem", isAdmin: false },
  { name: "Alex", isAdmin: false },
  { name: "Julia", isAdmin: false },
  { name: "Nick", isAdmin: false },
  { name: "Xan", isAdmin: false },
]

export const Default: Story = {
  args: {
    isAdmin: false,
    isOpen: true,
    room: "Room",
    users: mockUsers
  },
  parameters: {
    docs: {
      description: {
        story: "Default Sidebar"
      }
    }
  }
};

export const Admin: Story = {
  args: {
    isAdmin: true,
    isOpen: true,
    room: "Room",
    users: mockUsers
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar if the current user is an admin"
      }
    }
  }
};

export const Closed: Story = {
  args: {
    isAdmin: false,
    isOpen: false,
    room: "Room",
    users: mockUsers
  },
  parameters: {
    docs: {
      description: {
        story: "Closed Sidebar"
      }
    }
  }
}