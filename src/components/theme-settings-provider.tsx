"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

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

function setThemeVars(theme: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
}

export function ThemeSettingsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const loadTheme = async () => {
      try {
        const { data } = await supabase.from("theme_settings").select("*").single();
        if (data) {
          setThemeVars({
            primary_color: data.primary_color ?? defaultTheme.primary_color,
            secondary_color: data.secondary_color ?? defaultTheme.secondary_color,
            background_color: data.background_color ?? defaultTheme.background_color,
            surface_color: data.surface_color ?? defaultTheme.surface_color,
            accent_color: data.accent_color ?? defaultTheme.accent_color,
            heading_font: data.heading_font ?? defaultTheme.heading_font,
            body_font: data.body_font ?? defaultTheme.body_font,
            border_radius: data.border_radius ?? defaultTheme.border_radius,
            shadow_style: data.shadow_style ?? defaultTheme.shadow_style,
            button_style: data.button_style ?? defaultTheme.button_style,
          });
        } else {
          setThemeVars(defaultTheme);
        }
      } catch (error) {
        setThemeVars(defaultTheme);
      }
    };

    loadTheme();
  }, []);

  return <>{children}</>;
}
