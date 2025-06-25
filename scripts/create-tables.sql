-- レーステーブル
CREATE TABLE races (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  distance VARCHAR(20) NOT NULL,
  surface VARCHAR(20) NOT NULL,
  weather VARCHAR(20),
  track_condition VARCHAR(20),
  grade VARCHAR(10),
  purse VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 馬テーブル
CREATE TABLE horses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  sex VARCHAR(5) NOT NULL,
  trainer VARCHAR(100),
  owner VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 出走テーブル
CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  race_id INTEGER REFERENCES races(id),
  horse_id INTEGER REFERENCES horses(id),
  horse_number INTEGER NOT NULL,
  frame_number INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  jockey VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 馬の動きデータテーブル
CREATE TABLE horse_metrics (
  id SERIAL PRIMARY KEY,
  horse_id INTEGER REFERENCES horses(id),
  race_id INTEGER REFERENCES races(id),
  hind_leg_step VARCHAR(50),
  front_leg_leading VARCHAR(50),
  front_leg_non_leading VARCHAR(50),
  stride VARCHAR(50),
  neck_height VARCHAR(50),
  neck_swing VARCHAR(50),
  bpm_chasing INTEGER,
  bpm_sprint INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ユーザー予想テーブル
CREATE TABLE myentries (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  race_id INTEGER REFERENCES races(id),
  horse_id INTEGER REFERENCES horses(id),
  mark VARCHAR(5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, race_id, horse_id)
);

-- インデックス作成
CREATE INDEX idx_entries_race_id ON entries(race_id);
CREATE INDEX idx_horse_metrics_race_id ON horse_metrics(race_id);
CREATE INDEX idx_myentries_user_race ON myentries(user_id, race_id);
