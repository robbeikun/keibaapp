"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export interface HorseSearchResult {
  id: number
  name: string
  age: number
  sex: string
  trainer: string
  owner: string
  class: string
  recentRaces: {
    date: string
    raceName: string
    place: string
    result: string
    distance: string
  }[]
  metrics: {
    stride: string
    bpmChasing: number
    bpmSprint: number
    hindLegStep: string
    frontLegLeading: string
    neckSwing: string
  }
}

// SearchFiltersインターフェースを更新して、新しい検索条件を追加
export interface SearchFilters {
  name?: string
  class?: string
  sex?: string[]
  minAge?: number
  maxAge?: number
  includeRegistered?: boolean
  includeRetired?: boolean
}

export function useHorseSearch() {
  const [horses, setHorses] = useState<HorseSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // searchHorses関数を更新して、新しいフィルター条件に対応
  const searchHorses = async (filters: SearchFilters) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from("horses").select(`
        id,
        name,
        age,
        sex,
        trainer,
        owner,
        class,
        entries!inner(
          id,
          race_id,
          horse_number,
          races!inner(
            id,
            name,
            date,
            distance
          )
        ),
        horse_metrics(
          stride,
          bpm_chasing,
          bmp_sprint,
          hind_leg_step,
          front_leg_leading,
          neck_swing
        )
      `)

      // フィルター適用
      if (filters.name) {
        query = query.ilike("name", `${filters.name}%`) // 前方一致検索
      }

      if (filters.class) {
        query = query.eq("class", filters.class)
      }

      if (filters.sex && filters.sex.length > 0) {
        query = query.in("sex", filters.sex)
      }

      if (filters.minAge && filters.maxAge) {
        query = query.gte("age", filters.minAge).lte("age", filters.maxAge)
      } else if (filters.minAge) {
        query = query.gte("age", filters.minAge)
      } else if (filters.maxAge) {
        query = query.lte("age", filters.maxAge)
      }

      // 出走登録馬から検索の場合は、entriesテーブルにデータがある馬のみ
      if (filters.includeRegistered) {
        // 既にinner joinしているので、追加の条件は不要
      }

      // 抹消馬を含まない場合の条件（実際のDBスキーマに応じて調整）
      if (!filters.includeRetired) {
        // 抹消フラグがある場合の条件を追加
        // query = query.eq("retired", false)
      }

      const { data, error: queryError } = await query.limit(100)

      if (queryError) throw queryError

      // データを整形（既存のコードと同じ）
      const formattedHorses: HorseSearchResult[] = (data || []).map((horse: any) => ({
        id: horse.id,
        name: horse.name,
        age: horse.age,
        sex: horse.sex,
        trainer: horse.trainer,
        owner: horse.owner,
        class: horse.class || "C3",
        recentRaces:
          horse.entries?.slice(0, 3).map((entry: any) => ({
            date: entry.races.date,
            raceName: entry.races.name,
            place: "大井",
            result: "1着",
            distance: entry.races.distance,
          })) || [],
        metrics: {
          stride: horse.horse_metrics?.[0]?.stride || "中",
          bmpChasing: horse.horse_metrics?.[0]?.bmp_chasing || 80,
          bmpSprint: horse.horse_metrics?.[0]?.bmp_sprint || 110,
          hindLegStep: horse.horse_metrics?.[0]?.hind_leg_step || "普通",
          frontLegLeading: horse.horse_metrics?.[0]?.front_leg_leading || "安定",
          neckSwing: horse.horse_metrics?.[0]?.neck_swing || "安定",
        },
      }))

      setHorses(formattedHorses)
    } catch (err) {
      setError(err instanceof Error ? err.message : "検索に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  const getHorseDetail = async (horseId: number) => {
    try {
      const { data, error } = await supabase
        .from("horses")
        .select(`
          *,
          entries(
            *,
            races(*)
          ),
          horse_metrics(*)
        `)
        .eq("id", horseId)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      console.error("馬詳細取得エラー:", err)
      return null
    }
  }

  return {
    horses,
    loading,
    error,
    searchHorses,
    getHorseDetail,
  }
}
