"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Race, Entry, MyEntry } from "@/lib/supabase"

export function useRaceData(raceId: string) {
  const [race, setRace] = useState<Race | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [myEntries, setMyEntries] = useState<MyEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRaceData()
  }, [raceId])

  const fetchRaceData = async () => {
    try {
      setLoading(true)

      // レース情報を取得
      const { data: raceData, error: raceError } = await supabase.from("races").select("*").eq("id", raceId).single()

      if (raceError) throw raceError
      setRace(raceData)

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
      setEntries(entriesData || [])

      // ユーザーの予想データを取得（認証実装後）
      // const { data: myEntriesData } = await supabase
      //   .from('myentries')
      //   .select('*')
      //   .eq('race_id', raceId)
      //   .eq('user_id', user.id)

      // setMyEntries(myEntriesData || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "データの取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  const saveMyEntry = async (horseId: number, mark: string, comment: string) => {
    try {
      // ユーザー認証実装後に有効化
      // const { data, error } = await supabase
      //   .from('myentries')
      //   .upsert({
      //     race_id: parseInt(raceId),
      //     horse_id: horseId,
      //     mark,
      //     comment,
      //     user_id: user.id
      //   })

      // if (error) throw error

      console.log("保存データ:", { raceId, horseId, mark, comment })
      return true
    } catch (err) {
      console.error("保存エラー:", err)
      return false
    }
  }

  return {
    race,
    entries,
    myEntries,
    loading,
    error,
    saveMyEntry,
    refetch: fetchRaceData,
  }
}
