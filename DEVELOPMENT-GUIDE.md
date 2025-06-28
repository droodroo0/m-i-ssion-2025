# Guide de Développement - M-I-SSION

## 📋 Table des Matières

1. [Configuration de l'Environnement](#configuration-de-lenvironnement)
2. [Structure du Projet](#structure-du-projet)
3. [Standards de Code](#standards-de-code)
4. [Workflow de Développement](#workflow-de-développement)
5. [Tests](#tests)
6. [Performance](#performance)
7. [Sécurité](#sécurité)
8. [Débogage](#débogage)

## 🛠️ Configuration de l'Environnement

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Git
- VS Code (recommandé)

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd pages

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Extensions VS Code Recommandées

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

## 📁 Structure du Projet

```
pages/
├── components/          # Composants réutilisables
│   ├── CookieBanner.tsx
│   ├── CookiePreferences.tsx
│   └── ...
├── lib/                # Utilitaires et logique métier
│   ├── cookieManager.ts
│   ├── analytics.ts
│   └── ...
├── pages/              # Pages Next.js
│   ├── api/           # Routes API
│   ├── _app.tsx
│   └── ...
├── types/              # Définitions TypeScript
│   └── index.ts
├── __tests__/          # Tests unitaires
├── public/             # Assets statiques
└── styles/             # Styles CSS/SCSS
```

## 📝 Standards de Code

### TypeScript

- **Typage strict** : Utilisez `strict: true` dans tsconfig.json
- **Interfaces explicites** : Définissez des interfaces pour tous les objets
- **Types utilitaires** : Utilisez `Partial`, `Pick`, `Omit` quand approprié

```typescript
// ✅ Bon
interface UserProps {
  id: string
  name: string
  email?: string
}

const User: React.FC<UserProps> = ({ id, name, email }) => {
  // ...
}

// ❌ Éviter
const User = (props: any) => {
  // ...
}
```

### React

- **Composants fonctionnels** : Privilégiez les hooks aux classes
- **Props destructurées** : Destructurez les props dans les paramètres
- **Nommage explicite** : Utilisez des noms descriptifs

```typescript
// ✅ Bon
const CookieBanner: React.FC<CookieBannerProps> = ({ 
  isVisible, 
  onAccept, 
  onReject 
}) => {
  const [showPreferences, setShowPreferences] = useState(false)
  
  return (
    // JSX
  )
}

// ❌ Éviter
function CookieBanner(props) {
  // ...
}
```

### CSS/Styling

- **CSS Modules** : Utilisez des classes scopées
- **Nommage BEM** : Convention Block__Element--Modifier
- **Variables CSS** : Utilisez des custom properties pour les couleurs/tailles

```css
/* ✅ Bon */
.cookieBanner {
  --primary-color: #007bff;
  background-color: var(--primary-color);
}

.cookieBanner__button {
  padding: 0.5rem 1rem;
}

.cookieBanner__button--primary {
  background-color: var(--primary-color);
}
```

## 🔄 Workflow de Développement

### Git Flow

1. **Branches** :
   - `main` : Production
   - `develop` : Développement
   - `feature/nom-feature` : Nouvelles fonctionnalités
   - `hotfix/nom-fix` : Corrections urgentes

2. **Commits** :
   ```bash
   # Format : type(scope): description
   git commit -m "feat(cookies): add cookie preferences modal"
   git commit -m "fix(banner): resolve display issue on mobile"
   git commit -m "docs(readme): update installation instructions"
   ```

3. **Types de commits** :
   - `feat` : Nouvelle fonctionnalité
   - `fix` : Correction de bug
   - `docs` : Documentation
   - `style` : Formatage, point-virgules manquants, etc.
   - `refactor` : Refactoring de code
   - `test` : Ajout de tests
   - `chore` : Maintenance

### Pre-commit Hooks

Les hooks Husky vérifient automatiquement :
- Linting ESLint
- Formatage Prettier
- Vérification TypeScript
- Tests unitaires

```bash
# Installation des hooks
npm run prepare

# Exécution manuelle
npm run lint
npm run type-check
npm test
```

## 🧪 Tests

### Structure des Tests

```typescript
// __tests__/Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Component from '../components/Component'

describe('Component', () => {
  beforeEach(() => {
    // Setup
  })

  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interaction', () => {
    render(<Component />)
    fireEvent.click(screen.getByRole('button'))
    // Assertions
  })
})
```

### Commandes de Test

```bash
# Exécuter tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Coverage
npm run test:coverage

# Tests spécifiques
npm test -- CookieBanner
```

### Bonnes Pratiques

- **AAA Pattern** : Arrange, Act, Assert
- **Tests isolés** : Chaque test doit être indépendant
- **Mocks appropriés** : Mocker les dépendances externes
- **Noms descriptifs** : Décrivez le comportement testé

## ⚡ Performance

### Optimisations React

```typescript
// Lazy loading
const CookiePreferences = lazy(() => import('./CookiePreferences'))

// Memoization
const MemoizedComponent = memo(Component)

// useCallback pour les fonctions
const handleClick = useCallback(() => {
  // Logic
}, [dependency])

// useMemo pour les calculs coûteux
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])
```

### Optimisations Next.js

```typescript
// Image optimization
import Image from 'next/image'

// Dynamic imports
import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(() => import('./Component'))

// API routes optimisées
export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400')
  // Logic
}
```

### Monitoring

- **Core Web Vitals** : LCP, FID, CLS
- **Bundle Analyzer** : `npm run analyze`
- **Lighthouse** : Audits automatisés

## 🔒 Sécurité

### Bonnes Pratiques

1. **Variables d'environnement** :
   ```typescript
   // ✅ Bon
   const apiKey = process.env.NEXT_PUBLIC_API_KEY
   
   // ❌ Éviter
   const apiKey = 'hardcoded-key'
   ```

2. **Validation des entrées** :
   ```typescript
   import { z } from 'zod'
   
   const schema = z.object({
     email: z.string().email(),
     age: z.number().min(0).max(120)
   })
   ```

3. **Headers de sécurité** :
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'DENY'
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff'
             }
           ]
         }
       ]
     }
   }
   ```

### Audit de Sécurité

```bash
# Audit des dépendances
npm audit
npm audit fix

# Analyse statique
npm run lint:security
```

## 🐛 Débogage

### Outils de Développement

1. **React Developer Tools**
2. **Redux DevTools** (si applicable)
3. **Next.js DevTools**

### Logging

```typescript
// Development
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Production logging
import { logger } from './lib/logger'
logger.info('User action', { userId, action })
```

### Debugging Techniques

```typescript
// Breakpoints conditionnels
if (condition) {
  debugger
}

// Console.table pour les objets
console.table(arrayOfObjects)

// Performance timing
console.time('operation')
// ... code
console.timeEnd('operation')
```

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Testing Library](https://testing-library.com)
- [ESLint Rules](https://eslint.org/docs/rules)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

### Code Review Checklist

- [ ] Code respecte les standards
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] Performance acceptable
- [ ] Sécurité vérifiée
- [ ] Accessibilité respectée

---

**Maintenu par** : Équipe de développement M-I-SSION  
**Dernière mise à jour** : Décembre 2024