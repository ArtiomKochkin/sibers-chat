import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./ChatPage";
import styles from "@widgets/Sidebar/ui/Sidebar.module.scss";
import userEvent from "@testing-library/user-event";
import { socket } from "@shared/api";
import { IMessage, IUser } from "@shared/types";
import { Socket } from "socket.io-client";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("ChatPage component", () => {

  it("renders correctly with initial state", () => {
    render(
      <MemoryRouter>
        <ChatPage/>
      </MemoryRouter>
    );

    const header = screen.getByRole("banner");
    const sidebar = screen.getByRole("complementary");
    const chat = screen.getByRole("region");

    expect(header).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(chat).toBeInTheDocument();
  });

  it("parses URL parameters correctly", () => {
    const search = "?name=TestUser&room=TestRoom";

    render(
      <MemoryRouter initialEntries={[`/chat${search}`]}>
        <ChatPage/>
      </MemoryRouter>
    );

    const username = screen.getByText("TestUser");
    const room = screen.getByText('TestRoom');

    expect(username).toBeInTheDocument();
    expect(room).toBeInTheDocument();
  });

  it("toggles Sidebar visibility", async () => {
    render(
      <MemoryRouter>
        <ChatPage/>
      </MemoryRouter>
    );

    const sidebar = screen.getByRole("complementary");
    const button = screen.getByTestId("toggle-sidebar");
    expect(sidebar).not.toHaveClass(styles.hidden);

    await userEvent.click(button);

    expect(sidebar).toHaveClass(styles.hidden);
  });

  it("emits 'join' event with correct parameters", () => {
    const search = "?name=TestUser&room=TestRoom";
    const mockSocket = jest.spyOn(socket, "emit");

    render(
      <MemoryRouter initialEntries={[`/chat${search}`]}>
        <ChatPage/>
      </MemoryRouter>
    );

    expect(mockSocket).toHaveBeenCalledWith("join", {
      name: "TestUser",
      room: "TestRoom" 
    });
  });
  
  it("updates state on receiving 'message' event", async () => {
    const mockMessage: IMessage = {
      time: "12:45:00",
      message: "Test message",
      user: { isAdmin: false, name: "Sender" }
    };

    const onSpy = jest.spyOn(socket, "on").mockImplementation((event, callback) => {
      if (event === "message") {
        callback({ data: mockMessage });
      }
      return socket as Socket;
    });

    render(
      <MemoryRouter initialEntries={[`/chat?name=TestUser&room=TestRoom`]}>
        <ChatPage/>
      </MemoryRouter>
    );

    const newMessage = await screen.findByText("Test message");
    expect(newMessage).toBeInTheDocument();
    expect(onSpy).toHaveBeenCalledWith("message", expect.any(Function));
    onSpy.mockRestore();
  });

  it("updates state on receiving 'room' event", async () => {
    const mockUsers: IUser[] = [
      { name: "John", isAdmin: true },
      { name: "Michael", isAdmin: false },
    ];

    const onSpy = jest.spyOn(socket, "on").mockImplementation((event, callback) => {
      if (event === "room") {
        callback({ data: { 
          users: mockUsers,
          admin: mockUsers[0]
        }});
      }

      return socket as Socket;
    });

    render(
      <MemoryRouter initialEntries={[`/chat?name=Michael&room=TestRoom`]}>
        <ChatPage/>
      </MemoryRouter>
    );

    const newUser = await screen.findAllByText("Michael");
    expect(newUser[1]).toBeInTheDocument();
    expect(onSpy).toHaveBeenCalledWith("room", expect.any(Function));
    onSpy.mockRestore();
  });

  it("updates state on receiving 'currentUser' event", async () => {
    const mockUser: IUser = { name: "Michael", isAdmin: false };

    const onSpy = jest.spyOn(socket, "on").mockImplementation((event, callback) => {
      if (event === "currentUser") {
        callback({ user: mockUser});
      }

      return socket as Socket;
    });

    render(
      <MemoryRouter initialEntries={[`/chat?name=Michael&room=TestRoom`]}>
        <ChatPage/>
      </MemoryRouter>
    );

    const newUser = await screen.findByText("Michael");
    expect(newUser).toBeInTheDocument();
    expect(onSpy).toHaveBeenCalledWith("currentUser", expect.any(Function));
    onSpy.mockRestore();
  });

  it("updates state on receiving 'userRemoved' event and redirects the user", async () => {
    const onSpy = jest.spyOn(socket, "on").mockImplementation((event, callback) => {
      if (event === "currentUser") {
        callback({ user: { name: "Michael", isAdmin: false } });
      }
      if (event === "userRemoved") {
        callback({ name: "Michael" });
      }
      return socket as Socket;
    });

    render(
      <MemoryRouter initialEntries={['/chat?name=Michael&room=TestRoom']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
      </MemoryRouter>
    );

    expect(onSpy).toHaveBeenCalledWith("userRemoved", expect.any(Function));
    onSpy.mockRestore();
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});