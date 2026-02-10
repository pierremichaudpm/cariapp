# Guide d'intégration - Claude Code dans Zed
## Composants CARI Saint-Laurent v2.2

---

## ⚠️ RÈGLES IMPORTANTES

### 1. Respect du design existant
Avant toute modification, Claude Code doit analyser le site existant (protocari.netlify.app) pour:
- Comprendre la palette de couleurs utilisée
- Identifier les styles de boutons, cartes, et composants
- Respecter les espacements et le rythme visuel

### 2. AUCUN GRADIENT
**Le design CARI utilise uniquement des couleurs franches.**
- ❌ Pas de `linear-gradient`
- ❌ Pas de dégradés
- ✅ Couleurs solides uniquement

### 3. Images temporaires
Les images Unsplash sont des placeholders. À remplacer par de vraies photos CARI plus tard.

---

## 📋 Prérequis

- Projet CARI existant (React/Vite sur Netlify)
- Claude Code installé dans Zed
- Fichiers `cari-components-v2/` copiés dans le projet

---

## Étape 1: Copier les fichiers

### Prompt:

```
Copie les fichiers du dossier cari-components-v2 dans mon projet:

1. Crée le dossier src/components/cari/ s'il n'existe pas
2. Copie ces fichiers dedans:
   - cari-theme.js
   - FrenchLevelTest.jsx
   - LanguageSelector.jsx
   - ParallaxBreathing.jsx

3. Ajoute l'import des fonts Google dans index.html si pas déjà présent:
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap" rel="stylesheet">

IMPORTANT: Analyse le code existant du site pour comprendre les styles déjà en place. Les nouveaux composants devront s'harmoniser avec le design existant, sans gradients - uniquement des couleurs franches.
```

---

## Étape 2: Ajouter le bouton "Prendre RDV" dans le Header

### Prompt:

```
Dans mon composant Header (navbar), ajoute un petit bouton CTA "Prendre rendez-vous":

1. Trouve le composant Header/Navbar existant
2. Ajoute un bouton À CÔTÉ DU TOGGLE DE LANGUE (coin supérieur droit)
3. Style du bouton:
   - Petit et discret mais visible
   - Background: vermillon (#F15C39) - COULEUR FRANCHE, pas de gradient
   - Texte: "Prendre rendez-vous"
   - Border-radius arrondi (pill, comme les autres boutons)
   - onClick: redirection vers /rendez-vous

Structure visuelle attendue:
[Logo]  Nav links...  [Prendre rendez-vous] [FR/EN toggle]

IMPORTANT: Utilise le même style que les autres boutons du site. Pas de gradient.
```

---

## Étape 3: Modifier les CTA du Hero

### Prompt:

```
Dans ma section Hero, je veux modifier les boutons d'action:

ACTUELLEMENT:
- "Découvrez nos services" (principal)
- "Parlez à un conseiller" ou "Prendre rendez-vous" (secondaire)

CHANGER POUR:
- "Découvrez nos services" (garder tel quel)
- "Je teste mon français" (NOUVEAU - remplace l'ancien)

Pour le nouveau bouton "Je teste mon français":
1. Importe useState de React
2. Importe FrenchLevelTest depuis ./cari/FrenchLevelTest
3. Ajoute un state: const [showFrenchTest, setShowFrenchTest] = useState(false)
4. Le bouton doit avoir:
   - Texte: "Je teste mon français"
   - Style: secondaire (outline ou jaune doré #F7BF3F)
   - onClick: () => setShowFrenchTest(true)
   
5. Ajoute le modal après le hero:
   {showFrenchTest && (
     <FrenchLevelTest
       onClose={() => setShowFrenchTest(false)}
       onBookAppointment={() => {
         setShowFrenchTest(false);
         window.location.href = '/rendez-vous';
       }}
     />
   )}

IMPORTANT: Garde exactement le même style visuel que les boutons actuels du hero. Pas de gradient.
```

---

## Étape 4: Ajouter le sélecteur de langue (première visite)

### Prompt:

```
Intègre le LanguageSelector pour qu'il s'affiche à la première visite:

1. Dans App.jsx ou le layout principal, importe:
   import { LanguageSelectorWrapper } from './components/cari/LanguageSelector'

2. Wrap le contenu avec:
   <LanguageSelectorWrapper onLanguageChange={(lang) => {
     console.log('Langue sélectionnée:', lang);
   }}>
     {/* Reste de l'app */}
   </LanguageSelectorWrapper>

Le sélecteur utilise localStorage - il ne s'affiche qu'une fois.
Le fond est bleu foncé (#263B5A) solide, pas de gradient.
```

---

## Étape 5: Ajouter les sections Parallax

### Images temporaires Unsplash:

```javascript
const TEMP_IMAGES = {
  stats: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
  cta: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80'
};
```

### Prompt:

