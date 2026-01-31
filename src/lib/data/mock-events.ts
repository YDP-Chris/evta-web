import { Event } from '@/types'

export const mockEvents: Event[] = [
  {
    id: '1',
    meetup_id: 'event-1',
    title: 'Saturday Morning Group Hike',
    description: 'Join us for a casual group hike at Grassy Creek Trail. All skill levels welcome! We\'ll meet at the trailhead parking lot and hike at a relaxed pace. Dogs are welcome on leash.',
    datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    venue: {
      name: 'Grassy Creek Trailhead',
      address: '123 Trail Road',
      city: 'Elkin',
      state: 'NC',
    },
    attendee_count: 12,
    rsvp_url: 'https://www.meetup.com/mstsegment6/events/123',
    synced_at: new Date().toISOString(),
  },
  {
    id: '2',
    meetup_id: 'event-2',
    title: 'Trail Maintenance Day',
    description: 'Help us maintain the Carter Falls Trail! We\'ll be clearing brush, fixing erosion, and improving trail markers. Bring work gloves and water. Tools provided.',
    datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    venue: {
      name: 'Carter Falls Trailhead',
      address: '456 Mountain View Dr',
      city: 'Elkin',
      state: 'NC',
    },
    attendee_count: 8,
    rsvp_url: 'https://www.meetup.com/mstsegment6/events/456',
    synced_at: new Date().toISOString(),
  },
  {
    id: '3',
    meetup_id: 'event-3',
    title: 'Full Moon Night Hike',
    description: 'Experience the trails under the full moon! This moderate 3-mile hike will take us through the forest with minimal flashlight use. Headlamps recommended as backup.',
    datetime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
    venue: {
      name: 'Elkin Creek Greenway',
      address: 'Crater Park',
      city: 'Elkin',
      state: 'NC',
    },
    attendee_count: 20,
    rsvp_url: 'https://www.meetup.com/mstsegment6/events/789',
    synced_at: new Date().toISOString(),
  },
]
