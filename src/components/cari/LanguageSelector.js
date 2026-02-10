import React, { useState, useEffect } from "react";

/**
 * CARI Saint-Laurent - Sélecteur de langue (première visite)
 * Modal avec nuage de langues animé - sans drapeaux pour respecter la sensibilité culturelle
 *
 * GUIDE DE STYLE CARI:
 * - Bleu Foncé: #263B5A
 * - Turquoise: #6EC1C1
 * - Brume: #CCD8DF
 * - Jaune doré: #F7BF3F
 * - Vermillon: #F15C39
 * - Typographie: DM Serif (titres), DM Sans (corps)
 */

// Palette CARI officielle
const COLORS = {
  bleuFonce: "#263B5A",
  turquoise: "#6EC1C1",
  brume: "#CCD8DF",
  jauneCore: "#F7BF3F",
  vermillon: "#F15C39",
  noir: "#000000",
  blanc: "#FFFFFF",
};

const languages = [
  { code: "fr", name: "Français", native: "Français" },
  { code: "en", name: "English", native: "English" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "uk", name: "Ukrainian", native: "Українська" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "tl", name: "Tagalog", native: "Tagalog" },
  { code: "ht", name: "Haitian Creole", native: "Kreyòl" },
];

// Positions pour le nuage de langues - disposées de façon organique
const cloudPositions = [
  { x: 50, y: 12, scale: 1.4, delay: 0 }, // Français - centre haut, plus gros
  { x: 18, y: 28, scale: 1.0, delay: 0.1 }, // English - gauche
  { x: 82, y: 26, scale: 1.0, delay: 0.15 }, // Español - droite
  { x: 35, y: 42, scale: 1.15, delay: 0.2 }, // العربية - centre gauche
  { x: 68, y: 44, scale: 1.15, delay: 0.25 }, // 中文 - centre droite
  { x: 10, y: 55, scale: 0.9, delay: 0.3 }, // Português - extrême gauche
  { x: 90, y: 56, scale: 0.9, delay: 0.35 }, // हिन्दी - extrême droite
  { x: 26, y: 68, scale: 0.95, delay: 0.4 }, // اردو
  { x: 74, y: 70, scale: 0.95, delay: 0.45 }, // Русский
  { x: 50, y: 78, scale: 1.05, delay: 0.5 }, // Tiếng Việt - centre bas
  { x: 14, y: 85, scale: 0.85, delay: 0.55 }, // Tagalog
  { x: 86, y: 86, scale: 0.85, delay: 0.6 }, // Kreyòl
];

