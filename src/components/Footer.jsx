import React from 'react'
import { Globe, Facebook, Instagram } from 'lucide-react'

function Footer() {
  const footerSections = [
    {
      title: 'Support',
      links: [
        { name: 'Help Center', to: '/help' },
        { name: 'Get help with a safety issue', to: '/safety' },
        { name: 'AirCover', to: '/aircover' },
        { name: 'Anti-discrimination', to: '/anti-discrimination' },
        { name: 'Disability support', to: '/disability-support' },
        { name: 'Cancellation options', to: '/cancellation' },
        { name: 'Report neighborhood concern', to: '/neighborhood-concern' },
      ],
    },
    {
      title: 'Hosting',
      links: [
        { name: 'Airbnb your home', to: '/host/home' },
        { name: 'Airbnb your experience', to: '/host/experience' },
        { name: 'Airbnb your service', to: '/host/service' },
        { name: 'AirCover for Hosts', to: '/host/aircover' },
        { name: 'Hosting resources', to: '/host/resources' },
        { name: 'Community forum', to: '/host/forum' },
        { name: 'Hosting responsibly', to: '/host/responsibly' },
        { name: 'Airbnb-friendly apartments', to: '/host/apartments' },
        { name: 'Join a free Hosting class', to: '/host/class' },
        { name: 'Find a co-host', to: '/host/co-host' },
      ],
    },
    {
      title: 'Airbnb',
      links: [
        { name: '2025 Summer Release', to: '/release' },
        { name: 'Newsroom', to: '/newsroom' },
        { name: 'Careers', to: '/careers' },
        { name: 'Investors', to: '/investors' },
        { name: 'Gift cards', to: '/gift-cards' },
        { name: 'Airbnb.org emergency stays', to: '/airbnb-org' },
      ],
    },
  ]

  return (
    <footer className="bg-[#fafafa] text-m text-gray-800 py-8 px-12 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-3 text-gray-800">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.to}
                      className="text-gray-700 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-s text-gray-600 font-semibold">
          <div className="flex flex-wrap gap-2 items-center">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <a href="/terms" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="/sitemap" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="/privacy-settings" className="hover:underline flex items-center gap-1">
              Your Privacy Choices
             
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </div>
            <span>$ USD</span>
            <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-500" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer