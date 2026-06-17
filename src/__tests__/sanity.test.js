import { urlFor, urlForPreview, urlForBlur } from "../lib/sanity";


jest.mock("@sanity/client", () => ({
  createClient: jest.fn(() => ({})),
}));

jest.mock("@sanity/image-url", () => {
  const builder = {
    image: jest.fn().mockReturnThis(),
    auto: jest.fn().mockReturnThis(),
    width: jest.fn().mockReturnThis(),
    quality: jest.fn().mockReturnThis(),
    blur: jest.fn().mockReturnThis(),
    url: jest.fn().mockReturnValue("https://example.com/image.jpg"),
  };
  return {
    __esModule: true,
    default: jest.fn(() => builder),
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
