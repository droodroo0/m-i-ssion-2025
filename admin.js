
import { useEffect, useState } from 'react';

export default function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/get-logs', {
      headers: {
        'Authorization': 'Bearer ton_mot_de_passe_super_secret'
      }
    })
      .then(res => res.json())
      .then(data => setLogs(data.logs || []));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Logs de Tracking</h1>
      <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
        {logs.join('\n')}
      </pre>
    </div>
  );
}
