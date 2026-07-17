import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../contact";

vi.mock("react-intersection-observer", () => {
  const mockRef = { current: null };
  const useInView = () => [mockRef, true, { isIntersecting: true }];
  useInView.mockImplementation = () => [mockRef, true, { isIntersecting: true }];
  return {
    __esModule: true,
    default: useInView,
    useInView,
    InView: ({ children }) => children({ inView: true, ref: mockRef }),
  };
});

describe("Contact", () => {
  it("renders the contact heading", () => {
    render(<Contact />);
    expect(screen.getByText(/Let's Build/)).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Abebe Kebede/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/abebe@example.com/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell me about your project/)).toBeInTheDocument();
  });

  it("renders the send button", () => {
    render(<Contact />);
    expect(screen.getByRole("button", { name: /send project brief/i })).toBeInTheDocument();
  });

  it("renders response time info", () => {
    render(<Contact />);
    expect(screen.getByText("Within 24 hours")).toBeInTheDocument();
  });

  it("renders helper text about quick inquiry", () => {
    render(<Contact />);
    expect(screen.getByText(/quick questions/i)).toBeInTheDocument();
  });
});
