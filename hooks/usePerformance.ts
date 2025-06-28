import { useEffect, useState, useCallback } from 'react'

// Hook pour mesurer les performances
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    fcp: 0, // First Contentful Paint
    lcp: 0, // Largest Contentful Paint
    fid: 0, // First Input Delay
    cls: 0, // Cumulative Layout Shift
    ttfb: 0 // Time to First Byte
  })

  useEffect(() => {
    // Mesurer TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        ttfb: navigation.responseStart - navigation.requestStart
      }))
    }

    // Observer pour LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Observer pour FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Observer pour CLS
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          setMetrics(prev => ({ ...prev, cls: clsValue }))
        }
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    return () => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  return metrics
}

// Hook pour optimiser les re-renders
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook pour la gestion de la visibilité des éléments
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef, options, hasIntersected])

  return { isIntersecting, hasIntersected }
}

// Hook pour précharger les ressources
export function usePreloadResource() {
  const preloadImage = useCallback((src: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }, [])

  const preloadScript = useCallback((src: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'script'
    link.href = src
    document.head.appendChild(link)
  }, [])

  const preloadFont = useCallback((src: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = src
    document.head.appendChild(link)
  }, [])

  return { preloadImage, preloadScript, preloadFont }
}

// Hook pour la gestion du cache local
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}