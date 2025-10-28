import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Command,
  FileBox,
  FileText,
  FolderKanban,
  Home,
  Image as ImageIcon,
  Layers,
  Map,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
};

export type NavigationSection = {
  id: "instance" | "project";
  title: string;
  description: string;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    id: "instance",
    title: "Instance",
    description: "Manage global resources, membership, and moderation.",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "My Projects", href: "/projects", icon: FolderKanban },
      { label: "User Management", href: "/users", icon: Users },
      { label: "Global Media", href: "/media/global", icon: ImageIcon },
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Conversations", href: "/conversations", icon: MessageSquare },
      { label: "Data Export", href: "/data-export", icon: FileBox },
      { label: "Instance Settings", href: "/settings/instance", icon: Settings },
    ],
  },
  {
    id: "project",
    title: "Project",
    description: "Author content, manage assets, and configure visibility.",
    items: [
      { label: "Dashboard", href: "/projects/current", icon: Layers },
      { label: "Locations", href: "/projects/current/locations", icon: Map },
      { label: "Exhibits", href: "/projects/current/exhibits", icon: BookOpen },
      { label: "Explorations", href: "/projects/current/explorations", icon: Command },
      { label: "Project Media", href: "/projects/current/media", icon: ImageIcon },
      { label: "Notifications", href: "/projects/current/notifications", icon: Bell },
      { label: "Conversations", href: "/projects/current/conversations", icon: MessageSquare },
      {
        label: "Project Settings",
        href: "/projects/current/settings",
        icon: Settings,
      },
      {
        label: "Front-End Connection",
        href: "/projects/current/settings/front-end",
        icon: FileText,
        badge: "Beta",
      },
    ],
  },
];

export const findNavigationItem = (pathname: string): NavigationItem | undefined =>
  navigationSections
    .flatMap((section) => section.items)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
