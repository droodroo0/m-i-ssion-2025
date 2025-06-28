import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateConsentMode } from '../lib/analytics'
import CookiePreferences from './CookiePreferences'

interface CookieSettings {
  analytics: boolean
  marketing: boolean
}

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookieSettings>({
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
    
    // Écouter l'événement d'ouverture des préférences depuis le footer
    const handleOpenPreferences = () => {
      setShowPreferences(true)
    }
    
    window.addEventListener('openCookiePreferences', handleOpenPreferences)
    
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpenPreferences)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent: CookieSettings = { analytics: true, marketing: true }
    setPreferences(consent)
    updateConsentMode(consent)
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const consent: CookieSettings = { analytics: false, marketing: false }
    setPreferences(consent)
    updateConsentMode(consent)
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const savePreferences = () => {
    updateConsentMode(preferences)
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setIsVisible(false)
    setShowPreferences(false)
  }

  const handlePreferenceChange = (type: keyof CookieSettings) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
        >
          <div className="max-w-7xl mx-auto p-4">
            {!showPreferences ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-prusse mb-2">
                    Gestion des cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                    Vous pouvez choisir quels cookies accepter.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-4 py-2 text-prusse border border-prusse rounded-lg hover:bg-prusse hover:text-white transition-colors"
                  >
                    Personnaliser
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Refuser tout
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 text-sm bg-prusse text-white rounded-lg hover:bg-prusse-dark transition-colors"
                  >
                    Accepter tout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-prusse">
                    Préférences des cookies
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Cookies essentiels</h4>
                      <p className="text-sm text-gray-600">Nécessaires au fonctionnement du site</p>
                    </div>
                    <div className="text-sm text-gray-500">Toujours actifs</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Cookies d'analyse</h4>
                      <p className="text-sm text-gray-600">Nous aident à comprendre l'utilisation du site</p>
                    </div>
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
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Cookies marketing</h4>
                      <p className="text-sm text-gray-600">Utilisés pour la publicité personnalisée</p>
                    </div>
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
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={savePreferences}
                    className="flex-1 px-4 py-2 bg-prusse text-white rounded-lg hover:bg-prusse-dark transition-colors"
                  >
                    Enregistrer les préférences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      <CookiePreferences 
        isOpen={showPreferences} 
        onClose={() => {
          setShowPreferences(false)
          setIsVisible(false)
        }} 
      />
    </AnimatePresence>
  )
}

export default CookieBanner