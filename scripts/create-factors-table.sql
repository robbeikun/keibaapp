-- ファクターテーブルの作成
CREATE TABLE factors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  importance VARCHAR(10) NOT NULL CHECK (importance IN ('高', '中', '低')),
  check_points TEXT[], -- チェックポイントの配列
  important_races TEXT[], -- 重要なレースの配列
  featured_horses TEXT[], -- 注目馬の配列
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_factors_category ON factors(category);
CREATE INDEX idx_factors_importance ON factors(importance);
CREATE INDEX idx_factors_name ON factors(name);

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_factors_updated_at 
    BEFORE UPDATE ON factors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
