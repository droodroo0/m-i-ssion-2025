import React, { useState } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import ConsentBanner from './ConsentBanner'
import { NotificationManager } from './ConsentNotification'
import TrackingScript from './TrackingScript'

interface LayoutProps {
  children: React.ReactNode
  currentPath?: string
  className?: string
}

export default function Layout({ children, currentPath, className = '' }: LayoutProps) {
  const [consent, setConsent] = useState<{ analytics: boolean; marketing: boolean } | null>(null)

  const handleConsentChange = (consentData: { analytics: boolean; marketing: boolean }) => {
    setConsent(consentData)
  }

  return (
    <NotificationManager>
      <div className="min-h-screen flex flex-col">
        <Navigation currentPath={currentPath} />
        <main className={`flex-1 ${className}`}>{children}</main>
        <Footer />
        <ConsentBanner onConsentChange={handleConsentChange} />
        {consent && <TrackingScript consent={consent} />}
      </div>
    </NotificationManager>
  )
}
