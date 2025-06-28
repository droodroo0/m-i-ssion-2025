export default async function handler(req, res) {
  const password = req.headers['authorization'];
  if (password !== 'Bearer ton_mot_de_passe_super_secret') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const logs = globalThis.logs || [];
  res.status(200).json({ logs });
}