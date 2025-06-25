"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface PredictionEntry {
  id: number
  race_id: number
  horse_id: number
  horse_number: number
  frame_number: number
  weight: number
  jockey: string
  horse_weight: number
  horse_weight_change: number
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

export interface MyPrediction {
  mark: string
  comment: string
}

export function useMyPredictions(raceId: string) {
  const [entries, setEntries] = useState<PredictionEntry[]>([])
  const [predictions, setPredictions] = useState<{ [key: number]: MyPrediction }>({})
  const [raceMemo, setRaceMemo] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // データ取得
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

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
      const formattedEntries: PredictionEntry[] = (entriesData || []).map((entry: any) => ({
        id: entry.id,
        race_id: entry.race_id,
        horse_id: entry.horse_id,
        horse_number: entry.horse_number,
        frame_number: entry.frame_number,
        weight: entry.weight,
        jockey: entry.jockey,
        horse_weight: entry.horse_weight || 450,
        horse_weight_change: entry.horse_weight_change || 0,
        horse: entry.horse,
        horse_metrics: entry.horse_metrics?.[0] || {
          id: 0,
          hind_leg_step: "普通",
          front_leg_leading: "普通",
          front_leg_non_leading: "普通",
          stride: "中",
          neck_height: "適正",
          neck_swing: "安定",
          bpm_chasing: 80,
          bmp_sprint: 110,
        },
      }))

      setEntries(formattedEntries)

      // 既存の予想データを取得（認証実装後）
      // const { data: myEntriesData } = await supabase
      //   .from('myentries')
      //   .select('*')
      //   .eq('race_id', raceId)
      //   .eq('user_id', user.id)

      // if (myEntriesData) {
      //   const existingPredictions: { [key: number]: MyPrediction } = {}
      //   myEntriesData.forEach((entry: any) => {
      //     existingPredictions[entry.horse_id] = {
      //       mark: entry.mark || '',
      //       comment: entry.comment || ''
      //     }
      //   })
      //   setPredictions(existingPredictions)
      // }
    } catch (err) {
      setError(err instanceof Error ? err.message : "データの取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  // 予想データの更新
  const updatePrediction = (entryId: number, field: "mark" | "comment", value: string) => {
    setPredictions((prev) => ({
      ...prev,
      [entryId]: {
        ...prev[entryId],
        [field]: value,
      },
    }))
  }

  // レースメモの更新
  const updateRaceMemo = (memo: string) => {
    if (memo.length <= 500) {
      setRaceMemo(memo)
    }
  }

  // 予想データの保存
  const savePredictions = async () => {
    try {
      // 認証実装後に有効化
      // const updates = Object.entries(predictions).map(([entryId, prediction]) => ({
      //   race_id: parseInt(raceId),
      //   horse_id: parseInt(entryId),
      //   mark: prediction.mark,
      //   comment: prediction.comment,
      //   user_id: user.id
      // }))

      // const { error } = await supabase
      //   .from('myentries')
      //   .upsert(updates)

      // if (error) throw error

      // レースメモも保存
      // const { error: memoError } = await supabase
      //   .from('race_memos')
      //   .upsert({
      //     race_id: parseInt(raceId),
      //     user_id: user.id,
      //     memo: raceMemo
      //   })

      // if (memoError) throw memoError

      console.log("保存データ:", { predictions, raceMemo })
      return true
    } catch (err) {
      console.error("保存エラー:", err)
      throw err
    }
  }

  useEffect(() => {
    if (raceId) {
      fetchData()
    }
  }, [raceId])

  return {
    entries,
    predictions,
    raceMemo,
    loading,
    error,
    updatePrediction,
    updateRaceMemo,
    savePredictions,
    refetch: fetchData,
  }
}
