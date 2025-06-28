import { useEffect } from 'react'
import Script from 'next/script'

interface OptimizedScriptProps {
  src: string
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload'
  onLoad?: () => void
  onError?: () => void
  id?: string
  defer?: boolean
  async?: boolean
}

export default function OptimizedScript({
  src,
  strategy = 'lazyOnload',
  onLoad,
  onError,
  id,
  defer = true,
  async = true
}: OptimizedScriptProps) {
  useEffect(() => {
    // Préconnexion pour les domaines externes
    const domain = new URL(src).hostname
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = `https://${domain}`
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [src])

  return (
    <Script
      id={id}
      src={src}
      strategy={strategy}
      onLoad={onLoad}
      onError={onError}
      defer={defer}
      async={async}
    />
  )
}

// Hook pour charger des scripts de manière conditionnelle
export function useConditionalScript({
  src,
  condition,
  strategy = 'lazyOnload'
}: {
  src: string
  condition: boolean
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload'
}) {
  useEffect(() => {
    if (!condition) return

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.defer = true
    
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [src, condition])
}