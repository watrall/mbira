import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal, type ModalProps } from "@/components/ui/modal";

type ModalStoryArgs = ModalProps & {
  triggerLabel?: string;
  showSecondaryAction?: boolean;
};

function ModalStory({
  triggerLabel,
  showSecondaryAction = true,
  onClose,
  ...args
}: ModalStoryArgs) {
  const [open, setOpen] = useState(args.open);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {triggerLabel ?? "Open modal"}
      </Button>
      <Modal
        {...args}
        open={open}
        onClose={handleClose}
        primaryAction={
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        }
        secondaryAction={
          showSecondaryAction ? (
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          ) : null
        }
      />
    </>
  );
}

const meta: Meta<ModalStoryArgs> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
  },
  render: (args) => <ModalStory {...args} />,
};

export default meta;
type Story = StoryObj<ModalStoryArgs>;

const defaultContent: Pick<ModalStoryArgs, "title" | "description" | "children"> = {
  title: "Schedule publishing",
  description: "Define when this exhibit should go live for authors and reviewers.",
  children: (
    <div className="space-y-4">
      <p>
        Publish windows propagate to linked explorations, and everything stays reversible until the
        final go-live date.
      </p>
      <p>
        Use the instance dashboard to monitor scheduled releases and roll back to draft if you need
        more review time.
      </p>
    </div>
  ),
};

export const Default: Story = {
  args: {
    open: false,
    showSecondaryAction: true,
    ...defaultContent,
  },
};

export const WithoutSecondaryAction: Story = {
  args: {
    open: false,
    showSecondaryAction: false,
    triggerLabel: "Open minimal modal",
    ...defaultContent,
    description: "Streamlined modals can hide the secondary action when there is only one choice.",
  },
};
