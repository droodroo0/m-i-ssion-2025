import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

interface FormData {
  nom: string
  email: string
  entreprise: string
  poste: string
  message: string
  typeContact: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    entreprise: '',
    poste: '',
    message: '',
    typeContact: 'information'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi (à remplacer par votre API)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Layout currentPath="/contact">
        <Head>
          <title>Message envoyé - M-I-SSION</title>
        </Head>
        
        <motion.section 
          className="section-padding bg-gradient-to-br from-emeraude to-emeraude-dark text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container-custom text-center">
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="w-20 h-20 bg-or rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <span className="text-3xl">✓</span>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Message envoyé avec succès !
              </motion.h1>
              <motion.p 
                className="text-xl text-prusse mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais.
              </motion.p>
              <motion.a 
                href="/" 
                className="btn-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retour à l'accueil
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </Layout>
    )
  }

  return (
    <Layout currentPath="/contact">
      <Head>
        <title>Contact - M-I-SSION | Démarrez votre transformation digitale</title>
        <meta name="description" content="Contactez M-I-SSION pour démarrer votre transformation digitale. Consultation gratuite, accompagnement personnalisé et résultats garantis. Experts en IA et automatisation." />
        <meta name="keywords" content="contact M-I-SSION, consultation gratuite, transformation digitale, accompagnement entreprise, experts IA, automatisation" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://m-i-ssion.com/contact" />
        <meta property="og:title" content="Contact M-I-SSION - Démarrez votre transformation" />
        <meta property="og:description" content="Contactez nos experts pour une consultation gratuite. Accompagnement personnalisé en transformation digitale, IA et automatisation." />
        <meta property="og:image" content="https://m-i-ssion.com/og-contact.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact M-I-SSION - Consultation gratuite" />
        <meta name="twitter:description" content="Démarrez votre transformation digitale avec nos experts. Consultation gratuite et accompagnement personnalisé." />
        
        {/* Structured Data - ContactPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact M-I-SSION",
              "description": "Page de contact pour démarrer votre transformation digitale",
              "url": "https://m-i-ssion.com/contact",
              "mainEntity": {
                "@type": "Organization",
                "name": "M-I-SSION",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "availableLanguage": "French"
                }
              }
            })
          }}
        />
        
        <link rel="canonical" href="https://m-i-ssion.com/contact" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-emeraude via-emeraude-dark to-or/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-custom text-center text-white relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Prêt à démarrer votre transformation digitale ? Notre équipe d'experts vous accompagne dans votre ascension vers l'excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Échange téléphonique */}
            <motion.div 
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-emeraude text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">📞</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-prusse">Échange téléphonique</h3>
              <p className="text-gray-600">Discutons de vos besoins lors d'un appel personnalisé</p>
            </motion.div>

            {/* Diagnostic gratuit */}
            <motion.div 
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-or text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🔍</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-prusse">Diagnostic gratuit</h3>
              <p className="text-gray-600">Analyse complète de votre situation actuelle</p>
            </motion.div>

            {/* Accompagnement sur-mesure */}
            <motion.div 
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-emeraude-dark text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🎯</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-prusse">Accompagnement sur-mesure</h3>
              <p className="text-gray-600">Solutions adaptées à vos objectifs spécifiques</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pourquoi nous choisir */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-8 text-prusse"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Pourquoi nous choisir ?
              </motion.h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-emeraude rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-prusse mb-2">Expertise reconnue</h4>
                    <p className="text-gray-600">Plus de 10 ans d'expérience dans la transformation digitale</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-emeraude rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-prusse mb-2">Approche personnalisée</h4>
                    <p className="text-gray-600">Solutions sur-mesure adaptées à votre secteur d'activité</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-emeraude rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-prusse mb-2">Accompagnement complet</h4>
                    <p className="text-gray-600">De la stratégie à la mise en œuvre, nous vous guidons à chaque étape</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-emeraude rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-prusse mb-2">Résultats mesurables</h4>
                    <p className="text-gray-600">ROI démontré et amélioration continue de vos performances</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulaire de contact */}
            <motion.form 
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-prusse">Démarrons ensemble</h3>
              
              {/* Nom complet */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <motion.input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300"
                  placeholder="Votre nom complet"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Email */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Entreprise */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <motion.input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300"
                  placeholder="Nom de votre entreprise"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Poste */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-2">
                  Poste
                </label>
                <motion.input
                  type="text"
                  id="poste"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300"
                  placeholder="Votre fonction"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Type de demande */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <label htmlFor="typeContact" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de demande
                </label>
                <motion.select
                  id="typeContact"
                  name="typeContact"
                  value={formData.typeContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <option value="information">Demande d'information</option>
                  <option value="devis">Demande de devis</option>
                  <option value="audit">Audit gratuit</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </motion.select>
              </motion.div>

              {/* Message */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emeraude focus:border-transparent transition-all duration-300 resize-vertical"
                  placeholder="Décrivez votre projet ou vos besoins..."
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Bouton de soumission */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emeraude text-white py-3 px-6 rounded-lg font-semibold hover:bg-emeraude-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* Additional Info Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 text-prusse"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nos engagements
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-emeraude text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3 text-prusse">Réponse rapide</h4>
              <p className="text-gray-600">Nous nous engageons à vous répondre sous 24h maximum</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-or text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🔒</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3 text-prusse">Confidentialité</h4>
              <p className="text-gray-600">Vos informations sont protégées et ne seront jamais partagées</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-emeraude-dark text-white rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🎯</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3 text-prusse">Solutions sur-mesure</h4>
              <p className="text-gray-600">Chaque proposition est adaptée à vos besoins spécifiques</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Layout>
  )
}