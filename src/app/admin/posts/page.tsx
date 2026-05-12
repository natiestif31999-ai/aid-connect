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
import { slugify } from "@/lib/format";

export default function PostsPage() {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_url: "",
    status: "draft",
    category_id: "",
    seo_title: "",
    seo_description: "",
  });

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  const loadData = async () => {
    if (!supabase) return;
    setLoading(true);
    const [{ data: postsData, error: postsError }, { data: categoryData, error: categoryError }] = await Promise.all([
      supabase.from("posts").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id,name"),
    ]);
    setLoading(false);

    if (postsError || categoryError) {
      toast.error("Unable to load blog data.");
      return;
    }

    setPosts(postsData ?? []);
    setCategories(categoryData ?? []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectPost = (post: any) => {
    setSelectedPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: typeof post.content === "string" ? post.content : JSON.stringify(post.content || ""),
      cover_url: post.cover_url ?? "",
      status: post.status,
      category_id: post.category_id ?? "",
      seo_title: post.seo_title ?? "",
      seo_description: post.seo_description ?? "",
    });
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_url: "",
      status: "draft",
      category_id: "",
      seo_title: "",
      seo_description: "",
    });
  };

  const savePost = async () => {
    if (!supabase) return;
    if (!form.title) {
      toast.error("Post title is required.");
      return;
    }
    setSaving(true);
    const record = {
      id: selectedPost?.id,
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_url: form.cover_url,
      status: form.status,
      category_id: form.category_id || null,
      author_id: selectedPost?.author_id ?? "",
      seo_title: form.seo_title,
      seo_description: form.seo_description,
      published_at: form.status === "published" ? new Date().toISOString() : null,
    };
    const { error } = await supabase.from("posts").upsert(record, { onConflict: "id" });
    setSaving(false);

    if (error) {
      toast.error("Unable to save post.");
      return;
    }

    toast.success("Post saved successfully.");
    loadData();
    handleCreatePost();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Blog & News</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage news posts, featured content, and publishing workflow.
          </p>
        </div>
        <Button onClick={handleCreatePost}>New post</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Updated</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    Loading posts...
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                    No posts found yet.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <button
                        type="button"
                        className="font-medium text-slate-900 hover:text-sky-600 dark:text-slate-100"
                        onClick={() => handleSelectPost(post)}
                      >
                        {post.title}
                      </button>
                    </TableCell>
                    <TableCell>{categories.find((cat) => cat.id === post.category_id)?.name ?? "Uncategorized"}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell>{new Date(post.updated_at ?? post.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{selectedPost ? "Edit post" : "Create a new post"}</h2>
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
                placeholder="Community education update"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: slugify(e.target.value) }))} />
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
              <label className="block text-sm font-medium mb-2">Cover image URL</label>
              <Input
                value={form.cover_url}
                onChange={(e) => setForm((current) => ({ ...current, cover_url: e.target.value }))}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={form.category_id}
                onChange={(e) => setForm((current) => ({ ...current, category_id: e.target.value }))}
              >
                <option value="">Uncategorized</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select
                value={form.status}
                onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO title</label>
              <Input
                value={form.seo_title}
                onChange={(e) => setForm((current) => ({ ...current, seo_title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO description</label>
              <Textarea
                value={form.seo_description}
                onChange={(e) => setForm((current) => ({ ...current, seo_description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="secondary" onClick={handleCreatePost}>
                Clear
              </Button>
              <Button onClick={savePost} disabled={saving}>
                {saving ? "Saving..." : "Save post"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
