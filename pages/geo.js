// /pages/geo.js
import { useEffect, useState } from 'react';

export default function GeoPage() {
  const [message, setMessage] = useState('Test de compatibilité GPS en cours...');
  const [consent, setConsent] = useState(false);
  const [locationData, setLocationData] = useState(null);

  const checkPermissions = async () => {
    if (!navigator.permissions) {
      return 'unsupported';
    }
    
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state;
    } catch (error) {
      return 'error';
    }
  };

  const fallbackIPLocation = async () => {
    try {
      setMessage('Tentative de géolocalisation par IP...');
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      setLocationData({
        lat: data.latitude,
        lon: data.longitude,
        city: data.city,
        country: data.country_name,
        accuracy: 'IP-based',
        method: 'IP'
      });
      
      setMessage(`Localisation IP: ${data.city}, ${data.country_name} ✅`);
      
      // Sauvegarder la localisation IP
      await fetch('/api/save-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: data.latitude,
          lon: data.longitude,
          accuracy: 'IP-based',
          timestamp: new Date().toISOString(),
          method: 'IP',
          city: data.city,
          country: data.country_name
        })
      });
    } catch (error) {
      setMessage('Erreur de géolocalisation IP: ' + error.message);
    }
  };

  const demanderPositionGPS = async () => {
    if (!navigator.geolocation) {
      setMessage("La géolocalisation GPS n'est pas supportée. Tentative par IP...");
      await fallbackIPLocation();
      return;
    }

    const permissionState = await checkPermissions();
    
    if (permissionState === 'denied') {
      setMessage('Permission GPS refusée. Utilisation de la géolocalisation IP...');
      await fallbackIPLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLocationData({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          method: 'GPS'
        });
        
        setMessage(`Coordonnées GPS reçues ✅ (précision: ${Math.round(pos.coords.accuracy)}m)`);
        
        await fetch('/api/save-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: new Date().toISOString(),
            method: 'GPS'
          })
        });
      },
      async (err) => {
        setMessage(`Erreur GPS (${err.code}): ${err.message}. Tentative par IP...`);
        await fallbackIPLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleConsentAndTest = () => {
    setConsent(true);
    demanderPositionGPS();
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1>🔍 Vérification de la compatibilité GPS</h1>
      
      {!consent ? (
        <div style={{ marginBottom: 20 }}>
          <p>Cette page teste la géolocalisation de votre appareil.</p>
          <p><strong>Données collectées :</strong></p>
          <ul>
            <li>Coordonnées GPS (si autorisées)</li>
            <li>Localisation approximative par IP (fallback)</li>
            <li>Précision de la localisation</li>
          </ul>
          <button 
            onClick={handleConsentAndTest}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Accepter et tester la géolocalisation
          </button>
        </div>
      ) : (
        <div>
          <p style={{ 
            padding: 15, 
            backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
            border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: 5,
            color: message.includes('✅') ? '#155724' : '#721c24'
          }}>
            {message}
          </p>
          
          {locationData && (
            <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 5 }}>
              <h3>Données de localisation :</h3>
              <p><strong>Latitude :</strong> {locationData.lat}</p>
              <p><strong>Longitude :</strong> {locationData.lon}</p>
              <p><strong>Méthode :</strong> {locationData.method}</p>
              <p><strong>Précision :</strong> {locationData.accuracy}</p>
              {locationData.city && <p><strong>Ville :</strong> {locationData.city}</p>}
              {locationData.country && <p><strong>Pays :</strong> {locationData.country}</p>}
            </div>
          )}
          
          <button 
            onClick={() => {
              setConsent(false);
              setMessage('Test de compatibilité GPS en cours...');
              setLocationData(null);
            }}
            style={{
              marginTop: 20,
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Recommencer le test
          </button>
        </div>
      )}
    </div>
  );
}