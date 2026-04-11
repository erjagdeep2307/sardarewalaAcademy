import { describe, expect, it } from "vitest";
import { cn, slugify } from "./utility";

describe("utility helpers", () => {
  it("creates clean URL slugs from human text", () => {
    expect(slugify("  Army Training Camp 2026!  ")).toBe("army-training-camp-2026");
  });

  it("merges tailwind classes predictably", () => {
    expect(cn("px-2 py-1", "px-4", undefined, "text-white")).toBe("py-1 px-4 text-white");
  });
});
