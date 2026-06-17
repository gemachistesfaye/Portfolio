import React from "react";
import { render, screen } from "@testing-library/react";
import SectionHeading from "../components/SectionHeading";

describe("SectionHeading", () => {
  it("renders label", () => {
    render(<SectionHeading label="Services" title="What I Can Build" highlight="For You" />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders title with highlight", () => {
    render(<SectionHeading label="Test" title="Hello" highlight="World" />);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<SectionHeading label="Test" title="Hello" highlight="World" description="This is a description" />);
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<SectionHeading label="Test" title="Hello" highlight="World" />);
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });
});
