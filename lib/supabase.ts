import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// データベース型定義
export interface Race {
  id: number
  name: string
  date: string
  time: string
  distance: string
  surface: string
  weather: string
  track_condition: string
  wind_direction?: string
  wind_speed?: number
  grade?: string
  purse?: string
}

export interface Horse {
  id: number
  name: string
  age: number
  sex: string
  trainer: string
  owner: string
}

export interface Entry {
  id: number
  race_id: number
  horse_id: number
  horse_number: number
  frame_number: number
  weight: number
  jockey: string
  horse: Horse
  horse_metrics: HorseMetrics
}

export interface HorseMetrics {
  id: number
  horse_id: number
  race_id: number
  hind_leg_step: string
  front_leg_leading: string
  front_leg_non_leading: string
  stride: string
  neck_height: string
  neck_swing: string
  bpm_chasing: number
  bpm_sprint: number
}

export interface MyEntry {
  id: number
  user_id: string
  race_id: number
  horse_id: number
  mark: string
  comment: string
  created_at: string
  updated_at: string
}
