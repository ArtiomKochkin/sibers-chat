import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import styles from "./Input.module.scss";
import userEvent from "@testing-library/user-event";

describe("Input component", () => {
  it("renders correctly with default props", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("renders in a rectangular shape", () => {
    render(<Input isRect={true} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(styles.rect);
  });

  it("calls handler on input change", async () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    
    await userEvent.type(input, "test");
    expect(input).toHaveValue("test");
  });
});