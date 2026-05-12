import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageCircle, Package, CreditCard, Users2, Sparkles } from "lucide-react";

const cards = [
  {
    title: "Pages",
    description: "Create and publish landing pages for your website.",
    href: "/admin/pages",
    icon: FileText,
  },
  {
    title: "Posts",
    description: "Publish news, updates, and stories for your audience.",
    href: "/admin/posts",
    icon: MessageCircle,
  },
  {
    title: "Campaigns",
    description: "Launch fundraising campaigns and track progress.",
    href: "/admin/campaigns",
    icon: CreditCard,
  },
  {
    title: "Inventory",
    description: "Track supplies and operational stock across projects.",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Users",
    description: "Review team access and assign roles.",
    href: "/admin/users",
    icon: Users2,
  },
  {
    title: "Theme",
    description: "Customize colors, typography, and layout styles.",
    href: "/admin/theme",
    icon: Sparkles,
  },
];

export default function ContentHubPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Content Hub</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Centralized content controls for pages, posts, campaigns, and digital assets.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.href} className="group hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{card.title}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{card.description}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-6">
                <Link href={card.href} className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-500">
                  Open {card.title}
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
