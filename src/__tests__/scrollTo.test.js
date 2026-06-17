import { scrollToSection, scrollToTop } from "../utils/scrollTo";

describe("scrollToSection", () => {
  it("scrolls to element with given id", () => {
    const el = document.createElement("div");
    el.id = "test-section";
    document.body.appendChild(el);
    el.scrollIntoView = jest.fn();
    scrollToSection("test-section");
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("does not throw if element does not exist", () => {
    expect(() => scrollToSection("nonexistent")).not.toThrow();
  });
});

describe("scrollToTop", () => {
  it("scrolls to top", () => {
    window.scrollTo = jest.fn();
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
