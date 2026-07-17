import React from "react";
import { render, screen } from "@testing-library/react";
import Organizations from "../organizations";

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

describe("Organizations", () => {
  it("renders the section heading", () => {
    render(<Organizations />);
    expect(screen.getByText(/Organizations &/)).toBeInTheDocument();
  });

  it("renders organization names", () => {
    render(<Organizations />);
    expect(screen.getByText("ISHub - AAU")).toBeInTheDocument();
    expect(screen.getByText("INFOSA-2016")).toBeInTheDocument();
  });

  it("renders roles", () => {
    render(<Organizations />);
    expect(screen.getByText("Participant / Member")).toBeInTheDocument();
    expect(screen.getByText("Member")).toBeInTheDocument();
  });
});
