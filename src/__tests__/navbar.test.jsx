import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../navbar";

describe("Navbar", () => {
  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("Gemachis T.")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Skills").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("has correct aria-label on mobile menu button", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the desktop Blog link in the mobile menu", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByText("Read Blog")).toBeInTheDocument();
    expect(screen.queryByText("Resume / CV")).not.toBeInTheDocument();
  });
});
