-- Create check_ins table (QR code check-ins at trailheads)
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) ON DELETE CASCADE NOT NULL,
  party_size INTEGER DEFAULT 1 CHECK (party_size >= 1 AND party_size <= 50),
  activity_type TEXT,
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for trail_id and date range queries (critical for reporting)
CREATE INDEX IF NOT EXISTS idx_checkins_trail_date ON check_ins(trail_id, checked_in_at);

-- Create index for activity type aggregations
CREATE INDEX IF NOT EXISTS idx_checkins_activity_type ON check_ins(activity_type);

-- Create index for date-based queries
CREATE INDEX IF NOT EXISTS idx_checkins_checked_in_at ON check_ins(checked_in_at);

-- Enable Row Level Security
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert check-ins (no auth required for QR check-ins)
CREATE POLICY "Anyone can create check-ins"
  ON check_ins FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users can read check-ins (for admin dashboard)
CREATE POLICY "Authenticated users can view check-ins"
  ON check_ins FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create view for daily check-in counts (privacy-safe, no PII)
CREATE OR REPLACE VIEW daily_trail_counts AS
SELECT
  trail_id,
  DATE(checked_in_at) as check_in_date,
  SUM(party_size) as total_visitors,
  COUNT(*) as check_in_count
FROM check_ins
GROUP BY trail_id, DATE(checked_in_at);

-- Grant select on the view to anonymous users
GRANT SELECT ON daily_trail_counts TO anon;
