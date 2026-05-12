"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    site_title: "Aid Connect",
    site_tagline: "",
    logo_url: "",
    favicon_url: "",
    primary_email: "",
    primary_phone: "",
    address: "",
    social_links: {},
    seo_title: "",
    seo_description: "",
    maintenance_mode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load settings");
        return;
      }

      if (data) {
        setSettings(data);
      }
      setLoading(false);
    };

    loadSettings();
  }, [supabase]);

  const saveSettings = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("settings")
      .upsert(settings);

    setSaving(false);

    if (error) {
      toast.error("Failed to save settings");
      return;
    }

    toast.success("Settings saved successfully");
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Website Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your website&apos;s global settings and branding.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Site Information</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Basic information about your organization.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Title</label>
              <Input
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                placeholder="Aid Connect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Site Tagline</label>
              <Input
                value={settings.site_tagline}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                placeholder="Empowering communities through education and healthcare"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Email</label>
              <Input
                type="email"
                value={settings.primary_email}
                onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
                placeholder="contact@aidconnect.org"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Phone</label>
              <Input
                value={settings.primary_phone}
                onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="123 Main Street, City, State 12345"
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Branding</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Logo, favicon, and visual identity.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Logo URL</label>
              <Input
                value={settings.logo_url}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Favicon URL</label>
              <Input
                value={settings.favicon_url}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">SEO Settings</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Search engine optimization settings.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SEO Title</label>
              <Input
                value={settings.seo_title}
                onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                placeholder="Aid Connect - NGO Platform"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SEO Description</label>
              <Input
                value={settings.seo_description}
                onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                placeholder="Aid Connect is an NGO platform for education, healthcare, and humanitarian support."
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Maintenance</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Site maintenance and availability settings.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="maintenance_mode"
                checked={settings.maintenance_mode}
                onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
                className="rounded border-slate-300"
              />
              <label htmlFor="maintenance_mode" className="text-sm font-medium">
                Enable maintenance mode
              </label>
            </div>
            <p className="text-xs text-slate-500">
              When enabled, visitors will see a maintenance page instead of the website.
            </p>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
