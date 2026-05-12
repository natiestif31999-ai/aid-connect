"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const statuses = ["in_stock", "low_stock", "out_of_stock"] as const;

export default function InventoryPage() {
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    status: "in_stock",
    location: "",
    description: "",
  });

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  const loadItems = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("inventory").select("*").order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      toast.error("Unable to load inventory.");
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async () => {
    if (!supabase) return;
    if (!form.name) {
      toast.error("Item name is required.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("inventory").insert({
      name: form.name,
      sku: form.sku,
      category: form.category,
      quantity: form.quantity,
      status: form.status,
      location: form.location,
      description: form.description,
    });
    setSaving(false);

    if (error) {
      toast.error("Unable to create inventory item.");
      return;
    }

    toast.success("Inventory item created.");
    setForm({ name: "", sku: "", category: "", quantity: 0, status: "in_stock", location: "", description: "" });
    loadItems();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Track supplies, stock levels, and storage locations across your NGO operations.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>SKU</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                    Loading inventory...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                    No inventory items yet.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sku ?? "—"}</TableCell>
                    <TableCell>{item.category ?? "General"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Add inventory item</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Item name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                placeholder="First aid kit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <Input
                value={form.sku}
                onChange={(e) => setForm((current) => ({ ...current, sku: e.target.value }))}
                placeholder="KIT-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                value={form.category}
                onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
                placeholder="Medical"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm((current) => ({ ...current, quantity: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select
                value={form.status}
                onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={form.location}
                onChange={(e) => setForm((current) => ({ ...current, location: e.target.value }))}
                placeholder="Central warehouse"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
            placeholder="Notes about this inventory item."
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={saveItem} disabled={saving}>
            {saving ? "Saving..." : "Add inventory"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
