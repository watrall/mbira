import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ImageUploader } from "../image-uploader";
import { UploadProvider } from "../upload-context";

const uploadMock = vi.fn();
const removeMock = vi.fn();
const createSignedUrlMock = vi.fn();
const pushToastMock = vi.fn();
const dismissToastMock = vi.fn();

vi.mock("@/store/app-store", async () => {
  const actual = (await vi.importActual("@/store/app-store")) as Record<string, unknown>;
  return {
    ...actual,
    useAppStore: (selector: any) =>
      selector({
        session: null,
        actions: {
          pushToast: pushToastMock,
          dismissToast: dismissToastMock,
        },
      }),
  };
});

vi.mock("@/lib/uploaders/storage", () => ({
  createStorageClient: () => ({
    storage: {
      from: () => ({
        upload: uploadMock,
        createSignedUrl: createSignedUrlMock,
        remove: removeMock,
      }),
    },
  }),
}));

describe("ImageUploader", () => {
  beforeEach(() => {
    uploadMock.mockResolvedValue({ data: { path: "images/test.png" }, error: null });
    createSignedUrlMock.mockResolvedValue({ data: { signedUrl: "https://cdn.test/image.png" } });
    removeMock.mockResolvedValue({ data: null, error: null });
    vi.spyOn(URL, "createObjectURL").mockReturnValue("local-preview://image");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
  });

  afterEach(() => {
    uploadMock.mockReset();
    removeMock.mockReset();
    createSignedUrlMock.mockReset();
    pushToastMock.mockReset();
    dismissToastMock.mockReset();
    vi.restoreAllMocks();
  });

  it("uploads dropped file", async () => {
    const onUploaded = vi.fn();
    render(
      <UploadProvider value={{ bucket: "images" }}>
        <ImageUploader onUploaded={onUploaded} />
      </UploadProvider>,
    );

    const file = new File(["image"], "photo.png", { type: "image/png" });
    const input = screen.getByTestId("image-input") as HTMLInputElement;
    await userEvent.upload(input, file);

    await waitFor(() => expect(uploadMock).toHaveBeenCalled());
    expect(onUploaded).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /replace/i })).toBeInTheDocument();
  });
});
