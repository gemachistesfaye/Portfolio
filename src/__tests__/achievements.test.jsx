import React from "react";
import { render, screen } from "@testing-library/react";
import Achievements from "../achievements";

vi.mock("react-intersection-observer", () => {
  const mockRef = { current: null };
  const useInView = () => [mockRef, true, { isIntersecting: true }];
  return {
    __esModule: true,
    default: useInView,
    useInView,
    InView: ({ children }) => children({ inView: true, ref: mockRef }),
  };
});

describe("Achievements", () => {
  it("renders the section heading", () => {
    render(<Achievements />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Credentials/);
  });

  it("renders all credentials", () => {
    render(<Achievements />);
    expect(screen.getByText("ISHub AAU Frontend Development Bootcamp")).toBeInTheDocument();
    expect(screen.getByText("GeezX AI Bootcamp")).toBeInTheDocument();
    expect(screen.getByText("ALX Ventures Founder Academy")).toBeInTheDocument();
    expect(screen.getByText("Software Development Frameworks Training")).toBeInTheDocument();
    expect(screen.getByText("EthioDigizens Digital Literacy")).toBeInTheDocument();
  });

  it("renders certificate view buttons", () => {
    render(<Achievements />);
    const buttons = screen.getAllByRole("button", { name: /View .* certificate/i });
    expect(buttons.length).toBe(5);
  });
});
