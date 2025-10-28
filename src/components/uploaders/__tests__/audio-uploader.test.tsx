import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AudioUploader } from "../audio-uploader";
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

describe("AudioUploader", () => {
  beforeEach(() => {
    uploadMock.mockResolvedValue({ data: { path: "audio/test.mp3" }, error: null });
    createSignedUrlMock.mockResolvedValue({ data: { signedUrl: "https://cdn.test/audio.mp3" } });
    removeMock.mockResolvedValue({ data: null, error: null });
    vi.spyOn(URL, "createObjectURL").mockReturnValue("local-preview://audio");
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

  it("uploads audio and shows preview", async () => {
    render(
      <UploadProvider value={{ bucket: "audio" }}>
        <AudioUploader />
      </UploadProvider>,
    );

    const file = new File(["audio"], "clip.mp3", { type: "audio/mpeg" });
    const input = screen.getByTestId("audio-input") as HTMLInputElement;
    await userEvent.upload(input, file);

    await waitFor(() => expect(uploadMock).toHaveBeenCalled());
    expect(screen.getByTestId("audio-preview")).toBeInTheDocument();
  });
});
