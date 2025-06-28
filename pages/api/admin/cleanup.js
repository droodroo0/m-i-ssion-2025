import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { days = 30 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const logsDir = path.join(process.cwd(), 'logs');
    const logFiles = ['logs.csv', 'client.csv', 'fingerprints.csv', 'gps.csv'];
    
    let totalCleaned = 0;
    const results = {};
    
    for (const logFile of logFiles) {
      const filePath = path.join(logsDir, logFile);
      
      if (!fs.existsSync(filePath)) {
        results[logFile] = { cleaned: 0, kept: 0, status: 'file_not_found' };
        continue;
      }
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
          results[logFile] = { cleaned: 0, kept: 0, status: 'empty' };
          continue;
        }
        
        const header = lines[0];
        const dataLines = lines.slice(1);
        
        const filteredLines = dataLines.filter(line => {
          const columns = line.split(',');
          
          // Chercher la colonne de date/timestamp
          let dateColumn = null;
          if (columns.length > 0) {
            // Essayer de trouver une date dans les colonnes
            for (let i = 0; i < columns.length; i++) {
              const col = columns[i].replace(/"/g, '').trim();
              if (col.match(/\d{4}-\d{2}-\d{2}/) || col.includes('T')) {
                dateColumn = col;
                break;
              }
            }
          }
          
          if (!dateColumn) {
            return true; // Garder si pas de date trouvée
          }
          
          try {
            const lineDate = new Date(dateColumn);
            return lineDate >= cutoffDate;
          } catch (error) {
            return true; // Garder en cas d'erreur de parsing
          }
        });
        
        const cleanedCount = dataLines.length - filteredLines.length;
        totalCleaned += cleanedCount;
        
        // Réécrire le fichier avec les données filtrées
        const newContent = [header, ...filteredLines].join('\n') + '\n';
        fs.writeFileSync(filePath, newContent, 'utf8');
        
        results[logFile] = {
          cleaned: cleanedCount,
          kept: filteredLines.length,
          status: 'success'
        };
        
      } catch (error) {
        results[logFile] = {
          cleaned: 0,
          kept: 0,
          status: 'error',
          error: error.message
        };
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Nettoyage terminé. ${totalCleaned} entrées supprimées.`,
      cutoffDate: cutoffDate.toISOString(),
      results
    });
    
  } catch (error) {
    console.error('Erreur nettoyage logs:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du nettoyage des logs',
      details: error.message
    });
  }
}