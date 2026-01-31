import Link from 'next/link'

const footerLinks = {
  trails: [
    { name: 'Find a Trail', href: '/trails' },
    { name: 'Trail Map', href: '/map' },
    { name: 'Trail Conditions', href: '/trails' },
    { name: 'Self-Guided Hikes', href: '/trails' },
  ],
  community: [
    { name: 'Events', href: '/events' },
    { name: 'Meetup Group', href: 'https://www.meetup.com/mstsegment6/', external: true },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'NC Trail Days', href: '/events' },
  ],
  about: [
    { name: 'About EVTA', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Donate', href: '/donate' },
    { name: 'Report Trail Issue', href: '/contact' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/ElkinValleyTrails' },
  { name: 'Instagram', href: 'https://instagram.com/elkinvalleytrails' },
  { name: 'Meetup', href: 'https://www.meetup.com/mstsegment6/' },
]

export function Footer() {
  return (
    <footer className="bg-evta-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg className="w-7 h-7 text-evta-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L7 9h2l-3 5h2l-4 6h16l-4-6h2l-3-5h2L12 2zm0 18v2h-1v-2h1z"/>
              </svg>
              <span className="font-bold text-lg">Elkin Valley Trails</span>
            </Link>
            <p className="text-evta-green-200 text-sm mb-4">
              Enriching the quality of life in the region by building and promoting a network of multiuse trails.
            </p>
            <div className="text-evta-green-300 text-sm space-y-1">
              <p>
                <a href="mailto:info@elkinvalleytrails.org" className="hover:text-white transition-colors">
                  info@elkinvalleytrails.org
                </a>
              </p>
              <p>PO Box 91, Elkin, NC 28621</p>
            </div>
          </div>

          {/* Trails */}
          <div>
            <h3 className="font-semibold mb-4">Trails</h3>
            <ul className="space-y-2">
              {footerLinks.trails.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-evta-green-200 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-evta-green-200 hover:text-white text-sm transition-colors"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-evta-green-200 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-8 pt-8 border-t border-evta-green-800">
          <div className="text-sm text-evta-green-300">
            <p className="mb-2 font-medium text-evta-green-200">EVTA Leadership</p>
            <p>Jason Taylor, Chairman · Bob Hillyer, Vice Chair · Dee Neil, Secretary · Megan Stainback, Treasurer</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-evta-green-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-evta-green-300 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} Elkin Valley Trails Association, Inc. All rights reserved.</p>
              <p className="text-evta-green-400">501(c)(3) Non-profit organization</p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-evta-green-300 hover:text-white transition-colors text-sm font-medium"
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-6 border-t border-evta-green-800/50 text-center">
          <p className="text-evta-green-500 text-xs">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://yadkindatapartners.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-evta-green-300 transition-colors"
            >
              Yadkin Data Partners
            </a>
            . Built with precision and purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}
