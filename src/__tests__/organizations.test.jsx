import React from "react";
import { render, screen } from "@testing-library/react";
import DeveloperActivity from "../developerActivity";

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

describe("DeveloperActivity", () => {
  it("renders the section heading", () => {
    render(<DeveloperActivity />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Developer/);
  });

  it("renders community names", () => {
    render(<DeveloperActivity />);
    expect(screen.getByText("ISHub AAU")).toBeInTheDocument();
    expect(screen.getByText("INFOSA")).toBeInTheDocument();
  });

  it("renders GitHub profile link", () => {
    render(<DeveloperActivity />);
    expect(screen.getByText("View GitHub Profile")).toBeInTheDocument();
  });
});
