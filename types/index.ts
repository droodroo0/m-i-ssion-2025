// Types pour la gestion des cookies et du consentement RGPD
export interface CookieSettings {
  analytics: boolean
  marketing: boolean
}

export interface ConsentData {
  timestamp: number
  version: string
  settings: CookieSettings
}

// Types pour les composants
export interface CookieBannerProps {
  onAccept?: () => void
  onReject?: () => void
  onCustomize?: () => void
}

export interface CookiePreferencesProps {
  isOpen: boolean
  onClose: () => void
  initialSettings?: CookieSettings
}

// Types pour les événements personnalisés
export interface CustomEvents {
  openCookiePreferences: CustomEvent
  cookieConsentChanged: CustomEvent<CookieSettings>
}

// Types pour les pages légales
export interface LegalPageProps {
  lastUpdated?: string
  version?: string
}

// Types pour l'analytics
export interface AnalyticsConfig {
  trackingId: string
  anonymizeIp: boolean
  cookieDomain: string
  cookieExpires: number
}

// Types pour les métadonnées SEO
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

// Déclaration des événements personnalisés pour TypeScript
declare global {
  interface WindowEventMap {
    openCookiePreferences: CustomEvent
    cookieConsentChanged: CustomEvent<CookieSettings>
  }
}

export {}