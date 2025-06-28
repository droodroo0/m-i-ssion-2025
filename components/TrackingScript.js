// /components/TrackingScript.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TrackingScript = ({ consent }) => {
  const router = useRouter();
  const [consentData, setConsentData] = useState(consent || {});
  const [consentChecked, setConsentChecked] = useState(false);

  // Vérifier le consentement RGPD
  const hasConsent = (type = 'analytics') => {
    if (typeof window === 'undefined') return false;
    if (!consentData) return false;
    return consentData[type] === true;
  };

  // Vérifier le consentement au chargement
  useEffect(() => {
    const checkConsent = () => {
      try {
        const storedConsent = localStorage.getItem('tracking-consent');
        const parsedConsent = storedConsent ? JSON.parse(storedConsent) : null;
        
        if (parsedConsent) {
          setConsentData(parsedConsent);
        }
        setConsentChecked(true);
      } catch (error) {
        // Erreur lecture consentement
        setConsentChecked(true);
      }
    };

    checkConsent();
  }, []);

  // Fonction de hachage simple
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };

  // Fonction d'anonymisation des données
  const anonymizeData = (data, consentType) => {
    const anonymized = { ...data };
    
    // Anonymiser selon le type de consentement
    if (consentType === 'analytics') {
      // Hacher l'user-agent si pas de consentement fingerprinting
      if (!hasConsent('fingerprinting') && anonymized.userAgent) {
        anonymized.userAgent = hashString(anonymized.userAgent);
      }
      
      // Arrondir les dimensions d'écran
      if (anonymized.screen) {
        const [width, height] = anonymized.screen.split('x');
        anonymized.screen = `${Math.round(width/100)*100}x${Math.round(height/100)*100}`;
      }
    }
    
    if (consentType === 'fingerprinting' && !hasConsent('fingerprinting')) {
      // Supprimer les données sensibles de fingerprinting
      delete anonymized.fingerprint;
      delete anonymized.platform;
      delete anonymized.timezone;
    }
    
    return anonymized;
  };

  // Fonction de tracking avec rate limiting et anonymisation
  const trackWithRateLimit = (() => {
    const lastCalls = new Map();
    const RATE_LIMIT_MS = 1000; // 1 seconde entre les appels

    return async (endpoint, data, consentType = 'analytics') => {
      if (!hasConsent(consentType)) return;
      
      const now = Date.now();
      const lastCall = lastCalls.get(endpoint);
      
      if (lastCall && now - lastCall < RATE_LIMIT_MS) {
        return; // Skip si trop récent
      }
      
      lastCalls.set(endpoint, now);
      
      // Anonymiser les données sensibles
      const anonymizedData = anonymizeData(data, consentType);
      
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(anonymizedData)
        });
      } catch (error) {
        // Erreur tracking
      }
    };
  })();

  // Géolocalisation automatique par IP pour tous les visiteurs
  const trackLocationData = async () => {
    try {
      // Collecte automatique des données de localisation IP (sans consentement requis)
      const locationData = {
        page: router.asPath,
        timestamp: new Date().toISOString(),
        method: 'auto-ip'
      };
      
      // Envoi vers l'API de géolocalisation
      await fetch('/api/auto-location', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(locationData)
      });
    } catch (error) {
      // Erreur géolocalisation automatique
    }
  };

  // Tracking des visites de page
  const trackPageView = async () => {
    try {
      // Géolocalisation automatique pour tous (sans consentement)
      await trackLocationData();
      
      // Analytics de base (si consenti)
      if (hasConsent('analytics')) {
        // Données de base (anonymisées)
        const baseData = {
          page: router.asPath,
          referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
          timestamp: new Date().toISOString()
        };

        // Appel backend pour données serveur (IP hashée)
        await trackWithRateLimit('/api/log', baseData, 'analytics');

        // Collecte des données client-side (anonymisées)
        const clientData = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen: `${screen.width}x${screen.height}`,
          cookies: navigator.cookieEnabled,
          doNotTrack: navigator.doNotTrack === '1',
          connection: navigator.connection?.effectiveType || 'unknown',
          page: router.asPath,
          timestamp: new Date().toISOString()
        };

        // Envoi des données client avec rate limiting
        await trackWithRateLimit('/api/log-client', clientData, 'analytics');
      }
      
      // Fingerprinting uniquement si consenti spécifiquement
      if (hasConsent('fingerprinting')) {
        // Génération de l'empreinte digitale
        const fingerprintData = [
          navigator.userAgent,
          navigator.platform,
          screen.width,
          screen.height,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ].join('|');
        
        const fingerprint = btoa(fingerprintData).substring(0, 32);

        // Envoi des données d'empreinte
        await trackWithRateLimit('/api/fingerprint', {
          fingerprint: fingerprint,
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          page: router.asPath
        }, 'fingerprinting');
      }
      
    } catch (error) {
      // Erreur tracking page
    }
  };

  useEffect(() => {
    // Ne pas tracker si pas encore vérifié
    if (!consentChecked) {
      return;
    }

    // Délai pour éviter de bloquer le rendu
    const timer = setTimeout(trackPageView, 500);
    
    return () => clearTimeout(timer);
  }, [router.asPath, consentData, consentChecked]);

  // Tracking des événements de navigation (avec consentement)
  useEffect(() => {
    if (!hasConsent('analytics')) {
      return;
    }

    const handleRouteChange = (url) => {
      trackWithRateLimit('/api/log', {
        page: url,
        action: 'navigation',
        timestamp: new Date().toISOString()
      }, 'analytics');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, consentData]);

  // Nettoyage automatique des logs anciens (côté client)
  useEffect(() => {
    const cleanupOldData = () => {
      try {
        const lastCleanup = localStorage.getItem('last-cleanup');
        const now = Date.now();
        const CLEANUP_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 jours
        
        if (!lastCleanup || now - parseInt(lastCleanup) > CLEANUP_INTERVAL) {
          // Appel API pour nettoyer les logs anciens
          fetch('/api/admin/cleanup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ days: 30 }) // Garder 30 jours
          }).catch(() => {
       // Erreur nettoyage
     });
          
          localStorage.setItem('last-cleanup', now.toString());
        }
      } catch (error) {
        // Erreur nettoyage automatique
      }
    };

    if (hasConsent('analytics')) {
      cleanupOldData();
    }
  }, [consentData]);

  return null; // Ce composant ne rend rien visuellement
};

export default TrackingScript;