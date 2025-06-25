-- entriesテーブルに馬体重と結果関連のカラムを追加
ALTER TABLE entries ADD COLUMN IF NOT EXISTS horse_weight INTEGER;
ALTER TABLE entries ADD COLUMN IF NOT EXISTS horse_weight_change INTEGER DEFAULT 0;
ALTER TABLE entries ADD COLUMN IF NOT EXISTS result_position INTEGER;
ALTER TABLE entries ADD COLUMN IF NOT EXISTS result_time VARCHAR(20);

-- サンプルデータの更新
UPDATE entries SET 
  horse_weight = 461,
  horse_weight_change = 2,
  result_position = NULL,
  result_time = NULL
WHERE horse_id = 1;

UPDATE entries SET 
  horse_weight = 478,
  horse_weight_change = -3,
  result_position = NULL,
  result_time = NULL
WHERE horse_id = 2;

UPDATE entries SET 
  horse_weight = 445,
  horse_weight_change = 5,
  result_position = NULL,
  result_time = NULL
WHERE horse_id = 3;

UPDATE entries SET 
  horse_weight = 492,
  horse_weight_change = 0,
  result_position = NULL,
  result_time = NULL
WHERE horse_id = 4;
