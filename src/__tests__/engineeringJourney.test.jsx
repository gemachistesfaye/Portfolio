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
    expect(screen.getByText(/Engineering/)).toBeInTheDocument();
  });

  it("renders all milestones", () => {
    render(<EngineeringJourney />);
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("renders milestone titles", () => {
    render(<EngineeringJourney />);
    expect(screen.getByText("Software Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    expect(screen.getByText("AI & Production Systems")).toBeInTheDocument();
    expect(screen.getByText("Scalable Products")).toBeInTheDocument();
  });
});
