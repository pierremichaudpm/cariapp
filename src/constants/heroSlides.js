// Hero slides generator function that uses translations
export const getHeroSlides = (t) => [
  {
    id: 1,
    background: "/images/arabwoman.webp",
    overlay: "overlay-blue",
    quote: {
      text: t.hero.slides.slide1.quote,
      author: t.hero.slides.slide1.author,
      role: t.hero.slides.slide1.role,
    },
  },
  {
    id: 2,
    background: "/images/blackman.webp",
    overlay: "overlay-orange",
    quote: {
      text: t.hero.slides.slide2.quote,
      author: t.hero.slides.slide2.author,
      role: t.hero.slides.slide2.role,
    },
  },
  {
    id: 3,
    background: "/images/blackwomen.webp",
    overlay: "overlay-blue",
    quote: {
      text: t.hero.slides.slide3.quote,
      author: t.hero.slides.slide3.author,
      role: t.hero.slides.slide3.role,
    },
  },
  {
    id: 4,
    background: "/images/asianwoman.webp",
    overlay: "overlay-orange",
    quote: {
      text: t.hero.slides.slide4.quote,
      author: t.hero.slides.slide4.author,
      role: t.hero.slides.slide4.role,
    },
  },
  {
    id: 5,
    background: "/images/asianman.webp",
    overlay: "overlay-blue",
    quote: {
      text: t.hero.slides.slide5.quote,
      author: t.hero.slides.slide5.author,
      role: t.hero.slides.slide5.role,
    },
  },
];

// Export for backward compatibility (will use French by default if no translation provided)
export const heroSlides = getHeroSlides({
  hero: {
    slides: {
      slide1: {
        quote:
          "Chaque personne qui franchit notre porte mérite un accueil chaleureux",
        author: "Nadia R.",
        role: "Accueil & Intégration",
      },
      slide2: {
        quote:
          "Voir mes étudiants parler français avec confiance, c'est ma plus grande fierté",
        author: "Marco T.",
        role: "Francisation",
      },
      slide3: {
        quote: "On ne trouve pas juste un emploi, on bâtit un avenir ici",
        author: "Sylvie D.",
        role: "Aide à l'emploi",
      },
      slide4: {
        quote:
          "Accompagner les familles, c'est investir dans toute une communauté",
        author: "Fatima H.",
        role: "Parents-Jeunesse",
      },
      slide5: {
        quote:
          "Créer un espace où les hommes se sentent écoutés et soutenus, c'est essentiel",
        author: "Karim L.",
        role: "Espace Hommes",
      },
    },
  },
});
