-- 馬テーブルにクラス情報を追加
ALTER TABLE horses ADD COLUMN IF NOT EXISTS class VARCHAR(10) DEFAULT 'C3';

-- サンプルデータの更新
UPDATE horses SET class = 'C1' WHERE name = 'オオイノホシ';
UPDATE horses SET class = 'B3' WHERE name = 'ダートキング';
UPDATE horses SET class = 'C2' WHERE name = 'スピードスター';
UPDATE horses SET class = 'B2' WHERE name = 'パワフルランナー';

-- 追加の馬データ
INSERT INTO horses (name, age, sex, trainer, owner, class) VALUES
('ライトニングボルト', 4, '牝', '高橋八郎', '☆☆牧場', 'C1'),
('サンダーストーム', 5, '牡', '伊藤九郎', '※※ファーム', 'B1'),
('ウィンドダンサー', 3, '牝', '渡辺十郎', '♪♪牧場', 'C3'),
('ファイアーキング', 6, '牡', '中村十一', '♭♭牧場', 'A3');

-- 追加の馬の動きデータ
INSERT INTO horse_metrics (horse_id, race_id, hind_leg_step, front_leg_leading, front_leg_non_leading, stride, neck_height, neck_swing, bmp_chasing, bmp_sprint) VALUES
(5, 1, '深い', '安定', '良好', '中', '適正', '良好', 88, 118),
(6, 1, '非常に深い', '力強い', '安定', '大', 'やや高い', '力強い', 75, 102),
(7, 1, '浅い', '柔軟', '柔軟', '小', '低い', 'リズミカル', 95, 130),
(8, 1, '深い', '良好', '安定', '大', '適正', '安定', 82, 112);