const LanguageSelector = ({ onSelectLanguage, onClose }) => {
  const [selectedLang, setSelectedLang] = useState(null);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (lang) => {
    setSelectedLang(lang.code);
    setIsExiting(true);

    localStorage.setItem("cari-language", lang.code);
    localStorage.setItem("cari-language-selected", "true");

    setTimeout(() => {
      onSelectLanguage(lang.code);
    }, 500);
  };

  const handleSkip = () => {
    setIsExiting(true);
    localStorage.setItem("cari-language-selected", "true");
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(38, 49, 100, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "var(--status-bar-height, 0px)",
      paddingBottom: isMobile ? "95px" : "120px",
      zIndex: 9999,
      opacity: isVisible && !isExiting ? 1 : 0,
      transition: "opacity 0.4s ease",
      fontFamily: '"DM Sans", sans-serif',
      overflowY: "auto",
    },
    container: {
      width: "100%",
      maxWidth: "850px",
      padding: isMobile ? "1.5rem 1rem" : "2rem",
      textAlign: "center",
      transform: isVisible && !isExiting ? "scale(1)" : "scale(0.95)",
      transition: "transform 0.4s ease",
    },
    title: {
      fontFamily: '"DM Serif Text", serif',
      color: COLORS.blanc,
      fontSize: isMobile ? "1.4rem" : "clamp(1.75rem, 4vw, 2.75rem)",
      fontWeight: "400",
      marginBottom: isMobile ? "1.2rem" : "0.5rem",
      letterSpacing: "0.5px",
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    subtitle: {
      color: COLORS.blanc,
      fontSize: isMobile ? "0.85rem" : "clamp(1rem, 2.5vw, 1.25rem)",
      marginBottom: isMobile ? "3.5rem" : "3rem",
      fontWeight: "400",
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    cloudContainer: isMobile
      ? {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px 12px",
          width: "100%",
          padding: "0 0.75rem",
          marginBottom: "3rem",
        }
      : {
          position: "relative",
          height: "clamp(320px, 55vh, 480px)",
          width: "100%",
          marginBottom: "2rem",
        },
    languageButton: (pos, index, isSelected, isHovered) => ({
      ...(isMobile
        ? {
            padding: "0.55rem 1.1rem",
            fontSize: "0.9rem",
          }
        : {
            position: "absolute",
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `translate(-50%, -50%) scale(${
              isSelected ? 1.2 : isHovered ? pos.scale * 1.12 : pos.scale
            })`,
            padding: "clamp(0.6rem, 2vw, 1rem) clamp(1.25rem, 3.5vw, 1.75rem)",
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            animation: isVisible
              ? `floatIn 0.6s ease ${pos.delay}s both`
              : "none",
          }),
      backgroundColor: isSelected
        ? COLORS.vermillon
        : isHovered
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.1)",
      border: `2px solid ${
        isSelected
          ? COLORS.vermillon
          : isHovered
            ? COLORS.blanc
            : "rgba(255, 255, 255, 0.75)"
      }`,
      borderRadius: "50px",
      color: COLORS.blanc,
      fontWeight: isSelected || isHovered ? "600" : "400",
      fontFamily: '"DM Sans", sans-serif',
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      opacity: isVisible ? 1 : 0,
      whiteSpace: "nowrap",
      boxShadow: isSelected
        ? `0 10px 40px ${COLORS.vermillon}60`
        : isHovered
          ? "0 8px 30px rgba(255, 255, 255, 0.2)"
          : "none",
    }),
    skipButton: {
      backgroundColor: "transparent",
      border: `2px solid rgba(255, 255, 255, 0.8)`,
      color: COLORS.blanc,
      padding: isMobile ? "0.65rem 1.25rem" : "0.875rem 1.75rem",
      borderRadius: "50px",
      fontSize: isMobile ? "0.85rem" : "1rem",
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    footer: {
      marginTop: "1.25rem",
      color: COLORS.blanc,
      fontSize: "0.9rem",
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    // Decorative elements - fil d'Ariane style
    decorativeCircle: {
      position: "absolute",
      borderRadius: "50%",
      border: `2px solid ${COLORS.jauneCore}90`,
      pointerEvents: "none",
    },
  };

  return (
    <div style={styles.overlay}>
      {/* Decorative circles - évoquant le logo CARI */}
      <div
        style={{
          ...styles.decorativeCircle,
          width: "400px",
          height: "400px",
          top: "-100px",
          left: "-100px",
          opacity: 0.75,
        }}
      ></div>
      <div
        style={{
          ...styles.decorativeCircle,
          width: "300px",
          height: "300px",
          bottom: "-50px",
          right: "-50px",
          borderColor: `${COLORS.vermillon}80`,
        }}
      ></div>
      <div
        style={{
          ...styles.decorativeCircle,
          width: "200px",
          height: "200px",
          top: "20%",
          right: "5%",
          borderColor: `${COLORS.turquoise}75`,
        }}
      ></div>

      <div style={styles.container}>
        {/* CARI Logo */}
        <img
          src="/images/logo-color-reverse.png"
          alt="CARI St-Laurent"
          style={{
            maxWidth: isMobile ? "280px" : "468px",
            marginTop: isMobile ? "10px" : "60px",
            marginBottom: isMobile ? "1.5rem" : "1.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            filter: "none",
          }}
        />

        {/* Welcome message */}
        <div>
          <h1 style={styles.title}>Bienvenue au CARI Saint-Laurent</h1>
          <p style={styles.subtitle}>
            Choisissez votre langue • Choose your language • Elija su idioma
          </p>
        </div>

        {/* Language cloud */}
        <div style={styles.cloudContainer}>
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              style={styles.languageButton(
                cloudPositions[index],
                index,
                selectedLang === lang.code,
                hoveredLang === lang.code,
              )}
              onClick={() => handleSelect(lang)}
              onMouseEnter={() => setHoveredLang(lang.code)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              {lang.native}
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          style={{
            ...styles.skipButton,
            transform: isMobile ? "none" : "translateY(-70px)",
          }}
          onClick={handleSkip}
          onMouseOver={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.7)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Continuer en français
        </button>

        <p
          style={{
            ...styles.footer,
            transform: isMobile ? "none" : "translateY(-70px)",
          }}
        >
          Vous pourrez changer la langue à tout moment
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          60% {
            transform: translate(-50%, -50%) scale(1.08);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(var(--scale, 1));
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Hook pour vérifier si le sélecteur de langue doit être affiché
 */
export const useLanguageSelector = () => {
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // ?reset-lang in URL forces the language selector to show
    const url = new URL(window.location.href);
    const forceReset = url.searchParams.has("reset-lang");
    if (forceReset) {
      localStorage.removeItem("cari-language-selected");
      localStorage.removeItem("cari-language");
      url.searchParams.delete("reset-lang");
      window.history.replaceState({}, "", url.pathname);
    }

    const hasSelected = localStorage.getItem("cari-language-selected");
    if (!hasSelected || forceReset) {
      setTimeout(() => setShowSelector(true), 500);
    }
  }, []);

  const hideSelector = () => setShowSelector(false);

  return { showSelector, hideSelector };
};

/**
 * Composant wrapper pour intégration facile
 */
export const LanguageSelectorWrapper = ({ children, onLanguageChange }) => {
  const { showSelector, hideSelector } = useLanguageSelector();

  const handleSelectLanguage = (langCode) => {
    hideSelector();
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  return (
    <>
      {children}
      {showSelector && (
        <LanguageSelector
          onSelectLanguage={handleSelectLanguage}
          onClose={hideSelector}
        />
      )}
    </>
  );
};

export default LanguageSelector;
