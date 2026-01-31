import Link from 'next/link'
import { mockTrails } from '@/lib/data/mock-trails'
import { mockEvents } from '@/lib/data/mock-events'

export default function HomePage() {
  // Get featured trails (first 3)
  const featuredTrails = mockTrails.slice(0, 3)
  // Get upcoming events (first 3)
  const upcomingEvents = mockEvents.slice(0, 3)
  // Check for any trail alerts
  const alertTrails = mockTrails.filter(t => t.status !== 'Open')

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ============================================
          HERO SECTION - Immersive Full Screen
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient" />

        {/* Floating decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-evta-green-400/20 blob float blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-evta-green-300/15 blob float-delayed blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 blob float blur-2xl" />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 grain" />

        {/* Subtle tree pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="trees" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 10 L55 35 L48 35 L60 60 L20 60 L32 35 L25 35 Z" fill="currentColor" className="text-white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trees)" />
          </svg>
        </div>

        {/* Gradient fade at edges */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-evta-green-900/80 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-evta-green-900/30 to-transparent" />

        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          {/* Badge */}
          <div className="fade-in-up mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium shimmer">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              30+ Miles of Trails in the Yadkin Valley
            </span>
          </div>

          {/* Main heading with gradient text effect */}
          <h1 className="fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white drop-shadow-2xl">Discover the</span>
            <span className="block gradient-text text-transparent bg-clip-text mt-2">
              Elkin Valley Trails
            </span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up delay-200 text-xl md:text-2xl mb-12 text-evta-green-100/90 max-w-3xl mx-auto leading-relaxed font-light">
            Scenic hiking, mountain biking, paddling, and equestrian trails
            nestled in North Carolina&apos;s beautiful Yadkin Valley
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/trails"
              className="group glow-button relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-evta-green-800 font-bold text-lg rounded-2xl hover:bg-evta-green-50 transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find Your Trail
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/map"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View Trail Map
            </Link>
          </div>

          {/* Stats with glass effect */}
          <div className="fade-in-up delay-400 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { value: '26', label: 'Trail Segments' },
              { value: '70', label: 'MST Miles' },
              { value: '1K+', label: 'Community Members' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-4 md:p-6 hover-lift">
                <div className="text-3xl md:text-5xl font-black mb-1">{stat.value}</div>
                <div className="text-evta-green-200/80 text-xs md:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 scroll-indicator">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Scroll</span>
            <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          ACTIVITY CARDS - Choose Your Adventure
          ============================================ */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-evta-green-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-evta-green-100 text-evta-green-700 rounded-full text-sm font-semibold mb-4">
              Find Your Adventure
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Choose Your <span className="gradient-text">Trail Type</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you prefer hiking, biking, paddling, or horseback riding,
              we have the perfect trail waiting for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Hiking',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                desc: 'Scenic forest trails for all skill levels',
                href: '/trails?activity=Hike',
                gradient: 'from-green-500 to-emerald-600',
                bgLight: 'bg-green-50',
                textColor: 'text-green-600'
              },
              {
                name: 'Mountain Biking',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="5" cy="17" r="3" strokeWidth={1.5} />
                    <circle cx="19" cy="17" r="3" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17V9l4-4M12 9L8 17M8 17l4-4" />
                  </svg>
                ),
                desc: 'Singletrack and flow trails',
                href: '/trails?activity=Bike',
                gradient: 'from-amber-500 to-orange-600',
                bgLight: 'bg-amber-50',
                textColor: 'text-amber-600'
              },
              {
                name: 'Paddling',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                desc: 'River routes on the Yadkin',
                href: '/trails?activity=Paddle',
                gradient: 'from-blue-500 to-cyan-600',
                bgLight: 'bg-blue-50',
                textColor: 'text-blue-600'
              },
              {
                name: 'Equestrian',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                desc: 'Horse-friendly multi-use trails',
                href: '/trails?activity=Equestrian',
                gradient: 'from-amber-600 to-yellow-600',
                bgLight: 'bg-yellow-50',
                textColor: 'text-amber-700'
              },
            ].map((activity, i) => (
              <Link
                key={activity.name}
                href={activity.href}
                className="group relative rounded-3xl p-8 transition-all duration-500 hover-lift tilt-card bg-white border border-gray-100 shadow-sm hover:shadow-2xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${activity.bgLight} group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500`}>
                    <span className={`${activity.textColor} group-hover:text-white transition-colors duration-500`}>
                      {activity.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-500">
                    {activity.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 text-sm mb-4 transition-colors duration-500">
                    {activity.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-evta-green-600 group-hover:text-white transition-colors duration-500">
                    Explore trails
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TRAIL ALERTS BANNER
          ============================================ */}
      {alertTrails.length > 0 && (
        <section className="py-4 px-4 bg-amber-500 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-2 font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Trail Alerts:
              </span>
              {alertTrails.map(trail => (
                <Link
                  key={trail.id}
                  href={`/trails/${trail.slug}`}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                >
                  {trail.name}: {trail.status}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FEATURED TRAILS
          ============================================ */}
      <section className="py-24 px-4 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-evta-green-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="inline-block px-4 py-2 bg-evta-green-100 text-evta-green-700 rounded-full text-sm font-semibold mb-4">
                Popular Destinations
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                Featured <span className="gradient-text">Trails</span>
              </h2>
              <p className="text-xl text-gray-600">
                Start your adventure with these community favorites
              </p>
            </div>
            <Link
              href="/trails"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-evta-green-600 hover:text-evta-green-700 font-bold text-lg animated-underline"
            >
              View all trails
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTrails.map((trail, i) => (
              <Link
                key={trail.id}
                href={`/trails/${trail.slug}`}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Image area with gradient */}
                <div className="aspect-[4/3] bg-gradient-to-br from-evta-green-400 via-evta-green-500 to-evta-green-600 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-white/10 rounded-full" />
                    <div className="absolute w-48 h-48 border border-white/5 rounded-full" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/20 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L7 9h2l-3 5h2l-4 6h16l-4-6h2l-3-5h2L12 2zm0 18v2h-1v-2h1z"/>
                    </svg>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                      trail.status === 'Open' ? 'bg-evta-green-600/90' :
                      trail.status === 'Caution' ? 'bg-amber-500/90' : 'bg-gray-500/90'
                    }`}>
                      {trail.status}
                    </span>
                  </div>

                  {/* Difficulty badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${
                      trail.difficulty === 'Easy' ? 'bg-white/90 text-evta-green-700' :
                      trail.difficulty === 'Moderate' ? 'bg-white/90 text-amber-700' : 'bg-white/90 text-red-700'
                    }`}>
                      {trail.difficulty}
                    </span>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-evta-green-600 transition-colors">
                    {trail.name}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                    {trail.short_description}
                  </p>

                  {/* Trail stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-5">
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-evta-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-evta-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </span>
                      <span className="font-semibold">{trail.distance_miles} mi</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-evta-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-evta-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </span>
                      <span className="font-semibold">{trail.elevation_gain_ft} ft</span>
                    </span>
                  </div>

                  {/* Activity tags */}
                  <div className="flex gap-2 flex-wrap">
                    {trail.activity_types.map(type => (
                      <span key={type} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          UPCOMING EVENTS
          ============================================ */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                Join the Community
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Events</span>
              </h2>
              <p className="text-xl text-gray-600">
                NC Trail Days, Tour de Vino, group hikes, and trail work days
              </p>
            </div>
            <Link
              href="/events"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-lg animated-underline"
            >
              View all events
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => {
              const date = new Date(event.datetime)
              return (
                <div
                  key={event.id}
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-7 hover:from-purple-50 hover:to-pink-50 transition-all duration-500 hover-lift border border-gray-100"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex gap-5">
                    {/* Date card */}
                    <div className="flex-shrink-0 w-20 bg-white rounded-2xl p-3 text-center shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-4xl font-black text-gray-900">
                        {date.getDate()}
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 truncate group-hover:text-purple-700 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </p>
                      {event.venue && (
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-2 truncate">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue.name}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        {event.attendee_count} attending
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Meetup CTA */}
          <div className="mt-14 text-center">
            <a
              href="https://www.meetup.com/mstsegment6/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f64060] to-[#ed3152] text-white font-bold text-lg rounded-2xl hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Join 1,015 Members on Meetup
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          OUR STORY - History Section
          ============================================ */}
      <section className="py-28 px-4 bg-evta-brown-50 relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-evta-brown-900"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-evta-brown-900"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-evta-brown-900"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-evta-brown-200 text-evta-brown-800 rounded-full text-sm font-semibold mb-4">
              Rooted in Community
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-evta-brown-700">Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              What started as a dream shared among neighbors has grown into a movement
              that&apos;s transforming the Yadkin Valley—one trail at a time.
            </p>
          </div>

          {/* Story narrative */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  <span className="text-2xl font-bold text-evta-green-700">Elkin</span> is a trail town
                  you don&apos;t want to miss. Nestled in the foothills where the Blue Ridge begins its
                  rise, our community sits at the confluence of Big Elkin Creek and the Yadkin River—waterways
                  that have shaped this land for millennia.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our mission is simple: <em className="text-evta-green-700 font-medium">&ldquo;Enrich the
                  quality of life in the region by building and promoting a network of multiuse trails.&rdquo;</em> We
                  envision trails that promote healthy lifestyles, provide educational and economic opportunities,
                  preserve regional history, and enable organized events—all while observing leave-no-trace principles.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, EVTA maintains <strong>26 trail segments</strong> including sections of the
                  Mountains to Sea Trail, mountain bike trails, vineyard paths, and the historic
                  Overmountain Victory Trail. We&apos;re an all-volunteer organization that gets things done.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-evta-green-400 via-evta-green-500 to-evta-green-600" />

              {[
                { year: '1896', title: 'Railroad Era Begins', desc: 'Elkin & Alleghany Railroad chartered, later becoming a trail corridor' },
                { year: '1910', title: 'Carter Falls Discovery', desc: 'Early hikers document visits to Carter Falls—a tradition continuing today' },
                { year: '2010s', title: 'EVTA Founded', desc: 'Volunteers unite to build and promote a network of multiuse trails' },
                { year: '2020s', title: 'Trail Network Expands', desc: 'Mountain bike trails, MST segments, and vineyard trails added' },
                { year: 'Today', title: '1,000+ Members', desc: 'Community milestone reached with 240+ events hosted' },
              ].map((milestone, i) => (
                <div key={i} className="relative pl-20 pb-10 last:pb-0">
                  <div className="absolute left-4 w-8 h-8 bg-white border-4 border-evta-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-evta-green-500 rounded-full" />
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="text-sm font-bold text-evta-green-600 mb-1">{milestone.year}</div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</div>
                    <div className="text-gray-600 text-sm">{milestone.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote callout */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-evta-green-400 to-evta-green-600" />
            <svg className="absolute top-6 right-6 w-16 h-16 text-evta-green-100" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">
                &ldquo;These trails aren&apos;t just paths through the woods. They&apos;re where my kids
                learned to ride bikes, where I&apos;ve made lifelong friends, and where our whole
                community comes together. That&apos;s something worth protecting.&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-evta-green-400 to-evta-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Community Member</div>
                  <div className="text-sm text-gray-500">EVTA Volunteer since 2019</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================
          THE PEOPLE - Volunteer Spotlight
          ============================================ */}
      <section className="py-28 px-4 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              The Heart of EVTA
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Volunteers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every mile of trail represents countless hours of volunteer work—people who
              show up with shovels, saws, and a shared love for this land.
            </p>
          </div>

          {/* Volunteer highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                role: 'Trail Builders',
                desc: 'The crews who carve new paths through forest and field, creating connections where none existed before.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                color: 'bg-amber-500'
              },
              {
                role: 'Trail Stewards',
                desc: 'Dedicated guardians who adopt sections of trail, keeping them clear, safe, and beautiful year-round.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                color: 'bg-rose-500'
              },
              {
                role: 'Hike Leaders',
                desc: 'Guides who welcome newcomers, share local knowledge, and help everyone feel at home on the trail.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'bg-evta-green-500'
              },
            ].map((volunteer, i) => (
              <div key={i} className="text-center group">
                <div className={`w-20 h-20 ${volunteer.color} rounded-3xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {volunteer.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{volunteer.role}</h3>
                <p className="text-gray-600 leading-relaxed">{volunteer.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to volunteer */}
          <div className="bg-gradient-to-br from-evta-green-50 to-evta-green-100 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Everyone Has Something to Give
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you have two hours or twenty, whether you&apos;re handy with tools or
              just love being outdoors—there&apos;s a place for you in our volunteer family.
            </p>
            <a
              href="https://www.meetup.com/mstsegment6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-evta-green-600 text-white font-bold text-lg rounded-2xl hover:bg-evta-green-700 transition-all duration-300 hover:shadow-xl"
            >
              Join a Trail Work Day
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          LAND & HERITAGE
          ============================================ */}
      <section className="py-28 px-4 bg-gradient-to-b from-evta-green-900 to-evta-green-950 text-white relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 grain" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-evta-green-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-evta-green-600/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-evta-green-200 rounded-full text-sm font-semibold mb-6">
            Honoring the Land
          </span>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            A Land Worth <span className="text-evta-green-400">Protecting</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-evta-green-100/90 leading-relaxed">
            <p>
              The Yadkin Valley has been home to people for over 12,000 years. The Saura and
              Catawba peoples walked these ridges and fished these waters long before European
              settlement. We honor their deep connection to this land.
            </p>
            <p>
              Our trails follow old logging roads, historic trading paths, and creek beds
              shaped by centuries of flow. When you walk here, you walk in the footsteps
              of generations who came before.
            </p>
            <p className="text-evta-green-300 font-medium">
              We believe that by caring for these trails today, we&apos;re not just
              building recreation—we&apos;re preserving a legacy for tomorrow.
            </p>
          </div>

          {/* Nature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: 'Native Tree Species', value: '50+' },
              { label: 'Bird Species Observed', value: '120+' },
              { label: 'Creek Miles', value: '15' },
              { label: 'Years of History', value: '12,000+' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{item.value}</div>
                <div className="text-sm text-white/80 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          COMMUNITY VOICES - Testimonials
          ============================================ */}
      <section className="py-28 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-evta-green-100 text-evta-green-700 rounded-full text-sm font-semibold mb-4">
              Community Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Stories from the <span className="gradient-text">Trail</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "After moving here from Charlotte, these trails helped me find my community. I've made more friends on hikes than anywhere else.",
                author: "Sarah T.",
                role: "Member since 2021",
                initials: "ST"
              },
              {
                quote: "My father walked these woods 50 years ago. Now I bring my grandchildren to the same creeks and bluffs. That continuity means everything.",
                author: "Robert M.",
                role: "Lifetime Elkin Resident",
                initials: "RM"
              },
              {
                quote: "The mountain bike trails gave my teenage son and me something to do together. We've logged hundreds of miles side by side.",
                author: "David K.",
                role: "Trail Volunteer",
                initials: "DK"
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover-lift relative"
              >
                <svg className="absolute top-6 right-6 w-10 h-10 text-evta-green-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-evta-green-400 to-evta-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          IMPACT STATS - Dark Section
          ============================================ */}
      <section className="py-28 px-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient" />

        {/* Floating orbs */}
        <div className="absolute top-10 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl float" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-evta-green-300/10 rounded-full blur-3xl float-delayed" />

        {/* Grain overlay */}
        <div className="absolute inset-0 grain" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 glass text-white rounded-full text-sm font-semibold mb-4">
              Our Community Impact
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Making a <span className="gradient-text">Difference</span>
            </h2>
            <p className="text-xl text-evta-green-200/80 max-w-2xl mx-auto">
              Together, we&apos;re building a legacy of trails for future generations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '240+', label: 'Events Hosted', icon: '🎉' },
              { value: '1,015', label: 'Community Members', icon: '👥' },
              { value: '4.9★', label: 'Meetup Rating', icon: '⭐' },
              { value: '30+', label: 'Miles Maintained', icon: '🛤️' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-6 md:p-8 text-center hover-lift group cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-evta-green-200/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-evta-green-200/80 mb-6 text-lg">
              Scan the QR code at any trailhead to check in and help us demonstrate community impact
            </p>
            <Link
              href="/trails"
              className="glow-button inline-flex items-center gap-3 px-10 py-5 bg-white text-evta-green-800 font-bold text-lg rounded-2xl hover:bg-evta-green-50 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10">Find a Trail to Explore</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          ABOUT / MISSION SECTION
          ============================================ */}
      <section className="py-28 px-4 bg-gradient-to-b from-evta-brown-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-evta-green-500 via-evta-green-400 to-evta-green-500" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Logo/badge area */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-evta-green-500 to-evta-green-600 rounded-2xl shadow-lg shadow-evta-green-500/30 pulse-glow">
              <span className="text-4xl">🌲</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            Join the <span className="gradient-text">Movement</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
            The Elkin Valley Trails Association is more than trails—it&apos;s a community of
            neighbors who believe in the power of nature to bring us together. Whether you
            hike, bike, paddle, or just love the outdoors, <strong>you belong here</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-evta-green-600 text-white font-bold text-lg rounded-2xl hover:bg-evta-green-700 transition-all duration-300 hover:shadow-xl hover:shadow-evta-green-600/25"
            >
              Learn More About EVTA
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://www.meetup.com/mstsegment6/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-evta-green-600 text-evta-green-700 font-bold text-lg rounded-2xl hover:bg-evta-green-50 transition-all duration-300"
            >
              Join Our Community
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
