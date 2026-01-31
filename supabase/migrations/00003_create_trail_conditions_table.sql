-- Create trail_conditions table (audit log for status changes)
CREATE TABLE IF NOT EXISTS trail_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('Open', 'Caution', 'Closed')),
  note TEXT,
  reported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for trail_id lookups
CREATE INDEX IF NOT EXISTS idx_trail_conditions_trail_id ON trail_conditions(trail_id);

-- Create index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_trail_conditions_created_at ON trail_conditions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE trail_conditions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read trail conditions
CREATE POLICY "Trail conditions are viewable by everyone"
  ON trail_conditions FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert trail conditions
CREATE POLICY "Authenticated users can report conditions"
  ON trail_conditions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to update trails.status when new condition is logged
CREATE OR REPLACE FUNCTION update_trail_status_from_condition()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE trails
  SET
    status = NEW.status,
    status_note = NEW.note,
    updated_at = NOW()
  WHERE id = NEW.trail_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update trail status
CREATE TRIGGER sync_trail_status_on_condition
  AFTER INSERT ON trail_conditions
  FOR EACH ROW
  EXECUTE FUNCTION update_trail_status_from_condition();
