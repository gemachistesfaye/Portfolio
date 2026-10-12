import React from "react";
import { render, screen } from "@testing-library/react";
import FloatingButtons from "../floatingButtons";

describe("FloatingButtons", () => {
  it("renders the Ask Gemachis button", () => {
    render(<FloatingButtons />);
    expect(screen.getByText("Ask Gemachis")).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<FloatingButtons />);
    const button = screen.getByRole("button", { name: /open ask gemachis/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
