export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          subject?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          category: string
          created_at: string
          date: string
          id: string
          name: string
          nameHash: string | null
          notes: string | null
          paid_via: string
          price: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          id: string
          name: string
          nameHash?: string | null
          notes?: string | null
          paid_via?: string
          price?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          nameHash?: string | null
          notes?: string | null
          paid_via?: string
          price?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'expenses_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      feedbacks: {
        Row: {
          created_at: string
          id: number
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          user_id?: string
        }
        Relationships: []
      }
      income: {
        Row: {
          category: string
          created_at: string
          date: string
          id: string
          name: string
          nameHash: string | null
          notes: string | null
          price: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          id: string
          name: string
          nameHash?: string | null
          notes?: string | null
          price?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          nameHash?: string | null
          notes?: string | null
          price?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'income_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      investments: {
        Row: {
          category: string
          created_at: string
          date: string
          id: string
          name: string
          nameHash: string | null
          notes: string | null
          price: string
          units: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          id: string
          name: string
          nameHash?: string | null
          notes?: string | null
          price?: string
          units?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          nameHash?: string | null
          notes?: string | null
          price?: string
          units?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'investments_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      subscriptions: {
        Row: {
          active: boolean | null
          cancelled_at: string | null
          created_at: string
          date: string
          id: string
          name: string
          nameHash: string | null
          notes: string | null
          notify: boolean
          paid: string
          price: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          date: string
          id: string
          name: string
          nameHash?: string | null
          notes?: string | null
          notify?: boolean
          paid: string
          price?: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          date?: string
          id?: string
          name?: string
          nameHash?: string | null
          notes?: string | null
          notify?: boolean
          paid?: string
          price?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          basic_usage_limit_email: boolean
          billing_start_date: string | null
          created_at: string
          currency: string
          email: string
          id: string
          locale: string
          monthly_email_report: boolean
          new_signup_email: boolean
          order_identifier: string | null
          order_number: string | null
          order_status: string | null
          order_store_id: string | null
          plan_status: string
          premium_plan_expired_email: boolean
          premium_usage_limit_email: boolean
          trial_start_date: string
          updated_at: string
          usage: number
        }
        Insert: {
          basic_usage_limit_email?: boolean
          billing_start_date?: string | null
          created_at?: string
          currency?: string
          email: string
          id: string
          locale?: string
          monthly_email_report?: boolean
          new_signup_email?: boolean
          order_identifier?: string | null
          order_number?: string | null
          order_status?: string | null
          order_store_id?: string | null
          plan_status?: string
          premium_plan_expired_email?: boolean
          premium_usage_limit_email?: boolean
          trial_start_date?: string
          updated_at?: string
          usage?: number
        }
        Update: {
          basic_usage_limit_email?: boolean
          billing_start_date?: string | null
          created_at?: string
          currency?: string
          email?: string
          id?: string
          locale?: string
          monthly_email_report?: boolean
          new_signup_email?: boolean
          order_identifier?: string | null
          order_number?: string | null
          order_status?: string | null
          order_store_id?: string | null
          plan_status?: string
          premium_plan_expired_email?: boolean
          premium_usage_limit_email?: boolean
          trial_start_date?: string
          updated_at?: string
          usage?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
