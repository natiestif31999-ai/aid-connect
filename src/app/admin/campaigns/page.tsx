"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { formatCurrency, slugify } from "@/lib/format";

const statuses = ["active", "paused", "completed"] as const;

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    goal_amount: 0,
    raised_amount: 0,
    status: "active",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: "",
    description: "",
    cover_url: "",
  });

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  const loadCampaigns = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      toast.error("Unable to load campaigns.");
      return;
    }

    setCampaigns(data ?? []);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const saveCampaign = async () => {
    if (!supabase) return;
    if (!form.title) {
      toast.error("Campaign title is required.");
      return;
    }
    setSaving(true);
    const record = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      goal_amount: form.goal_amount,
      raised_amount: form.raised_amount,
      status: form.status,
      start_date: form.start_date,
      end_date: form.end_date || null,
      description: form.description,
      cover_url: form.cover_url,
      created_by: "",
    };
    const { error } = await supabase.from("campaigns").insert(record);
    setSaving(false);

    if (error) {
      toast.error("Unable to create campaign.");
      return;
    }

    toast.success("Campaign created successfully.");
    setForm({
      title: "",
      slug: "",
      goal_amount: 0,
      raised_amount: 0,
      status: "active",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: "",
      description: "",
      cover_url: "",
    });
    loadCampaigns();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Donation campaigns</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Build fundraising campaigns, set targets, and monitor progress from one place.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Campaign</TableHeader>
                <TableHeader>Goal</TableHeader>
                <TableHeader>Raised</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    Loading campaigns...
                  </TableCell>
                </TableRow>
              ) : campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    No campaigns created yet.
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>{formatCurrency(Number(campaign.goal_amount))}</TableCell>
                    <TableCell>{formatCurrency(Number(campaign.raised_amount))}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Create campaign</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((current) => ({ ...current, title: e.target.value, slug: current.slug || slugify(e.target.value) }))
                }
                placeholder="Emergency healthcare drive"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: slugify(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Goal amount</label>
              <Input
                type="number"
                value={form.goal_amount}
                onChange={(e) => setForm((current) => ({ ...current, goal_amount: Number(e.target.value) }))}
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Raised amount</label>
              <Input
                type="number"
                value={form.raised_amount}
                onChange={(e) => setForm((current) => ({ ...current, raised_amount: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={form.status} onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start date</label>
              <Input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((current) => ({ ...current, start_date: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End date</label>
              <Input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm((current) => ({ ...current, end_date: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
            placeholder="Describe the campaign focus and beneficiary groups."
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={saveCampaign} disabled={saving}>
            {saving ? "Creating..." : "Create campaign"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
