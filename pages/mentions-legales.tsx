import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'
import { SEOMetadata } from '../types'

const MentionsLegales: React.FC = () => {
  return (
    <Layout>
      <SEOHead 
        title="Mentions Légales - M-I-SSION"
        description="Mentions légales et informations juridiques de M-I-SSION"
        canonicalUrl="https://m-i-ssion.com/mentions-legales"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-prusse mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Mentions Légales
            </motion.h1>
            
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">1. Informations légales</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">Éditeur du site</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">
                    <strong>Raison sociale :</strong> M-I-SSION<br />
                    <strong>Forme juridique :</strong> [À compléter - SARL, SAS, etc.]<br />
                    <strong>Capital social :</strong> [À compléter]<br />
                    <strong>Siège social :</strong> [À compléter]<br />
                    <strong>RCS :</strong> [À compléter]<br />
                    <strong>SIRET :</strong> [À compléter]<br />
                    <strong>TVA intracommunautaire :</strong> [À compléter]<br />
                    <strong>Téléphone :</strong> [À compléter]<br />
                    <strong>Email :</strong> contact@m-i-ssion.com
                  </p>
                </div>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">Directeur de publication</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">
                    <strong>Nom :</strong> [À compléter]<br />
                    <strong>Qualité :</strong> [À compléter - Gérant, Président, etc.]
                  </p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">2. Hébergement</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Hébergeur :</strong> Vercel Inc.<br />
                    <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                    <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-prusse hover:underline">vercel.com</a>
                  </p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">3. Propriété intellectuelle</h2>
                <p className="text-gray-700 mb-4">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Contenu du site</h3>
                <p className="text-gray-700 mb-4">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite 
                  sauf autorisation expresse du directeur de la publication.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Marques et logos</h3>
                <p className="text-gray-700 mb-4">
                  Les marques et logos figurant sur le site sont déposés par M-I-SSION ou éventuellement par des partenaires. 
                  Toute reproduction totale ou partielle de ces marques ou logos effectuée à partir des éléments du site 
                  sans l'autorisation expresse de M-I-SSION est donc prohibée.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">4. Responsabilité</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Contenu du site</h3>
                <p className="text-gray-700 mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                  mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, 
                  erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email à l'adresse 
                  contact@m-i-ssion.com en décrivant le problème de la manière la plus précise possible.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Liens hypertextes</h3>
                <p className="text-gray-700 mb-4">
                  Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources 
                  présentes sur le réseau Internet ne sauraient engager la responsabilité de M-I-SSION.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Disponibilité du site</h3>
                <p className="text-gray-700 mb-4">
                  M-I-SSION s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure 
                  ou d'un événement hors du contrôle de M-I-SSION, et sous réserve des éventuelles pannes et interventions 
                  de maintenance nécessaires au bon fonctionnement du site et des services.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">5. Données personnelles</h2>
                <p className="text-gray-700 mb-4">
                  Le traitement de vos données personnelles est régi par notre 
                  <a href="/politique-confidentialite" className="text-prusse hover:underline ml-1">Politique de Confidentialité</a>, 
                  qui constitue un document séparé et complémentaire aux présentes mentions légales.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">6. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
                  L'utilisation de ces cookies est détaillée dans notre 
                  <a href="/politique-confidentialite" className="text-prusse hover:underline ml-1">Politique de Confidentialité</a>.
                </p>
                <p className="text-gray-700 mb-4">
                  Vous pouvez gérer vos préférences de cookies via la bannière qui s'affiche lors de votre première visite 
                  ou en modifiant les paramètres de votre navigateur.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">7. Droit applicable et juridiction</h2>
                <p className="text-gray-700 mb-4">
                  Tout litige en relation avec l'utilisation du site M-I-SSION est soumis au droit français. 
                  En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction 
                  aux tribunaux compétents de [À compléter - ville du siège social].
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">8. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                </p>
                <div className="bg-emeraude-light p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email :</strong> <a href="mailto:contact@m-i-ssion.com" className="text-prusse hover:underline">contact@m-i-ssion.com</a><br />
                    <strong>Adresse :</strong> [À compléter]<br />
                    <strong>Téléphone :</strong> [À compléter]
                  </p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">9. Crédits</h2>
                <p className="text-gray-700 mb-4">
                  <strong>Conception et développement :</strong> M-I-SSION<br />
                  <strong>Technologies utilisées :</strong> Next.js, React, TypeScript, Tailwind CSS<br />
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                </p>
              </section>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default MentionsLegales