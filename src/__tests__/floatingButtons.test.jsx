import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FloatingButtons from "../floatingButtons";

describe("FloatingButtons", () => {
  it("renders only the floating Ask Gemachis button", async () => {
    render(<FloatingButtons />);
    await waitFor(() => expect(screen.getByRole("button", { name: /open ask gemachis \(floating\)/i })).toBeInTheDocument());
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
  });

  it("has accessible aria-label", async () => {
    render(<FloatingButtons />);
    const button = await screen.findByRole("button", { name: /open ask gemachis \(floating\)/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
