# Composants CARI Saint-Laurent v2

Composants React respectant le **Guide de Style officiel CARI** (Novembre 2025).

## 🎨 Guide de Style Intégré

### Palette de couleurs
| Couleur | Hex | Signification |
|---------|-----|---------------|
| **Bleu Foncé** | `#263B5A` | Ancrage, confiance, professionnalisme |
| **Turquoise** | `#6EC1C1` | Fraîcheur, ouverture, accessibilité |
| **Brume** | `#CCD8DF` | Sérénité, espoir, renouveau |
| **Jaune doré** | `#F7BF3F` | Chaleur, énergie, dignité |
| **Vermillon** | `#F15C39` | En action, dynamisme, passion |

### Typographie
- **Titres**: DM Serif Text (élégante, bienveillante)
- **Corps**: DM Sans (contemporaine, géométrique)

---

## 📦 Contenu

```
cari-components-v2/
├── FrenchLevelTest.jsx    # Quiz de niveau de français
├── LanguageSelector.jsx   # Nuage de langues (première visite)
├── ParallaxBreathing.jsx  # Sections parallax
├── cari-theme.js          # Configuration centralisée du thème
└── README.md
```

---

## 🚀 Installation

1. Copie les fichiers dans `src/components/`
2. Ajoute les fonts Google dans ton `index.html` ou CSS:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap" rel="stylesheet">
```

---

## 📚 Test de niveau de français

```jsx
import { useState } from 'react';
import FrenchLevelTest from './components/FrenchLevelTest';

function HeroSection() {
  const [showTest, setShowTest] = useState(false);

  return (
    <>
      <button onClick={() => setShowTest(true)}>
        📚 Tester mon niveau de français
      </button>

      {showTest && (
        <FrenchLevelTest
          onClose={() => setShowTest(false)}
          onBookAppointment={() => {
            setShowTest(false);
            window.location.href = '/rendez-vous?service=francisation';
          }}
        />
      )}
    </>
  );
}
```

**Caractéristiques:**
- 15 questions (A1 → B2)
- Scoring avec niveaux CECR
- Recommandation de cours CARI
- Bouton CTA vers prise de RDV

---

## 🌍 Sélecteur de langue

```jsx
import { LanguageSelectorWrapper } from './components/LanguageSelector';

function App() {
  return (
    <LanguageSelectorWrapper onLanguageChange={(lang) => {
      // Changer la langue de l'app
      i18n.changeLanguage(lang);
    }}>
      <YourApp />
    </LanguageSelectorWrapper>
  );
}
```

**Caractéristiques:**
- Nuage de 12 langues animé
- **Pas de drapeaux** (sensibilité culturelle)
- Stockage localStorage
- S'affiche une seule fois

**Langues supportées:**
Français, English, Español, العربية, 中文, Português, हिन्दी, اردو, Русский, Tiếng Việt, Tagalog, Kreyòl

---

## 🖼️ Sections Parallax

### ParallaxStatsSection
Entre "Vos besoins" et "Calendrier"

```jsx
import { ParallaxStatsSection } from './components/ParallaxBreathing';

<ParallaxStatsSection
  imageUrl="/images/cari-group.jpg"
  title="Ensemble, nous faisons la différence"
  subtitle="Depuis 1989, le CARI accompagne les nouveaux arrivants"
  stats={[
    { value: '5,000+', label: 'Personnes aidées/an' },
    { value: '92%', label: 'Taux de satisfaction' },
    { value: '85%', label: 'Trouvent un emploi' },
    { value: '12', label: 'Langues parlées' }
  ]}
/>
```

### ParallaxTestimonialBand
Entre "Calendrier" et "Nouvelles"

```jsx
import { ParallaxTestimonialBand, COLORS } from './components/ParallaxBreathing';

<ParallaxTestimonialBand
  backgroundColor={COLORS.brume}
  testimonials={[
    {
      quote: "Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois!",
      name: "Asma B.",
      origin: "Maroc • Arrivée 2020",
      avatar: "/images/asma.jpg" // optionnel
    },
    {
      quote: "Les cours de français m'ont permis d'être autonome rapidement.",
      name: "Ahmed K.",
      origin: "Syrie • Arrivé 2021"
    }
  ]}
/>
```

### ParallaxCTASection
Avant le footer

```jsx
import { ParallaxCTASection } from './components/ParallaxBreathing';

<ParallaxCTASection
  title="Prêt à commencer votre nouvelle vie au Québec?"
  subtitle="Notre équipe multilingue est là pour vous accompagner."
  imageUrl="/images/cari-office.jpg"
  primaryButton={{
    label: 'Prendre rendez-vous',
    onClick: () => navigate('/rendez-vous')
  }}
  secondaryButton={{
    label: 'Nous contacter',
    onClick: () => navigate('/contact')
  }}
/>
```

---

## 🎨 Utiliser le thème

```jsx
import { COLORS, FONTS, GRADIENTS } from './components/cari-theme';

const MyComponent = () => (
  <div style={{
    background: GRADIENTS.primary,
    fontFamily: FONTS.sans,
    color: COLORS.blanc
  }}>
    <h1 style={{ fontFamily: FONTS.serif }}>
      Bienvenue
    </h1>
  </div>
);
```

---

## 📍 Structure de page recommandée

```
┌─────────────────────────────────────┐
│           HERO (existant)           │
│    + Bouton "Tester mon français"   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     VOS BESOINS - 6 cartes          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    ★ ParallaxStatsSection ★         │
│   Bleu Foncé → Turquoise gradient   │
│   Stats en Jaune doré               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     CALENDRIER D'ACTIVITÉS          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  ★ ParallaxTestimonialBand ★        │
│   Background: Brume (#CCD8DF)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         NOUVELLES                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     ★ ParallaxCTASection ★          │
│   Bouton: Vermillon (#F15C39)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│           FOOTER                    │
└─────────────────────────────────────┘
```

---

## 📱 Mobile

- **Parallax désactivé** automatiquement < 768px
- Fallback avec images statiques
- Layouts adaptés (grilles 2 colonnes, boutons empilés)

---

## 🔧 Personnalisation

Pour ajuster les couleurs globalement, modifie `cari-theme.js`.

Les composants importent automatiquement la palette, donc un changement dans le thème se répercute partout.

---

Créé pour **CARI Saint-Laurent** par Pierre Michaud / JAXA Production Inc.
Guide de style: Agent Illustrateur - Novembre 2025
