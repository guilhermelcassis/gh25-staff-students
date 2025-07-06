import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Staff {
  id: string
  name: string
  email?: string
  cellphone?: string
  igreja?: string // church in Portuguese
  country?: string
  nationality?: string
  area?: string
  kit_cama?: string // bed kit
  quarto?: string // room
  healthy_form?: string
  checked_in: boolean
  checked_in_at?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  name: string
  status?: string
  gender?: string
  email?: string
  phone?: string
  age?: string
  country?: string
  nationality?: string
  language?: string
  church?: string
  room?: string
  bed_kit?: string
  bus?: string
  documents?: string
  underage_doc?: string
  healthy_form?: string
  obs?: string
  checked_in: boolean
  checked_in_at?: string
  created_at: string
  updated_at: string
}

export interface CheckinLog {
  id: string
  person_id: string
  person_type: 'staff' | 'student'
  person_name: string
  action: string
  performed_by?: string
  created_at: string
} 