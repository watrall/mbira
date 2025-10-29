"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bell, ChevronDown, CircleUser, Menu as MenuIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { signOutServerAction } from "@/lib/supabase/auth";
import { useAppStore } from "@/store/app-store";

import { findNavigationItem } from "./navigation.config";

type Breadcrumb = { label: string; href: string };

const buildBreadcrumbs = (pathname: string): Breadcrumb[] => {
  const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];
  const match = findNavigationItem(pathname);

  if (match && match.href !== "/") {
    crumbs.push({ label: match.label, href: match.href });
  }

  return crumbs;
};

export function TopBar() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);
  const { setSidebarOpen } = useAppStore((state) => state.actions);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-borderDivider bg-bgSidebar px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-borderDivider bg-white p-2 text-textSecondary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong lg:hidden"
          aria-label="Open navigation"
        >
          <MenuIcon className="size-4" aria-hidden="true" />
        </button>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <div key={crumb.href} className="flex items-center gap-2">
                <Link
                  href={crumb.href}
                  className={[
                    "text-caption font-medium transition",
                    isLast ? "text-textPrimary" : "text-textSecondary hover:text-textPrimary",
                  ].join(" ")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </Link>
                {!isLast ? (
                  <span className="text-caption text-systemNeutral" aria-hidden="true">
                    /
                  </span>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden items-center gap-2 rounded-md border border-borderDivider bg-white px-3 py-2 text-caption font-medium text-textSecondary shadow-sm transition hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-bgSidebar sm:flex"
          aria-label="Open command palette"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">Search</span>
          <kbd className="rounded border border-borderDivider bg-bgContent px-1.5 py-1 text-[10px] font-semibold text-textSecondary">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-borderDivider bg-white p-2 text-textSecondary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          aria-label="View notifications"
        >
          <Bell className="size-4" aria-hidden="true" />
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="inline-flex items-center gap-2 rounded-full border border-borderDivider bg-white px-2.5 py-1.5 text-body font-medium text-textPrimary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-strong text-white">
              <CircleUser className="size-5" aria-hidden="true" />
            </span>
            <span className="hidden text-left sm:flex sm:flex-col">
              <span className="text-body font-semibold text-textPrimary">Alex Robertson</span>
              <span className="text-caption text-textSecondary">instance_admin</span>
            </span>
            <ChevronDown className="size-4 text-textSecondary" aria-hidden="true" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-borderDivider bg-white py-2 shadow-lg focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={[
                    "flex items-center gap-2 px-3 py-2 text-body transition",
                    active ? "bg-accent-surface text-accent-strong" : "text-textSecondary",
                  ].join(" ")}
                >
                  Profile
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  href="/settings/instance"
                  className={[
                    "flex items-center gap-2 px-3 py-2 text-body transition",
                    active ? "bg-accent-surface text-accent-strong" : "text-textSecondary",
                  ].join(" ")}
                >
                  Instance settings
                </Link>
              )}
            </MenuItem>
            <div className="my-1 border-t border-borderDivider" role="separator" />
            <MenuItem>
              {({ active }) => (
                <form action={signOutServerAction} className="w-full">
                  <button
                    type="submit"
                    className={[
                      "flex w-full items-center gap-2 px-3 py-2 text-body transition",
                      active ? "bg-systemDanger/10 text-systemDanger" : "text-systemDanger",
                    ].join(" ")}
                  >
                    Sign out
                  </button>
                </form>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
