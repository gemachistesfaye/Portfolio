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
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Organizations &/);
  });

  it("renders organization names", () => {
    render(<Organizations />);
    expect(screen.getByText("ISHub AAU")).toBeInTheDocument();
    expect(screen.getByText("INFOSA")).toBeInTheDocument();
  });

  it("renders roles", () => {
    render(<Organizations />);
    expect(screen.getByText("Frontend Development Community")).toBeInTheDocument();
    expect(screen.getByText("Information Science Community")).toBeInTheDocument();
  });
});
