"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const defaultTheme = {
  primary_color: "#0ea5e9",
  secondary_color: "#9333ea",
  background_color: "#f8fafc",
  surface_color: "#ffffff",
  accent_color: "#f59e0b",
  heading_font: "Inter, sans-serif",
  body_font: "Inter, sans-serif",
  border_radius: "1.5rem",
  shadow_style: "0 24px 80px rgba(15, 23, 42, 0.08)",
  button_style: "rounded-2xl",
};

function applyTheme(theme: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
}

export default function ThemePage() {
  const [themeData, setThemeData] = useState<Record<string, string>>(defaultTheme);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  useEffect(() => {
    const loadTheme = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from("theme_settings").select("*").single();
      if (data) {
        setThemeData((current) => ({ ...current, ...data }));
        applyTheme({ ...defaultTheme, ...data });
      } else {
        applyTheme(defaultTheme);
      }
      setLoading(false);
    };

    loadTheme();
  }, []);

  const saveTheme = async () => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase.from("theme_settings").upsert(themeData);
    setSaving(false);

    if (error) {
      toast.error("Unable to save theme settings.");
      return;
    }

    applyTheme(themeData);
    toast.success("Theme settings updated.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Theme Customizer</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Control the brand palette, typography, and layout accents for Aid Connect.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Colors</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Adjust the primary palette used across the site and dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(["primary_color", "secondary_color", "background_color", "surface_color", "accent_color"] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2">{key.replace("_", " ")}</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={themeData[key]}
                    onChange={(e) => setThemeData((current) => ({ ...current, [key]: e.target.value }))}
                    className="h-12 w-20 p-0"
                  />
                  <Input
                    type="text"
                    value={themeData[key]}
                    onChange={(e) => setThemeData((current) => ({ ...current, [key]: e.target.value }))}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Typography & layout</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fine-tune fonts, borders, and shadow styling for a polished brand experience.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Heading font stack</label>
              <Input
                value={themeData.heading_font}
                onChange={(e) => setThemeData((current) => ({ ...current, heading_font: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Body font stack</label>
              <Input
                value={themeData.body_font}
                onChange={(e) => setThemeData((current) => ({ ...current, body_font: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Border radius</label>
              <Input
                value={themeData.border_radius}
                onChange={(e) => setThemeData((current) => ({ ...current, border_radius: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Shadow style</label>
              <Input
                value={themeData.shadow_style}
                onChange={(e) => setThemeData((current) => ({ ...current, shadow_style: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button style</label>
              <Input
                value={themeData.button_style}
                onChange={(e) => setThemeData((current) => ({ ...current, button_style: e.target.value }))}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Changes are applied immediately on save.</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Use a valid CSS value or font stack for each field.</p>
        </div>
        <Button onClick={saveTheme} disabled={saving || loading}>
          {saving ? "Saving..." : "Save theme settings"}
        </Button>
      </div>
    </div>
  );
}
