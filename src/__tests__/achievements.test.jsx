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
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Achievements/);
  });

  it("renders achievement items", () => {
    render(<Achievements />);
    expect(screen.getByText("ISHub AAU Frontend Development Bootcamp")).toBeInTheDocument();
    expect(screen.getByText("GeezX AI Bootcamp")).toBeInTheDocument();
  });

  it("renders credential items", () => {
    render(<Achievements />);
    expect(screen.getByText("EthioDigizens Digital Literacy")).toBeInTheDocument();
  });

  it("renders View Proof buttons", () => {
    render(<Achievements />);
    const proofButtons = screen.getAllByText("View Proof");
    expect(proofButtons.length).toBeGreaterThan(0);
  });
});
