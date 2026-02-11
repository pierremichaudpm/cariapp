import React, { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const MissionSimple = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const containerRef = useRef(null);

  const promoSlides = t.promotions?.slides || [];
  const slideImages = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
  ];

  const totalSlides = promoSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-rotation
  useEffect(() => {
    if (totalSlides <= 1) return;

    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalSlides]);

  // Pause/resume
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].screenX - touchStartXRef.current;
    if (diff < -50) nextSlide();
    if (diff > 50) prevSlide();
  };

  // Modal
  const openModal = (index) => {
    setSelectedPromo(index);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedPromo(null);
    document.body.style.overflow = "";
  };

  if (totalSlides === 0) return null;

  const currentPromo =
    selectedPromo !== null ? promoSlides[selectedPromo] : null;

  return (
    <>
      <section
        id="mission"
        className="promo-carousel-section"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
      >
        <div className="promo-carousel-wrapper">
          <div
            className="promo-carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {promoSlides.map((slide, index) => (
              <div className="promo-slide" key={index}>
                <div className="promo-slide-image">
                  <img
                    src={slideImages[index] || slideImages[0]}
                    alt={slide.title}
                  />
                  <div className="promo-slide-image-overlay"></div>
                </div>
                <div className="promo-slide-content">
                  <span className="promo-slide-badge">{slide.subtitle}</span>
                  <h3 className="promo-slide-title">{slide.title}</h3>
                  <p className="promo-slide-text">{slide.description}</p>
                  <button
                    className="promo-slide-cta"
                    onClick={() => openModal(index)}
                  >
                    {slide.cta}
                    <Icon name="arrow-right" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {totalSlides > 1 && (
            <>
              <button
                className="promo-nav-btn promo-nav-prev"
                onClick={prevSlide}
                aria-label="Slide précédente"
              >
                <Icon name="chevron-left" size={24} />
              </button>
              <button
                className="promo-nav-btn promo-nav-next"
                onClick={nextSlide}
                aria-label="Slide suivante"
              >
                <Icon name="chevron-right" size={24} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {totalSlides > 1 && (
            <div className="promo-indicators">
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  className={`promo-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Aller à la diapositive ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {currentPromo && (
        <div
          className="promo-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="promo-modal-content">
            <button
              className="promo-modal-close"
              onClick={closeModal}
              aria-label="Fermer"
            >
              <Icon name="x" size={24} />
            </button>

            <div className="promo-modal-image">
              <img
                src={slideImages[selectedPromo] || slideImages[0]}
                alt={currentPromo.title}
              />
            </div>

            <div className="promo-modal-body">
              <span className="promo-modal-badge">{currentPromo.subtitle}</span>
              <h2 className="promo-modal-title">{currentPromo.title}</h2>
              <div className="promo-modal-text">
                {(currentPromo.fullContent || "").split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {currentPromo.details &&
                currentPromo.details.map((detail, i) => (
                  <div key={i} className="promo-modal-detail">
                    <h4>{detail.label}</h4>
                    <p>{detail.value}</p>
                  </div>
                ))}

              <button
                className="promo-modal-cta"
                onClick={() => {
                  closeModal();
                  setTimeout(() => {
                    const el = document.getElementById("rdv");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
              >
                {t.nav?.talkToAdvisor || "Parlez à un conseiller"}
                <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissionSimple;
