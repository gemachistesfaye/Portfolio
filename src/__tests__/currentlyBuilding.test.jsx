import React from "react";
import { render, screen } from "@testing-library/react";
import CurrentlyBuilding from "../currentlyBuilding";

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

describe("CurrentlyBuilding", () => {
  it("renders the section heading", () => {
    render(<CurrentlyBuilding />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Currently Building/);
  });

  it("renders all three projects", () => {
    render(<CurrentlyBuilding />);
    expect(screen.getByText("EduFlow")).toBeInTheDocument();
    expect(screen.getByText("LaundryFlow")).toBeInTheDocument();
    expect(screen.getByText("SmartHire AI")).toBeInTheDocument();
  });

  it("renders project categories", () => {
    render(<CurrentlyBuilding />);
    expect(screen.getByText("Education Platform")).toBeInTheDocument();
    expect(screen.getByText("Business Platform")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Recruitment Platform")).toBeInTheDocument();
  });
});
