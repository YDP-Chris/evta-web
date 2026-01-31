import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Elkin Valley Trails | Explore Yadkin Valley',
    template: '%s | Elkin Valley Trails',
  },
  description: 'Discover hiking, biking, paddling, and equestrian trails in the Elkin Valley. Find trail maps, conditions, events, and check in at trailheads.',
  keywords: ['hiking', 'biking', 'trails', 'Elkin', 'Yadkin Valley', 'North Carolina', 'outdoor recreation'],
  authors: [{ name: 'Elkin Valley Trails Association' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elkinvalleytrails.org',
    siteName: 'Elkin Valley Trails',
    title: 'Elkin Valley Trails | Explore Yadkin Valley',
    description: 'Discover hiking, biking, paddling, and equestrian trails in the Elkin Valley.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elkin Valley Trails',
    description: 'Discover trails in the Elkin Valley',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
