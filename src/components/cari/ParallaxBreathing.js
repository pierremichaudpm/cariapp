import React, { useState, useEffect, useRef } from "react";

/**
 * CARI Saint-Laurent - Sections Parallax "Breathing Spaces"
 *
 * GUIDE DE STYLE CARI:
 * - Bleu Foncé: #263B5A (ancrage, confiance, professionnalisme)
 * - Turquoise: #6EC1C1 (fraîcheur, ouverture, accessibilité)
 * - Brume: #CCD8DF (sérénité, espoir, renouveau)
 * - Jaune doré: #F7BF3F (chaleur, énergie, dignité)
 * - Vermillon: #F15C39 (en action, dynamisme, passion)
 * - Typographie: DM Serif (titres), DM Sans (corps)
 */

// Palette CARI officielle
const COLORS = {
  bleuFonce: "#263164",
  turquoise: "#6cbac7",
  brume: "#cce8e5",
  jauneCore: "#ffbf3f",
  vermillon: "#ff5c39",
  noir: "#000000",
  blanc: "#FFFFFF",
};

/**
 * Hook pour détecter si on est sur mobile
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

/**
 * Hook pour l'effet parallax
 */
const useParallax = (speed = 0.5, enabled = true) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const relativeScroll = scrolled - elementTop + window.innerHeight;

        if (
          relativeScroll > 0 &&
          relativeScroll < window.innerHeight + rect.height
        ) {
          setOffset(relativeScroll * speed);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, enabled]);

  return { elementRef, offset };
};

/**
 * Section Parallax avec image de fond
 */
export const ParallaxImageSection = ({
  imageUrl,
  height = "400px",
  mobileHeight = "300px",
  overlayColor = `${COLORS.bleuFonce}B3`,
  overlayGradient = null,
  children,
  parallaxSpeed = 0.3,
  className = "",
}) => {
  const isMobile = useIsMobile();
  const { elementRef, offset } = useParallax(parallaxSpeed, !isMobile);

  const styles = {
    container: {
      position: "relative",
      height: isMobile ? mobileHeight : height,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: '"DM Sans", sans-serif',
    },
    imageWrapper: {
      position: "absolute",
      inset: isMobile ? 0 : "-20%",
      transform: isMobile ? "none" : `translateY(${offset}px)`,
      willChange: isMobile ? "auto" : "transform",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: overlayGradient || overlayColor,
    },
    content: {
      position: "relative",
      zIndex: 10,
      padding: "2rem",
      textAlign: "center",
      color: COLORS.blanc,
      maxWidth: "900px",
    },
  };

  return (
    <section ref={elementRef} style={styles.container} className={className}>
      <div style={styles.imageWrapper}>
        <img src={imageUrl} alt="" style={styles.image} loading="lazy" />
      </div>
      <div style={styles.overlay}></div>
      <div style={styles.content}>{children}</div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');
      `}</style>
    </section>
  );
};

/**
 * Hook pour animation de comptage
 * Parse des valeurs comme "7,000+", "95+", "128", "35+"
 * et anime de 0 jusqu'à la valeur cible
 */
const useCountUp = (targetValue, isVisible, duration = 2000) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse the target: extract number, prefix, suffix, and comma formatting
    const match = String(targetValue).match(/^([^\d]*)(\d[\d,]*)(.*)$/);
    if (!match) {
      setDisplayValue(targetValue);
      return;
    }

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3]; // e.g. "+"
    const hasCommas = numStr.includes(",");
    const target = parseInt(numStr.replace(/,/g, ""), 10);

    if (isNaN(target) || target === 0) {
      setDisplayValue(targetValue);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);

      // Format with commas if original had them
      const formatted = hasCommas
        ? current.toLocaleString("en-US")
        : String(current);

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetValue, duration]);

  return displayValue;
};

/**
 * Composant individuel pour un stat avec comptage animé
 */
const AnimatedStat = ({ value, label, isVisible, delay, styles }) => {
  const displayValue = useCountUp(value, isVisible, 2000);

  return (
    <div style={styles.statItem}>
      <span
        style={{
          ...styles.statNumber,
          transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transitionDelay: `${delay}ms`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {displayValue}
      </span>
      <span
        style={{
          ...styles.statLabel,
          transition:
            "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transitionDelay: `${delay + 200}ms`,
          opacity: isVisible ? 0.9 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(15px)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

/**
 * Section Stats avec fond parallax - Style CARI
 */
export const ParallaxStatsSection = ({ stats = [], title, subtitle }) => {
  const isMobile = useIsMobile();
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // IntersectionObserver to trigger count-up when stats enter viewport
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const styles = {
    section: {
      position: "relative",
      paddingTop: "1rem",
      paddingBottom: "4rem",
      margin: 0,
      paddingLeft: "2rem",
      paddingRight: "2rem",
      overflow: "hidden",
      fontFamily: '"DM Sans", sans-serif',
      backgroundColor: COLORS.blanc,
    },
    content: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
      color: COLORS.bleuFonce,
    },
    title: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: isMobile ? "1.75rem" : "2.5rem",
      fontWeight: "400",
      marginBottom: "0.5rem",
      color: COLORS.bleuFonce,
    },
    subtitle: {
      fontSize: isMobile ? "1rem" : "1.15rem",
      opacity: 0.9,
      marginBottom: "2rem",
      fontWeight: "400",
      color: COLORS.bleuFonce,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, 1fr)"
        : `repeat(${Math.min(stats.length, 4)}, 1fr)`,
      gap: isMobile ? "2rem" : "3rem",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    statNumber: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: isMobile ? "2.75rem" : "3.75rem",
      fontWeight: "700",
      color: COLORS.vermillon,
      lineHeight: 1,
    },
    statLabel: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      marginTop: "0.5rem",
      opacity: 0.9,
      fontWeight: "400",
      color: COLORS.bleuFonce,
    },
  };

  return (
    <section ref={elementRef} style={styles.section}>
      <div style={styles.content}>
        {title && <h2 style={styles.title}>{title}</h2>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        <div ref={statsRef} style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              value={stat.value}
              label={stat.label}
              isVisible={isVisible}
              delay={index * 150}
              styles={styles}
            />
          ))}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');
      `}</style>
    </section>
  );
};

