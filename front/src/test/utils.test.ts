import { cn } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      expect(cn("class1", true && "class2", false && "class3")).toBe("class1 class2");
    });

    it("should merge Tailwind classes correctly", () => {
      const out = cn("px-2 py-1", "px-4");
      expect(out).toContain("px-4");
      expect(out).toContain("py-1");
    });

    it("should handle empty inputs", () => {
      expect(cn()).toBe("");
      expect(cn("", "class1", "")).toBe("class1");
    });

    it("should handle array inputs", () => {
      expect(cn(["class1", "class2"])).toBe("class1 class2");
    });
  });
});