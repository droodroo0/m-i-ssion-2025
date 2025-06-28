// /pages/api/log-client.js
import fs from 'fs/promises';

export default async function handler(req, res) {
  const body = req.body || {};
  const date = new Date().toISOString();

  const logLine = `"${date}","${body.fingerprint}","${body.userAgent}","${body.platform}","${body.language}","${body.timezone}","${body.connection}",${body.screen?.width}x${body.screen?.height},"cookies:${body.cookiesEnabled}","DNT:${body.doNotTrack}"\n`;

  try {
    await fs.mkdir('./logs', { recursive: true });
    await fs.appendFile('./logs/client.csv', logLine);
  } catch (err) {
    console.error('Erreur écriture client.csv :', err);
  }

  res.status(200).json({ success: true });
}