import { render, screen } from "@testing-library/react";
import { Messages } from "./Messages";
import React from "react";
import styles from "./Messages.module.scss";

describe("Messages component", () => {

  it("renders correctly with default props", () => {
    const messages = [
      { user: { name: "Alice", isAdmin: false }, message: "Hello!", time: "12:00:00" },
      { user: { name: "Bob", isAdmin: true }, message: "Hi, Alice!", time: "12:01:00" },
    ];

    render(<Messages name="Alice" messages={messages} innerRef={React.createRef()}/>);

    const firstTextMessage = screen.getByText("Hello!");
    const secondTextMessage = screen.getByText("Hi, Alice!");
    const firstUsernameMessage = screen.getByText("Alice");
    const secondUsernameMessage = screen.getByText("Bob");
    const firstTimeMessage = screen.getByText("12:00:00");
    const secondTimeMessage = screen.getByText("12:01:00");

    expect(firstTextMessage).toBeInTheDocument();
    expect(secondTextMessage).toBeInTheDocument();
    expect(firstUsernameMessage).toBeInTheDocument();
    expect(secondUsernameMessage).toBeInTheDocument();
    expect(firstTimeMessage).toBeInTheDocument();
    expect(secondTimeMessage).toBeInTheDocument();
  });

  it("renders an empty list of messages", () => {
    render(<Messages name="Alice" messages={[]} innerRef={React.createRef()}/>);

    const container = screen.getByRole("list");

    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it("applies the correct style to the user's messages", () => {
    const messages = [
      { user: { name: "Alice", isAdmin: false }, message: "Hello!", time: "12:00:00" },
      { user: { name: "Bob", isAdmin: true }, message: "Hi, Alice!", time: "12:01:00" },
    ];

    render(<Messages name="Alice" messages={messages} innerRef={React.createRef()}/>);

    const ownMessage = screen.getAllByRole("listitem")[0];
    const someoneMessage = screen.getAllByRole("listitem")[1];

    expect(ownMessage).toHaveClass(styles.me);
    expect(someoneMessage).not.toHaveClass(styles.me);
  });

  it("forwards the ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Messages name="Alice" messages={[]} innerRef={ref}/>);

    expect(ref.current).toBeInTheDocument();
  });
});