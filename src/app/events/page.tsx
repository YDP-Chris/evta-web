import { Metadata } from 'next'
import Link from 'next/link'
import { mockEvents } from '@/lib/data/mock-events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join EVTA for group hikes, trail maintenance, and community events in the Elkin Valley.',
}

// TODO: Replace with Supabase query
async function getEvents() {
  // In production:
  // const supabase = await createClient()
  // const { data } = await supabase
  //   .from('events')
  //   .select('*')
  //   .gte('datetime', new Date().toISOString())
  //   .order('datetime')
  // return data || []

  return mockEvents
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-evta-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Events</h1>
          <p className="text-evta-green-100 text-lg">
            Join us for group hikes, trail maintenance, and community gatherings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Meetup Link */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">Join Our Meetup Community</h2>
              <p className="text-sm text-gray-600">
                1,015+ members • 240+ past events • 4.9 rating
              </p>
            </div>
            <a
              href="https://www.meetup.com/mstsegment6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#f64060] text-white font-semibold rounded-lg hover:bg-[#e53557] transition-colors touch-target"
            >
              Join on Meetup →
            </a>
          </div>
        </div>

        {/* Events List */}
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => {
              const date = formatDate(event.datetime)
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex">
                    {/* Date Column */}
                    <div className="flex-shrink-0 w-20 md:w-24 bg-evta-green-50 flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-xs text-evta-green-600 font-medium uppercase">
                        {date.weekday}
                      </span>
                      <span className="text-2xl md:text-3xl font-bold text-evta-green-800">
                        {date.day}
                      </span>
                      <span className="text-xs text-evta-green-600 font-medium uppercase">
                        {date.month}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {date.time}
                            {event.venue && (
                              <>
                                {' • '}
                                {event.venue.name}
                              </>
                            )}
                          </p>
                          {event.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                          <p className="text-sm text-evta-green-600 mt-2">
                            {event.attendee_count} attending
                          </p>
                        </div>

                        {/* RSVP Button */}
                        {event.rsvp_url && (
                          <a
                            href={event.rsvp_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 bg-evta-green-600 text-white font-medium rounded-lg hover:bg-evta-green-700 transition-colors touch-target whitespace-nowrap"
                          >
                            RSVP on Meetup
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 mb-4">No upcoming events scheduled.</p>
            <a
              href="https://www.meetup.com/mstsegment6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-evta-green-600 hover:underline"
            >
              Check Meetup for updates →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
