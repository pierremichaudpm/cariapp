import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../Hero";
import { translations } from "../../translations";

const mockHeroSlides = [
  {
    id: 1,
    background: "url(/images/arabwoman.webp)",
    overlay: "overlay-blue",
    quote: {
      text: "« Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois! »",
      author: "Asma B.",
      role: "Maroc • Arrivée 2020",
    },
  },
  {
    id: 2,
    background: "url(/images/blackman.webp)",
    overlay: "overlay-orange",
    quote: {
      text: "« De réfugié à entrepreneur, le CARI m'a accompagné »",
      author: "Jean-Pierre H.",
      role: "Haïti • Arrivée 2020",
    },
  },
];

// Create a set of default props to pass to the component
const defaultProps = {
  heroSlides: mockHeroSlides,
  currentHero: 0,
  showHero: jest.fn(),
  nextHeroSlide: jest.fn(),
  prevHeroSlide: jest.fn(),
  pauseHeroRotation: jest.fn(),
  resumeHeroRotation: jest.fn(),
  handleTouchStart: jest.fn(),
  handleTouchEnd: jest.fn(),
  currentLanguage: "fr",
  translations: translations,
};

describe("Hero Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders hero component with slides", () => {
    render(<Hero {...defaultProps} />);
    const t = translations.fr;

    // Find the active slide first to scope our queries
    const activeSlide = document.querySelector(".hero-slide.active");
    expect(activeSlide).toBeInTheDocument();

    // Check that the hero heading is rendered within the active slide
    const heroHeading = within(activeSlide).getByRole("heading", {
      name: /Trouvez votre place/i,
    });
    expect(heroHeading).toBeInTheDocument();

    // Check that the first slide's quote content is rendered
    expect(
      within(activeSlide).getByText(
        "« Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois! »",
      ),
    ).toBeInTheDocument();
    expect(within(activeSlide).getByText("Asma B.")).toBeInTheDocument();
  });

  test("renders navigation buttons", () => {
    render(<Hero {...defaultProps} />);

    const prevButton = screen.getByRole("button", { name: "Slide précédente" });
    const nextButton = screen.getByRole("button", { name: "Slide suivante" });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test("renders dot indicators", () => {
    render(<Hero {...defaultProps} />);

    const indicators = screen.getAllByRole("button", {
      name: /Aller à la diapositive/i,
    });
    expect(indicators).toHaveLength(mockHeroSlides.length);
  });

  test("renders stats section within the active slide", () => {
    render(<Hero {...defaultProps} />);
    const t = translations.fr;

    // Find the active slide by looking for the 'active' class
    const activeSlide = document.querySelector(".hero-slide.active");
    expect(activeSlide).toBeInTheDocument();

    // Query for the stats *within* the active slide to avoid duplicates
    const { getByText } = within(activeSlide);
    expect(getByText("5,000+")).toBeInTheDocument();
    expect(getByText(t.hero.stats.peopleHelped)).toBeInTheDocument();
    expect(getByText("92%")).toBeInTheDocument();
    expect(getByText(t.hero.stats.satisfaction)).toBeInTheDocument();
    expect(getByText("85%")).toBeInTheDocument();
    expect(getByText(t.hero.stats.findEmployment)).toBeInTheDocument();
  });
});
