// Trail types
export type ActivityType = 'Hike' | 'Bike' | 'Paddle' | 'Equestrian'
export type Difficulty = 'Easy' | 'Moderate' | 'Difficult'
export type TrailStatus = 'Open' | 'Caution' | 'Closed'

export type TrailFeature =
  | 'Dog-friendly'
  | 'Kid-friendly'
  | 'Accessible'
  | 'Waterfall'
  | 'Vineyard'
  | 'River Access'
  | 'Scenic Views'
  | 'Restrooms'
  | 'Parking'

export interface Trail {
  id: string
  slug: string
  name: string
  description: string | null
  short_description: string | null
  activity_types: ActivityType[]
  distance_miles: number | null
  elevation_gain_ft: number | null
  difficulty: Difficulty | null
  features: TrailFeature[]
  status: TrailStatus
  status_note: string | null
  geojson: GeoJSON.FeatureCollection | GeoJSON.Feature | null
  trailhead_lat: number | null
  trailhead_lng: number | null
  parking_info: string | null
  external_links: Record<string, string> | null
  images: string[]
  created_at: string
  updated_at: string
}

// Event types (from Meetup)
export interface EventVenue {
  name: string
  address?: string
  city?: string
  state?: string
  lat?: number
  lng?: number
}

export interface Event {
  id: string
  meetup_id: string
  title: string
  description: string | null
  datetime: string
  venue: EventVenue | null
  attendee_count: number
  rsvp_url: string | null
  synced_at: string
}

// Trail Condition types
export interface TrailCondition {
  id: string
  trail_id: string
  status: TrailStatus
  note: string | null
  reported_by: string | null
  created_at: string
}

// Check-in types
export interface CheckIn {
  id: string
  trail_id: string
  party_size: number
  activity_type: ActivityType | null
  checked_in_at: string
}

export interface CheckInFormData {
  party_size: number
  activity_type: ActivityType
}

// Filter types
export interface TrailFilters {
  activity?: ActivityType
  difficulty?: Difficulty
  features?: TrailFeature[]
  status?: TrailStatus
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Admin role types
export type UserRole = 'admin' | 'steward' | 'viewer'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  created_at: string
}
