import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { mockTrails } from '@/lib/data/mock-trails'
import { MapWrapper } from '@/components/maps/MapWrapper'
import { cn } from '@/lib/utils/cn'

interface TrailPageProps {
  params: Promise<{ slug: string }>
}

// TODO: Replace with Supabase query
async function getTrail(slug: string) {
  return mockTrails.find((t) => t.slug === slug) || null
}

async function getAllTrailSlugs() {
  return mockTrails.map((t) => t.slug)
}

export async function generateStaticParams() {
  const slugs = await getAllTrailSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TrailPageProps): Promise<Metadata> {
  const { slug } = await params
  const trail = await getTrail(slug)

  if (!trail) {
    return { title: 'Trail Not Found' }
  }

  return {
    title: trail.name,
    description: trail.short_description || trail.description?.slice(0, 160),
    openGraph: {
      title: trail.name,
      description: trail.short_description || undefined,
      type: 'article',
    },
  }
}

// Clean status styles
const statusStyles = {
  Open: 'bg-evta-green-600 text-white',
  Caution: 'bg-amber-500 text-white',
  Closed: 'bg-gray-500 text-white',
}

// Difficulty badge styles
const difficultyStyles = {
  Easy: 'bg-evta-green-100 text-evta-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Difficult: 'bg-red-100 text-red-700',
}

// Activity SVG icons
const ActivityIcon = ({ activity }: { activity: string }) => {
  switch (activity) {
    case 'Hike':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    case 'Bike':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'Paddle':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    case 'Equestrian':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    default:
      return null
  }
}

export default async function TrailPage({ params }: TrailPageProps) {
  const { slug } = await params
  const trail = await getTrail(slug)

  if (!trail) {
    notFound()
  }

  const googleMapsUrl = trail.trailhead_lat && trail.trailhead_lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${trail.trailhead_lat},${trail.trailhead_lng}`
    : null

  const appleMapsUrl = trail.trailhead_lat && trail.trailhead_lng
    ? `https://maps.apple.com/?daddr=${trail.trailhead_lat},${trail.trailhead_lng}`
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-evta-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-evta-green-200">
              <li>
                <Link href="/trails" className="hover:text-white transition-colors">
                  Trails
                </Link>
              </li>
              <li className="text-evta-green-400">/</li>
              <li className="text-white">{trail.name}</li>
            </ol>
          </nav>

          {/* Title and Status */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{trail.name}</h1>
              {trail.short_description && (
                <p className="text-evta-green-100 text-lg">{trail.short_description}</p>
              )}
            </div>
            <span
              className={cn(
                'px-4 py-2 rounded-full font-semibold shadow-sm',
                statusStyles[trail.status]
              )}
            >
              {trail.status}
            </span>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {trail.status !== 'Open' && trail.status_note && (
        <div className={cn(
          'border-b',
          trail.status === 'Caution' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
        )}>
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-start gap-3">
              <svg className={cn('w-5 h-5 mt-0.5 flex-shrink-0', trail.status === 'Caution' ? 'text-amber-600' : 'text-red-600')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <h3 className={cn(
                  'font-semibold',
                  trail.status === 'Caution' ? 'text-amber-800' : 'text-red-800'
                )}>
                  Trail {trail.status}
                </h3>
                <p className={trail.status === 'Caution' ? 'text-amber-700' : 'text-red-700'}>
                  {trail.status_note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trail Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Trail Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trail.distance_miles && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Distance</p>
                    <p className="text-2xl font-semibold text-gray-900">{trail.distance_miles} mi</p>
                  </div>
                )}
                {trail.elevation_gain_ft && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Elevation Gain</p>
                    <p className="text-2xl font-semibold text-gray-900">{trail.elevation_gain_ft} ft</p>
                  </div>
                )}
                {trail.difficulty && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Difficulty</p>
                    <span className={cn('inline-block px-3 py-1 rounded-full text-sm font-semibold', difficultyStyles[trail.difficulty])}>
                      {trail.difficulty}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Activities</p>
                  <div className="flex gap-2">
                    {trail.activity_types.map((activity) => (
                      <span key={activity} className="text-gray-700" title={activity}>
                        <ActivityIcon activity={activity} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {trail.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold mb-4">About This Trail</h2>
                <p className="text-gray-700 leading-relaxed">{trail.description}</p>
              </div>
            )}

            {/* Features */}
            {trail.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {trail.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-evta-green-50 text-evta-green-700 border border-evta-green-100 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Trail Map</h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <MapWrapper trail={trail} className="h-full" />
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Navigation Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Get There</h2>
              {trail.parking_info && (
                <p className="text-sm text-gray-600 mb-4">{trail.parking_info}</p>
              )}
              <div className="space-y-3">
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-evta-green-600 text-white font-semibold rounded-lg hover:bg-evta-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Navigate with Google Maps
                  </a>
                )}
                {appleMapsUrl && (
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-evta-green-600 text-evta-green-600 font-semibold rounded-lg hover:bg-evta-green-50 transition-colors"
                  >
                    Navigate with Apple Maps
                  </a>
                )}
              </div>
            </div>

            {/* Check-in Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-2">At the Trail?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Check in to help us track trail usage for grants and improvements.
              </p>
              <Link
                href={`/checkin/${trail.slug}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-evta-brown-600 text-white font-semibold rounded-lg hover:bg-evta-brown-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check In Now
              </Link>
            </div>

            {/* Activity Types */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Activities</h2>
              <div className="space-y-3">
                {trail.activity_types.map((activity) => (
                  <div key={activity} className="flex items-center gap-3 text-gray-700">
                    <span className="w-8 h-8 flex items-center justify-center bg-evta-green-50 rounded-lg text-evta-green-600">
                      <ActivityIcon activity={activity} />
                    </span>
                    <span className="font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
