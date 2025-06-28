
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function HomePage() {
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

    // Envoi des données client
    fetch('/api/log-client', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    // Envoi des données d'empreinte
    fetch('/api/fingerprint', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        fingerprint: data.fingerprint,
        userAgent: data.userAgent,
        platform: data.platform,
        timezone: data.timezone
      })
    });
  }, []);

  return (
    <Layout currentPath="/">
      <Head>
        <title>M-I-SSION - Révélez la puissance de vos équipes grâce à l'IA et l'automatisation</title>
        <meta name="description" content="Transformez votre entreprise avec M-I-SSION. Automatisation intelligente, IA conversationnelle et accompagnement humain pour révéler le potentiel de vos équipes. Résultats mesurables garantis." />
        <meta name="keywords" content="transformation digitale, automatisation, intelligence artificielle, IA, productivité, accompagnement entreprise, optimisation processus, M-I-SSION" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://m-i-ssion.com/" />
        <meta property="og:title" content="M-I-SSION - Révélez la puissance de vos équipes grâce à l'IA" />
        <meta property="og:description" content="Transformez votre entreprise avec notre approche unique combinant IA, automatisation et accompagnement humain. 85% de gain de productivité moyen." />
        <meta property="og:image" content="https://m-i-ssion.com/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="M-I-SSION" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://m-i-ssion.com/" />
        <meta name="twitter:title" content="M-I-SSION - Révélez la puissance de vos équipes" />
        <meta name="twitter:description" content="Transformation digitale avec IA et automatisation. Accompagnement personnalisé pour des résultats mesurables." />
        <meta name="twitter:image" content="https://m-i-ssion.com/og-image.jpg" />
        
        {/* Autres métadonnées SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="M-I-SSION" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="fr" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "M-I-SSION",
              "url": "https://m-i-ssion.com",
              "logo": "https://m-i-ssion.com/logo.png",
              "description": "Spécialiste de la transformation digitale avec IA et automatisation",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "sameAs": [
                "https://linkedin.com/company/m-i-ssion"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "M-I-SSION",
              "url": "https://m-i-ssion.com",
              "description": "Révélez la puissance de vos équipes grâce à l'IA et l'automatisation",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://m-i-ssion.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        <link rel="canonical" href="https://m-i-ssion.com/" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center topographic-bg">
        <div className="absolute inset-0 mountain-gradient"></div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <img
                  src="/logo.png"
                  alt="M-I-SSION Logo"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
            </motion.div>
            <motion.h1 
              className="text-shadow mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Révélez la puissance de vos équipes
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-prusse font-light max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Un cap clair dans un monde complexe
            </motion.p>
            <motion.div 
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/parcours" className="btn-primary inline-block">
                  Commencer le parcours
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/guide-ia" className="btn-secondary inline-block">
                  Découvrir le guide IA
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Votre ascension vers l'excellence
            </motion.h2>
            <motion.p 
              className="text-lg text-emeraude/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comme une expédition en montagne, votre transformation digitale nécessite 
              une préparation minutieuse, des outils adaptés et un guide expérimenté. 
              Découvrez notre parcours narratif immersif qui vous mènera du camp de base au sommet.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: '🏕️', title: 'Camp de base', desc: 'Évaluation et préparation de votre équipe', color: 'bg-emeraude' },
                { icon: '⛰️', title: 'Progression', desc: 'Étapes structurées vers l\'automatisation', color: 'bg-or' },
                { icon: '🏔️', title: 'Sommet', desc: 'Performance optimale et autonomie', color: 'bg-prusse', iconColor: 'text-emeraude' }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className={`text-2xl ${step.iconColor || 'text-white'}`}>{step.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-emeraude/70">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-prusse/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Nos valeurs guides
            </motion.h2>
            <motion.p 
              className="text-lg text-emeraude/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Six principes fondamentaux qui orientent chaque étape de votre parcours
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: 'Autonomie', desc: 'Développer votre indépendance' },
              { title: 'Fiabilité', desc: 'Des solutions éprouvées' },
              { title: 'Engagement', desc: 'Un accompagnement dédié' },
              { title: 'Performance', desc: 'Résultats mesurables' },
              { title: 'Satisfaction', desc: 'Expérience utilisateur optimale' },
              { title: 'Cohérence', desc: 'Approche structurée' }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg font-semibold text-emeraude mb-2">{value.title}</h3>
                <p className="text-emeraude/70 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emeraude mb-4">
              Ils ont franchi le cap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez comment nos clients ont transformé leurs équipes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                nom: "Sarah Martinez",
                poste: "Directrice Opérations",
                entreprise: "TechFlow Solutions",
                temoignage: "Grâce à M-I-SSION, nous avons automatisé 70% de nos processus répétitifs. Nos équipes se concentrent enfin sur la valeur ajoutée.",
                gain: "70% de tâches automatisées"
              },
              {
                nom: "Thomas Dubois",
                poste: "CEO",
                entreprise: "InnovCorp",
                temoignage: "L'accompagnement personnalisé nous a permis d'implémenter l'IA sans disruption. ROI visible dès le 3ème mois.",
                gain: "ROI en 3 mois"
              },
              {
                nom: "Marie Chen",
                poste: "Responsable RH",
                entreprise: "GlobalTech",
                temoignage: "Nos collaborateurs sont plus engagés depuis qu'ils n'ont plus à gérer les tâches sans valeur. La satisfaction a bondi.",
                gain: "+40% satisfaction équipe"
              }
            ].map((temoignage, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-prusse/10 to-or/5 p-6 rounded-xl border border-prusse/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(19, 63, 73, 0.1)" }}
              >
                <div className="mb-4">
                  <div className="text-2xl font-bold text-or mb-2">{temoignage.gain}</div>
                  <p className="text-gray-700 italic mb-4">"{temoignage.temoignage}"</p>
                </div>
                <div className="border-t border-prusse/20 pt-4">
                  <div className="font-semibold text-emeraude">{temoignage.nom}</div>
                  <div className="text-sm text-gray-600">{temoignage.poste}</div>
                  <div className="text-sm text-or font-medium">{temoignage.entreprise}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="section-padding bg-gradient-to-r from-emeraude/5 to-or/5">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emeraude mb-4">
              Des résultats mesurables
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              L'impact concret de nos accompagnements
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { chiffre: "150+", label: "Entreprises accompagnées" },
              { chiffre: "85%", label: "Gain de productivité moyen" },
              { chiffre: "6 mois", label: "Délai moyen de transformation" },
              { chiffre: "95%", label: "Taux de satisfaction client" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-or mb-2">{stat.chiffre}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi M-I-SSION */}
      <section className="section-padding bg-gradient-to-br from-emeraude/5 via-white to-or/5">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emeraude mb-4">
              Pourquoi choisir M-I-SSION ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche unique qui combine expertise technique et accompagnement humain
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icone: "🎯",
                  titre: "Approche sur-mesure",
                  description: "Chaque accompagnement est unique, adapté à votre secteur, votre taille et vos enjeux spécifiques."
                },
                {
                  icone: "🚀",
                  titre: "Résultats rapides",
                  description: "Premiers gains visibles dès les premières semaines grâce à notre méthodologie éprouvée."
                },
                {
                  icone: "🤝",
                  titre: "Accompagnement humain",
                  description: "Au-delà des outils, nous formons vos équipes pour une autonomie durable."
                }
              ].map((avantage, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl">{avantage.icone}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-emeraude mb-2">{avantage.titre}</h3>
                    <p className="text-gray-600">{avantage.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-prusse/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-emeraude mb-6">Notre processus en 4 étapes</h3>
              <div className="space-y-4">
                {[
                  { etape: "1", titre: "Diagnostic", description: "Analyse de vos processus actuels" },
                  { etape: "2", titre: "Stratégie", description: "Plan d'action personnalisé" },
                  { etape: "3", titre: "Implémentation", description: "Déploiement progressif des solutions" },
                  { etape: "4", titre: "Autonomie", description: "Formation et transfert de compétences" }
                ].map((processus, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-or text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {processus.etape}
                    </div>
                    <div>
                      <div className="font-semibold text-emeraude">{processus.titre}</div>
                      <div className="text-sm text-gray-600">{processus.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emeraude mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir avant de commencer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Combien de temps dure un accompagnement ?",
                reponse: "La durée varie selon vos objectifs, généralement entre 3 et 12 mois. Nous adaptons le rythme à votre capacité d'absorption et vos contraintes opérationnelles."
              },
              {
                question: "Faut-il des compétences techniques pour commencer ?",
                reponse: "Absolument pas. Notre approche s'adapte à tous les niveaux. Nous commençons par identifier vos besoins et construisons progressivement vos compétences."
              },
              {
                question: "Comment mesurez-vous le retour sur investissement ?",
                reponse: "Nous définissons des KPIs précis dès le départ : temps gagné, erreurs réduites, satisfaction équipe. Un tableau de bord suit l'évolution en temps réel."
              },
              {
                question: "L'IA va-t-elle remplacer mes équipes ?",
                reponse: "Non, l'IA augmente les capacités humaines. Elle élimine les tâches répétitives pour libérer du temps sur les activités à forte valeur ajoutée."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-prusse/5 to-or/5 p-6 rounded-xl border border-prusse/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-emeraude mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.reponse}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-emeraude text-white">
        <div className="container-custom text-center">
          <motion.h2 
            className="mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt à commencer votre ascension ?
          </motion.h2>
          <motion.p 
            className="text-xl text-prusse mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Rejoignez les équipes qui ont déjà transformé leur façon de travailler
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/parcours" className="btn-primary">
              Démarrer maintenant
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
