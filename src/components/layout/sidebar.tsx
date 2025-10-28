"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef } from "react";

import { useAppStore } from "@/store/app-store";

import type { NavigationItem, NavigationSection } from "./navigation.config";
import { navigationSections } from "./navigation.config";

const logoSrc = "/assets/mbira-logo.svg";

const isActive = (pathname: string, item: NavigationItem) =>
  pathname === item.href || pathname.startsWith(`${item.href}/`);

function NavigationList({ section, pathname }: { section: NavigationSection; pathname: string }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-caption font-semibold uppercase tracking-[0.16em] text-systemNeutral">
          {section.title}
        </p>
        <p className="text-caption text-textSecondary">{section.description}</p>
      </div>
      <ul className="space-y-1" role="list">
        {section.items.map((item) => {
          const active = isActive(pathname, item);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  "group flex items-center gap-3 rounded-md px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bgSidebar",
                  active
                    ? "bg-accent/10 text-accent shadow-sm"
                    : "text-textSecondary hover:bg-bgContent hover:text-textPrimary",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <item.icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="flex-1 text-body font-medium">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-caption font-medium text-accent">
                    {item.badge}
                  </span>
                ) : null}
                <ArrowUpRight
                  className="size-3 text-transparent transition group-hover:text-accent"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useAppStore((state) => state.ui.sidebarOpen);
  const { setSidebarOpen } = useAppStore((state) => state.actions);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const sections = useMemo(() => navigationSections, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  return (
    <>
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={() => setSidebarOpen(false)}
          initialFocus={closeButtonRef}
        >
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

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col overflow-y-auto border-r border-borderDivider bg-bgSidebar px-5 py-6 shadow-xl">
              <DialogTitle className="sr-only">Navigation</DialogTitle>
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <Image src={logoSrc} alt="mbira" width={120} height={36} priority />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex items-center justify-center rounded-md border border-borderDivider bg-white p-2 text-textSecondary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close navigation"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 space-y-6">
                {sections.map((section) => (
                  <NavigationList key={section.id} section={section} pathname={pathname} />
                ))}
              </div>
            </DialogPanel>
          </Transition.Child>
        </Dialog>
      </Transition>

      <aside
        aria-label="Primary navigation"
        className="hidden w-72 flex-col gap-6 border-r border-borderDivider bg-bgSidebar px-6 py-8 lg:flex"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoSrc}
            alt="mbira"
            width={140}
            height={44}
            priority
            className="h-auto w-36"
          />
        </Link>
        <div className="space-y-7">
          {sections.map((section) => (
            <NavigationList key={section.id} section={section} pathname={pathname} />
          ))}
        </div>
      </aside>
    </>
  );
}
