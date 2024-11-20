import { socket } from "@shared/api";
import { render, screen } from "@testing-library/react";
import { ChatWindow } from "./ChatWindow";
import styles from "./ChatWindow.module.scss";
import userEvent from "@testing-library/user-event";

jest.mock("@shared/api", () => ({
  socket: {
    emit: jest.fn()
  }
}));

describe("ChatWindow component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it("renders correctly with default props", () => {
    const params = { name: "Alice", room: "test room" };
    const state = [
      { user: { name: "Alice", isAdmin: false }, message: "Hello!", time: "12:00:00" },
      { user: { name: "Bob", isAdmin: true }, message: "Hi, Alice!", time: "12:01:00" },
    ];
    render(
      <ChatWindow 
        isOpenSidebar={true}
        params={params}
        state={state}
      />
    );

    const button = screen.getByRole("button", { name: /send/i });
    const input = screen.getByPlaceholderText("Type a message");

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toBeRequired();
    expect(document.activeElement).toBe(input);
  });

  it("shows correctly with closed sidebar", () => {
    const params = { name: "Alice", room: "test room" };
    render(
      <ChatWindow 
        isOpenSidebar={false}
        params={params}
        state={[]}
      />
    );

    const form = screen.getByRole("form");
    const chat = screen.getByRole("region");

    expect(form).toHaveClass(styles.full);
    expect(chat).toHaveClass(styles.full);
  });

  it("applies the mobile class when innerWidth is less than 768", () => {
    const params = { name: "Alice", room: "test room" };

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 500
    });
    window.dispatchEvent(new Event("resize"));

    render(
      <ChatWindow 
        isOpenSidebar={true}
        params={params}
        state={[]}
      />
    );

    const chat = screen.getByRole("region");
    expect(chat).toHaveClass(styles.full);
  });

  it("sends message after typing the text and clicking on the button", async () => {
    const focusSpy = jest.spyOn(HTMLInputElement.prototype, "focus");
    const params = { name: "Alice", room: "test room" };

    render(
      <ChatWindow 
        isOpenSidebar={true}
        params={params}
        state={[]}
      />
    );

    const button = screen.getByRole("button", { name: /send/i });
    const input = screen.getByPlaceholderText("Type a message");

    await userEvent.type(input, "New message");
    await userEvent.click(button);

    expect(input).toHaveValue("");
    expect(focusSpy).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith("sendMessage", { 
      message: "New message",
      params
    });
  });

  it("is not sends message if the value of input is empty", async () => {
    const params = { name: "Alice", room: "test room" };

    render(
      <ChatWindow 
        isOpenSidebar={true}
        params={params}
        state={[]}
      />
    );

    const button = screen.getByRole("button", { name: /send/i });
    
    await userEvent.click(button);
    expect(socket.emit).not.toHaveBeenCalled();
  });
});