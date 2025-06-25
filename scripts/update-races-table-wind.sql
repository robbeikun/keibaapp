-- racesテーブルに風向きと風速のカラムを追加
ALTER TABLE races ADD COLUMN IF NOT EXISTS wind_direction VARCHAR(10);
ALTER TABLE races ADD COLUMN IF NOT EXISTS wind_speed DECIMAL(3,1);

-- 既存のレースデータに風向きと風速を追加
UPDATE races SET 
  wind_direction = '北東',
  wind_speed = 3.2
WHERE id = 1;

UPDATE races SET 
  wind_direction = '南西',
  wind_speed = 5.8
WHERE id = 2;

UPDATE races SET 
  wind_direction = '北',
  wind_speed = 2.1
WHERE id = 3;

-- 新しいサンプルデータ
INSERT INTO races (name, date, time, distance, surface, weather, track_condition, wind_direction, wind_speed, purse) VALUES
('第5レース', '2024-06-16', '21:15', '1800m', 'ダート', '曇', '稍重', '西', 7.3, '800万円'),
('第6レース', '2024-06-16', '21:45', '1000m', 'ダート', '雨', '重', '南', 12.5, '600万円');
