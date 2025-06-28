import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CookieSettings } from '../types'

interface ConsentNotificationProps {
  message: string
  type: 'success' | 'info' | 'warning'
  duration?: number
}

const ConsentNotification: React.FC<ConsentNotificationProps> = ({ 
  message, 
  type, 
  duration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-emeraude text-white'
      case 'warning':
        return 'bg-orange-500 text-white'
      case 'info':
      default:
        return 'bg-prusse text-white'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${getTypeStyles()}`}>
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Composant gestionnaire de notifications
interface NotificationManagerProps {
  children: React.ReactNode
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'info' | 'warning'
  }>>([])

  useEffect(() => {
    const handleConsentChange = (event: CustomEvent<CookieSettings>) => {
      const settings = event.detail
      let message = ''
      
      if (settings.analytics && settings.marketing) {
        message = 'Tous les cookies ont été acceptés'
      } else if (!settings.analytics && !settings.marketing) {
        message = 'Tous les cookies optionnels ont été refusés'
      } else {
        message = 'Vos préférences de cookies ont été mises à jour'
      }
      
      const notification = {
        id: Date.now().toString(),
        message,
        type: 'success' as const
      }
      
      setNotifications(prev => [...prev, notification])
      
      // Supprimer la notification après 3 secondes
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 3000)
    }

    window.addEventListener('cookieConsentChanged', handleConsentChange)
    
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange)
    }
  }, [])

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <ConsentNotification
            key={notification.id}
            message={notification.message}
            type={notification.type}
          />
        ))}
      </div>
    </>
  )
}

export { ConsentNotification, NotificationManager }
export default ConsentNotification