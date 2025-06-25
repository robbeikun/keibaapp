-- サンプルデータに馬体重情報を追加
UPDATE entries SET 
  horse_weight = 461,
  horse_weight_change = 2
WHERE horse_id = 1 AND race_id = 1;

UPDATE entries SET 
  horse_weight = 478,
  horse_weight_change = -3
WHERE horse_id = 2 AND race_id = 1;

UPDATE entries SET 
  horse_weight = 445,
  horse_weight_change = 5
WHERE horse_id = 3 AND race_id = 1;

UPDATE entries SET 
  horse_weight = 492,
  horse_weight_change = 0
WHERE horse_id = 4 AND race_id = 1;

-- 追加の出走データ（レース1用）
INSERT INTO entries (race_id, horse_id, horse_number, frame_number, weight, jockey, horse_weight, horse_weight_change) VALUES
(1, 5, 5, 3, 55, '佐藤花子', 467, 8),
(1, 6, 6, 3, 56, '田中次郎', 489, -2),
(1, 7, 7, 4, 54, '山田三郎', 452, 3),
(1, 8, 8, 4, 57, '高橋四郎', 475, -5);

-- 対応する馬の動きデータも追加
INSERT INTO horse_metrics (horse_id, race_id, hind_leg_step, front_leg_leading, front_leg_non_leading, stride, neck_height, neck_swing, bpm_chasing, bmp_sprint) VALUES
(5, 1, '深い', '安定', '良好', '中', '適正', '良好', 88, 118),
(6, 1, '非常に深い', '力強い', '安定', '大', 'やや高い', '力強い', 75, 102),
(7, 1, '浅い', '柔軟', '柔軟', '小', '低い', 'リズミカル', 95, 130),
(8, 1, '深い', '良好', '安定', '大', '適正', '安定', 82, 112);
