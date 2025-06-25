-- レースメモテーブルの作成
CREATE TABLE race_memos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  race_id INTEGER REFERENCES races(id),
  memo TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, race_id)
);

-- インデックス作成
CREATE INDEX idx_race_memos_user_race ON race_memos(user_id, race_id);

-- 更新日時の自動更新トリガー
CREATE TRIGGER update_race_memos_updated_at 
    BEFORE UPDATE ON race_memos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
