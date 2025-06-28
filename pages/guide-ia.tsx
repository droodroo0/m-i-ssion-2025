import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import HeyGenAvatar from '../components/HeyGenAvatar'

export default function GuideIAPage() {

  return (
    <Layout currentPath="/guide-ia">
      <Head>
        <title>Guide IA - M-I-SSION | Assistant virtuel intelligent pour votre transformation</title>
        <meta name="description" content="Découvrez notre guide IA conversationnel powered by HeyGen. Assistant virtuel intelligent pour vous accompagner dans votre transformation digitale. Démonstration interactive disponible." />
        <meta name="keywords" content="guide IA, assistant virtuel, intelligence artificielle conversationnelle, HeyGen, transformation digitale, IA personnalisée, chatbot intelligent" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://m-i-ssion.com/guide-ia" />
        <meta property="og:title" content="Guide IA M-I-SSION - Assistant virtuel intelligent" />
        <meta property="og:description" content="Découvrez notre guide IA conversationnel. Assistant virtuel powered by HeyGen pour votre transformation digitale. Démonstration interactive." />
        <meta property="og:image" content="https://m-i-ssion.com/og-guide-ia.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guide IA M-I-SSION - Assistant virtuel" />
        <meta name="twitter:description" content="Assistant IA conversationnel pour votre transformation digitale. Démonstration interactive disponible." />
        
        {/* Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Guide IA M-I-SSION",
              "description": "Assistant virtuel intelligent pour la transformation digitale",
              "url": "https://m-i-ssion.com/guide-ia",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              },
              "creator": {
                "@type": "Organization",
                "name": "M-I-SSION"
              }
            })
          }}
        />
        
        <link rel="canonical" href="https://m-i-ssion.com/guide-ia" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emeraude via-emeraude-dark to-or/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center bg-or/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-or rounded-full mr-2 animate-pulse"></span>
              Version Bêta - Séminaire 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">
              Votre Guide IA Personnel
            </h1>
            <p className="text-xl text-prusse mb-8 max-w-2xl mx-auto">
              Rencontrez votre compagnon virtuel intelligent, conçu pour vous accompagner 
              dans chaque étape de votre transformation digitale.
            </p>
          </div>
        </div>
      </section>

      {/* Guide IA Demo Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Description */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-emeraude mb-6">
                  Intelligence Artificielle Conversationnelle
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-or rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-emeraude">Accompagnement personnalisé</h3>
                      <p className="text-emeraude/70">Adapte ses conseils à votre niveau et vos objectifs spécifiques</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-or rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-emeraude">Disponible 24/7</h3>
                      <p className="text-emeraude/70">Répond à vos questions à tout moment de votre parcours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-or rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-emeraude">Expertise métier</h3>
                      <p className="text-emeraude/70">Formé sur les meilleures pratiques d'automatisation et de gouvernance</p>
                    </div>
                  </div>
                </div>

                <div className="bg-prusse/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-emeraude mb-2">💡 Fonctionnalités clés</h4>
                  <ul className="text-sm text-emeraude/80 space-y-1">
                    <li>• Analyse de votre maturité digitale</li>
                    <li>• Recommandations d'outils personnalisées</li>
                    <li>• Planification de votre roadmap</li>
                    <li>• Support technique en temps réel</li>
                  </ul>
                </div>
              </div>

              {/* Video/Demo Container */}
              <div className="relative">
                <div className="bg-gradient-to-br from-emeraude to-emeraude-dark rounded-2xl p-8 text-center text-white">
                  <div className="mb-6">
                  </div>

                  {/* Avatar HeyGen intégré directement */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    {/* Container rectangulaire pour l'avatar */}
                    <div className="relative bg-gradient-to-br from-emeraude/20 to-prusse/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                      <HeyGenAvatar className="w-full" />
                    </div>
                    
                    {/* Indicateurs de statut */}
                    <div className="flex items-center justify-between mt-4 text-xs">
                      <div className="flex items-center text-emeraude">
                        <div className="w-2 h-2 bg-emeraude rounded-full mr-2 animate-pulse"></div>
                        <span>IA Active</span>
                      </div>
                      <div className="text-white/60">
                        <span>Powered by HeyGen</span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice */}
      <section className="py-12 bg-or/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-or/20 rounded-full flex items-center justify-center">
                  <span className="text-or text-xl">⚡</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-emeraude mb-4">
                Version Bêta - Séminaire 2025
              </h3>
              <p className="text-emeraude/70 mb-6">
                Cette démonstration présente les capacités de notre guide IA en cours de développement. 
                La version finale intégrera des fonctionnalités avancées d'apprentissage et de personnalisation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-emeraude/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-emeraude mb-1">🚀 Prochainement</h4>
                  <p className="text-emeraude/70">Intégration complète dans le parcours</p>
                </div>
                <div className="bg-emeraude/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-emeraude mb-1">🎯 Objectif</h4>
                  <p className="text-emeraude/70">Accompagnement personnalisé 24/7</p>
                </div>
                <div className="bg-emeraude/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-emeraude mb-1">📈 Évolution</h4>
                  <p className="text-emeraude/70">Apprentissage continu des besoins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-emeraude text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à découvrir votre potentiel ?
          </h2>
          <p className="text-xl text-prusse mb-8 max-w-2xl mx-auto">
            Commencez votre parcours et laissez notre guide IA vous accompagner vers l'excellence
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a href="/parcours" className="btn-primary inline-block">
              Commencer le parcours
            </a>
            <a href="/contact" className="btn-secondary inline-block">
              Nous contacter
            </a>
          </div>
        </div>
      </section>


    </Layout>
  )
}