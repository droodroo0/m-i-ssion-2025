// Configuration pour Google Analytics et Web Vitals

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Configuration Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Initialiser Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Suivre les pages vues
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Suivre les événements
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Suivre les Web Vitals
export const trackWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }

  // Log en console pour le développement
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
}

// Suivre les erreurs
export const trackError = (error: Error, errorInfo?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    })
  }

  // Log en console
  console.error('Tracked Error:', error, errorInfo)
}

// Suivre les conversions
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent({
    action: 'conversion',
    category: 'Engagement',
    label: conversionType,
    value: value
  })
}

// Suivre les interactions utilisateur
export const trackUserInteraction = (element: string, action: string) => {
  trackEvent({
    action: action,
    category: 'User Interaction',
    label: element
  })
}

// Suivre le temps passé sur la page
export const trackTimeOnPage = () => {
  const startTime = Date.now()
  
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackEvent({
      action: 'time_on_page',
      category: 'Engagement',
      label: window.location.pathname,
      value: timeSpent
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }
}

// Suivre les clics sur les liens externes
export const trackExternalLinks = () => {
  if (typeof window !== 'undefined') {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.hostname !== window.location.hostname) {
        trackEvent({
          action: 'click',
          category: 'External Link',
          label: link.href
        })
      }
    })
  }
}

// Suivre les téléchargements
export const trackDownloads = () => {
  if (typeof window !== 'undefined') {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href) {
        const fileExtensions = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|exe|dmg)$/i
        if (fileExtensions.test(link.href)) {
          trackEvent({
            action: 'download',
            category: 'File Download',
            label: link.href
          })
        }
      }
    })
  }
}

// Suivre les erreurs 404
export const track404 = (path: string) => {
  trackEvent({
    action: '404',
    category: 'Error',
    label: path
  })
}

// Suivre les recherches
export const trackSearch = (query: string, results: number) => {
  trackEvent({
    action: 'search',
    category: 'Site Search',
    label: query,
    value: results
  })
}

// Configuration pour le consentement RGPD
export const updateConsentMode = (consent: {
  analytics: boolean
  marketing: boolean
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
    })
  }
}

// Initialiser le consentement par défaut
export const initConsentMode = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      wait_for_update: 500,
    })
  }
}