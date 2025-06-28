import Head from 'next/head';
import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Politique de Confidentialité - M-I-SSION</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles" />
      </Head>
      
      <div className="privacy-page">
        <div className="container">
          <h1>🔒 Politique de Confidentialité</h1>
          
          <div className="last-updated">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </div>
          
          <section className="privacy-section">
            <h2>1. Collecte des Données</h2>
            <p>
              Notre site collecte différents types de données pour améliorer votre expérience 
              et analyser l'utilisation du site. Toute collecte se fait avec votre consentement explicite.
            </p>
            
            <h3>Données Analytics (avec consentement)</h3>
            <ul>
              <li>Pages visitées et temps de navigation</li>
              <li>Informations techniques anonymisées (navigateur, OS)</li>
              <li>Résolution d'écran (arrondie pour anonymisation)</li>
              <li>Langue et fuseau horaire</li>
              <li>Référent de visite</li>
            </ul>
            
            <h3>Empreinte Numérique (consentement séparé)</h3>
            <ul>
              <li>Combinaison hachée d'informations techniques</li>
              <li>Utilisée pour la sécurité et l'analyse de trafic</li>
              <li>Ne permet pas d'identification personnelle</li>
            </ul>
            
            <h3>Géolocalisation (consentement explicite)</h3>
            <ul>
              <li>Position GPS approximative (précision limitée à 1km)</li>
              <li>Uniquement sur demande explicite</li>
              <li>Utilisée pour des fonctionnalités spécifiques</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>2. Base Légale du Traitement</h2>
            <p>
              Conformément au RGPD, nous traitons vos données sur les bases légales suivantes :
            </p>
            <ul>
              <li><strong>Consentement :</strong> Pour les analytics et le tracking</li>
              <li><strong>Intérêt légitime :</strong> Pour la sécurité du site</li>
              <li><strong>Obligation légale :</strong> Pour la conservation des logs de sécurité</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>3. Durée de Conservation</h2>
            <table className="data-retention-table">
              <thead>
                <tr>
                  <th>Type de Données</th>
                  <th>Durée de Conservation</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Logs Analytics</td>
                  <td>30 jours</td>
                  <td>Analyse statistique</td>
                </tr>
                <tr>
                  <td>Empreintes Numériques</td>
                  <td>30 jours</td>
                  <td>Détection de fraude</td>
                </tr>
                <tr>
                  <td>Données GPS</td>
                  <td>7 jours</td>
                  <td>Fonctionnalité temporaire</td>
                </tr>
                <tr>
                  <td>Logs de Sécurité</td>
                  <td>1 an</td>
                  <td>Obligation légale</td>
                </tr>
              </tbody>
            </table>
          </section>
          
          <section className="privacy-section">
            <h2>4. Vos Droits RGPD</h2>
            <p>Vous disposez des droits suivants concernant vos données personnelles :</p>
            
            <div className="rights-grid">
              <div className="right-card">
                <h4>🔍 Droit d'Accès</h4>
                <p>Connaître quelles données nous avons sur vous</p>
              </div>
              
              <div className="right-card">
                <h4>✏️ Droit de Rectification</h4>
                <p>Corriger des données inexactes</p>
              </div>
              
              <div className="right-card">
                <h4>🗑️ Droit à l'Effacement</h4>
                <p>Supprimer vos données ("droit à l'oubli")</p>
              </div>
              
              <div className="right-card">
                <h4>⏸️ Droit de Limitation</h4>
                <p>Limiter le traitement de vos données</p>
              </div>
              
              <div className="right-card">
                <h4>📦 Droit à la Portabilité</h4>
                <p>Récupérer vos données dans un format lisible</p>
              </div>
              
              <div className="right-card">
                <h4>❌ Droit d'Opposition</h4>
                <p>Vous opposer au traitement de vos données</p>
              </div>
            </div>
          </section>
          
          <section className="privacy-section">
            <h2>5. Sécurité des Données</h2>
            <p>Nous mettons en place plusieurs mesures de sécurité :</p>
            <ul>
              <li>Anonymisation et hachage des données sensibles</li>
              <li>Limitation de la précision géographique</li>
              <li>Chiffrement des communications (HTTPS)</li>
              <li>Limitation d'accès aux données</li>
              <li>Nettoyage automatique des données anciennes</li>
              <li>Surveillance des accès et tentatives d'intrusion</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>6. Cookies et Technologies Similaires</h2>
            <p>
              Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site.
              Aucun cookie de tracking n'est déposé sans votre consentement explicite.
            </p>
            
            <h3>Types de Cookies</h3>
            <ul>
              <li><strong>Cookies de Consentement :</strong> Mémoriser vos préférences</li>
              <li><strong>Cookies de Session :</strong> Fonctionnement technique du site</li>
              <li><strong>Cookies Analytics :</strong> Uniquement avec votre consentement</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>7. Transferts de Données</h2>
            <p>
              Vos données sont traitées et stockées en France. Aucun transfert vers des pays tiers 
              n'est effectué sans garanties appropriées.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>8. Contact et Réclamations</h2>
            <p>Pour exercer vos droits ou pour toute question :</p>
            
            <div className="contact-info">
              <div className="contact-method">
                <h4>📧 Email</h4>
                <p>privacy@m-i-ssion.com</p>
              </div>
              
              <div className="contact-method">
                <h4>📮 Courrier</h4>
                <p>
                  Délégué à la Protection des Données<br/>
                  M-I-SSION<br/>
                  [Adresse]<br/>
                  France
                </p>
              </div>
              
              <div className="contact-method">
                <h4>⚖️ Réclamation</h4>
                <p>
                  Vous pouvez déposer une réclamation auprès de la CNIL :<br/>
                  <a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </div>
          </section>
          
          <section className="privacy-section">
            <h2>9. Modifications</h2>
            <p>
              Cette politique peut être mise à jour. Les modifications importantes 
              vous seront notifiées par bannière sur le site.
            </p>
          </section>
        </div>
      </div>
      
      <style jsx>{`
        .privacy-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem 0;
        }
        
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 1rem;
          padding: 2rem 0 1rem 0;
          border-bottom: 3px solid #3498db;
        }
        
        .last-updated {
          text-align: center;
          color: #7f8c8d;
          font-style: italic;
          margin-bottom: 2rem;
        }
        
        .privacy-section {
          margin: 2rem 0;
          padding: 0 2rem 2rem 2rem;
        }
        
        .privacy-section h2 {
          color: #2c3e50;
          border-left: 4px solid #3498db;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        
        .privacy-section h3 {
          color: #34495e;
          margin: 1.5rem 0 1rem 0;
        }
        
        .privacy-section h4 {
          color: #2c3e50;
          margin: 1rem 0 0.5rem 0;
        }
        
        .privacy-section p {
          line-height: 1.6;
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        
        .privacy-section ul {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .privacy-section li {
          margin: 0.5rem 0;
          line-height: 1.5;
          color: #2c3e50;
        }
        
        .data-retention-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .data-retention-table th,
        .data-retention-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        
        .data-retention-table th {
          background: #3498db;
          color: white;
          font-weight: 600;
        }
        
        .data-retention-table tr:hover {
          background: #f8f9fa;
        }
        
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        
        .right-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #3498db;
          transition: transform 0.3s;
        }
        
        .right-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .right-card h4 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        
        .right-card p {
          margin: 0;
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        
        .contact-method {
          background: #ecf0f1;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .contact-method h4 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .contact-method p {
          margin: 0;
          color: #2c3e50;
        }
        
        .contact-method a {
          color: #3498db;
          text-decoration: none;
        }
        
        .contact-method a:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .container {
            margin: 0;
            border-radius: 0;
          }
          
          .privacy-section {
            padding: 0 1rem 2rem 1rem;
          }
          
          .rights-grid {
            grid-template-columns: 1fr;
          }
          
          .contact-info {
            grid-template-columns: 1fr;
          }
          
          .data-retention-table {
            font-size: 0.9rem;
          }
          
          .data-retention-table th,
          .data-retention-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}