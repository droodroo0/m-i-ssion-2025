import { CookieSettings, ConsentData } from '../types'
import { updateConsentMode } from './analytics'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1.0'

/**
 * Gestionnaire centralisé pour les cookies et le consentement RGPD
 */
export class CookieManager {
  private static instance: CookieManager
  private listeners: Array<(settings: CookieSettings) => void> = []

  private constructor() {}

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  /**
   * Vérifie si le consentement a été donné
   */
  hasConsent(): boolean {
    return localStorage.getItem(CONSENT_KEY) !== null
  }

  /**
   * Récupère les paramètres de consentement actuels
   */
  getConsentSettings(): CookieSettings | null {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) return null
      
      const data: ConsentData = JSON.parse(stored)
      return data.settings
    } catch (error) {
      console.error('Erreur lors de la lecture du consentement:', error)
      return null
    }
  }

  /**
   * Sauvegarde les paramètres de consentement
   */
  saveConsentSettings(settings: CookieSettings): void {
    const consentData: ConsentData = {
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      settings
    }

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData))
      updateConsentMode(settings)
      this.notifyListeners(settings)
      
      // Déclencher un événement personnalisé
      const event = new CustomEvent('cookieConsentChanged', { detail: settings })
      window.dispatchEvent(event)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du consentement:', error)
    }
  }

  /**
   * Accepte tous les cookies
   */
  acceptAll(): void {
    this.saveConsentSettings({
      analytics: true,
      marketing: true
    })
  }

  /**
   * Refuse tous les cookies optionnels
   */
  rejectAll(): void {
    this.saveConsentSettings({
      analytics: false,
      marketing: false
    })
  }

  /**
   * Supprime le consentement (pour les tests ou la réinitialisation)
   */
  clearConsent(): void {
    localStorage.removeItem(CONSENT_KEY)
    this.rejectAll() // Réinitialise avec les valeurs par défaut
  }

  /**
   * Vérifie si un type de cookie spécifique est autorisé
   */
  isAllowed(cookieType: keyof CookieSettings): boolean {
    const settings = this.getConsentSettings()
    return settings ? settings[cookieType] : false
  }

  /**
   * Ajoute un listener pour les changements de consentement
   */
  addConsentListener(callback: (settings: CookieSettings) => void): void {
    this.listeners.push(callback)
  }

  /**
   * Supprime un listener
   */
  removeConsentListener(callback: (settings: CookieSettings) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  /**
   * Notifie tous les listeners des changements
   */
  private notifyListeners(settings: CookieSettings): void {
    this.listeners.forEach(callback => {
      try {
        callback(settings)
      } catch (error) {
        console.error('Erreur dans le listener de consentement:', error)
      }
    })
  }

  /**
   * Vérifie si le consentement doit être redemandé (version obsolète)
   */
  shouldRequestConsent(): boolean {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) return true
      
      const data: ConsentData = JSON.parse(stored)
      return data.version !== CONSENT_VERSION
    } catch (error) {
      console.error('Erreur lors de la vérification de la version:', error)
      return true
    }
  }

  /**
   * Obtient les informations de consentement complètes
   */
  getConsentData(): ConsentData | null {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Erreur lors de la lecture des données de consentement:', error)
      return null
    }
  }
}

// Instance singleton exportée
export const cookieManager = CookieManager.getInstance()

// Fonctions utilitaires pour une utilisation simple
export const hasConsent = () => cookieManager.hasConsent()
export const getConsentSettings = () => cookieManager.getConsentSettings()
export const saveConsentSettings = (settings: CookieSettings) => cookieManager.saveConsentSettings(settings)
export const acceptAllCookies = () => cookieManager.acceptAll()
export const rejectAllCookies = () => cookieManager.rejectAll()
export const isAllowed = (cookieType: keyof CookieSettings) => cookieManager.isAllowed(cookieType)
export const clearConsent = () => cookieManager.clearConsent()