```js
// /pages/api/fingerprint.js
// Ce script génère un identifiant unique basé sur les caractéristiques du navigateur
import fs from 'fs/promises';

export default async function handler(req, res) {
  const body = req.body || {};
  const date = new Date().toISOString();

  const fingerprint = body.fingerprint || 'inconnu';
  const userAgent = body.userAgent || 'inconnu';
  const platform = body.platform || 'inconnu';
  const timezone = body.timezone || 'inconnu';

  const logLine = `"\${date}","\${fingerprint}","\${userAgent}","\${platform}","\${timezone}"\n`;

  try {
    await fs.mkdir('./logs', { recursive: true });
    await fs.appendFile('./logs/fingerprints.csv', logLine);
  } catch (err) {
    console.error('Erreur écriture fingerprint :', err);
  }

  res.status(200).json({ success: true });
}
```

```html
<!-- /pages/fingerprint.js (ou directement dans index.js) -->
<script>
(async () => {
  const data = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth
    },
    fingerprint: btoa(
      navigator.userAgent +
      navigator.platform +
      screen.width +
      screen.height +
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
  };

  await fetch('/api/fingerprint', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
})();
</script>
```