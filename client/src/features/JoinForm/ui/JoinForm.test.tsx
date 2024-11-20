import { render, screen } from "@testing-library/react";
import { JoinForm } from "./JoinForm";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("JoinForm component", () => {
  it("renders correctly with default props", () => {
    render(
      <MemoryRouter>
        <JoinForm />
      </MemoryRouter>
    );

    const nameElement = screen.getByPlaceholderText("Name");
    const roomElement = screen.getByPlaceholderText("Chat");
    const button = screen.getByRole("button", { name: /join/i});

    expect(nameElement).toBeInTheDocument();
    expect(roomElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates input values and redirects on valid input", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<JoinForm />} />
          <Route path="/chat" element={<div>Chat Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const nameElement = screen.getByPlaceholderText("Name");
    const roomElement = screen.getByPlaceholderText("Chat");
    const button = screen.getByRole("link");

    await userEvent.type(nameElement, "testname");
    await userEvent.type(roomElement, "testchat");

    expect(nameElement).toHaveValue("testname");
    expect(roomElement).toHaveValue("testchat")
    expect(button).toHaveAttribute("href", "/chat?name=testname&room=testchat");

    await userEvent.click(button);

    const chatPage = await screen.findByText('Chat Page');
    expect(chatPage).toBeInTheDocument();
  });

  it("prevents navigation if inputs are empty", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<JoinForm />} />
          <Route path="/chat" element={<div>Chat Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const nameElement = screen.getByPlaceholderText("Name");
    const button = screen.getByRole("link");

    await userEvent.type(nameElement, "testname");
    await userEvent.click(button);

    const chatPage = screen.queryByText('Chat Page');
    expect(chatPage).toBeNull();
  });
});