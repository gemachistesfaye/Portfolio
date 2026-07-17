import React from "react";
import { render, screen } from "@testing-library/react";
import EngineeringJourney from "../engineeringJourney";

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

describe("EngineeringJourney", () => {
  it("renders the section heading", () => {
    render(<EngineeringJourney />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Engineering/);
  });

  it("renders all milestones", () => {
    render(<EngineeringJourney />);
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("2027")).toBeInTheDocument();
  });

  it("renders milestone titles", () => {
    render(<EngineeringJourney />);
    expect(screen.getByText("Started My Tech Journey")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development & AI Exploration")).toBeInTheDocument();
    expect(screen.getByText("Building Technology Products")).toBeInTheDocument();
  });
});
