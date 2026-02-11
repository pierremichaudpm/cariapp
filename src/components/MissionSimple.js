import React, { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const MissionSimple = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [selectedPromo, setSelectedPromo] = useState(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const trackRef = useRef(null);

  const promoSlides = t.promotions?.slides || [];
  const slideImages = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
  ];

  const totalSlides = promoSlides.length;

  // Infinite loop: [clone-last, 0, 1, 2, clone-first]
  // Position index starts at 1 (real slide 0), or 0 if single slide
  const [pos, setPos] = useState(totalSlides > 1 ? 1 : 0);
  const [animated, setAnimated] = useState(true);
  const isJumping = useRef(false);

  // Build extended slides array: [last, ...all, first]
  const extendedSlides =
    totalSlides > 1
      ? [
          { slide: promoSlides[totalSlides - 1], imgIndex: totalSlides - 1 },
          ...promoSlides.map((s, i) => ({ slide: s, imgIndex: i })),
          { slide: promoSlides[0], imgIndex: 0 },
        ]
      : promoSlides.map((s, i) => ({ slide: s, imgIndex: i }));

  // Real slide index (0-based) from position
  const realIndex =
    totalSlides > 1 ? (pos - 1 + totalSlides) % totalSlides : pos;

  const handleTransitionEnd = useCallback(() => {
    if (!isJumping.current) return;
    isJumping.current = false;
    setAnimated(false);
    if (pos === 0) {
      // Jumped past clone-last → go to real last
      setPos(totalSlides);
    } else if (pos === totalSlides + 1) {
      // Jumped past clone-first → go to real first
      setPos(1);
    }
    // Re-enable animation after repositioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimated(true);
      });
    });
  }, [pos, totalSlides]);

  const nextSlide = useCallback(() => {
    if (isJumping.current) return;
    setAnimated(true);
    setPos((prev) => {
      const next = prev + 1;
      if (next > totalSlides) {
        isJumping.current = true;
      }
      return next;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (isJumping.current) return;
    setAnimated(true);
    setPos((prev) => {
      const next = prev - 1;
      if (next < 1) {
        isJumping.current = true;
      }
      return next;
    });
  }, []);

  const goToSlide = useCallback((index) => {
    // index is 0-based real index, pos = index + 1
    setAnimated(true);
    setPos(index + 1);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (totalSlides <= 1) return;

    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        nextSlide();
      }
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalSlides, nextSlide]);

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

  const renderSlide = (slide, imgIndex, key) => (
    <div className="promo-slide" key={key}>
      <div className="promo-slide-image">
        <img src={slideImages[imgIndex] || slideImages[0]} alt={slide.title} />
        <div className="promo-slide-image-overlay"></div>
      </div>
      <div className="promo-slide-content">
        <span className="promo-slide-badge">{slide.subtitle}</span>
        <h3 className="promo-slide-title">{slide.title}</h3>
        <p className="promo-slide-text">{slide.description}</p>
        <button className="promo-slide-cta" onClick={() => openModal(imgIndex)}>
          {slide.cta}
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section
        id="mission"
        className="promo-carousel-section"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="promo-carousel-wrapper">
          <div
            className="promo-carousel-track"
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${pos * 100}%)`,
              transition: animated
                ? "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
            }}
          >
            {totalSlides > 1
              ? extendedSlides.map((item, i) =>
                  renderSlide(item.slide, item.imgIndex, `slide-${i}`),
                )
              : extendedSlides.map((item, i) =>
                  renderSlide(item.slide, item.imgIndex, `slide-${i}`),
                )}
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
        </div>

        {/* Slide indicators */}
        {totalSlides > 1 && (
          <div className="promo-indicators">
            {promoSlides.map((_, index) => (
              <button
                key={index}
                className={`promo-dot ${index === realIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        )}
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
