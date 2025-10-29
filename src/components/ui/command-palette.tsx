"use client";

import { Combobox, Dialog, DialogPanel, Transition } from "@headlessui/react";
import Fuse from "fuse.js";
import { Command } from "lucide-react";
import { Fragment, useMemo, useState } from "react";

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  action: () => void;
};

export interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ items, open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const onChange = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["label", "description"],
        threshold: 0.4,
      }),
    [items],
  );

  const filteredItems = query ? fuse.search(query).map((result) => result.item) : items;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={onChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="mx-auto flex w-full max-w-xl items-start justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-4 opacity-0"
            >
              <DialogPanel className="w-full rounded-xl border border-borderDivider bg-white shadow-xl">
                <Combobox
                  onChange={(item: CommandItem | null) => {
                    if (!item) return;
                    onChange(false);
                    item.action();
                    setQuery("");
                  }}
                >
                  <div className="flex items-center gap-3 border-b border-borderDivider px-4 py-3">
                    <Command className="size-4 text-accent-strong" aria-hidden="true" />
                    <Combobox.Input
                      autoFocus
                      className="w-full border-none bg-transparent text-body text-textPrimary outline-none placeholder:text-textSecondary"
                      placeholder="Search actions…"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <kbd className="rounded border border-borderDivider bg-bgContent px-1.5 py-1 text-[10px] font-semibold text-textSecondary">
                      Esc
                    </kbd>
                  </div>
                  <Combobox.Options static className="max-h-64 overflow-y-auto px-2 py-3">
                    {filteredItems.length === 0 ? (
                      <p className="px-3 py-2 text-caption text-textSecondary">No results found.</p>
                    ) : (
                      filteredItems.map((item) => (
                        <Combobox.Option
                          key={item.id}
                          value={item}
                          className={({ active }) =>
                            [
                              "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-body transition",
                              active
                                ? "bg-accent-surface text-accent-strong"
                                : "text-textSecondary hover:bg-accent-surface hover:text-accent-strong",
                            ].join(" ")
                          }
                        >
                          {({ active }) => (
                            <>
                              <div>
                                <p className="font-medium">{item.label}</p>
                                {item.description ? (
                                  <p className="text-caption text-textSecondary">
                                    {item.description}
                                  </p>
                                ) : null}
                              </div>
                              {item.shortcut ? (
                                <kbd
                                  className={[
                                    "rounded border px-1.5 py-0.5 text-[10px]",
                                    active
                                      ? "border-accent-strong text-accent-strong"
                                      : "border-borderDivider text-textSecondary",
                                  ].join(" ")}
                                >
                                  {item.shortcut}
                                </kbd>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Combobox>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function useCommandPalette(items: CommandItem[]) {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    CommandPalette: () => <CommandPalette items={items} open={open} onOpenChange={setOpen} />,
  };
}
