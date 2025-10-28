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
  match?: string;
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
      { label: "Overview", href: "/instance", icon: Home },
      { label: "My Projects", href: "/instance/projects", icon: FolderKanban },
      { label: "User Management", href: "/instance/users", icon: Users },
      { label: "Global Media", href: "/instance/media", icon: ImageIcon },
      { label: "Notifications", href: "/instance/notifications", icon: Bell },
      { label: "Conversations", href: "/instance/conversations", icon: MessageSquare },
      { label: "Data Export", href: "/instance/data-export", icon: FileBox },
      { label: "Instance Settings", href: "/instance/settings/general", icon: Settings },
    ],
  },
  {
    id: "project",
    title: "Project",
    description: "Author content, manage assets, and configure visibility.",
    items: [
      { label: "Dashboard", href: "/projects/demo", icon: Layers, match: "/projects/:projectId" },
      {
        label: "Locations",
        href: "/projects/demo/locations",
        icon: Map,
        match: "/projects/:projectId/locations",
      },
      {
        label: "Exhibits",
        href: "/projects/demo/exhibits",
        icon: BookOpen,
        match: "/projects/:projectId/exhibits",
      },
      {
        label: "Explorations",
        href: "/projects/demo/explorations",
        icon: Command,
        match: "/projects/:projectId/explorations",
      },
      {
        label: "Project Media",
        href: "/projects/demo/media",
        icon: ImageIcon,
        match: "/projects/:projectId/media",
      },
      {
        label: "Notifications",
        href: "/projects/demo/notifications",
        icon: Bell,
        match: "/projects/:projectId/notifications",
      },
      {
        label: "Conversations",
        href: "/projects/demo/conversations",
        icon: MessageSquare,
        match: "/projects/:projectId/conversations",
      },
      {
        label: "Project Settings",
        href: "/projects/demo/settings/general",
        icon: Settings,
        match: "/projects/:projectId/settings/general",
      },
      {
        label: "Team",
        href: "/projects/demo/settings/team",
        icon: Users,
        match: "/projects/:projectId/settings/team",
      },
      {
        label: "Front-End Connection",
        href: "/projects/demo/settings/front-end",
        icon: FileText,
        badge: "Beta",
        match: "/projects/:projectId/settings/front-end",
      },
    ],
  },
];

const matchPath = (pattern: string, pathname: string) => {
  const normalized = pattern.replace(/:[^/]+/g, "[^/]+");
  const regex = new RegExp(`^${normalized}(?:/.*)?$`);
  return regex.test(pathname);
};

export const findNavigationItem = (pathname: string): NavigationItem | undefined =>
  navigationSections
    .flatMap((section) => section.items)
    .find((item) => {
      if (item.match) {
        return matchPath(item.match, pathname);
      }
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    });
