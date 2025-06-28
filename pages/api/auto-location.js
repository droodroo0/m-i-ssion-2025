// API de géolocalisation automatique par IP pour tous les visiteurs
import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { page, timestamp, method } = req.body;
    
    // Récupération de l'IP réelle
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
               req.socket?.remoteAddress || 
               'IP inconnue';
    
    let location = 'Localisation inconnue';
    let city = '';
    let country = '';
    let latitude = '';
    let longitude = '';
    
    // Gérer les IPs locales
    if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || 
        ip.startsWith('10.') || ip.startsWith('172.')) {
      location = 'Localhost/Réseau local';
      city = 'Local';
      country = 'Local';
      latitude = '0';
      longitude = '0';
    } else {
      // Géolocalisation IP pour les IPs publiques
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geo = await geoRes.json();
        
        if (geo && geo.city && !geo.error) {
          location = `${geo.city}, ${geo.region}, ${geo.country_name}`;
          city = geo.city || '';
          country = geo.country_name || '';
          latitude = geo.latitude || '';
          longitude = geo.longitude || '';
        }
      } catch (err) {
        console.warn('Échec géolocalisation IP:', err);
      }
    }
    
    // Format CSV: Date, IP, Page, Location, City, Country, Latitude, Longitude, Method
    const logLine = `"${timestamp}","${ip}","${page}","${location}","${city}","${country}","${latitude}","${longitude}","${method}"\n`;
    
    // Créer le dossier logs s'il n'existe pas
    await fs.mkdir('./logs', { recursive: true });
    
    // Ajouter au fichier auto-location.csv
    await fs.appendFile('./logs/auto-location.csv', logLine);
    
    res.status(200).json({ 
      success: true, 
      location: location,
      coordinates: { latitude, longitude }
    });
    
  } catch (error) {
    console.error('Erreur géolocalisation automatique:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}