-- Create trails table
CREATE TABLE IF NOT EXISTS trails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  activity_types TEXT[] NOT NULL DEFAULT '{}',
  distance_miles DECIMAL(4,1),
  elevation_gain_ft INTEGER,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Difficult')),
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Caution', 'Closed')),
  status_note TEXT,
  geojson JSONB,
  trailhead_lat DECIMAL(9,6),
  trailhead_lng DECIMAL(9,6),
  parking_info TEXT,
  external_links JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_trails_slug ON trails(slug);

-- Create index for filtering by activity types
CREATE INDEX IF NOT EXISTS idx_trails_activity_types ON trails USING GIN(activity_types);

-- Create index for filtering by features
CREATE INDEX IF NOT EXISTS idx_trails_features ON trails USING GIN(features);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_trails_status ON trails(status);

-- Enable Row Level Security
ALTER TABLE trails ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read trails
CREATE POLICY "Trails are viewable by everyone"
  ON trails FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can manage trails"
  ON trails FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_trails_updated_at
  BEFORE UPDATE ON trails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
