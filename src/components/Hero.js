import React, { useEffect, useRef, useState } from "react";
import FrenchLevelTest from "./cari/FrenchLevelTest";

const Hero = ({
  heroSlides,
  currentHero,
  showHero,
  nextHeroSlide,
  prevHeroSlide,
  pauseHeroRotation,
  resumeHeroRotation,
  handleTouchStart,
  handleTouchEnd,
  currentLanguage,
  translations,
}) => {
  const heroRangeRef = useRef(null);
  const heroCarouselRef = useRef(null);
  const slideRefs = useRef([]);
  const [showFrenchTest, setShowFrenchTest] = useState(false);

  const t = translations[currentLanguage] || translations.fr;

  // Update range slider when currentHero changes
  useEffect(() => {
    if (heroRangeRef.current) {
      heroRangeRef.current.value = currentHero;
    }
  }, [currentHero]);

  // Ken Burns zoom effect is now handled purely by CSS animation
  // No JavaScript manipulation needed - prevents React reconciliation issues

  // Handle range slider change
  const handleRangeChange = (e) => {
    const index = parseInt(e.target.value);
    showHero(index);
  };

  // Handle hero carousel mouse events - using refs for stable callbacks
  useEffect(() => {
    const carousel = heroCarouselRef.current;
    if (!carousel) return;

    const handleMouseEnter = () => pauseHeroRotation();
    const handleMouseLeave = () => resumeHeroRotation();

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pauseHeroRotation, resumeHeroRotation]);

  return (
    <section className="hero" id="accueil">
      <div
        className="hero-carousel"
        ref={heroCarouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={t.aria.carousel}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`hero-slide ${slide.overlay} ${index === currentHero ? "active" : ""}`}
            data-slide-index={index}
          >
            <img
              className="hero-slide-bg"
              src={slide.background}
              alt=""
              data-bg-index={index}
            />
            <div className="hero-container">
              <div className="hero-content">
                <h1
                  className="translatable"
                  dangerouslySetInnerHTML={{
                    __html:
                      "Trouvez votre <span class='highlight'>place</span> au Québec",
                  }}
                />
                <p className="hero-subtitle translatable">{t.hero.subtitle}</p>
                <div className="hero-cta">
                  <a
                    href="#besoins"
                    className="btn btn-primary translatable"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById("besoins");
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    {t.hero.discoverServices}
                  </a>
                  <button
                    className="btn btn-secondary translatable"
                    onClick={() => setShowFrenchTest(true)}
                  >
                    {t.hero.testFrench}
                  </button>
                </div>
              </div>
              <div className="hero-quote">
                <p>{slide.quote.text}</p>
                <div className="author">{slide.quote.author}</div>
                <div className="role">{slide.quote.role}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation */}
        <div className="carousel-nav" aria-label={t.aria.carouselNav}>
          <button
            className="carousel-btn"
            aria-label={t.aria.previousSlide}
            onClick={prevHeroSlide}
          >
            ‹
          </button>
          <button
            className="carousel-btn"
            aria-label={t.aria.nextSlide}
            onClick={nextHeroSlide}
          >
            ›
          </button>
        </div>

        {/* Dot Indicators */}
        <div
          className="carousel-indicators"
          role="tablist"
          style={{
            position: "absolute",
            bottom: "16px",
            left: "0",
            right: "0",
          }}
        >
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`indicator hero-indicator ${index === currentHero ? "active" : ""}`}
              role="button"
              aria-label={`${t.aria.goToSlide} ${index + 1}`}
              style={{ width: "28px", height: "4px", borderRadius: "2px" }}
              onClick={() => showHero(index)}
            />
          ))}
        </div>

        {/* Mobile Range Slider */}
        <div className="hero-slider">
          <input
            ref={heroRangeRef}
            type="range"
            id="heroRange"
            min="0"
            max={heroSlides.length - 1}
            step="1"
            value={currentHero}
            onChange={handleRangeChange}
            aria-label={t.aria.carouselSlider}
          />
        </div>
      </div>

      {showFrenchTest && (
        <FrenchLevelTest
          onClose={() => setShowFrenchTest(false)}
          onBookAppointment={() => {
            setShowFrenchTest(false);
            const element = document.getElementById("rdv");
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        />
      )}
    </section>
  );
};

export default Hero;
