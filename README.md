# M-I-SSION - Site Web Conforme RGPD

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC)](https://tailwindcss.com/)
[![RGPD](https://img.shields.io/badge/RGPD-Compliant-green)](https://gdpr.eu/)

## 🚀 Aperçu

M-I-SSION est un site web moderne développé avec Next.js, entièrement conforme au RGPD (Règlement Général sur la Protection des Données). Il offre une expérience utilisateur optimale tout en respectant les exigences légales européennes en matière de protection des données.

### ✨ Fonctionnalités Principales

- 🍪 **Gestion Complète des Cookies RGPD**
  - Bannière de consentement personnalisable
  - Préférences détaillées par type de cookie
  - Stockage local du consentement avec versioning
  - Intégration Google Analytics avec consentement

- 📱 **Design Responsive et Moderne**
  - Interface utilisateur intuitive
  - Animations fluides avec Framer Motion
  - Optimisé pour tous les appareils
  - Accessibilité WCAG 2.1 AA

- ⚡ **Performance Optimisée**
  - Server-Side Rendering (SSR)
  - Optimisation automatique des images
  - Code splitting et lazy loading
  - Core Web Vitals optimisés

- 🔒 **Sécurité Renforcée**
  - Headers de sécurité configurés
  - Protection XSS et CSRF
  - Validation stricte des données
  - Audit de sécurité automatisé

## 📋 Table des Matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Fonctionnalités RGPD](#fonctionnalités-rgpd)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Documentation](#documentation)
- [Contribution](#contribution)

## 🛠️ Installation

### Prérequis

- Node.js 18.0 ou supérieur
- npm ou yarn
- Git

### Installation Rapide

```bash
# Cloner le repository
git clone <repository-url>
cd pages

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Configuration du site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SITE_NAME=M-I-SSION

# Informations légales (à compléter)
NEXT_PUBLIC_COMPANY_NAME=Votre Entreprise
NEXT_PUBLIC_COMPANY_ADDRESS=Votre Adresse
NEXT_PUBLIC_COMPANY_EMAIL=contact@votre-domaine.com
NEXT_PUBLIC_COMPANY_PHONE=+33 X XX XX XX XX
```

### Configuration RGPD

Le système de gestion des cookies est configuré dans :
- `lib/cookieManager.ts` - Logique de gestion
- `components/CookieBanner.tsx` - Interface utilisateur
- `components/CookiePreferences.tsx` - Préférences détaillées

## 🚀 Développement

### Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production

# Qualité de code
npm run lint         # Vérification ESLint
npm run lint:fix     # Correction automatique
npm run type-check   # Vérification TypeScript
npm run format       # Formatage Prettier

# Tests
npm test             # Tests unitaires
npm run test:watch   # Tests en mode watch
npm run test:coverage # Couverture de code

# Analyse
npm run analyze      # Analyse du bundle
```

### Structure du Projet

```
pages/
├── components/          # Composants React réutilisables
│   ├── CookieBanner.tsx
│   ├── CookiePreferences.tsx
│   ├── ConsentNotification.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── SEOHead.tsx
├── lib/                # Utilitaires et logique métier
│   ├── analytics.ts
│   ├── cookieManager.ts
│   └── utils.ts
├── pages/              # Pages Next.js
│   ├── api/           # Routes API
│   ├── _app.tsx       # Configuration globale
│   ├── _document.tsx  # Document HTML
│   ├── index.tsx      # Page d'accueil
│   ├── mentions-legales.tsx
│   └── politique-confidentialite.tsx
├── types/              # Définitions TypeScript
│   └── index.ts
├── __tests__/          # Tests unitaires
├── public/             # Assets statiques
└── styles/             # Styles CSS/SCSS
```

## 🍪 Fonctionnalités RGPD

### Types de Cookies Gérés

1. **Cookies Essentiels** (toujours actifs)
   - Fonctionnement du site
   - Sécurité et authentification
   - Préférences de consentement

2. **Cookies d'Analyse** (optionnels)
   - Google Analytics
   - Mesure d'audience
   - Optimisation des performances

3. **Cookies Marketing** (optionnels)
   - Publicité ciblée
   - Réseaux sociaux
   - Remarketing

### Interface Utilisateur

- **Bannière de Consentement** : Affichage initial pour recueillir le consentement
- **Préférences Détaillées** : Contrôle granulaire par type de cookie
- **Notifications** : Feedback visuel des changements de consentement
- **Gestion Continue** : Accès permanent via le footer

### API de Gestion

```typescript
import { CookieManager } from './lib/cookieManager'

const manager = CookieManager.getInstance()

// Vérifier le consentement
if (manager.isAllowed('analytics')) {
  // Charger Google Analytics
}

// Écouter les changements
manager.addConsentListener((settings) => {
  console.log('Nouveau consentement:', settings)
})

// Gestion programmatique
manager.acceptAll()
manager.rejectAll()
manager.saveConsentSettings({ analytics: true, marketing: false })
```

## 🧪 Tests

### Tests Unitaires

Le projet inclut une suite de tests complète :

```bash
# Exécuter tous les tests
npm test

# Tests spécifiques
npm test CookieBanner
npm test cookieManager

# Couverture de code
npm run test:coverage
```

### Tests Inclus

- ✅ Gestion des cookies (`cookieManager.test.ts`)
- ✅ Composants React (`CookieBanner.test.tsx`)
- ✅ Intégration des événements
- ✅ Gestion des erreurs
- ✅ Accessibilité

## 📦 Déploiement

### Déploiement sur Vercel (Recommandé)

1. **Connecter le Repository**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configurer les Variables d'Environnement**
   - Aller dans le dashboard Vercel
   - Ajouter les variables d'environnement
   - Redéployer

3. **Configuration DNS**
   - Configurer le domaine personnalisé
   - Vérifier le certificat SSL

### Autres Plateformes

- **Netlify** : Compatible avec build automatique
- **AWS Amplify** : Support Next.js complet
- **Docker** : Dockerfile inclus pour conteneurisation

### Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Google Analytics ID ajouté
- [ ] Informations légales complétées
- [ ] Tests passent
- [ ] Build de production réussie
- [ ] Headers de sécurité vérifiés
- [ ] Performance testée (Lighthouse)
- [ ] Fonctionnalités RGPD testées

## 📚 Documentation

### Guides Disponibles

- 📖 [Guide de Développement](./DEVELOPMENT-GUIDE.md)
- 🔒 [Conformité RGPD](./RGPD-COMPLIANCE.md)
- 🚀 [Guide de Déploiement](./DEPLOYMENT-GUIDE.md)

### Ressources Externes

- [Documentation Next.js](https://nextjs.org/docs)
- [Guide RGPD CNIL](https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🔧 Maintenance

### Mises à Jour Régulières

```bash
# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Audit de sécurité
npm audit
npm audit fix
```

### Monitoring

- **Performance** : Core Web Vitals via Google Analytics
- **Erreurs** : Monitoring d'erreurs JavaScript
- **Sécurité** : Audit automatisé des dépendances
- **SEO** : Suivi des positions et indexation

## 🤝 Contribution

### Comment Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter les changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code

- **TypeScript** : Typage strict obligatoire
- **ESLint** : Configuration stricte
- **Prettier** : Formatage automatique
- **Tests** : Couverture minimale de 70%
- **Documentation** : Commentaires JSDoc

### Code Review

Toutes les contributions passent par une revue de code incluant :
- Respect des standards
- Tests unitaires
- Performance
- Sécurité
- Accessibilité

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)
- **Discussions** : [GitHub Discussions](https://github.com/votre-repo/discussions)
- **Email** : support@votre-domaine.com

## 🏆 Remerciements

- [Next.js Team](https://nextjs.org/) pour le framework
- [Vercel](https://vercel.com/) pour l'hébergement
- [CNIL](https://www.cnil.fr/) pour les guidelines RGPD
- Communauté open source pour les contributions

---

**Développé avec ❤️ par l'équipe M-I-SSION**

*Dernière mise à jour : Décembre 2024*