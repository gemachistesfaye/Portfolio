import React from "react";
import { render, screen } from "@testing-library/react";
import Project from "../project";

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

describe("Project", () => {
  it("renders the section heading", () => {
    render(<Project />);
    expect(screen.getAllByText("Featured").length).toBeGreaterThan(0);
  });

  it("renders the first project", () => {
    render(<Project />);
    expect(screen.getAllByText("Sheger Health Connect").length).toBeGreaterThan(0);
  });

  it("renders navigation buttons", () => {
    render(<Project />);
    expect(screen.getByRole("button", { name: /previous project/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next project/i })).toBeInTheDocument();
  });

  it("renders dot indicators", () => {
    render(<Project />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(5);
  });

  it("renders demo and github links", () => {
    render(<Project />);
    expect(screen.getByLabelText(/View live demo of Sheger Health Connect/)).toBeInTheDocument();
    expect(screen.getByLabelText(/View source code of Sheger Health Connect/)).toBeInTheDocument();
  });
});
