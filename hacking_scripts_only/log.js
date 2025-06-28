```js
// /pages/api/log.js
import fs from 'fs/promises';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'IP inconnue';
  const userAgent = req.headers['user-agent'] || 'User-Agent inconnu';
  const referrer = req.headers['referer'] || 'Accès direct';
  const date = new Date().toISOString();

  let location = 'Localisation inconnue';
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();
    if (geo && geo.city) {
      location = `${geo.city}, ${geo.region}, ${geo.country_name}`;
    }
  } catch (err) {
    console.warn('Échec géoloc IP :', err);
  }

  const logLine = `"\${date}","\${ip}","\${location}","\${userAgent}","\${referrer}"\n`;

  try {
    await fs.mkdir('./logs', { recursive: true });
    await fs.appendFile('./logs/logs.csv', logLine);
  } catch (err) {
    console.error('Erreur écriture fichier logs.csv :', err);
  }

  res.status(200).json({ success: true });
}
```