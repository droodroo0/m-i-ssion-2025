import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateConsentMode } from '../lib/analytics'

interface CookiePreferencesProps {
  isOpen: boolean
  onClose: () => void
}

interface CookieSettings {
  analytics: boolean
  marketing: boolean
}

const CookiePreferences: React.FC<CookiePreferencesProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<CookieSettings>({
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    if (isOpen) {
      const savedConsent = localStorage.getItem('cookie-consent')
      if (savedConsent) {
        try {
          const parsed = JSON.parse(savedConsent)
          setPreferences(parsed)
        } catch (error) {
          // Erreur lors du parsing des préférences cookies
        }
      }
    }
  }, [isOpen])

  const handlePreferenceChange = (type: keyof CookieSettings) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const savePreferences = () => {
    updateConsentMode(preferences)
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    onClose()
  }

  const acceptAll = () => {
    const allAccepted = { analytics: true, marketing: true }
    setPreferences(allAccepted)
    updateConsentMode(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    onClose()
  }

  const rejectAll = () => {
    const allRejected = { analytics: false, marketing: false }
    setPreferences(allRejected)
    updateConsentMode(allRejected)
    localStorage.setItem('cookie-consent', JSON.stringify(allRejected))
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-prusse">
                    Gestion des cookies
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                    Vous pouvez choisir quels types de cookies vous souhaitez autoriser.
                  </p>
                  <p className="text-sm text-gray-500">
                    Pour plus d'informations, consultez notre{' '}
                    <a href="/politique-confidentialite" className="text-prusse hover:underline">
                      politique de confidentialité
                    </a>.
                  </p>
                </div>
                
                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  {/* Essential Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Cookies essentiels</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Toujours actifs
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Exemples :</strong> Session utilisateur, sécurité, préférences de langue
                    </div>
                  </div>
                  
                  {/* Analytics Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Cookies d'analyse</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => handlePreferenceChange('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-prusse"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Services :</strong> Google Analytics
                      <br />
                      <strong>Données collectées :</strong> Pages visitées, durée de visite, source de trafic
                    </div>
                  </div>
                  
                  {/* Marketing Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Cookies marketing</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => handlePreferenceChange('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-prusse"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Ces cookies sont utilisés pour vous proposer des publicités personnalisées.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Services :</strong> Réseaux publicitaires
                      <br />
                      <strong>Données collectées :</strong> Intérêts, comportement de navigation
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={rejectAll}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Refuser tout
                  </button>
                  <button
                    onClick={savePreferences}
                    className="flex-1 px-4 py-2 bg-emeraude text-white rounded-lg hover:bg-emeraude-dark transition-colors"
                  >
                    Enregistrer les préférences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-4 py-2 bg-prusse text-white rounded-lg hover:bg-prusse-dark transition-colors"
                  >
                    Accepter tout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CookiePreferences