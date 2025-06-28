'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Step {
  id: number
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  position: { x: number; y: number }
}

const steps: Step[] = [
  {
    id: 1,
    title: "Camp de Base",
    subtitle: "Diagnostic & Cartographie",
    description: "Analyse approfondie de votre écosystème organisationnel pour identifier les opportunités d'optimisation.",
    icon: "🏕️",
    color: "#10B981", // Vert
    position: { x: 50, y: 88 }
  },
  {
    id: 2,
    title: "Préparation",
    subtitle: "Stratégie & Planification",
    description: "Élaboration d'une feuille de route stratégique adaptée à vos objectifs spécifiques.",
    icon: "📋",
    color: "#3B82F6", // Bleu
    position: { x: 30, y: 70 }
  },
  {
    id: 3,
    title: "Ascension",
    subtitle: "Implémentation & Optimisation",
    description: "Mise en œuvre progressive des solutions avec accompagnement continu.",
    icon: "⚡",
    color: "#F59E0B", // Orange
    position: { x: 70, y: 45 }
  },
  {
    id: 4,
    title: "Sommet",
    subtitle: "Consolidation & Excellence",
    description: "Ancrage des nouvelles pratiques et mise en place de l'amélioration continue.",
    icon: "🏆",
    color: "#EF4444", // Rouge/Or
    position: { x: 50, y: 20 }
  }
]

export default function MountainJourney() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] md:h-[700px] bg-gradient-to-b from-green-100 to-white rounded-2xl overflow-hidden">
      {/* Mountain Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/Montagne.png" 
          alt="Montagne stylisée" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
      </div>

      {/* SVG Overlay for Interactive Elements */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B99C6A" />
            <stop offset="100%" stopColor="#133F49" />
          </linearGradient>
        </defs>

        {/* Climbing Path/Rope */}
        <motion.path
          d="M50 88 Q30 70 Q50 45 Q70 45 Q50 20"
          stroke="url(#ropeGradient)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="drop-shadow-sm"
        />

        {/* Interactive Points */}
        {steps.map((step, index) => {
          const isActive = activeStep === step.id
          const isHovered = hoveredStep === step.id
          
          return (
            <g 
              key={step.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              {/* Point Base Circle */}
              <motion.circle
                cx={step.position.x}
                cy={step.position.y}
                r={isActive || isHovered ? "4" : "3"}
                fill={step.color}
                className="drop-shadow-lg pointer-events-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              
              {/* Point Inner Circle */}
              <motion.circle
                cx={step.position.x}
                cy={step.position.y}
                r={isActive || isHovered ? "2" : "1.5"}
                fill="white"
                className="pointer-events-none"
              />
              
              {/* Step Number */}
              <motion.text
                x={step.position.x}
                y={step.position.y + 0.5}
                textAnchor="middle"
                className="text-[3px] font-bold fill-emeraude select-none pointer-events-none"
              >
                {step.id}
              </motion.text>

              {/* Pulse Animation for Hovered/Active */}
              {(isHovered || isActive) && (
                <motion.circle
                  cx={step.position.x}
                  cy={step.position.y}
                  r="5"
                  fill={step.color}
                  fillOpacity="0.3"
                  className="pointer-events-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              
              {/* Zone de survol invisible plus large pour améliorer l'UX */}
              <circle
                cx={step.position.x}
                cy={step.position.y}
                r="8"
                fill="transparent"
                className="pointer-events-auto"
              />
            </g>
          )
        })}
      </svg>

      {/* Step Labels */}
      {steps.map((step) => {
        const isVisible = hoveredStep === step.id || activeStep === step.id
        
        // Convertir les coordonnées SVG (0-100) en positions relatives au conteneur
        const leftPercent = step.position.x
        const topPercent = step.position.y
        
        return (
          <motion.div
            key={`label-${step.id}`}
            className="absolute pointer-events-none z-10"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: 'translate(-50%, calc(-100% - 20px))'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 10 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-on-light rounded-lg p-3 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{step.icon}</span>
                <h3 className="font-bold text-on-light text-sm">{step.title}</h3>
              </div>
              <p className="text-xs subtitle-on-light font-medium">{step.subtitle}</p>
            </div>
            {/* Arrow pointing to the point */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
            </div>
          </motion.div>
        )
      })}

      {/* Detailed Information Panel */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 card-on-light rounded-xl p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
          >
            {steps.filter(step => step.id === activeStep).map(step => (
              <div key={step.id}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-on-light">{step.title}</h3>
                    <p className="text-sm text-accent font-semibold">{step.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setActiveStep(null)}
                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fermer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="subtitle-on-light leading-relaxed">{step.description}</p>
                <div className="mt-4 flex gap-2">
                  <button className="btn-on-light text-sm">
                    En savoir plus
                  </button>
                  <button className="border border-emeraude text-emeraude px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emeraude/10 transition-colors">
                    Planifier un échange
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-4 card-on-light rounded-lg p-3">
        <h4 className="text-sm font-bold text-on-light mb-2">Parcours M-I-SSION</h4>
        <p className="text-xs subtitle-on-light">Cliquez sur les points pour explorer chaque étape</p>
      </div>

      {/* Accessibility: Screen reader content */}
      <div className="sr-only">
        <h2>Parcours de transformation M-I-SSION en 4 étapes</h2>
        <ul>
          {steps.map(step => (
            <li key={step.id}>
              <button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                aria-expanded={activeStep === step.id}
                aria-describedby={`step-${step.id}-description`}
              >
                Étape {step.id}: {step.title} - {step.subtitle}
              </button>
              <div id={`step-${step.id}-description`} className={activeStep === step.id ? '' : 'sr-only'}>
                {step.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}