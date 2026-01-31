'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    name: 'Trails',
    href: '/admin/trails',
    icon: '🥾',
  },
  {
    name: 'Conditions',
    href: '/admin/conditions',
    icon: '⚠️',
  },
  {
    name: 'Check-ins',
    href: '/admin/checkins',
    icon: '📍',
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: '📅',
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-52px)]">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                isActive
                  ? 'bg-evta-green-50 text-evta-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
          Quick Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Trails</span>
            <span className="font-semibold">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-ins (today)</span>
            <span className="font-semibold">--</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Upcoming events</span>
            <span className="font-semibold">3</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
