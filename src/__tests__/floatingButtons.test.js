import React from "react";
import { render, screen } from "@testing-library/react";
import FloatingButtons from "../floatingButtons";

jest.mock("react-intersection-observer", () => {
  const mockRef = { current: null };
  const useInView = () => [mockRef, true, { isIntersecting: true }];
  return {
    __esModule: true,
    default: useInView,
    useInView,
    InView: ({ children }) => children({ inView: true, ref: mockRef }),
  };
});

describe("FloatingButtons", () => {
  it("renders the Hire Me button", () => {
    render(<FloatingButtons />);
    expect(screen.getByText("Hire Me")).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<FloatingButtons />);
    const button = screen.getByRole("button", { name: /hold to scroll/i });
    expect(button).toBeInTheDocument();
  });
});
