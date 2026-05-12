"use client";

import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminBreadcrumbs } from "@/components/admin/breadcrumbs";
import {
  LayoutDashboard,
  Settings2,
  Users2,
  CreditCard,
  Package,
  MessageCircle,
  ChevronDown,
  LogOut,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";

const navSections = [
  {
    label: "Core",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/settings", label: "Settings", icon: Settings2 },
      { href: "/admin/theme", label: "Theme", icon: Sparkles },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/content", label: "Content hub", icon: Layers },
      { href: "/admin/pages", label: "Pages", icon: FileText },
      { href: "/admin/posts", label: "Posts", icon: MessageCircle },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/campaigns", label: "Donations", icon: CreditCard },
      { href: "/admin/inventory", label: "Inventory", icon: Package },
      { href: "/admin/users", label: "Users", icon: Users2 },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [supabase] = useState<SupabaseClient | null>(() =>
    typeof window !== "undefined" ? createSupabaseBrowserClient() : null
  );

  const handleSignOut = async () => {
    if (!supabase) {
      router.push("/login");
      return;
    }

    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col md:flex-row">
        <aside className="z-20 w-full border-b border-slate-800/80 bg-slate-950/95 px-4 py-4 backdrop-blur-md md:h-screen md:w-72 md:border-r md:border-b-0 md:px-5 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold tracking-tight">Aid Connect</p>
              <p className="text-sm text-slate-400">Admin dashboard</p>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 md:hidden"
              aria-label="Toggle menu"
            >
              <ChevronDown className={menuOpen ? "rotate-180 transition" : "transition"} size={18} />
            </button>
          </div>
          <nav className={`mt-8 transition-all md:block ${menuOpen ? "block" : "hidden"}`} aria-label="Admin navigation">
            {navSections.map((section) => (
              <div key={section.label} className="mb-6">
                <p className="px-4 pb-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                  {section.label}
                </p>
                <div className="grid gap-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={
                          "flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition " +
                          (active
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/30"
                            : "text-slate-400 hover:bg-slate-900/70 hover:text-white")
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-white">Theme mode</p>
                <p>Customize dashboard color</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["light", "dark", "system"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setTheme(option)}
                  className={
                    "rounded-2xl border px-3 py-2 text-xs transition " +
                    (theme === option
                      ? "border-slate-200 bg-slate-100 text-slate-950"
                      : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-white")
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <div className="border-b border-slate-200/70 bg-white/90 px-4 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95 md:px-6 md:py-5">
            <AdminBreadcrumbs />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
                <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">ERP Control Center</h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="secondary" onClick={() => router.push("/admin/settings")}> 
                  <Settings2 className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="text-slate-700 dark:text-slate-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 md:px-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
