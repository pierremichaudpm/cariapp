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
        quote: "Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois!",
        author: "Asma B.",
        role: "Maroc • Arrivée 2020",
      },
      slide2: {
        quote: "De réfugié à entrepreneur, le CARI m'a accompagné",
        author: "Jean-Pierre H.",
        role: "Haïti • Arrivée 2020",
      },
      slide3: {
        quote:
          "Le français semblait impossible, maintenant je le parle couramment!",
        author: "Marie-Claire T.",
        role: "Haïti • Arrivée 2021",
      },
      slide4: {
        quote: "Mes enfants sont épanouis, nous avons trouvé notre place ici",
        author: "Karla A.",
        role: "RDC • Arrivée 2019",
      },
      slide5: {
        quote: "L'aide pour comprendre le système québécois a tout changé",
        author: "David C.",
        role: "Chine • Arrivée 2022",
      },
    },
  },
});