```
Ajoute les sections parallax entre les sections existantes de la page d'accueil.

IMPORTANT AVANT DE COMMENCER:
- Analyse la structure actuelle (Hero, Vos besoins, Calendrier, Nouvelles, Footer)
- Les overlays utilisent des couleurs franches (#263B5AE6), PAS de gradients

IMPORTS:
import { 
  ParallaxStatsSection, 
  ParallaxTestimonialBand, 
  ParallaxCTASection,
  COLORS 
} from './components/cari/ParallaxBreathing';

---

SECTION 1: Stats (APRÈS "Vos besoins", AVANT "Calendrier")

<ParallaxStatsSection
  imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
  title="Ensemble, nous faisons la différence"
  subtitle="Depuis 1989, le CARI accompagne les nouveaux arrivants vers leur réussite"
  stats={[
    { value: '5,000+', label: 'Personnes aidées/an' },
    { value: '92%', label: 'Taux de satisfaction' },
    { value: '85%', label: 'Trouvent un emploi' },
    { value: '12', label: 'Langues parlées' }
  ]}
/>

---

SECTION 2: Témoignages (APRÈS "Calendrier", AVANT "Nouvelles")

<ParallaxTestimonialBand
  backgroundColor={COLORS.brume}
  testimonials={[
    {
      quote: "Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois! L'équipe m'a accompagné à chaque étape.",
      name: "Asma B.",
      origin: "Maroc • Arrivée 2020"
    },
    {
      quote: "Les cours de français m'ont permis d'être autonome rapidement. Je recommande à tous les nouveaux arrivants!",
      name: "Ahmed K.",
      origin: "Syrie • Arrivé 2021"
    },
    {
      quote: "Le programme Femmes du monde m'a donné confiance et un réseau d'amies formidable.",
      name: "Maria L.",
      origin: "Colombie • Arrivée 2019"
    }
  ]}
/>

---

SECTION 3: CTA (APRÈS "Nouvelles", AVANT Footer)

<ParallaxCTASection
  title="Prêt à commencer votre nouvelle vie au Québec?"
  subtitle="Notre équipe multilingue est là pour vous accompagner à chaque étape de votre intégration."
  imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
  primaryButton={{
    label: 'Prendre rendez-vous',
    onClick: () => window.location.href = '/rendez-vous'
  }}
  secondaryButton={{
    label: 'Nous contacter',
    onClick: () => window.location.href = '/contact'
  }}
/>

---

NOTE: Les overlays sur images sont en bleu foncé solide avec opacité (#263B5AE6), pas de gradient.
Les images Unsplash sont temporaires - à remplacer par de vraies photos CARI.
```

---

## Étape 6: Vérifier l'harmonie visuelle

### Prompt:

```
Vérifie que les nouveaux composants s'intègrent bien au site existant:

1. Compare les couleurs - elles doivent matcher exactement
2. Vérifie qu'il n'y a AUCUN gradient nulle part (ni dans les composants, ni ailleurs)
3. Vérifie les border-radius (probablement 16px ou 24px)
4. Vérifie les espacements entre sections

Si tu trouves des gradients quelque part, remplace-les par des couleurs franches:
- Bleu foncé: #263B5A
- Turquoise: #6EC1C1
- Brume: #CCD8DF
- Jaune doré: #F7BF3F
- Vermillon: #F15C39
```

---

## Étape 7: Tester sur mobile

### Prompt:

```
Teste le responsive des nouveaux composants (375px, 768px, 1024px):

Vérifie:
- [ ] Parallax désactivé sur mobile (images statiques)
- [ ] Modal FrenchLevelTest fonctionne sur mobile
- [ ] Nuage de langues lisible sur mobile
- [ ] Boutons du hero empilés sur mobile
- [ ] Bouton RDV dans le header reste visible
```

---

## 🔧 Prompts de debug

### Si tu trouves un gradient:

```
J'ai trouvé un gradient dans [fichier/composant]. Remplace-le par une couleur franche.

Règle: Le design CARI n'utilise AUCUN gradient, uniquement des couleurs solides.
Utilise #263B5A (bleu foncé) pour les fonds sombres au lieu de gradients bleu→turquoise.
```

### Si les couleurs ne matchent pas:

```
Les couleurs des nouveaux composants ne s'harmonisent pas avec le site existant.

Analyse les couleurs actuelles du site et modifie cari-theme.js pour utiliser exactement les mêmes valeurs hex.
```

---

## ✅ Checklist finale

```
HEADER:
[ ] Bouton "Prendre RDV" à côté du toggle de langue
[ ] Couleur vermillon (#F15C39), pas de gradient

HERO:
[ ] 2 boutons: "Découvrez nos services" + "Je teste mon français"
[ ] Le test de français s'ouvre correctement
[ ] Pas de gradient sur les boutons

TEST DE FRANÇAIS:
[ ] Modal fonctionne (15 questions, score, résultat)
[ ] Header du modal: bleu foncé solide, pas de gradient
[ ] Bouton "Prendre RDV" dans le résultat fonctionne

SÉLECTEUR DE LANGUE:
[ ] S'affiche à la première visite
[ ] Fond bleu foncé solide, pas de gradient
[ ] Nuage de langues animé et cliquable

SECTIONS PARALLAX:
[ ] Stats entre "Vos besoins" et "Calendrier"
[ ] Témoignages entre "Calendrier" et "Nouvelles"  
[ ] CTA avant le footer
[ ] Images Unsplash visibles
[ ] Overlays en couleur franche, pas de gradient

GLOBAL:
[ ] AUCUN gradient nulle part
[ ] Couleurs cohérentes avec le site existant
[ ] Fonctionne sur mobile
```

---

## 📝 À faire plus tard

- [ ] Remplacer images Unsplash par vraies photos CARI
- [ ] Connecter sélecteur de langue à i18n
- [ ] Ajouter vrais témoignages avec photos (avec permission)
- [ ] Ajuster stats avec vrais chiffres du CARI

---

Bonne intégration! 🚀
