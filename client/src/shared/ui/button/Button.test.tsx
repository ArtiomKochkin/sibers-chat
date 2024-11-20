import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Button");
  });
});