// /pages/api/admin/logs.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, start, end, search, export: exportFormat } = req.query;
  const logsDir = './logs';
  
  // Filtres de date
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end + 'T23:59:59') : null;
  const searchTerm = search ? search.toLowerCase() : null;
  
  try {
    // Vérifier si le dossier logs existe
    await fs.access(logsDir);
  } catch {
    return res.status(200).json({ logs: [], message: 'Aucun log disponible' });
  }

  try {
    let filename;
    let headers;
    
    switch (type) {
      case 'server':
        filename = 'logs.csv';
        headers = ['Date', 'IP', 'Location', 'User Agent', 'Referrer'];
        break;
      case 'client':
        filename = 'client.csv';
        headers = ['Date', 'Fingerprint', 'User Agent', 'Platform', 'Language', 'Timezone', 'Connection', 'Screen', 'Cookies', 'DNT'];
        break;
      case 'fingerprints':
        filename = 'fingerprints.csv';
        headers = ['Date', 'Fingerprint', 'User Agent', 'Platform', 'Timezone'];
        break;
      case 'auto-location':
        filename = 'auto-location.csv';
        headers = ['Date', 'IP', 'Page', 'Location', 'City', 'Country', 'Latitude', 'Longitude', 'Method'];
        break;
      case 'gps':
        filename = 'gps.csv';
        headers = ['Timestamp', 'Latitude', 'Longitude', 'Accuracy'];
        break;
      default:
        return res.status(400).json({ error: 'Type de log invalide' });
    }

    const filePath = path.join(logsDir, filename);
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const lines = data.trim().split('\n').filter(line => line.length > 0);
      
      if (lines.length === 0) {
        return res.status(200).json({ logs: [], message: 'Aucun log disponible' });
      }
      
      let logs = lines.map(line => {
        // Parser le CSV en tenant compte des guillemets
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim());
        
        const logEntry = {};
        headers.forEach((header, index) => {
          logEntry[header.toLowerCase().replace(' ', '_')] = values[index] || '';
        });
        
        return logEntry;
      });
      
      // Appliquer les filtres
      if (startDate || endDate || searchTerm) {
        logs = logs.filter(log => {
          // Filtre par date
          if (startDate || endDate) {
            const dateField = log.date || log.timestamp;
            if (dateField) {
              try {
                const logDate = new Date(dateField.replace(/"/g, ''));
                if (startDate && logDate < startDate) return false;
                if (endDate && logDate > endDate) return false;
              } catch (e) {
                // Si la date ne peut pas être parsée, on garde l'entrée
              }
            }
          }
          
          // Filtre par recherche
          if (searchTerm) {
            const logString = Object.values(log).join(' ').toLowerCase();
            if (!logString.includes(searchTerm)) return false;
          }
          
          return true;
        });
      }
      
      res.status(200).json({ 
        logs: logs.reverse(), // Plus récents en premier
        total: logs.length,
        headers,
        filters: {
          start: start || null,
          end: end || null,
          search: search || null
        }
      });
    } catch (fileErr) {
      res.status(200).json({ 
        logs: [], 
        total: 0, 
        headers,
        message: `Aucun log ${type} disponible` 
      });
    }
  } catch (err) {
    console.error('Erreur lecture logs:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}