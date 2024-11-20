import { render, screen } from "@testing-library/react";
import { Message } from "./Message";
import styles from "@widgets/Messages/ui/Messages.module.scss";

describe("Message component", () => {
  it("renders message elements", () => {
    render(
      <Message 
        message="Text message"
        name="Username"
        time="12:00:00"
        styleMessage=""
      />
    );

    const message = screen.getByText('Text message');
    const name = screen.getByText('Username');
    const time = screen.getByText('12:00:00');

    expect(message).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  it("displays message as a message from current user", () => {
    render(
      <Message 
        message="Text message"
        name="Username"
        time="12:00:00"
        styleMessage={styles.me}
      />
    );

    const message = screen.getByRole("listitem"); 

    expect(message).toHaveClass(styles.me);
  });

  it("displays message as a message from other user", () => {
    render(
      <Message 
        message="Text message"
        name="Username"
        time="12:00:00"
        styleMessage=""
      />
    );

    const message = screen.getByRole("listitem"); 

    expect(message).not.toHaveClass(styles.me);
  });
});