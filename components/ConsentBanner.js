import { useState, useEffect } from 'react';

const ConsentBanner = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    // Vérifier le consentement existant
    const savedConsent = localStorage.getItem('tracking-consent');
    if (savedConsent) {
      const consentData = JSON.parse(savedConsent);
      setConsent(consentData);
      onConsentChange(consentData);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (type, value) => {
    const newConsent = {
      ...consent,
      [type]: value,
      timestamp: new Date().toISOString()
    };
    
    setConsent(newConsent);
    localStorage.setItem('tracking-consent', JSON.stringify(newConsent));
    onConsentChange(newConsent);
  };

  const acceptAll = () => {
    const fullConsent = {
      analytics: true,
      fingerprinting: true,
      geolocation: false, // Demandé séparément
      timestamp: new Date().toISOString()
    };
    
    setConsent(fullConsent);
    localStorage.setItem('tracking-consent', JSON.stringify(fullConsent));
    onConsentChange(fullConsent);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const noConsent = {
      analytics: false,
      fingerprinting: false,
      geolocation: false,
      timestamp: new Date().toISOString()
    };
    
    setConsent(noConsent);
    localStorage.setItem('tracking-consent', JSON.stringify(noConsent));
    onConsentChange(noConsent);
    setShowBanner(false);
  };

  const customizeConsent = () => {
    setShowBanner(false);
    // Ouvrir le modal de personnalisation
    document.getElementById('consent-modal').style.display = 'block';
  };

  const saveCustomConsent = () => {
    const customConsent = {
      analytics: document.getElementById('analytics-consent').checked,
      fingerprinting: document.getElementById('fingerprint-consent').checked,
      geolocation: document.getElementById('geo-consent').checked,
      timestamp: new Date().toISOString()
    };
    
    setConsent(customConsent);
    localStorage.setItem('tracking-consent', JSON.stringify(customConsent));
    onConsentChange(customConsent);
    document.getElementById('consent-modal').style.display = 'none';
  };

  const revokeConsent = () => {
    localStorage.removeItem('tracking-consent');
    setConsent(null);
    setShowBanner(true);
    onConsentChange(null);
  };

  if (!showBanner && consent) {
    return (
      <div className="consent-status">
        <button onClick={revokeConsent} className="consent-revoke">
          ⚙️ Gérer les cookies
        </button>
      </div>
    );
  }

  if (!showBanner) return null;

  return (
    <>
      <div className="consent-banner">
        <div className="consent-content">
          <h3>🍪 Gestion des cookies et données</h3>
          <p>
            Ce site utilise des cookies et collecte des données pour améliorer votre expérience. 
            Nous respectons votre vie privée et vous donnons le contrôle sur vos données.
          </p>
          <div className="consent-buttons">
            <button onClick={acceptAll} className="btn-accept">
              ✅ Tout accepter
            </button>
            <button onClick={rejectAll} className="btn-reject">
              ❌ Tout refuser
            </button>
            <button onClick={customizeConsent} className="btn-customize">
              ⚙️ Personnaliser
            </button>
          </div>
        </div>
      </div>

      <div id="consent-modal" className="consent-modal">
        <div className="modal-content">
          <h3>Personnaliser vos préférences</h3>
          
          <div className="consent-option">
            <label>
              <input type="checkbox" id="analytics-consent" defaultChecked />
              <strong>Analytics et statistiques</strong>
              <p>Nous aide à comprendre comment vous utilisez le site pour l'améliorer.</p>
            </label>
          </div>
          
          <div className="consent-option">
            <label>
              <input type="checkbox" id="fingerprint-consent" />
              <strong>Empreinte numérique</strong>
              <p>Collecte d'informations techniques pour la sécurité et l'analyse.</p>
            </label>
          </div>
          
          <div className="consent-option">
            <label>
              <input type="checkbox" id="geo-consent" />
              <strong>Géolocalisation</strong>
              <p>Accès à votre position pour des fonctionnalités spécifiques (demandé séparément).</p>
            </label>
          </div>
          
          <div className="modal-buttons">
            <button onClick={saveCustomConsent} className="btn-save">
              💾 Sauvegarder
            </button>
            <button onClick={() => document.getElementById('consent-modal').style.display = 'none'} className="btn-cancel">
              ❌ Annuler
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #2c3e50;
          color: white;
          padding: 1rem;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
          z-index: 1000;
        }
        
        .consent-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .consent-content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        
        .consent-content p {
          margin: 0 0 1rem 0;
          opacity: 0.9;
        }
        
        .consent-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn-accept,
        .btn-reject,
        .btn-customize,
        .btn-save,
        .btn-cancel {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }
        
        .btn-accept {
          background: #27ae60;
          color: white;
        }
        
        .btn-accept:hover {
          background: #229954;
        }
        
        .btn-reject {
          background: #e74c3c;
          color: white;
        }
        
        .btn-reject:hover {
          background: #c0392b;
        }
        
        .btn-customize {
          background: #3498db;
          color: white;
        }
        
        .btn-customize:hover {
          background: #2980b9;
        }
        
        .consent-status {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          z-index: 999;
        }
        
        .consent-revoke {
          background: #34495e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .consent-revoke:hover {
          background: #2c3e50;
        }
        
        .consent-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1001;
        }
        
        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .consent-option {
          margin: 1rem 0;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .consent-option label {
          display: block;
          cursor: pointer;
        }
        
        .consent-option input {
          margin-right: 0.5rem;
        }
        
        .consent-option p {
          margin: 0.5rem 0 0 1.5rem;
          font-size: 0.9rem;
          color: #666;
        }
        
        .modal-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }
        
        .btn-save {
          background: #27ae60;
          color: white;
        }
        
        .btn-cancel {
          background: #95a5a6;
          color: white;
        }
        
        @media (max-width: 768px) {
          .consent-buttons {
            flex-direction: column;
          }
          
          .modal-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default ConsentBanner;