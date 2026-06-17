import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../utils/localStorage";

describe("localStorage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getLocalStorage", () => {
    it("returns stored value", () => {
      localStorage.setItem("test", JSON.stringify("hello"));
      expect(getLocalStorage("test")).toBe("hello");
    });

    it("returns fallback when key does not exist", () => {
      expect(getLocalStorage("missing", "default")).toBe("default");
    });

    it("returns null when no fallback", () => {
      expect(getLocalStorage("missing")).toBeNull();
    });

    it("returns fallback on invalid JSON", () => {
      localStorage.setItem("bad", "{invalid json");
      expect(getLocalStorage("bad", "fallback")).toBe("fallback");
    });
  });

  describe("setLocalStorage", () => {
    it("stores a value", () => {
      setLocalStorage("key", "value");
      expect(JSON.parse(localStorage.getItem("key"))).toBe("value");
    });

    it("stores objects", () => {
      setLocalStorage("obj", { a: 1 });
      expect(getLocalStorage("obj")).toEqual({ a: 1 });
    });
  });

  describe("removeLocalStorage", () => {
    it("removes a key", () => {
      localStorage.setItem("toRemove", "data");
      removeLocalStorage("toRemove");
      expect(localStorage.getItem("toRemove")).toBeNull();
    });
  });
});
