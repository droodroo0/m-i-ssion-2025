# Guide de déploiement - M-I-SSION

## Prérequis

### Variables d'environnement
Créer un fichier `.env.local` avec :
```env
# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=votre_ga_measurement_id

# Configuration de production
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_ENVIRONMENT=production
```

### Informations légales à compléter
Avant le déploiement, mettre à jour dans les fichiers suivants :

#### `/pages/mentions-legales.tsx`
- Nom de l'entreprise
- Adresse complète
- Numéro SIRET/SIREN
- Directeur de publication
- Contact technique

#### `/pages/politique-confidentialite.tsx`
- Coordonnées du responsable de traitement
- Contact DPO (si applicable)
- Adresse de réclamation

## Déploiement sur Vercel

### 1. Configuration du projet
```bash
# Installation des dépendances
npm install

# Build de production
npm run build

# Test local de production
npm start
```

### 2. Configuration Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 3. Variables d'environnement Vercel
Dans le dashboard Vercel, ajouter :
- `NEXT_PUBLIC_GA_TRACKING_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ENVIRONMENT`

## Vérifications post-déploiement

### 1. Fonctionnalités RGPD
- [ ] Bannière de cookies s'affiche sur première visite
- [ ] Préférences cookies accessibles depuis le footer
- [ ] Google Analytics ne se charge qu'avec consentement
- [ ] Pages légales accessibles et complètes
- [ ] Notifications de changement de consentement

### 2. Performance
- [ ] Score Lighthouse > 90
- [ ] Temps de chargement < 3s
- [ ] Images optimisées
- [ ] CSS et JS minifiés

### 3. SEO
- [ ] Métadonnées complètes
- [ ] Sitemap généré
- [ ] Robots.txt configuré
- [ ] Schema.org implémenté

### 4. Accessibilité
- [ ] Score WCAG AA
- [ ] Navigation au clavier
- [ ] Contrastes suffisants
- [ ] Textes alternatifs

## Configuration DNS

### Domaine principal
```
Type: A
Nom: @
Valeur: 76.76.19.61
```

### Sous-domaine www
```
Type: CNAME
Nom: www
Valeur: cname.vercel-dns.com
```

## Monitoring et analytics

### Google Analytics 4
1. Créer une propriété GA4
2. Configurer les événements personnalisés
3. Activer le mode consentement
4. Vérifier le respect RGPD

### Google Search Console
1. Ajouter et vérifier le domaine
2. Soumettre le sitemap
3. Configurer les alertes

## Sécurité

### Headers de sécurité
Configurer dans `next.config.js` :
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

### Certificat SSL
- Vercel fournit automatiquement Let's Encrypt
- Redirection HTTP vers HTTPS activée
- HSTS configuré

## Maintenance

### Mises à jour régulières
```bash
# Vérifier les dépendances obsolètes
npm audit

# Mettre à jour les packages
npm update

# Vérifier les vulnérabilités
npm audit fix
```

### Sauvegarde
- Code source : Git repository
- Configuration : Variables d'environnement documentées
- Analytics : Export régulier des données

### Monitoring
- Uptime monitoring (UptimeRobot, Pingdom)
- Performance monitoring (Vercel Analytics)
- Error tracking (Sentry)

## Support

### Documentation
- README.md : Instructions de développement
- RGPD-COMPLIANCE.md : Conformité RGPD
- Ce guide : Déploiement et maintenance

### Contacts
- Développement : [À compléter]
- RGPD/Légal : [À compléter]
- Infrastructure : [À compléter]

---

**Checklist de déploiement**
- [ ] Variables d'environnement configurées
- [ ] Informations légales complétées
- [ ] Tests de fonctionnement effectués
- [ ] DNS configuré
- [ ] Analytics configuré
- [ ] Monitoring activé
- [ ] Documentation mise à jour

**Date de déploiement** : [À compléter]
**Version** : 1.0
**Responsable** : [À compléter]