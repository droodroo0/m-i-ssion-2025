# Conformité RGPD - Documentation

## Vue d'ensemble

Ce document décrit l'implémentation de la conformité RGPD (Règlement Général sur la Protection des Données) pour le site M-I-SSION.

## Fonctionnalités implémentées

### 1. Gestion du consentement aux cookies

#### Composants principaux
- **CookieBanner** (`/components/CookieBanner.tsx`) : Bannière de consentement initial
- **CookiePreferences** (`/components/CookiePreferences.tsx`) : Interface de gestion détaillée des préférences
- **CookieManager** (`/lib/cookieManager.ts`) : Gestionnaire centralisé du consentement

#### Types de cookies gérés
1. **Cookies essentiels** : Toujours actifs (session, sécurité)
2. **Cookies d'analyse** : Google Analytics (optionnel)
3. **Cookies marketing** : Publicité personnalisée (optionnel)

#### Fonctionnalités
- ✅ Consentement granulaire par type de cookie
- ✅ Sauvegarde des préférences dans localStorage
- ✅ Interface de modification des préférences accessible depuis le footer
- ✅ Notifications de confirmation des changements
- ✅ Versioning du consentement pour les mises à jour

### 2. Pages légales

#### Pages créées
- **Politique de confidentialité** (`/pages/politique-confidentialite.tsx`)
- **Mentions légales** (`/pages/mentions-legales.tsx`)

#### Contenu inclus
- Responsable du traitement
- Types de données collectées
- Finalités du traitement
- Base légale du traitement
- Durée de conservation
- Droits des utilisateurs
- Procédures de réclamation

### 3. Intégration technique

#### Analytics avec consentement
- Configuration Google Analytics avec mode consentement
- Fonctions `initConsentMode()` et `updateConsentMode()`
- Désactivation par défaut, activation uniquement avec consentement

#### Architecture du code
```
/components/
  ├── CookieBanner.tsx          # Bannière de consentement
  ├── CookiePreferences.tsx     # Gestion détaillée
  └── ConsentNotification.tsx   # Notifications

/lib/
  ├── analytics.ts              # Configuration GA avec consentement
  └── cookieManager.ts          # Gestionnaire centralisé

/types/
  └── index.ts                  # Types TypeScript

/pages/
  ├── politique-confidentialite.tsx
  └── mentions-legales.tsx
```

## Configuration requise

### Variables d'environnement
```env
NEXT_PUBLIC_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

### Informations à compléter
Dans les pages légales, remplacer les champs `[À compléter]` :
- Nom de l'entreprise
- Adresse complète
- Numéro SIRET
- Contact DPO (si applicable)
- Informations d'hébergement

## Utilisation

### Gestion programmatique du consentement
```typescript
import { cookieManager } from '../lib/cookieManager'

// Vérifier si le consentement a été donné
if (cookieManager.hasConsent()) {
  // Utiliser les services nécessitant un consentement
}

// Vérifier un type spécifique
if (cookieManager.isAllowed('analytics')) {
  // Activer Google Analytics
}

// Écouter les changements de consentement
cookieManager.addConsentListener((settings) => {
  console.log('Nouveau consentement:', settings)
})
```

### Événements personnalisés
```typescript
// Ouvrir les préférences depuis n'importe où
window.dispatchEvent(new CustomEvent('openCookiePreferences'))

// Écouter les changements de consentement
window.addEventListener('cookieConsentChanged', (event) => {
  console.log('Consentement modifié:', event.detail)
})
```

## Conformité RGPD

### Droits des utilisateurs implémentés
- ✅ **Droit à l'information** : Pages légales détaillées
- ✅ **Droit au consentement** : Bannière et préférences
- ✅ **Droit de retrait** : Modification des préférences à tout moment
- ✅ **Droit à la portabilité** : Export des données de consentement
- ⚠️ **Droit d'accès** : À implémenter selon les besoins
- ⚠️ **Droit de rectification** : À implémenter selon les besoins
- ⚠️ **Droit à l'effacement** : À implémenter selon les besoins

### Principes respectés
- **Consentement libre** : Possibilité de refuser sans conséquence
- **Consentement éclairé** : Information claire sur chaque type de cookie
- **Consentement spécifique** : Granularité par type de cookie
- **Consentement univoque** : Action positive requise

## Maintenance

### Mise à jour du consentement
Pour forcer une nouvelle demande de consentement :
1. Modifier `CONSENT_VERSION` dans `cookieManager.ts`
2. Les utilisateurs verront à nouveau la bannière

### Ajout de nouveaux types de cookies
1. Mettre à jour l'interface `CookieSettings` dans `/types/index.ts`
2. Ajouter la gestion dans `CookiePreferences.tsx`
3. Mettre à jour `updateConsentMode()` dans `analytics.ts`

### Audit de conformité
- Vérifier régulièrement les pages légales
- Tester le fonctionnement des préférences
- Contrôler que les cookies ne sont pas déposés sans consentement
- Valider l'accessibilité des interfaces

## Tests recommandés

1. **Test de consentement initial**
   - Vérifier l'affichage de la bannière sur première visite
   - Tester les trois options (accepter, refuser, personnaliser)

2. **Test de persistance**
   - Vérifier la sauvegarde des préférences
   - Tester la navigation sans nouvelle demande

3. **Test de modification**
   - Accéder aux préférences depuis le footer
   - Modifier et sauvegarder de nouveaux choix

4. **Test technique**
   - Vérifier que GA ne se charge qu'avec consentement
   - Contrôler les cookies déposés selon les préférences

## Support et contact

Pour toute question relative à la conformité RGPD :
- Consulter la documentation technique
- Contacter l'équipe de développement
- Se référer aux ressources CNIL officielles

---

**Dernière mise à jour** : [Date à compléter]
**Version** : 1.0
**Statut** : Implémentation complète