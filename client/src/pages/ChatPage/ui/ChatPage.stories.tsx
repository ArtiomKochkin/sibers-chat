import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ChatPage } from "./ChatPage";
import "@app/styles/loki.scss";

type Story = StoryObj<typeof ChatPage>;

const meta: Meta<typeof ChatPage> = {
  title: "Pages/Chat",
  component: ChatPage,
  tags: ['autodocs'],
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/chat?room=Room1&name=John"]}>
        <Story />
      </MemoryRouter>
    )
  ]
};

export default meta;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default chat page"
      }
    }
  }
}