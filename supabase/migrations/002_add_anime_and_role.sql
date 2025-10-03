-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Create anime table
CREATE TABLE IF NOT EXISTS anime (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  poster TEXT,
  description TEXT,
  genres TEXT[],
  status TEXT DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'cancelled')),
  release_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  anime_id UUID REFERENCES anime(id) ON DELETE CASCADE,
  ep_no INTEGER NOT NULL,
  title TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER, -- in seconds
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(anime_id, ep_no)
);

-- Update watchlist to reference anime table instead of text id
-- First, add new column
ALTER TABLE watchlist ADD COLUMN IF NOT EXISTS anime_uuid UUID REFERENCES anime(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_anime_title ON anime(title);
CREATE INDEX IF NOT EXISTS idx_anime_genres ON anime USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_episodes_anime_id ON episodes(anime_id);
CREATE INDEX IF NOT EXISTS idx_episodes_ep_no ON episodes(anime_id, ep_no);

-- Enable RLS
ALTER TABLE anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;

-- RLS policies for anime (publicly readable)
DROP POLICY IF EXISTS "Anime is publicly readable" ON anime;
DROP POLICY IF EXISTS "Admins can manage anime" ON anime;

CREATE POLICY "Anime is publicly readable" ON anime FOR SELECT USING (true);
CREATE POLICY "Admins can manage anime" ON anime FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- RLS policies for episodes (publicly readable)
DROP POLICY IF EXISTS "Episodes are publicly readable" ON episodes;
DROP POLICY IF EXISTS "Admins can manage episodes" ON episodes;

CREATE POLICY "Episodes are publicly readable" ON episodes FOR SELECT USING (true);
CREATE POLICY "Admins can manage episodes" ON episodes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);