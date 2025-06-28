// /pages/api/admin/stats.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const logsDir = './logs';
  const stats = {
    server_logs: 0,
    client_logs: 0,
    fingerprints: 0,
    gps_logs: 0,
    auto_location_logs: 0,
    unique_ips: 0,
    unique_fingerprints: 0,
    top_countries: [],
    top_browsers: [],
    top_cities: [],
    location_methods: {},
    last_activity: null
  };

  try {
    // Vérifier si le dossier logs existe
    await fs.access(logsDir);
  } catch {
    return res.status(200).json(stats);
  }

  try {
    // Compter les logs serveur
    try {
      const serverData = await fs.readFile(path.join(logsDir, 'logs.csv'), 'utf8');
      const serverLines = serverData.trim().split('\n').filter(line => line.length > 0);
      stats.server_logs = serverLines.length;
      
      // Analyser les IPs uniques et pays
      const ips = new Set();
      const countries = {};
      
      serverLines.forEach(line => {
        const parts = line.split('","');
        if (parts.length >= 3) {
          const ip = parts[1].replace(/"/g, '');
          const location = parts[2].replace(/"/g, '');
          
          ips.add(ip);
          
          if (location && location !== 'Localisation inconnue') {
            const country = location.split(',').pop().trim();
            countries[country] = (countries[country] || 0) + 1;
          }
        }
      });
      
      stats.unique_ips = ips.size;
      stats.top_countries = Object.entries(countries)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([country, count]) => ({ country, count }));
    } catch {}

    // Compter les logs client
    try {
      const clientData = await fs.readFile(path.join(logsDir, 'client.csv'), 'utf8');
      const clientLines = clientData.trim().split('\n').filter(line => line.length > 0);
      stats.client_logs = clientLines.length;
      
      // Analyser les navigateurs
      const browsers = {};
      
      clientLines.forEach(line => {
        const parts = line.split('","');
        if (parts.length >= 3) {
          const userAgent = parts[2].replace(/"/g, '');
          let browser = 'Autre';
          
          if (userAgent.includes('Chrome')) browser = 'Chrome';
          else if (userAgent.includes('Firefox')) browser = 'Firefox';
          else if (userAgent.includes('Safari')) browser = 'Safari';
          else if (userAgent.includes('Edge')) browser = 'Edge';
          
          browsers[browser] = (browsers[browser] || 0) + 1;
        }
      });
      
      stats.top_browsers = Object.entries(browsers)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([browser, count]) => ({ browser, count }));
    } catch {}

    // Compter les empreintes
    try {
      const fingerprintData = await fs.readFile(path.join(logsDir, 'fingerprints.csv'), 'utf8');
      const fingerprintLines = fingerprintData.trim().split('\n').filter(line => line.length > 0);
      stats.fingerprints = fingerprintLines.length;
      
      // Compter les empreintes uniques
      const uniqueFingerprints = new Set();
      fingerprintLines.forEach(line => {
        const parts = line.split('","');
        if (parts.length >= 2) {
          const fingerprint = parts[1].replace(/"/g, '');
          uniqueFingerprints.add(fingerprint);
        }
      });
      stats.unique_fingerprints = uniqueFingerprints.size;
    } catch {}

    // Compter les logs GPS
    try {
      const gpsData = await fs.readFile(path.join(logsDir, 'gps.csv'), 'utf8');
      const gpsLines = gpsData.trim().split('\n').filter(line => line.length > 0);
      stats.gps_logs = gpsLines.length;
    } catch {}

    // Compter les logs de géolocalisation automatique
    try {
      const autoLocationData = await fs.readFile(path.join(logsDir, 'auto-location.csv'), 'utf8');
      const autoLocationLines = autoLocationData.trim().split('\n').filter(line => line.length > 0);
      stats.auto_location_logs = autoLocationLines.length;
      
      // Analyser les villes et méthodes
      const cities = {};
      const methods = {};
      
      autoLocationLines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 8) {
          const city = parts[4]?.replace(/"/g, '').trim();
          const method = parts[7]?.replace(/"/g, '').trim();
          
          if (city && city !== 'Unknown') {
            cities[city] = (cities[city] || 0) + 1;
          }
          
          if (method) {
            methods[method] = (methods[method] || 0) + 1;
          }
        }
      });
      
      stats.top_cities = Object.entries(cities)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([city, count]) => ({ city, count }));
        
      stats.location_methods = methods;
    } catch {}

    // Dernière activité
    try {
      const files = await fs.readdir(logsDir);
      let lastModified = 0;
      
      for (const file of files) {
        if (file.endsWith('.csv')) {
          const fileStat = await fs.stat(path.join(logsDir, file));
          if (fileStat.mtime.getTime() > lastModified) {
            lastModified = fileStat.mtime.getTime();
            stats.last_activity = fileStat.mtime.toISOString();
          }
        }
      }
    } catch {}

    res.status(200).json(stats);
  } catch (err) {
    console.error('Erreur calcul stats:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}