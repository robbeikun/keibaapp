"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export interface RaceDetails {
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
  entry_count: number
}

export interface EntryWithDetails {
  id: number
  race_id: number
  horse_id: number
  horse_number: number
  frame_number: number
  weight: number
  jockey: string
  horse_weight?: number
  horse_weight_change?: number
  result_position?: number
  result_time?: string
  horse: {
    id: number
    name: string
    age: number
    sex: string
    trainer: string
    owner: string
  }
  horse_metrics: {
    id: number
    hind_leg_step: string
    front_leg_leading: string
    front_leg_non_leading: string
    stride: string
    neck_height: string
    neck_swing: string
    bpm_chasing: number
    bpm_sprint: number
  }
}

export function useRaceEntries(raceId: string) {
  const [race, setRace] = useState<RaceDetails | null>(null)
  const [entries, setEntries] = useState<EntryWithDetails[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRaceEntries = async () => {
    try {
      setLoading(true)
      setError(null)

      // レース情報を取得
      const { data: raceData, error: raceError } = await supabase.from("races").select("*").eq("id", raceId).single()

      if (raceError) throw raceError

      // 出走頭数を計算
      const { count } = await supabase.from("entries").select("*", { count: "exact", head: true }).eq("race_id", raceId)

      const raceDetails: RaceDetails = {
        ...raceData,
        entry_count: count || 0,
      }

      setRace(raceDetails)

      // 出走馬情報を取得
      const { data: entriesData, error: entriesError } = await supabase
        .from("entries")
        .select(`
          *,
          horse:horses(*),
          horse_metrics(*)
        `)
        .eq("race_id", raceId)
        .order("horse_number")

      if (entriesError) throw entriesError

      // データを整形
      const formattedEntries: EntryWithDetails[] = (entriesData || []).map((entry: any) => ({
        id: entry.id,
        race_id: entry.race_id,
        horse_id: entry.horse_id,
        horse_number: entry.horse_number,
        frame_number: entry.frame_number,
        weight: entry.weight,
        jockey: entry.jockey,
        horse_weight: entry.horse_weight || 450, // デフォルト値
        horse_weight_change: entry.horse_weight_change || 0,
        result_position: entry.result_position,
        result_time: entry.result_time,
        horse: entry.horse,
        horse_metrics: entry.horse_metrics?.[0] || {
          id: 0,
          hind_leg_step: "普通",
          front_leg_leading: "普通",
          front_leg_non_leading: "普通",
          stride: "中",
          neck_height: "適正",
          neck_swing: "安定",
          bmp_chasing: 80,
          bmp_sprint: 110,
        },
      }))

      setEntries(formattedEntries)
    } catch (err) {
      setError(err instanceof Error ? err.message : "データの取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return {
    race,
    entries,
    loading,
    error,
    refetch: fetchRaceEntries,
  }
}
