"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const breadcrumbLabels: Record<string, string> = {
  admin: "Dashboard",
  settings: "Settings",
  users: "Users",
  pages: "Pages",
  posts: "Posts",
  inventory: "Inventory",
  campaigns: "Campaigns",
  theme: "Theme",
};

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
      <Link href="/admin" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = breadcrumbLabels[segment] ?? segment.replace(/-/g, " ");
        return (
          <span key={href} className="inline-flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {index === segments.length - 1 ? (
              <span className="font-semibold text-slate-900 dark:text-white">{label}</span>
            ) : (
              <Link href={href} className="hover:text-slate-900 dark:hover:text-white">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
