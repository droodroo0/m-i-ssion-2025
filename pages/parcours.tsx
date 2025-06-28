'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import MountainJourney from '../components/MountainJourney'

interface Step {
  id: number
  title: string
  subtitle: string
  description: string
  icon: string
  details: string[]
  duration: string
  deliverables: string[]
}

const steps: Step[] = [
  {
    id: 1,
    title: "Diagnostic & Cartographie",
    subtitle: "Camp de Base",
    description: "Analyse approfondie de votre écosystème organisationnel actuel pour identifier les opportunités d'optimisation.",
    icon: "🔍",
    duration: "2-3 semaines",
    details: [
      "Audit complet des processus existants",
      "Analyse des flux de données et d'informations",
      "Évaluation des compétences et ressources",
      "Identification des points de friction",
      "Cartographie des parties prenantes"
    ],
    deliverables: [
      "Rapport de diagnostic détaillé",
      "Cartographie des processus actuels",
      "Matrice des opportunités d'amélioration",
      "Plan de transformation personnalisé"
    ]
  },
  {
    id: 2,
    title: "Stratégie & Planification",
    subtitle: "Préparation de l'Ascension",
    description: "Élaboration d'une feuille de route stratégique adaptée à vos objectifs et contraintes spécifiques.",
    icon: "📋",
    duration: "3-4 semaines",
    details: [
      "Définition des objectifs SMART",
      "Priorisation des initiatives",
      "Planification des ressources",
      "Gestion des risques et mitigation",
      "Définition des KPIs et métriques"
    ],
    deliverables: [
      "Feuille de route stratégique",
      "Plan de gestion du changement",
      "Tableau de bord des KPIs",
      "Stratégie de communication"
    ]
  },
  {
    id: 3,
    title: "Implémentation & Optimisation",
    subtitle: "L'Ascension",
    description: "Mise en œuvre progressive des solutions avec accompagnement continu et ajustements en temps réel.",
    icon: "⚡",
    duration: "8-12 semaines",
    details: [
      "Déploiement par phases pilotes",
      "Formation et accompagnement des équipes",
      "Optimisation continue des processus",
      "Monitoring et ajustements",
      "Intégration des nouvelles pratiques"
    ],
    deliverables: [
      "Processus optimisés et documentés",
      "Équipes formées et autonomes",
      "Outils et systèmes déployés",
      "Procédures de suivi établies"
    ]
  },
  {
    id: 4,
    title: "Consolidation & Excellence",
    subtitle: "Le Sommet",
    description: "Ancrage des nouvelles pratiques et mise en place d'un système d'amélioration continue pour maintenir l'excellence.",
    icon: "🏆",
    duration: "4-6 semaines",
    details: [
      "Consolidation des acquis",
      "Mise en place de l'amélioration continue",
      "Transfert de compétences complet",
      "Évaluation des résultats",
      "Plan de maintien de l'excellence"
    ],
    deliverables: [
      "Organisation transformée et autonome",
      "Culture d'amélioration continue",
      "Résultats mesurés et validés",
      "Plan de développement futur"
    ]
  }
]

export default function ParcoursPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <Layout currentPath="/parcours">
      <Head>
        <title>Parcours de Transformation - M-I-SSION</title>
        <meta name="description" content="Découvrez notre méthodologie éprouvée en 4 étapes pour transformer votre organisation et atteindre l'excellence opérationnelle. De l'analyse à la consolidation, nous vous accompagnons à chaque étape de votre ascension vers le succès." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emeraude via-emeraude-dark to-or/20"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        ></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-on-gradient">
              Votre Parcours d'<span className="text-accent">Ascension</span>
            </h1>
            <p className="text-xl md:text-2xl subtitle-on-dark mb-8 max-w-4xl mx-auto">
              Du camp de base au sommet de l'excellence opérationnelle, 
              découvrez notre méthodologie éprouvée en 4 étapes pour transformer votre organisation
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a 
                href="#parcours" 
                className="bg-or text-emeraude px-8 py-4 rounded-lg font-semibold text-lg hover:bg-or/90 transition-all duration-300 hover:scale-105"
              >
                Découvrir le Parcours
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emeraude transition-all duration-300"
              >
                Planifier un Échange
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Mountain Journey Interactive Section */}
      <section id="parcours" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-on-light mb-6">
              Votre Ascension vers l'Excellence
            </h2>
            <p className="text-lg md:text-xl subtitle-on-light max-w-3xl mx-auto leading-relaxed">
              Découvrez votre parcours de transformation M-I-SSION à travers une ascension progressive. 
              Chaque étape vous rapproche du sommet de vos objectifs.
            </p>
          </motion.div>

          {/* Interactive Mountain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <MountainJourney />
          </motion.div>

          {/* Additional Context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="subtitle-on-light max-w-2xl mx-auto">
              Explorez chaque étape en cliquant sur les points de la montagne. 
              Notre approche progressive garantit une transformation durable et mesurable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Traditional Steps Overview (Alternative View) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emeraude mb-6">
              Détail des Étapes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une vue d'ensemble complète de votre parcours de transformation.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emeraude to-or rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-light mb-2">{step.title}</h3>
                   <p className="text-accent font-semibold mb-3">{step.subtitle}</p>
                   <p className="subtitle-on-light text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-emeraude mb-8">
                Notre Méthodologie Éprouvée
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-emeraude mb-2">Approche Personnalisée</h3>
                  <p className="text-gray-600">Chaque parcours est adapté à vos spécificités et objectifs uniques.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-emeraude mb-2">Mesure Continue</h3>
                  <p className="text-gray-600">Suivi en temps réel des progrès avec des KPIs précis et actionnables.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-emeraude mb-2">Résultats Durables</h3>
                  <p className="text-gray-600">Transformation pérenne avec transfert de compétences complet.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emeraude to-emeraude-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à Commencer Votre Ascension ?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Rejoignez les organisations qui ont déjà transformé leur performance avec notre accompagnement. 
              Planifions ensemble votre parcours vers l'excellence opérationnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                className="inline-block bg-or text-emeraude px-8 py-4 rounded-lg font-semibold text-lg hover:bg-or/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Planifier un Échange Stratégique
              </motion.a>
              <a 
                href="/guide-ia" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emeraude transition-all duration-300"
              >
                Découvrir Notre Guide IA
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}