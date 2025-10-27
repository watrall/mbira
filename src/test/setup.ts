import { createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

type NextImageSrc = string | { src: string };

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...rest }: ComponentPropsWithoutRef<"img"> & { src: NextImageSrc }) =>
    createElement("img", {
      alt,
      src: typeof src === "string" ? src : (src as Extract<NextImageSrc, { src: string }>).src,
      ...rest,
    }),
}));
