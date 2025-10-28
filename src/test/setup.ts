import { createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

type NextImageSrc = string | { src: string };
type MockImageProps = ComponentPropsWithoutRef<"img"> & {
  src: NextImageSrc;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, priority: _priority, ...rest }: MockImageProps) =>
    createElement("img", {
      alt,
      src: typeof src === "string" ? src : (src as Extract<NextImageSrc, { src: string }>).src,
      ...rest,
    }),
}));

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  // @ts-expect-error jsdom environment
  window.ResizeObserver = ResizeObserverMock;
}
