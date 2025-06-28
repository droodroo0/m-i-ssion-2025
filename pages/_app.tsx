import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/globals.css'
import '../styles/performance.css'
import { trackPageView, trackWebVitals, initGA, trackTimeOnPage, trackExternalLinks, trackDownloads, initConsentMode } from '../lib/analytics'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialiser le mode de consentement RGPD
    initConsentMode()
    
    // Initialiser Google Analytics
    initGA()
    
    // Suivre les changements de page
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    // Initialiser le tracking des interactions
    trackTimeOnPage()
    trackExternalLinks()
    trackDownloads()
    
    // Précharger les ressources critiques
    const preloadCriticalResources = () => {
      // Précharger les polices
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      fontLink.href = '/fonts/inter-regular.woff2'
      document.head.appendChild(fontLink)
    }
    
    preloadCriticalResources()
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="M-I-SSION - Révélez la puissance de vos équipes grâce à l'IA et l'automatisation" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Préconnexions pour les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Métadonnées de sécurité */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* PWA et mobile */}
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// Fonction pour reporter les Web Vitals
export function reportWebVitals(metric: any) {
  trackWebVitals(metric)
}