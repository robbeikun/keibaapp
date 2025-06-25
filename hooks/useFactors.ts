"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export interface Factor {
  id: number
  name: string
  description: string
  category: string
  importance: string
  checkPoints: string[]
  importantRaces: string[]
  featuredHorses: string[]
  created_at: string
  updated_at: string
}

export interface FactorSearchFilters {
  name?: string
  category?: string
  importance?: string
}

export function useFactors() {
  const [factors, setFactors] = useState<Factor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchFactors = async (filters: FactorSearchFilters) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from("factors").select("*")

      // フィルター適用
      if (filters.name) {
        query = query.ilike("name", `%${filters.name}%`)
      }

      if (filters.category) {
        query = query.eq("category", filters.category)
      }

      if (filters.importance) {
        query = query.eq("importance", filters.importance)
      }

      // 重要度順、名前順でソート
      query = query.order("importance", { ascending: false }).order("name", { ascending: true })

      const { data, error: queryError } = await query

      if (queryError) throw queryError

      // データを整形
      const formattedFactors: Factor[] = (data || []).map((factor: any) => ({
        id: factor.id,
        name: factor.name,
        description: factor.description,
        category: factor.category,
        importance: factor.importance,
        checkPoints: factor.check_points || [],
        importantRaces: factor.important_races || [],
        featuredHorses: factor.featured_horses || [],
        created_at: factor.created_at,
        updated_at: factor.updated_at,
      }))

      setFactors(formattedFactors)
    } catch (err) {
      setError(err instanceof Error ? err.message : "ファクターの取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  const getFactorById = async (factorId: number) => {
    try {
      const { data, error } = await supabase.from("factors").select("*").eq("id", factorId).single()

      if (error) throw error
      return data
    } catch (err) {
      console.error("ファクター詳細取得エラー:", err)
      return null
    }
  }

  return {
    factors,
    loading,
    error,
    searchFactors,
    getFactorById,
  }
}
