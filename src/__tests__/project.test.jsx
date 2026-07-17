import React from "react";
import { render, screen } from "@testing-library/react";
import Project from "../project";

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

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Project", () => {
  it("renders the section heading", () => {
    render(<Project />);
    expect(screen.getAllByText("Featured").length).toBeGreaterThan(0);
  });

  it("renders projects", () => {
    render(<Project />);
    expect(screen.getAllByText("Sheger Health Connect").length).toBeGreaterThan(0);
  });

  it("renders filter categories", () => {
    render(<Project />);
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("renders project cards with links", () => {
    render(<Project />);
    expect(screen.getAllByText(/Live Demo/).length).toBeGreaterThan(0);
  });
});
