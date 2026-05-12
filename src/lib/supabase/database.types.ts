export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Role =
  | "super_admin"
  | "admin"
  | "staff"
  | "volunteer"
  | "viewer";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: Role;
          phone: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: Role;
          phone?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: Role;
          phone?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      settings: {
        Row: {
          id: string;
          site_title: string;
          site_tagline: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          primary_email: string | null;
          primary_phone: string | null;
          address: string | null;
          social_links: Json | null;
          seo_title: string | null;
          seo_description: string | null;
          maintenance_mode: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          site_title: string;
          site_tagline?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_email?: string | null;
          primary_phone?: string | null;
          address?: string | null;
          social_links?: Json | null;
          seo_title?: string | null;
          seo_description?: string | null;
          maintenance_mode?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          site_title?: string;
          site_tagline?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_email?: string | null;
          primary_phone?: string | null;
          address?: string | null;
          social_links?: Json | null;
          seo_title?: string | null;
          seo_description?: string | null;
          maintenance_mode?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      theme_settings: {
        Row: {
          id: string;
          primary_color: string;
          secondary_color: string;
          background_color: string;
          surface_color: string;
          accent_color: string;
          heading_font: string;
          body_font: string;
          border_radius: string;
          shadow_style: string;
          button_style: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          primary_color?: string;
          secondary_color?: string;
          background_color?: string;
          surface_color?: string;
          accent_color?: string;
          heading_font?: string;
          body_font?: string;
          border_radius?: string;
          shadow_style?: string;
          button_style?: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          primary_color?: string;
          secondary_color?: string;
          background_color?: string;
          surface_color?: string;
          accent_color?: string;
          heading_font?: string;
          body_font?: string;
          border_radius?: string;
          shadow_style?: string;
          button_style?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: Json | null;
          status: "draft" | "published";
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string | null;
          author_id: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: Json | null;
          status?: "draft" | "published";
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string | null;
          author_id?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: Json | null;
          status?: "draft" | "published";
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string | null;
          author_id?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: Json | null;
          cover_url: string | null;
          status: "draft" | "published";
          category_id: string | null;
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: Json | null;
          cover_url?: string | null;
          status?: "draft" | "published";
          category_id?: string | null;
          author_id: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: Json | null;
          cover_url?: string | null;
          status?: "draft" | "published";
          category_id?: string | null;
          author_id?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      campaigns: {
        Row: {
          id: string;
          title: string;
          slug: string;
          goal_amount: number;
          raised_amount: number;
          status: "active" | "paused" | "completed";
          start_date: string;
          end_date: string | null;
          description: string | null;
          cover_url: string | null;
          created_at: string;
          updated_at: string | null;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          goal_amount: number;
          raised_amount?: number;
          status?: "active" | "paused" | "completed";
          start_date: string;
          end_date?: string | null;
          description?: string | null;
          cover_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          goal_amount?: number;
          raised_amount?: number;
          status?: "active" | "paused" | "completed";
          start_date?: string;
          end_date?: string | null;
          description?: string | null;
          cover_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by?: string | null;
        };
      };
      donations: {
        Row: {
          id: string;
          campaign_id: string | null;
          donor_name: string;
          donor_email: string;
          amount: number;
          currency: string;
          status: "pending" | "completed" | "refunded";
          message: string | null;
          created_at: string;
          updated_at: string | null;
          processed_by: string | null;
        };
        Insert: {
          id?: string;
          campaign_id?: string | null;
          donor_name: string;
          donor_email: string;
          amount: number;
          currency?: string;
          status?: "pending" | "completed" | "refunded";
          message?: string | null;
          created_at?: string;
          updated_at?: string | null;
          processed_by?: string | null;
        };
        Update: {
          campaign_id?: string | null;
          donor_name?: string;
          donor_email?: string;
          amount?: number;
          currency?: string;
          status?: "pending" | "completed" | "refunded";
          message?: string | null;
          created_at?: string;
          updated_at?: string | null;
          processed_by?: string | null;
        };
      };
      inventory: {
        Row: {
          id: string;
          name: string;
          sku: string | null;
          category: string | null;
          quantity: number;
          status: "in_stock" | "low_stock" | "out_of_stock";
          location: string | null;
          description: string | null;
          created_at: string;
          updated_at: string | null;
          owner_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          sku?: string | null;
          category?: string | null;
          quantity: number;
          status?: "in_stock" | "low_stock" | "out_of_stock";
          location?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
          owner_id: string;
        };
        Update: {
          name?: string;
          sku?: string | null;
          category?: string | null;
          quantity?: number;
          status?: "in_stock" | "low_stock" | "out_of_stock";
          location?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
          owner_id?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          organization: string | null;
          role: string | null;
          source: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          organization?: string | null;
          role?: string | null;
          source?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          organization?: string | null;
          role?: string | null;
          source?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          category: string | null;
          read: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          category?: string | null;
          read?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          title?: string;
          message?: string;
          category?: string | null;
          read?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          assigned_to: string | null;
          status: "todo" | "in_progress" | "done";
          priority: "low" | "medium" | "high";
          due_date: string | null;
          created_at: string;
          updated_at: string | null;
          created_by: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          assigned_to?: string | null;
          status?: "todo" | "in_progress" | "done";
          priority?: "low" | "medium" | "high";
          due_date?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          assigned_to?: string | null;
          status?: "todo" | "in_progress" | "done";
          priority?: "low" | "medium" | "high";
          due_date?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by?: string;
        };
      };
      files: {
        Row: {
          id: string;
          name: string;
          url: string;
          mime_type: string | null;
          size: number | null;
          category: string | null;
          uploaded_by: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          url: string;
          mime_type?: string | null;
          size?: number | null;
          category?: string | null;
          uploaded_by: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          name?: string;
          url?: string;
          mime_type?: string | null;
          size?: number | null;
          category?: string | null;
          uploaded_by?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          read: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          read?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          sender_id?: string;
          recipient_id?: string;
          content?: string;
          read?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      analytics: {
        Row: {
          id: string;
          metric: string;
          value: number;
          details: Json | null;
          recorded_at: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          metric: string;
          value: number;
          details?: Json | null;
          recorded_at: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          metric?: string;
          value?: number;
          details?: Json | null;
          recorded_at?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
