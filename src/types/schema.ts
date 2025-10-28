export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      ban_logs: {
        Row: {
          banned: boolean;
          created_at: string;
          created_by: string | null;
          id: string;
          instance_id: string | null;
          metadata: Json;
          project_id: string | null;
          reason: string;
          reversed_at: string | null;
          user_id: string;
        };
        Insert: {
          banned?: boolean;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          instance_id?: string | null;
          metadata?: Json;
          project_id?: string | null;
          reason: string;
          reversed_at?: string | null;
          user_id: string;
        };
        Update: {
          banned?: boolean;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          instance_id?: string | null;
          metadata?: Json;
          project_id?: string | null;
          reason?: string;
          reversed_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ban_logs_instance_id_fkey";
            columns: ["instance_id"];
            referencedRelation: "instances";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ban_logs_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ban_logs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ban_logs_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      conversations: {
        Row: {
          approved_at: string | null;
          assigned_to: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          message: string;
          project_id: string;
          status: Database["public"]["Enums"]["conversation_status"];
          subject: string;
          updated_at: string;
        };
        Insert: {
          approved_at?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          message: string;
          project_id: string;
          status?: Database["public"]["Enums"]["conversation_status"];
          subject: string;
          updated_at?: string;
        };
        Update: {
          approved_at?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          message?: string;
          project_id?: string;
          status?: Database["public"]["Enums"]["conversation_status"];
          subject?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      exhibits: {
        Row: {
          body: Json;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          location_id: string | null;
          order_index: number;
          project_id: string;
          slug: string;
          status: Database["public"]["Enums"]["status"];
          summary: string | null;
          title: string;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility"];
        };
        Insert: {
          body?: Json;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          location_id?: string | null;
          order_index?: number;
          project_id: string;
          slug: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          title: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Update: {
          body?: Json;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          location_id?: string | null;
          order_index?: number;
          project_id?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          title?: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "exhibits_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exhibits_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exhibits_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      explorations: {
        Row: {
          content: Json;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          project_id: string;
          slug: string;
          status: Database["public"]["Enums"]["status"];
          summary: string | null;
          title: string;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility"];
        };
        Insert: {
          content?: Json;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          project_id: string;
          slug: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          title: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Update: {
          content?: Json;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          project_id?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          title?: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "explorations_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "explorations_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      instance_memberships: {
        Row: {
          banned: boolean;
          banned_at: string | null;
          banned_by: string | null;
          created_at: string;
          deleted_at: string | null;
          id: string;
          instance_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          banned?: boolean;
          banned_at?: string | null;
          banned_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          instance_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          banned?: boolean;
          banned_at?: string | null;
          banned_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          instance_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "instance_memberships_instance_id_fkey";
            columns: ["instance_id"];
            referencedRelation: "instances";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "instance_memberships_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "instance_memberships_banned_by_fkey";
            columns: ["banned_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      instances: {
        Row: {
          branding: Json;
          created_at: string;
          created_by: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          settings: Json;
          slug: string;
          summary: string | null;
          updated_at: string;
        };
        Insert: {
          branding?: Json;
          created_at?: string;
          created_by: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          settings?: Json;
          slug: string;
          summary?: string | null;
          updated_at?: string;
        };
        Update: {
          branding?: Json;
          created_at?: string;
          created_by?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          settings?: Json;
          slug?: string;
          summary?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "instances_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      locations: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          geometry: unknown;
          id: string;
          metadata: Json;
          project_id: string;
          slug: string;
          status: Database["public"]["Enums"]["status"];
          title: string;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility"];
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          geometry: unknown;
          id?: string;
          metadata?: Json;
          project_id: string;
          slug: string;
          status?: Database["public"]["Enums"]["status"];
          title: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          geometry?: unknown;
          id?: string;
          metadata?: Json;
          project_id?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["status"];
          title?: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "locations_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "locations_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      media: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          description: string | null;
          file_size: number | null;
          id: string;
          instance_id: string;
          media_kind: string;
          metadata: Json;
          mime_type: string | null;
          name: string;
          project_id: string | null;
          storage_path: string;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility"];
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          file_size?: number | null;
          id?: string;
          instance_id: string;
          media_kind: string;
          metadata?: Json;
          mime_type?: string | null;
          name: string;
          project_id?: string | null;
          storage_path: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          file_size?: number | null;
          id?: string;
          instance_id?: string;
          media_kind?: string;
          metadata?: Json;
          mime_type?: string | null;
          name?: string;
          project_id?: string | null;
          storage_path?: string;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "media_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "media_instance_id_fkey";
            columns: ["instance_id"];
            referencedRelation: "instances";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "media_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          instance_id: string | null;
          notification_type: string;
          payload: Json;
          project_id: string | null;
          read_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          instance_id?: string | null;
          notification_type: string;
          payload?: Json;
          project_id?: string | null;
          read_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          instance_id?: string | null;
          notification_type?: string;
          payload?: Json;
          project_id?: string | null;
          read_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_instance_id_fkey";
            columns: ["instance_id"];
            referencedRelation: "instances";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project_memberships: {
        Row: {
          banned: boolean;
          banned_at: string | null;
          banned_by: string | null;
          created_at: string;
          deleted_at: string | null;
          id: string;
          project_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          banned?: boolean;
          banned_at?: string | null;
          banned_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          project_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          banned?: boolean;
          banned_at?: string | null;
          banned_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          project_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_memberships_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_memberships_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_memberships_banned_by_fkey";
            columns: ["banned_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          description: string | null;
          id: string;
          instance_id: string;
          map_config: Json;
          name: string;
          published_at: string | null;
          slug: string;
          status: Database["public"]["Enums"]["status"];
          summary: string | null;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility"];
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          instance_id: string;
          map_config?: Json;
          name: string;
          published_at?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          instance_id?: string;
          map_config?: Json;
          name?: string;
          published_at?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["status"];
          summary?: string | null;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_instance_id_fkey";
            columns: ["instance_id"];
            referencedRelation: "instances";
            referencedColumns: ["id"];
          },
        ];
      };
      users_profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          locale: string;
          preferences: Json;
          timezone: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          locale?: string;
          preferences?: Json;
          timezone?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          locale?: string;
          preferences?: Json;
          timezone?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_instance_role: {
        Args: {
          target_instance: string;
          allowed_roles: string[];
        };
        Returns: boolean;
      };
      has_project_role: {
        Args: {
          target_project: string;
          allowed_roles: string[];
        };
        Returns: boolean;
      };
      soft_delete_instances: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      soft_delete_projects: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      touch_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      conversation_status: "approved" | "pending" | "rejected" | "flagged";
      status: "draft" | "published" | "archived";
      user_role: "instance_admin" | "project_admin" | "author";
      visibility: "visible" | "hidden";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
