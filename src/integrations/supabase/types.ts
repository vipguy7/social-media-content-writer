export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audience_behavior: {
        Row: {
          count: number | null
          day_of_week: number
          hour_of_day: number
          id: string
          interaction_type: string
          platform: string
          recorded_at: string
          user_id: string
        }
        Insert: {
          count?: number | null
          day_of_week: number
          hour_of_day: number
          id?: string
          interaction_type: string
          platform: string
          recorded_at?: string
          user_id: string
        }
        Update: {
          count?: number | null
          day_of_week?: number
          hour_of_day?: number
          id?: string
          interaction_type?: string
          platform?: string
          recorded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          country_id: number
          id: number
          name: string
        }
        Insert: {
          country_id: number
          id?: never
          name: string
        }
        Update: {
          country_id?: number
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      content_analytics: {
        Row: {
          comments: number | null
          content_id: string
          created_at: string
          engagement_score: number | null
          hashtags: string[] | null
          id: string
          likes: number | null
          platform: string | null
          posted_at: string | null
          shares: number | null
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          comments?: number | null
          content_id: string
          created_at?: string
          engagement_score?: number | null
          hashtags?: string[] | null
          id?: string
          likes?: number | null
          platform?: string | null
          posted_at?: string | null
          shares?: number | null
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          comments?: number | null
          content_id?: string
          created_at?: string
          engagement_score?: number | null
          hashtags?: string[] | null
          id?: string
          likes?: number | null
          platform?: string | null
          posted_at?: string | null
          shares?: number | null
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_content"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "generated_content"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: never
          name: string
        }
        Update: {
          code?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      engagement_predictions: {
        Row: {
          actual_score: number | null
          content_id: string
          created_at: string
          id: string
          predicted_post_time: string | null
          predicted_score: number | null
          prediction_model_version: string | null
          user_id: string
        }
        Insert: {
          actual_score?: number | null
          content_id: string
          created_at?: string
          id?: string
          predicted_post_time?: string | null
          predicted_score?: number | null
          prediction_model_version?: string | null
          user_id: string
        }
        Update: {
          actual_score?: number | null
          content_id?: string
          created_at?: string
          id?: string
          predicted_post_time?: string | null
          predicted_score?: number | null
          prediction_model_version?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_content"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "generated_content"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_content: {
        Row: {
          content: string
          content_type: string | null
          created_at: string
          id: string
          platform: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          content_type?: string | null
          created_at?: string
          id?: string
          platform?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          content_type?: string | null
          created_at?: string
          id?: string
          platform?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_content_history: {
        Row: {
          created_at: string | null
          data: Json | null
          generated_text: string | null
          id: number
          inserted_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          generated_text?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          generated_text?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hashtag_performance: {
        Row: {
          avg_engagement: number | null
          best_performing: boolean | null
          hashtag: string
          id: string
          last_used: string | null
          platform: string | null
          usage_count: number | null
        }
        Insert: {
          avg_engagement?: number | null
          best_performing?: boolean | null
          hashtag: string
          id?: string
          last_used?: string | null
          platform?: string | null
          usage_count?: number | null
        }
        Update: {
          avg_engagement?: number | null
          best_performing?: boolean | null
          hashtag?: string
          id?: string
          last_used?: string | null
          platform?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      posting_time_optimization: {
        Row: {
          confidence_score: number | null
          id: string
          last_updated: string
          platform: string | null
          recommended_day: number | null
          recommended_hour: number | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          id?: string
          last_updated?: string
          platform?: string | null
          recommended_day?: number | null
          recommended_hour?: number | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          id?: string
          last_updated?: string
          platform?: string | null
          recommended_day?: number | null
          recommended_hour?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          credits: number
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          times_used: number | null
          trial_days: number
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number | null
          trial_days?: number
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number | null
          trial_days?: number
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      used_promo_codes: {
        Row: {
          id: string
          promo_code_id: string
          used_at: string
          user_id: string
        }
        Insert: {
          id?: string
          promo_code_id: string
          used_at?: string
          user_id: string
        }
        Update: {
          id?: string
          promo_code_id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "used_promo_codes_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      count_total_users: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      decrement_user_credits: {
        Args: { p_user_id: string } | { user_id: number; credits: number }
        Returns: boolean
      }
      delete_old_generated_content: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_profile: {
        Args:
          | Record<PropertyKey, never>
          | { user_id: number; new_username: string; new_email: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
