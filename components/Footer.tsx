import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-emeraude text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo.png"
                  alt="M-I-SSION Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold">M-I-SSION</span>
            </div>
            <p className="text-prusse text-sm leading-relaxed">
              Révélez la puissance de vos équipes grâce à des outils simples.
              Un cap clair dans un monde complexe.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-prusse hover:text-or transition-colors text-sm">
                Accueil
              </Link>
              <Link href="/parcours" className="block text-prusse hover:text-or transition-colors text-sm">
                Parcours
              </Link>
              <Link href="/guide-ia" className="block text-prusse hover:text-or transition-colors text-sm">
                Guide IA
              </Link>
              <Link href="/contact" className="block text-prusse hover:text-or transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Informations légales */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations légales</h3>
            <div className="space-y-2">
              <Link href="/mentions-legales" className="block text-prusse hover:text-or transition-colors text-sm">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="block text-prusse hover:text-or transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <button 
                onClick={() => {
                  // Déclencher l'ouverture des préférences cookies
                  const event = new CustomEvent('openCookiePreferences')
                  window.dispatchEvent(event)
                }}
                className="block text-prusse hover:text-or transition-colors text-sm text-left"
              >
                Gestion des cookies
              </button>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Nos valeurs</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-prusse">
                <span>Autonomie</span>
                <span>Fiabilité</span>
                <span>Engagement</span>
                <span>Performance</span>
                <span>Satisfaction</span>
                <span>Cohérence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emeraude-dark mt-8 pt-8 text-center">
          <p className="text-prusse text-sm">
            © {new Date().getFullYear()} M-I-SSION. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}