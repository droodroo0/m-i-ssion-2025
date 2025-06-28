import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'
import { SEOMetadata } from '../types'

const PolitiqueConfidentialite: React.FC = () => {
  return (
    <Layout>
      <SEOHead 
        title="Politique de Confidentialité - M-I-SSION"
        description="Politique de confidentialité et protection des données personnelles de M-I-SSION"
        canonicalUrl="https://m-i-ssion.com/politique-confidentialite"
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
              Politique de Confidentialité
            </motion.h1>
            
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-600 mb-6">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">1. Responsable du traitement</h2>
                <p className="text-gray-700 mb-4">
                  M-I-SSION est responsable du traitement de vos données personnelles collectées sur ce site web.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Contact :</strong><br />
                    Email : contact@m-i-ssion.com<br />
                    Adresse : [À compléter]
                  </p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">2. Données collectées</h2>
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Données de contact</h3>
                <p className="text-gray-700 mb-4">
                  Lorsque vous utilisez notre formulaire de contact, nous collectons :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Entreprise (optionnel)</li>
                  <li>Message</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Données de navigation</h3>
                <p className="text-gray-700 mb-4">
                  Nous collectons automatiquement certaines informations lors de votre visite :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées</li>
                  <li>Durée de visite</li>
                  <li>Référent (site d'origine)</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">3. Finalités du traitement</h2>
                <p className="text-gray-700 mb-4">
                  Vos données sont traitées pour les finalités suivantes :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li><strong>Répondre à vos demandes :</strong> Traitement de vos messages via le formulaire de contact</li>
                  <li><strong>Améliorer notre site :</strong> Analyse du trafic et du comportement des utilisateurs</li>
                  <li><strong>Sécurité :</strong> Prévention des abus et protection du site</li>
                  <li><strong>Obligations légales :</strong> Respect de nos obligations réglementaires</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">4. Base légale</h2>
                <p className="text-gray-700 mb-4">
                  Le traitement de vos données repose sur :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li><strong>Consentement :</strong> Pour les cookies d'analyse et marketing</li>
                  <li><strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et la sécurité</li>
                  <li><strong>Exécution d'un contrat :</strong> Pour répondre à vos demandes</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">5. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Notre site utilise différents types de cookies :
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Cookies essentiels</h3>
                <p className="text-gray-700 mb-4">
                  Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Cookies d'analyse</h3>
                <p className="text-gray-700 mb-4">
                  Nous utilisons Google Analytics pour comprendre l'utilisation de notre site. 
                  Ces cookies sont soumis à votre consentement.
                </p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Gestion des cookies</h3>
                <p className="text-gray-700 mb-4">
                  Vous pouvez gérer vos préférences de cookies via la bannière qui s'affiche 
                  lors de votre première visite ou en modifiant les paramètres de votre navigateur.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">6. Partage des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers, 
                  sauf dans les cas suivants :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Prestataires techniques (hébergement, analytics) sous contrat de confidentialité</li>
                  <li>Obligations légales ou décisions de justice</li>
                  <li>Protection de nos droits et sécurité</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">7. Durée de conservation</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                  <li><strong>Données de navigation :</strong> 25 mois maximum</li>
                  <li><strong>Cookies :</strong> Selon leur type (session ou persistant)</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">8. Vos droits</h2>
                <p className="text-gray-700 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li><strong>Droit d'accès :</strong> Connaître les données que nous détenons sur vous</li>
                  <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
                  <li><strong>Droit d'effacement :</strong> Supprimer vos données sous certaines conditions</li>
                  <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement pour motif légitime</li>
                  <li><strong>Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
                </ul>
                
                <div className="bg-emeraude-light p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>Pour exercer vos droits :</strong><br />
                    Contactez-nous à : <a href="mailto:contact@m-i-ssion.com" className="text-prusse hover:underline">contact@m-i-ssion.com</a><br />
                    Nous vous répondrons dans un délai de 30 jours maximum.
                  </p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">9. Sécurité</h2>
                <p className="text-gray-700 mb-4">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                  pour protéger vos données contre :
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>L'accès non autorisé</li>
                  <li>La modification, divulgation ou destruction</li>
                  <li>La perte accidentelle</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">10. Modifications</h2>
                <p className="text-gray-700 mb-4">
                  Cette politique peut être modifiée. Les modifications importantes vous seront 
                  notifiées par email ou via une notification sur le site.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-prusse mb-4">11. Contact et réclamations</h2>
                <p className="text-gray-700 mb-4">
                  Pour toute question concernant cette politique ou vos données :
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Email :</strong> <a href="mailto:contact@m-i-ssion.com" className="text-prusse hover:underline">contact@m-i-ssion.com</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Autorité de contrôle :</strong> Vous pouvez également déposer une réclamation 
                    auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-prusse hover:underline">www.cnil.fr</a>)
                  </p>
                </div>
              </section>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default PolitiqueConfidentialite