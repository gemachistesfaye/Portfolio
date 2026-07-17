import React from "react";
import { render, screen } from "@testing-library/react";
import Experience from "../experience";

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

describe("Experience", () => {
  it("renders the experience heading", () => {
    render(<Experience />);
    expect(screen.getByText(/Experience &/)).toBeInTheDocument();
  });

  it("renders the FAQ heading", () => {
    render(<Experience />);
    expect(screen.getByText(/Frequently Asked/)).toBeInTheDocument();
  });

  it("renders FAQ items", () => {
    render(<Experience />);
    expect(screen.getByText(/How can you help/)).toBeInTheDocument();
  });

  it("renders experience entries", () => {
    render(<Experience />);
    expect(screen.getByText("Software Engineering Intern")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development Trainee")).toBeInTheDocument();
  });
});
