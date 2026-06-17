import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../contact";

jest.mock("react-intersection-observer", () => {
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
    expect(screen.getByText(/Let's Build Something/)).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell me about your project...")).toBeInTheDocument();
  });

  it("renders the send button", () => {
    render(<Contact />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Contact />);
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });

  it("renders response time info", () => {
    render(<Contact />);
    expect(screen.getByText("Within 24 hours")).toBeInTheDocument();
  });
});
