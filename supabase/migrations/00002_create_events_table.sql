-- Create events table (for caching Meetup events)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  datetime TIMESTAMPTZ NOT NULL,
  venue JSONB,
  attendee_count INTEGER DEFAULT 0,
  rsvp_url TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for datetime ordering
CREATE INDEX IF NOT EXISTS idx_events_datetime ON events(datetime);

-- Create index for meetup_id lookups
CREATE INDEX IF NOT EXISTS idx_events_meetup_id ON events(meetup_id);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read events
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

-- Policy: Only service role can insert/update/delete events (for sync job)
CREATE POLICY "Service role can manage events"
  ON events FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
