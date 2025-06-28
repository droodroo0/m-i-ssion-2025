export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'IP inconnue';
  const userAgent = req.headers['user-agent'] || 'User-Agent inconnu';
  const referrer = req.headers['referer'] || 'Accès direct';
  const date = new Date().toISOString();

  const logLine = `${date},${ip},"${userAgent}","${referrer}"\n`;

  globalThis.logs = globalThis.logs || [];
  globalThis.logs.push(logLine);

  res.status(200).json({ success: true });
}