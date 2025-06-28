import { CookieManager } from '../lib/cookieManager'
import { CookieSettings } from '../types'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock updateConsentMode
jest.mock('../lib/analytics', () => ({
  updateConsentMode: jest.fn()
}))

describe('CookieManager', () => {
  let cookieManager: CookieManager

  beforeEach(() => {
    localStorageMock.clear()
    cookieManager = CookieManager.getInstance()
    // Reset singleton for testing
    ;(CookieManager as any).instance = undefined
    cookieManager = CookieManager.getInstance()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = CookieManager.getInstance()
      const instance2 = CookieManager.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('Consent Management', () => {
    it('should return false when no consent is stored', () => {
      expect(cookieManager.hasConsent()).toBe(false)
    })

    it('should return null when no settings are stored', () => {
      expect(cookieManager.getConsentSettings()).toBeNull()
    })

    it('should save and retrieve consent settings', () => {
      const settings: CookieSettings = {
        analytics: true,
        marketing: false
      }

      cookieManager.saveConsentSettings(settings)
      
      expect(cookieManager.hasConsent()).toBe(true)
      expect(cookieManager.getConsentSettings()).toEqual(settings)
    })

    it('should accept all cookies', () => {
      cookieManager.acceptAll()
      
      const settings = cookieManager.getConsentSettings()
      expect(settings).toEqual({
        analytics: true,
        marketing: true
      })
    })

    it('should reject all cookies', () => {
      cookieManager.rejectAll()
      
      const settings = cookieManager.getConsentSettings()
      expect(settings).toEqual({
        analytics: false,
        marketing: false
      })
    })

    it('should check if specific cookie type is allowed', () => {
      const settings: CookieSettings = {
        analytics: true,
        marketing: false
      }

      cookieManager.saveConsentSettings(settings)
      
      expect(cookieManager.isAllowed('analytics')).toBe(true)
      expect(cookieManager.isAllowed('marketing')).toBe(false)
    })

    it('should clear consent', () => {
      cookieManager.acceptAll()
      expect(cookieManager.hasConsent()).toBe(true)
      
      cookieManager.clearConsent()
      expect(cookieManager.hasConsent()).toBe(true) // Should have default rejected settings
      
      const settings = cookieManager.getConsentSettings()
      expect(settings).toEqual({
        analytics: false,
        marketing: false
      })
    })
  })

  describe('Version Management', () => {
    it('should request consent for new version', () => {
      // Simulate old version
      const oldData = {
        timestamp: Date.now(),
        version: '0.9',
        settings: { analytics: true, marketing: true }
      }
      localStorageMock.setItem('cookie-consent', JSON.stringify(oldData))
      
      expect(cookieManager.shouldRequestConsent()).toBe(true)
    })

    it('should not request consent for current version', () => {
      cookieManager.acceptAll()
      expect(cookieManager.shouldRequestConsent()).toBe(false)
    })
  })

  describe('Event Handling', () => {
    it('should notify listeners on consent change', () => {
      const listener = jest.fn()
      cookieManager.addConsentListener(listener)
      
      const settings: CookieSettings = {
        analytics: true,
        marketing: false
      }
      
      cookieManager.saveConsentSettings(settings)
      
      expect(listener).toHaveBeenCalledWith(settings)
    })

    it('should remove listeners', () => {
      const listener = jest.fn()
      cookieManager.addConsentListener(listener)
      cookieManager.removeConsentListener(listener)
      
      cookieManager.acceptAll()
      
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle corrupted localStorage data', () => {
      localStorageMock.setItem('cookie-consent', 'invalid-json')
      
      expect(cookieManager.getConsentSettings()).toBeNull()
      expect(cookieManager.shouldRequestConsent()).toBe(true)
    })

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw error
      const originalSetItem = localStorageMock.setItem
      localStorageMock.setItem = jest.fn(() => {
        throw new Error('Storage quota exceeded')
      })
      
      // Should not throw
      expect(() => {
        cookieManager.saveConsentSettings({ analytics: true, marketing: false })
      }).not.toThrow()
      
      // Restore original method
      localStorageMock.setItem = originalSetItem
    })
  })
})