/**
 * Bande de témoignages - Style CARI
 */
export const ParallaxTestimonialBand = ({
  testimonials = [],
  backgroundColor = COLORS.brume,
}) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const { elementRef, offset } = useParallax(0.15, !isMobile);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const styles = {
    section: {
      position: "relative",
      padding: isMobile ? "3.5rem 1rem" : "5rem 2rem",
      backgroundColor,
      overflow: "hidden",
      fontFamily: '"DM Sans", sans-serif',
    },
    decorativeCircle: {
      position: "absolute",
      borderRadius: "50%",
      border: `2px solid ${COLORS.turquoise}20`,
      transform: isMobile ? "none" : `translateY(${offset * 0.3}px)`,
    },
    content: {
      position: "relative",
      zIndex: 10,
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center",
    },
    quoteIcon: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: "4rem",
      color: COLORS.turquoise,
      opacity: 0.5,
      marginBottom: "1rem",
      lineHeight: 1,
    },
    testimonialContainer: {
      position: "relative",
      minHeight: isMobile ? "160px" : "140px",
    },
    quote: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: isMobile ? "1.15rem" : "1.5rem",
      fontStyle: "normal",
      color: COLORS.bleuFonce,
      lineHeight: 1.5,
      marginBottom: "1.5rem",
      transition: "opacity 0.5s ease",
    },
    author: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
    },
    avatar: {
      width: "112px",
      height: "112px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `3px solid ${COLORS.turquoise}`,
    },
    avatarPlaceholder: {
      width: "112px",
      height: "112px",
      borderRadius: "50%",
      backgroundColor: COLORS.turquoise,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: COLORS.blanc,
      fontSize: "2.5rem",
      fontWeight: "600",
    },
    authorInfo: {
      textAlign: "left",
    },
    authorName: {
      fontWeight: "600",
      color: COLORS.bleuFonce,
      fontSize: "1.05rem",
    },
    authorOrigin: {
      fontSize: "0.9rem",
      color: COLORS.turquoise,
      fontWeight: "500",
    },
    dots: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "2rem",
    },
    dot: (isActive) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: isActive ? COLORS.turquoise : COLORS.blanc,
      border: `2px solid ${COLORS.turquoise}`,
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section ref={elementRef} style={styles.section}>
      {/* Decorative circles - style fil d'Ariane */}
      <div
        style={{
          ...styles.decorativeCircle,
          width: "350px",
          height: "350px",
          top: "-175px",
          left: "-100px",
        }}
      ></div>
      <div
        style={{
          ...styles.decorativeCircle,
          width: "250px",
          height: "250px",
          bottom: "-125px",
          right: "-75px",
          borderColor: `${COLORS.jauneCore}15`,
        }}
      ></div>

      <div style={styles.content}>
        <div style={styles.quoteIcon}>"</div>

        <div style={styles.testimonialContainer}>
          {currentTestimonial && (
            <>
              <p style={styles.quote}>{currentTestimonial.quote}</p>
              <div style={styles.author}>
                {currentTestimonial.avatar ? (
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    style={styles.avatar}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    {currentTestimonial.name.charAt(0)}
                  </div>
                )}
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>{currentTestimonial.name}</div>
                  <div style={styles.authorOrigin}>
                    {currentTestimonial.origin}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div style={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                style={styles.dot(index === activeIndex)}
                onClick={() => setActiveIndex(index)}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');
      `}</style>
    </section>
  );
};

/**
 * Section CTA avec fond parallax - Style CARI
 */
export const ParallaxCTASection = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  imageUrl = null,
  hideButtons = false,
}) => {
  const isMobile = useIsMobile();
  const { elementRef, offset } = useParallax(0.2, !isMobile);

  const styles = {
    section: {
      position: "relative",
      padding: isMobile ? "3.4rem 1rem" : "8rem 2rem",
      overflow: "hidden",
      backgroundColor: imageUrl ? "transparent" : COLORS.bleuFonce,
      fontFamily: '"DM Sans", sans-serif',
    },
    bgImage: imageUrl
      ? {
          position: "absolute",
          top: "-20%",
          left: 0,
          right: 0,
          bottom: "-20%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isMobile ? "none" : `translateY(${offset * 0.3}px)`,
          willChange: isMobile ? "auto" : "transform",
        }
      : null,
    overlay: imageUrl
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `${COLORS.bleuFonce}99`,
        }
      : null,
    content: {
      position: "relative",
      zIndex: 10,
      maxWidth: "750px",
      margin: "0 auto",
      textAlign: "center",
      color: COLORS.blanc,
    },
    title: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: isMobile ? "2rem" : "3rem",
      fontWeight: "400",
      marginBottom: "1.5rem",
      lineHeight: 1.3,
    },
    subtitle: {
      fontSize: isMobile ? "1.1rem" : "1.35rem",
      opacity: 0.95,
      marginBottom: "2rem",
      lineHeight: 1.6,
      fontWeight: "400",
    },
    buttons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
    primaryBtn: {
      padding: "1rem 2.25rem",
      backgroundColor: COLORS.vermillon,
      color: COLORS.blanc,
      border: "none",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "600",
      fontFamily: '"DM Sans", sans-serif',
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: `0 4px 20px ${COLORS.vermillon}50`,
    },
    secondaryBtn: {
      padding: "1rem 2.25rem",
      backgroundColor: "transparent",
      color: COLORS.blanc,
      border: `2px solid ${COLORS.blanc}`,
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "600",
      fontFamily: '"DM Sans", sans-serif',
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <section ref={elementRef} style={styles.section}>
      {imageUrl && <div style={styles.bgImage}></div>}
      {imageUrl && <div style={styles.overlay}></div>}

      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

        {!hideButtons && (
          <div style={styles.buttons}>
            {primaryButton && (
              <button
                style={styles.primaryBtn}
                onClick={primaryButton.onClick}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = `0 8px 30px ${COLORS.vermillon}60`;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = `0 4px 20px ${COLORS.vermillon}50`;
                }}
              >
                {primaryButton.label}
              </button>
            )}
            {secondaryButton && (
              <button
                style={styles.secondaryBtn}
                onClick={secondaryButton.onClick}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');
      `}</style>
    </section>
  );
};

/**
 * Séparateur simple avec ligne décorative - Style CARI
 */
export const BreathingSpacer = ({
  height = "80px",
  showLine = true,
  lineColor = COLORS.turquoise,
}) => {
  const styles = {
    spacer: {
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.blanc,
    },
    line: {
      width: "80px",
      height: "3px",
      backgroundColor: lineColor,
      borderRadius: "2px",
      opacity: 0.5,
    },
  };

  return (
    <div style={styles.spacer}>
      {showLine && <div style={styles.line}></div>}
    </div>
  );
};

// Export des couleurs pour utilisation externe
export { COLORS };

// Export par défaut
const ParallaxBreathing = {
  ParallaxImageSection,
  ParallaxStatsSection,
  ParallaxTestimonialBand,
  ParallaxCTASection,
  BreathingSpacer,
  useIsMobile,
  useParallax,
  COLORS,
};

export default ParallaxBreathing;
