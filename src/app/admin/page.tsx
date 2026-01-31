import Link from 'next/link'
import { mockTrails } from '@/lib/data/mock-trails'
import { mockEvents } from '@/lib/data/mock-events'

// TODO: Replace with Supabase queries
async function getDashboardStats() {
  const trails = mockTrails
  const closedTrails = trails.filter((t) => t.status === 'Closed')
  const cautionTrails = trails.filter((t) => t.status === 'Caution')

  return {
    totalTrails: trails.length,
    closedTrails: closedTrails.length,
    cautionTrails: cautionTrails.length,
    upcomingEvents: mockEvents.length,
    checkInsToday: 0, // TODO: Query from Supabase
    checkInsThisMonth: 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Alerts */}
      {(stats.closedTrails > 0 || stats.cautionTrails > 0) && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h2 className="font-semibold text-amber-800 mb-2">Trail Alerts</h2>
          <ul className="text-sm text-amber-700 space-y-1">
            {stats.closedTrails > 0 && (
              <li>🚫 {stats.closedTrails} trail(s) currently closed</li>
            )}
            {stats.cautionTrails > 0 && (
              <li>⚠️ {stats.cautionTrails} trail(s) have caution status</li>
            )}
          </ul>
          <Link
            href="/admin/conditions"
            className="inline-block mt-2 text-sm text-amber-800 hover:underline font-medium"
          >
            Manage conditions →
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Trails"
          value={stats.totalTrails}
          icon="🥾"
          href="/admin/trails"
        />
        <StatCard
          title="Check-ins Today"
          value={stats.checkInsToday}
          icon="📍"
          href="/admin/checkins"
        />
        <StatCard
          title="Check-ins This Month"
          value={stats.checkInsThisMonth}
          icon="📈"
          href="/admin/checkins"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon="📅"
          href="/admin/events"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/conditions"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-medium text-gray-900">Update Trail Conditions</p>
              <p className="text-sm text-gray-500">Mark trails open, caution, or closed</p>
            </div>
          </Link>
          <Link
            href="/admin/checkins"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-medium text-gray-900">View Check-in Stats</p>
              <p className="text-sm text-gray-500">See usage data and export reports</p>
            </div>
          </Link>
          <a
            href="https://www.meetup.com/mstsegment6/events"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-medium text-gray-900">Manage Events</p>
              <p className="text-sm text-gray-500">Create events on Meetup</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Activity feed will appear here once Supabase is connected.</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  href,
}: {
  title: string
  value: number
  icon: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Link>
  )
}
