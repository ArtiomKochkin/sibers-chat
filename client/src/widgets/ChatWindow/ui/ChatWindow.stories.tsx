import { StoryObj, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { IMessage } from "@shared/types";
import { ChatWindow } from "./ChatWindow";

type Story = StoryObj<typeof ChatWindow>;

const meta: Meta<typeof ChatWindow> = {
  title: 'Widgets/ChatWindow',
  component: ChatWindow,
  tags: ['autodocs'],
  argTypes: {
    params: {
      description: "The data about the current user and room",
    },
    isOpenSidebar: {
      description: "The parameter determines whether a sidebar is open",
    },
    state: {
      description: "The array of data for messages",
    }
  },
  decorators: [
    (Story, context) => {
      const isFullScreen = context.viewMode === 'story' && context.args.isOpenSidebar === false;
      const isMobile = window.matchMedia('(max-width: 500px)').matches;
      const left = isFullScreen ? (isMobile ? "0vw" : "-2vw") : (isMobile ? "-34vw" : "-25vw");
      const isHiddenOverflow = isFullScreen ? "hidden" : "visible";

      const style: React.CSSProperties = {
        position: "relative",
        left: left,
        overflowX: isHiddenOverflow
      }

      return (
        <BrowserRouter>
          <div style={style}>
            <Story/>
          </div>
        </BrowserRouter>
      )
    }
  ]
};

export default meta;

const mockMessages: IMessage[] = [
  { 
    message: "First message",
    time: "14:12:45",
    user: { name: "John", isAdmin: false }
  },
  { 
    message: "Second message",
    time: "14:16:52",
    user: { name: "Kate", isAdmin: false }
  },
  { 
    message: "Third message",
    time: "14:20:00",
    user: { name: "John", isAdmin: false }
  },
] 

export const Default: Story = {
  args: {
    params: {
      room: "Room",
      name: "John",
    },
    isOpenSidebar: true,
    state: mockMessages
  },
  parameters: {
    docs: {
      description: {
        story: "Default view of the chat window"
      }
    }
  }
};

export const Empty: Story = {
  args: {
    params: {
      room: "Room",
      name: "John",
    },
    isOpenSidebar: true,
    state: []
  },
  parameters: {
    docs: {
      description: {
        story: "The chat window with an empty message block"
      }
    }
  }
};

export const FullScreen: Story = {
  args: {
    params: {
      room: "Room",
      name: "John",
    },
    isOpenSidebar: false,
    state: mockMessages
  },
  parameters: {
    docs: {
      description: {
        story: "The chat window with a full width of screen"
      }
    },
  }
};