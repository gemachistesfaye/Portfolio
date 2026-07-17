import { urlFor, urlForPreview, urlForBlur } from "../lib/sanity";

vi.mock("@sanity/client", () => ({
  createClient: vi.fn(() => ({})),
}));

vi.mock("@sanity/image-url", () => {
  const builder = {
    image: vi.fn().mockReturnThis(),
    auto: vi.fn().mockReturnThis(),
    width: vi.fn().mockReturnThis(),
    quality: vi.fn().mockReturnThis(),
    blur: vi.fn().mockReturnThis(),
    url: vi.fn().mockReturnValue("https://example.com/image.jpg"),
  };
  return {
    __esModule: true,
    default: vi.fn(() => builder),
  };
});

describe("urlFor", () => {
  it("returns empty string if source has no asset ref", () => {
    expect(urlFor({})).toBe("");
    expect(urlFor(null)).toBe("");
    expect(urlFor(undefined)).toBe("");
  });
});

describe("urlForPreview", () => {
  it("returns empty string if source has no asset ref", () => {
    expect(urlForPreview({})).toBe("");
  });
});

describe("urlForBlur", () => {
  it("returns empty string if source has no asset ref", () => {
    expect(urlForBlur({})).toBe("");
  });
});
