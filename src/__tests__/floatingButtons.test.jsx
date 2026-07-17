import React from "react";
import { render, screen } from "@testing-library/react";
import FloatingButtons from "../floatingButtons";

describe("FloatingButtons", () => {
  it("renders the Hire Me button", () => {
    render(<FloatingButtons />);
    expect(screen.getByText("Hire Me")).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<FloatingButtons />);
    const button = screen.getByRole("button", { name: /open project inquiry/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
