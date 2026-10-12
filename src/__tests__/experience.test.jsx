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
    expect(screen.getByText(/Professional/)).toBeInTheDocument();
  });

  it("renders experience entries", () => {
    render(<Experience />);
    expect(screen.getByText("Full-Stack Engineering Intern (On-site)")).toBeInTheDocument();
    expect(screen.getByText(/BSc in Information Science/)).toBeInTheDocument();
  });
});
