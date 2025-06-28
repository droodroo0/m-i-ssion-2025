```js
// /pages/api/save-location.js
import fs from 'fs/promises';

export default async function handler(req, res) {
  try {
    const { lat, lon, accuracy, timestamp } = req.body;
    const logLine = `"\${timestamp}","\${lat}","\${lon}","\${accuracy}"\n`;

    await fs.mkdir('./logs', { recursive: true });
    await fs.appendFile('./logs/gps.csv', logLine);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur d'enregistrement des coordonnées GPS :", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
```