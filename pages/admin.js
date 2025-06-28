// /pages/admin.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logType, setLogType] = useState('server');
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [cleanupStatus, setCleanupStatus] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'logs') {
      loadLogs();
    }
  }, [activeTab, logType]);

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  const loadLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type: logType,
        start: dateFilter.start,
        end: dateFilter.end,
        search: searchTerm
      });
      const res = await fetch(`/api/admin/logs?${params}`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Erreur chargement logs:', err);
    }
    setLoading(false);
  };

  const exportData = async (format = 'csv') => {
    try {
      const params = new URLSearchParams({
        type: logType,
        start: dateFilter.start,
        end: dateFilter.end,
        search: searchTerm,
        export: format
      });
      
      const res = await fetch(`/api/admin/logs?${params}`);
      const data = await res.json();
      
      if (format === 'csv') {
        const csvContent = data.logs.map(log => 
          Object.values(log).map(val => `"${val}"`).join(',')
        ).join('\n');
        
        const headers = Object.keys(data.logs[0] || {}).map(h => `"${h}"`).join(',');
        const fullCsv = headers + '\n' + csvContent;
        
        const blob = new Blob([fullCsv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logs_${logType}_${dateFilter.start}_${dateFilter.end}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logs_${logType}_${dateFilter.start}_${dateFilter.end}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Erreur export:', err);
      alert('Erreur lors de l\'export des données');
    }
  };

  const cleanupOldData = async () => {
    if (!confirm('Supprimer les données de plus de 30 jours ?')) return;
    
    try {
      setCleanupStatus('running');
      const res = await fetch('/api/admin/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: 30 })
      });
      
      const result = await res.json();
      setCleanupStatus(result.success ? 'success' : 'error');
      
      if (result.success) {
        alert(result.message);
        loadStats();
        loadLogs();
      } else {
        alert('Erreur: ' + result.error);
      }
    } catch (err) {
      console.error('Erreur nettoyage:', err);
      setCleanupStatus('error');
      alert('Erreur lors du nettoyage');
    }
    
    setTimeout(() => setCleanupStatus(null), 3000);
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr.replace(/"/g, '')).toLocaleString('fr-FR');
    } catch {
      return dateStr;
    }
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Tableau de bord</h2>
        <div className="dashboard-subtitle">Vue d'ensemble de l'activité du site</div>
      </div>
      
      {stats && (
        <>
          {/* Container 1: Statistiques Générales */}
          <div className="container-section">
            <div className="container-header">
              <h3>📈 Statistiques Générales</h3>
              <div className="container-description">Aperçu global de l'activité</div>
            </div>
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">🌐</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.server_logs}</div>
                  <div className="stat-label">Visites totales</div>
                </div>
              </div>
              
              <div className="stat-card secondary">
                <div className="stat-icon">💻</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.client_logs}</div>
                  <div className="stat-label">Données collectées</div>
                </div>
              </div>
              
              <div className="stat-card accent">
                <div className="stat-icon">🌍</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.unique_ips}</div>
                  <div className="stat-label">Visiteurs uniques</div>
                </div>
              </div>
              
              <div className="stat-card info">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <div className="stat-date">
                    {stats.last_activity ? formatDate(stats.last_activity) : 'Aucune'}
                  </div>
                  <div className="stat-label">Dernière activité</div>
                </div>
              </div>
            </div>
          </div>

          {/* Container 2: Géolocalisation */}
          <div className="container-section">
            <div className="container-header">
              <h3>🌍 Géolocalisation & Tracking</h3>
              <div className="container-description">Données de localisation des visiteurs</div>
            </div>
            <div className="geo-grid">
              <div className="geo-stats">
                <div className="geo-card gps">
                  <div className="geo-icon">📍</div>
                  <div className="geo-content">
                    <div className="geo-number">{stats.gps_logs}</div>
                    <div className="geo-label">GPS Manuel</div>
                  </div>
                </div>
                
                <div className="geo-card auto">
                  <div className="geo-icon">🌐</div>
                  <div className="geo-content">
                    <div className="geo-number">{stats.auto_location_logs}</div>
                    <div className="geo-label">Géoloc Auto</div>
                  </div>
                </div>
                
                <div className="geo-card total">
                  <div className="geo-icon">📊</div>
                  <div className="geo-content">
                    <div className="geo-number">{(stats.gps_logs || 0) + (stats.auto_location_logs || 0)}</div>
                    <div className="geo-label">Total Localisations</div>
                  </div>
                </div>
                
                <div className="geo-card rate">
                  <div className="geo-icon">📈</div>
                  <div className="geo-content">
                    <div className="geo-number">
                      {stats.server_logs > 0 
                        ? Math.round(((stats.gps_logs || 0) + (stats.auto_location_logs || 0)) / stats.server_logs * 100)
                        : 0}%
                    </div>
                    <div className="geo-label">Taux de Géoloc</div>
                  </div>
                </div>
              </div>
              
              <div className="geo-methods">
                <h4>📊 Méthodes de Localisation</h4>
                <div className="methods-list">
                  {Object.entries(stats.location_methods || {}).map(([method, count], i) => (
                    <div key={i} className="method-item">
                      <div className="method-icon">
                        {method === 'auto-ip' ? '🌐' : method === 'local' ? '🏠' : '❓'}
                      </div>
                      <div className="method-info">
                        <span className="method-name">
                          {method === 'auto-ip' ? 'IP Automatique' : method === 'local' ? 'Réseau Local' : method}
                        </span>
                        <span className="method-count">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Container 3: Analyse Géographique */}
          <div className="container-section">
            <div className="container-header">
              <h3>🗺️ Analyse Géographique</h3>
              <div className="container-description">Répartition géographique des visiteurs</div>
            </div>
            <div className="geography-grid">
              <div className="geography-card">
                <h4>🌍 Top Pays</h4>
                <div className="geography-list">
                  {stats.top_countries.map((item, i) => (
                    <div key={i} className="geography-item">
                      <span className="geography-rank">#{i + 1}</span>
                      <span className="geography-name">{item.country}</span>
                      <span className="geography-value">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="geography-card">
                <h4>🏙️ Top Villes</h4>
                <div className="geography-list">
                  {stats.top_cities?.length > 0 ? stats.top_cities.map((item, i) => (
                    <div key={i} className="geography-item">
                      <span className="geography-rank">#{i + 1}</span>
                      <span className="geography-name">{item.city}</span>
                      <span className="geography-value">{item.count}</span>
                    </div>
                  )) : <div className="no-data">Aucune donnée disponible</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Container 4: Activité Utilisateur */}
          <div className="container-section">
            <div className="container-header">
              <h3>👥 Activité Utilisateur</h3>
              <div className="container-description">Comportement et empreintes des visiteurs</div>
            </div>
            <div className="user-activity-grid">
              <div className="activity-card fingerprints">
                <div className="activity-header">
                  <div className="activity-icon">🔍</div>
                  <h4>Empreintes Digitales</h4>
                </div>
                <div className="activity-stats">
                  <div className="activity-stat">
                    <span className="activity-number">{stats.fingerprints}</span>
                    <span className="activity-label">Total</span>
                  </div>
                  <div className="activity-stat">
                    <span className="activity-number">{stats.unique_fingerprints}</span>
                    <span className="activity-label">Uniques</span>
                  </div>
                </div>
              </div>
              
              <div className="activity-card browsers">
                <div className="activity-header">
                  <div className="activity-icon">🌐</div>
                  <h4>Navigateurs</h4>
                </div>
                <div className="browser-list">
                  {stats.top_browsers.map((item, i) => (
                    <div key={i} className="browser-item">
                      <span className="browser-name">{item.browser}</span>
                      <span className="browser-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderLogs = () => (
    <div className="logs-section">
      <div className="logs-header">
        <h2>📋 Logs détaillés</h2>
        
        <div className="logs-controls">
          <div className="control-group">
            <label>Type de logs:</label>
            <select 
              value={logType} 
              onChange={(e) => setLogType(e.target.value)}
              className="log-type-select"
            >
              <option value="server">Logs Serveur</option>
              <option value="client">Logs Client</option>
              <option value="fingerprints">Empreintes</option>
              <option value="auto-location">Géolocalisation Auto</option>
              <option value="gps">GPS</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Période:</label>
            <input 
              type="date" 
              value={dateFilter.start}
              onChange={(e) => setDateFilter({...dateFilter, start: e.target.value})}
              className="date-input"
            />
            <span>à</span>
            <input 
              type="date" 
              value={dateFilter.end}
              onChange={(e) => setDateFilter({...dateFilter, end: e.target.value})}
              className="date-input"
            />
          </div>
          
          <div className="control-group">
            <label>Recherche:</label>
            <input 
              type="text" 
              placeholder="Rechercher dans les logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="control-group">
            <button onClick={loadLogs} className="btn-refresh">
              🔄 Actualiser
            </button>
            <button onClick={() => exportData('csv')} className="btn-export">
              📊 Export CSV
            </button>
            <button onClick={() => exportData('json')} className="btn-export">
              📄 Export JSON
            </button>
            <button 
              onClick={cleanupOldData} 
              className={`btn-cleanup ${cleanupStatus === 'running' ? 'loading' : ''}`}
              disabled={cleanupStatus === 'running'}
            >
              {cleanupStatus === 'running' ? '⏳ Nettoyage...' : '🗑️ Nettoyer'}
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <div className="logs-table">
          {logs.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {Object.keys(logs[0]).map(key => (
                      <th key={key}>
                        {key === 'DATE' ? '📅 Date' :
                         key === 'IP' ? '🌐 IP' :
                         key === 'LOCATION' ? '📍 Localisation' :
                         key === 'USER AGENT' ? '💻 Navigateur' :
                         key === 'REFERRER' ? '🔗 Référent' :
                         key === 'PAGE' ? '📄 Page' :
                         key === 'CITY' ? '🏙️ Ville' :
                         key === 'COUNTRY' ? '🌍 Pays' :
                         key === 'LATITUDE' ? '📐 Latitude' :
                         key === 'LONGITUDE' ? '📐 Longitude' :
                         key === 'METHOD' ? '⚙️ Méthode' :
                         key.replace('_', ' ').toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(0, 100).map((log, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                      {Object.entries(log).map(([key, value], j) => (
                        <td key={j} className={key.toLowerCase().replace(' ', '-')}>
                          {j === 0 ? formatDate(value) : 
                           key === 'METHOD' && value ? (
                             <span className={`method-badge ${value.replace(/"/g, '')}`}>
                               {value.replace(/"/g, '') === 'auto-ip' ? '🌐 Auto IP' :
                                value.replace(/"/g, '') === 'local' ? '🏠 Local' :
                                value.replace(/"/g, '')}
                             </span>
                           ) :
                           key === 'LOCATION' && value ? (
                             <span className="location-text">{value.replace(/"/g, '')}</span>
                           ) :
                           value ? value.toString().replace(/"/g, '') : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-footer">
                <span>Affichage de {Math.min(logs.length, 100)} sur {logs.length} entrées</span>
                {logs.length > 100 && (
                  <span className="more-entries">({logs.length - 100} entrées supplémentaires disponibles)</span>
                )}
              </div>
            </div>
          ) : (
            <div className="no-logs">Aucun log disponible pour ce type</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Panel Admin - M-I-SSION</title>
      </Head>
      
      <div className="admin-panel">
        <header className="admin-header">
          <h1>🔐 Panel d'Administration</h1>
          <nav className="admin-nav">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={activeTab === 'logs' ? 'active' : ''}
              onClick={() => setActiveTab('logs')}
            >
              📋 Logs
            </button>
          </nav>
        </header>
        
        <main className="admin-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'logs' && renderLogs()}
        </main>
      </div>
      
      <style jsx>{`
        .admin-panel {
          min-height: 100vh;
          background: #f5f5f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Styles pour le dashboard */
        .dashboard {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }
        
        .dashboard-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dashboard-header h2 {
          margin: 0 0 10px 0;
          font-size: 2.5em;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .dashboard-subtitle {
          font-size: 1.1em;
          opacity: 0.9;
          font-weight: 300;
        }
        
        /* Container Sections */
        .container-section {
          margin-bottom: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .container-header {
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .container-header h3 {
          margin: 0 0 8px 0;
          font-size: 1.8em;
          font-weight: 600;
        }
        
        .container-description {
          font-size: 1em;
          opacity: 0.8;
          font-weight: 300;
        }
        
        .admin-header {
          background: #2c3e50;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        
        .admin-nav {
          display: flex;
          gap: 1rem;
        }
        
        .admin-nav button {
          background: transparent;
          border: 2px solid #34495e;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .admin-nav button:hover,
        .admin-nav button.active {
          background: #34495e;
        }
        
        .admin-content {
          padding: 2rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          padding: 25px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .stat-icon {
          font-size: 2.5em;
          opacity: 0.8;
        }
        
        .stat-content {
          flex: 1;
          text-align: left;
        }
        
        .stat-number {
          font-size: 2.2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .stat-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 500;
        }
        
        .stat-date {
          font-size: 1rem;
          color: white;
          font-weight: 500;
        }
        
        .stat-card.primary {
          background: linear-gradient(135deg, rgba(52, 152, 219, 0.3) 0%, rgba(41, 128, 185, 0.3) 100%);
        }
        
        .stat-card.secondary {
          background: linear-gradient(135deg, rgba(155, 89, 182, 0.3) 0%, rgba(142, 68, 173, 0.3) 100%);
        }
        
        .stat-card.accent {
          background: linear-gradient(135deg, rgba(46, 204, 113, 0.3) 0%, rgba(39, 174, 96, 0.3) 100%);
        }
        
        .stat-card.info {
          background: linear-gradient(135deg, rgba(241, 196, 15, 0.3) 0%, rgba(243, 156, 18, 0.3) 100%);
        }
        
        /* Géolocalisation Styles */
        .geo-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          align-items: start;
        }
        
        .geo-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .geo-card {
          background: rgba(255, 255, 255, 0.15);
          padding: 20px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .geo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .geo-icon {
          font-size: 2em;
          opacity: 0.8;
        }
        
        .geo-content {
          flex: 1;
          text-align: left;
        }
        
        .geo-number {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.3rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .geo-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .geo-card.gps {
          background: linear-gradient(135deg, rgba(231, 76, 60, 0.3) 0%, rgba(192, 57, 43, 0.3) 100%);
        }
        
        .geo-card.auto {
          background: linear-gradient(135deg, rgba(52, 152, 219, 0.3) 0%, rgba(41, 128, 185, 0.3) 100%);
        }
        
        .geo-card.total {
          background: linear-gradient(135deg, rgba(155, 89, 182, 0.3) 0%, rgba(142, 68, 173, 0.3) 100%);
        }
        
        .geo-card.rate {
          background: linear-gradient(135deg, rgba(46, 204, 113, 0.3) 0%, rgba(39, 174, 96, 0.3) 100%);
        }
        
        .geo-methods {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .geo-methods h4 {
          margin: 0 0 15px 0;
          font-size: 1.3em;
          color: white;
        }
        
        .methods-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .method-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .method-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
        
        .method-icon {
          font-size: 1.5em;
        }
        
        .method-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .method-name {
          color: white;
          font-weight: 500;
        }
        
        .method-count {
          color: rgba(255, 255, 255, 0.8);
          font-weight: bold;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.9em;
        }
        
        /* Analyse Géographique */
        .geography-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }
        
        .geography-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 25px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .geography-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .geography-card h4 {
          margin: 0 0 20px 0;
          font-size: 1.4em;
          color: white;
          text-align: center;
        }
        
        .geography-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .geography-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .geography-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
        
        .geography-rank {
          background: linear-gradient(135deg, #f39c12, #e67e22);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9em;
        }
        
        .geography-name {
          flex: 1;
          color: white;
          font-weight: 500;
        }
        
        .geography-value {
          color: rgba(255, 255, 255, 0.9);
          font-weight: bold;
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.9em;
        }
        
        /* Activité Utilisateur */
        .user-activity-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }
        
        .activity-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 25px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .activity-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .activity-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .activity-icon {
          font-size: 2em;
        }
        
        .activity-header h4 {
          margin: 0;
          font-size: 1.3em;
          color: white;
        }
        
        .activity-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }
        
        .activity-stat {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .activity-number {
          display: block;
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
          margin-bottom: 5px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .activity-label {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .browser-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .browser-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .browser-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
        
        .browser-name {
          color: white;
          font-weight: 500;
        }
        
        .browser-count {
          color: rgba(255, 255, 255, 0.9);
          font-weight: bold;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.9em;
        }
        
        .no-data {
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
          text-align: center;
          padding: 1rem;
        }
        

        
        .logs-header {
          margin-bottom: 2rem;
        }
        
        .logs-header h2 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .logs-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: end;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 150px;
        }
        
        .control-group label {
          font-weight: 600;
          color: #495057;
          font-size: 0.9rem;
        }
        
        .log-type-select,
        .date-input,
        .search-input {
          padding: 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          background: white;
          font-size: 0.9rem;
        }
        
        .search-input {
          min-width: 200px;
        }
        
        .btn-refresh,
        .btn-export,
        .btn-cleanup {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s;
          margin-right: 0.5rem;
        }
        
        .btn-refresh {
          background: #17a2b8;
          color: white;
        }
        
        .btn-refresh:hover {
          background: #138496;
        }
        
        .btn-export {
          background: #28a745;
          color: white;
        }
        
        .btn-export:hover {
          background: #218838;
        }
        
        .btn-cleanup {
          background: #dc3545;
          color: white;
        }
        
        .btn-cleanup:hover {
          background: #c82333;
        }
        
        .btn-cleanup.loading {
          background: #6c757d;
          cursor: not-allowed;
        }
        
        .btn-cleanup:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .logs-table {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }
        
        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        
        th {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          font-weight: 600;
          color: #2c3e50;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .even-row {
          background: #f8f9fa;
        }
        
        .odd-row {
          background: white;
        }
        
        tr:hover {
          background: #e3f2fd !important;
          transform: scale(1.01);
          transition: all 0.2s ease;
        }
        
        .method-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          text-align: center;
        }
        
        .method-badge.auto-ip {
          background: #e3f2fd;
          color: #1976d2;
          border: 1px solid #bbdefb;
        }
        
        .method-badge.local {
          background: #f3e5f5;
          color: #7b1fa2;
          border: 1px solid #e1bee7;
        }
        
        .location-text {
          color: #2e7d32;
          font-weight: 500;
        }
        
        .table-footer {
          padding: 1rem;
          background: #f8f9fa;
          border-top: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #6c757d;
        }
        
        .more-entries {
          color: #007bff;
          font-weight: 500;
        }
        
        .loading, .no-logs {
          text-align: center;
          padding: 2rem;
          color: #7f8c8d;
        }
        
        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .admin-content {
            padding: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .geo-grid {
            grid-template-columns: 1fr;
          }
          
          .geography-grid {
            grid-template-columns: 1fr;
          }
          
          .user-activity-grid {
            grid-template-columns: 1fr;
          }
          
          .container-section {
            padding: 15px;
          }
          
          .stat-card {
            flex-direction: column;
            text-align: center;
          }
          
          .stat-icon {
            font-size: 2em;
          }
          
          .logs-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          table {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}