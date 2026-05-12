"use client";

import { useState } from "react";
import { ArrowUpRight, Activity, CreditCard, Users2, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activityData = [
  { name: "Week 1", value: 420 },
  { name: "Week 2", value: 520 },
  { name: "Week 3", value: 690 },
  { name: "Week 4", value: 780 },
];

const donationData = [
  { name: "Education", value: 370 },
  { name: "Healthcare", value: 520 },
  { name: "Relief", value: 450 },
  { name: "Community", value: 620 },
];

export default function AdminPage() {
  const [mounted] = useState(true);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-slate-950 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400/80">Overview</p>
              <h2 className="mt-4 text-3xl font-semibold">Your NGO ERP Dashboard</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Monitor donations, volunteers, inventory, and website performance from a single admin panel.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-4 text-slate-200 shadow-lg shadow-slate-950/30">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Monthly donors</p>
              <p className="mt-3 text-4xl font-semibold">1,248</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Campaign revenue</p>
              <p className="mt-3 text-4xl font-semibold">$84.2k</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Active campaigns</p>
              <p className="mt-3 text-3xl font-semibold">14</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Inventory items</p>
              <p className="mt-3 text-3xl font-semibold">318</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary">View reports</Button>
            <Button>Manage campaigns</Button>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="overflow-hidden p-0">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-5 text-white">
              <p className="text-sm uppercase tracking-[0.24em]">Quick actions</p>
              <h3 className="mt-2 text-2xl font-semibold">Launch new campaign</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500">
                Create editable donation campaigns, set goals, and track progress in real time.
              </p>
              <Button className="mt-5 inline-flex items-center gap-2">
                Add campaign <ArrowUpRight size={16} />
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="bg-slate-950 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Live metrics</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Volunteer pulse</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500">Track volunteer activity and support requests with snapshots for the last 30 days.</p>
              <div className="mt-6 h-[260px]">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                    <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#94a3b8" />
                      <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
                      <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#38bdf8" fill="url(#colorValue)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    Loading chart...
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Total donors", value: "6,412", icon: Users2 },
          { title: "Open tasks", value: "42", icon: Activity },
          { title: "Successful donations", value: "278", icon: CreditCard },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="space-y-4">
              <div className="flex items-center justify-between gap-3 text-slate-500">
                <p className="text-sm uppercase tracking-[0.24em]">{item.title}</p>
                <Icon className="h-5 w-5 text-sky-500" />
              </div>
              <p className="text-4xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Donation distribution</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Campaign category performance</h3>
            </div>
            <div className="rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Weekly update
            </div>
          </div>
          <div className="mt-6 h-[310px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={310}>
                <BarChart data={donationData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#64748b" />
                  <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Loading chart...
              </div>
            )}
          </div>
        </Card>
        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Announcements</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Today’s quick brief</h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/80">
              <p className="font-medium text-slate-900 dark:text-white">New volunteer onboarding</p>
              <p className="mt-2">5 volunteers were registered and assigned to the community health campaign.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/80">
              <p className="font-medium text-slate-900 dark:text-white">Inventory update</p>
              <p className="mt-2">Supplies inventory is stable, but medical kits are low in the central warehouse.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
