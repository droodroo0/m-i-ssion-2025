```jsx
// /pages/geo.js
import { useEffect, useState } from 'react';

export default function GeoPage() {
  const [message, setMessage] = useState('Test de compatibilité GPS en cours...');

  const demanderPosition = () => {
    if (!navigator.geolocation) {
      setMessage("La géolocalisation n'est pas supportée sur ce navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMessage("Coordonnées GPS reçues ✅");
        fetch('/api/save-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: new Date().toISOString()
          })
        });
      },
      (err) => {
        setMessage("Erreur de localisation ou refus : " + err.message);
      }
    );
  };

  useEffect(() => {
    // Lancement automatique ou bien tu peux déclencher via un bouton
    demanderPosition();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>🔍 Vérification de la compatibilité GPS</h1>
      <p>{message}</p>
    </div>
  );
}
```