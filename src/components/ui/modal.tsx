"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-4 opacity-0"
            >
              <DialogPanel className="w-full max-w-lg rounded-xl border border-borderDivider bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <DialogTitle className="text-header font-semibold text-textPrimary">
                      {title}
                    </DialogTitle>
                    {description ? (
                      <p className="text-body text-textSecondary">{description}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="rounded-md border border-borderDivider p-2 text-textSecondary transition hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 space-y-4 text-body text-textSecondary">{children}</div>
                {(primaryAction || secondaryAction) && (
                  <div className="mt-6 flex justify-end gap-3">
                    {secondaryAction}
                    {primaryAction}
                  </div>
                )}
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
