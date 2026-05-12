"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { slugify } from "@/lib/format";

export default function PagesPage() {
  const [pages, setPages] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
    seo_title: "",
    seo_description: "",
  });

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  const loadPages = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("pages").select("*").order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      toast.error("Unable to load pages.");
      return;
    }

    setPages(data ?? []);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSelectPage = (page: any) => {
    setSelectedPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      excerpt: page.excerpt ?? "",
      content: typeof page.content === "string" ? page.content : JSON.stringify(page.content || ""),
      status: page.status,
      seo_title: page.seo_title ?? "",
      seo_description: page.seo_description ?? "",
    });
  };

  const handleCreatePage = () => {
    setSelectedPage(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", status: "draft", seo_title: "", seo_description: "" });
  };

  const savePage = async () => {
    if (!supabase) return;
    if (!form.title) {
      toast.error("Page title is required.");
      return;
    }
    setSaving(true);
    const record = {
      id: selectedPage?.id,
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      status: form.status,
      seo_title: form.seo_title,
      seo_description: form.seo_description,
      author_id: selectedPage?.author_id ?? "",
    };
    const { error } = await supabase.from("pages").upsert(record, { onConflict: "id" });
    setSaving(false);

    if (error) {
      toast.error("Unable to save page.");
      return;
    }

    toast.success("Page saved successfully.");
    loadPages();
    handleCreatePage();
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Pages</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Build and publish CMS pages for the Aid Connect website.
            </p>
          </div>
          <Button onClick={handleCreatePage}>New page</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Page content</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select a page to edit or create a new page that will be available from the frontend.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Slug</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Updated</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    Loading pages...
                  </TableCell>
                </TableRow>
              ) : pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    No pages have been created yet.
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <button
                        type="button"
                        className="font-medium text-slate-900 hover:text-sky-600 dark:text-slate-100"
                        onClick={() => handleSelectPage(page)}
                      >
                        {page.title}
                      </button>
                    </TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>{page.status}</TableCell>
                    <TableCell>{new Date(page.updated_at ?? page.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{selectedPage ? "Edit page" : "Create a new page"}</h2>
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
                placeholder="How we help communities"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: slugify(e.target.value) }))} placeholder="how-we-help-communities" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Textarea value={form.excerpt} onChange={(e) => setForm((current) => ({ ...current, excerpt: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea value={form.content} onChange={(e) => setForm((current) => ({ ...current, content: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SEO title</label>
              <Input
                value={form.seo_title}
                onChange={(e) => setForm((current) => ({ ...current, seo_title: e.target.value }))}
                placeholder="Aid Connect | Community development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO description</label>
              <Textarea
                value={form.seo_description}
                onChange={(e) => setForm((current) => ({ ...current, seo_description: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={form.status}
                onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="secondary" onClick={handleCreatePage}>
                Clear
              </Button>
              <Button onClick={savePage} disabled={saving}>
                {saving ? "Saving..." : "Save page"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
