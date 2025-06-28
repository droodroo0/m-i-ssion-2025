```jsx
// /pages/index.js
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Appel backend pour IP, user-agent
    fetch('/api/log', { method: 'POST' });

    // Appel backend pour client-side data
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
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      connection: navigator.connection?.effectiveType || 'unknown',
    };
    data.fingerprint = btoa(data.userAgent + data.platform + screen.width + screen.height);

    fetch('/api/log-client', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
  }, []);

  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#666' }}>Chargement…</p>
    </div>
  );
}
```