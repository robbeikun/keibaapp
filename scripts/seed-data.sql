-- サンプルデータの投入

-- レースデータ
INSERT INTO races (name, date, time, distance, surface, weather, track_condition, purse) VALUES
('第1レース', '2024-06-16', '19:15', '1200m', 'ダート', '晴', '良', '500万円'),
('第2レース', '2024-06-16', '19:45', '1400m', 'ダート', '晴', '良', '600万円'),
('第3レース', '2024-06-16', '20:15', '1600m', 'ダート', '晴', '良', '700万円');

-- 馬データ
INSERT INTO horses (name, age, sex, trainer, owner) VALUES
('オオイノホシ', 4, '牡', '佐藤一郎', '○○牧場'),
('ダートキング', 5, '牡', '鈴木次郎', '△△ファーム'),
('スピードスター', 3, '牝', '田中四郎', '□□牧場'),
('パワフルランナー', 6, '牡', '山田六郎', '◇◇牧場');

-- 出走データ
INSERT INTO entries (race_id, horse_id, horse_number, frame_number, weight, jockey) VALUES
(1, 1, 1, 1, 56, '田中太郎'),
(1, 2, 2, 1, 57, '山田花子'),
(1, 3, 3, 2, 54, '高橋三郎'),
(1, 4, 4, 2, 58, '佐藤五郎');

-- 馬の動きデータ
INSERT INTO horse_metrics (horse_id, race_id, hind_leg_step, front_leg_leading, front_leg_non_leading, stride, neck_height, neck_swing, bpm_chasing, bpm_sprint) VALUES
(1, 1, '深い', '良好', '安定', '大', '適正', 'リズミカル', 85, 110),
(2, 1, '普通', 'やや硬い', '普通', '中', 'やや高い', 'やや不安定', 78, 105),
(3, 1, '浅い', '柔軟', '良好', '小', '低い', '安定', 92, 125),
(4, 1, '非常に深い', '力強い', '安定', '大', '適正', '力強い', 80, 108);
