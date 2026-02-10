/**
 * CARI Saint-Laurent - Guide de Style / Design Tokens
 *
 * Source: Brand Book "Nouvelle identité" - Novembre 2025
 * Créé par: Agent Illustrateur
 *
 * Usage: import { COLORS, FONTS, SHADOWS } from './cari-theme';
 */

// ============================================
// PALETTE DE COULEURS OFFICIELLES
// ============================================

export const COLORS = {
  // Couleurs principales (valeurs réelles du site CARI)
  noir: "#000000",
  bleuFonce: "#263164", // Ancrage, confiance, professionnalisme
  turquoise: "#6cbac7", // Fraîcheur, ouverture, accessibilité
  brume: "#cce8e5", // Sérénité, espoir, renouveau
  jauneCore: "#ffbf3f", // Chaleur, énergie, dignité (Jaune doré)
  vermillon: "#ff5c39", // En action, dynamisme, passion
  blanc: "#FFFFFF",

  // Variantes avec opacité (pour overlays, backgrounds, etc.)
  bleuFonce90: "#263164E6", // 90% opacity
  bleuFonce70: "#263164B3", // 70% opacity
  bleuFonce50: "#26316480", // 50% opacity

  turquoise90: "#6cbac7E6",
  turquoise70: "#6cbac7B3",
  turquoise50: "#6cbac780",
  turquoise20: "#6cbac733",

  vermillon90: "#ff5c39E6",
  vermillon50: "#ff5c3980",

  jauneCore50: "#ffbf3f80",

  brume50: "#cce8e580",
  brume30: "#cce8e54D",
};

// ============================================
// TYPOGRAPHIE
// ============================================

export const FONTS = {
  // Police pour les titres - élégante et bienveillante
  serif: '"DM Serif Text", Georgia, serif',

  // Police pour le corps - contemporaine et géométrique
  sans: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  // Weights disponibles pour DM Sans
  weights: {
    thin: 400,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    black: 900,
  },

  // Tailles recommandées
  sizes: {
    // Titres (DM Serif)
    h1: "clamp(2rem, 5vw, 3rem)",
    h2: "clamp(1.5rem, 4vw, 2.25rem)",
    h3: "clamp(1.25rem, 3vw, 1.75rem)",
    h4: "1.25rem",

    // Corps de texte (DM Sans)
    bodyLarge: "1.125rem",
    body: "1rem",
    bodySmall: "0.875rem",
    caption: "0.75rem",

    // Boutons et labels
    button: "1rem",
    label: "0.875rem",
    tag: "0.75rem",
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// ============================================
// OMBRES
// ============================================

export const SHADOWS = {
  small: "0 2px 8px rgba(38, 59, 90, 0.08)",
  medium: "0 4px 16px rgba(38, 59, 90, 0.12)",
  large: "0 8px 32px rgba(38, 59, 90, 0.16)",
  xl: "0 16px 48px rgba(38, 59, 90, 0.20)",

  // Ombres colorées pour boutons CTA
  vermillon: `0 4px 20px ${COLORS.vermillon}50`,
  vermillonHover: `0 8px 30px ${COLORS.vermillon}60`,
  turquoise: `0 4px 20px ${COLORS.turquoise}40`,
};

// ============================================
// ESPACEMENTS
// ============================================

export const SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
  xxxl: "4rem", // 64px
};

// ============================================
// BORDER RADIUS
// ============================================

export const RADIUS = {
  small: "8px",
  medium: "12px",
  large: "16px",
  xl: "24px",
  pill: "50px",
  circle: "50%",
};

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
};

// ============================================
// NOTE: PAS DE GRADIENTS
// ============================================
// Le design CARI utilise uniquement des couleurs franches.
// Ne pas utiliser de linear-gradient ou autres dégradés.
// Utiliser les couleurs solides définies dans COLORS.

// ============================================
// ANIMATIONS
// ============================================

export const TRANSITIONS = {
  fast: "0.15s ease",
  normal: "0.3s ease",
  slow: "0.5s ease",
  bounce: "0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ============================================
// STYLES DE BOUTONS PRÉ-CONFIGURÉS
// ============================================

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.vermillon,
    color: COLORS.blanc,
    border: "none",
    borderRadius: RADIUS.pill,
    padding: "1rem 2rem",
    fontSize: FONTS.sizes.button,
    fontWeight: FONTS.weights.semiBold,
    fontFamily: FONTS.sans,
    cursor: "pointer",
    transition: TRANSITIONS.normal,
    boxShadow: SHADOWS.vermillon,
  },

  secondary: {
    backgroundColor: "transparent",
    color: COLORS.bleuFonce,
    border: `2px solid ${COLORS.brume}`,
    borderRadius: RADIUS.pill,
    padding: "1rem 2rem",
    fontSize: FONTS.sizes.button,
    fontWeight: FONTS.weights.semiBold,
    fontFamily: FONTS.sans,
    cursor: "pointer",
    transition: TRANSITIONS.normal,
  },

  ghost: {
    backgroundColor: "transparent",
    color: COLORS.blanc,
    border: `2px solid ${COLORS.blanc}`,
    borderRadius: RADIUS.pill,
    padding: "1rem 2rem",
    fontSize: FONTS.sizes.button,
    fontWeight: FONTS.weights.semiBold,
    fontFamily: FONTS.sans,
    cursor: "pointer",
    transition: TRANSITIONS.normal,
  },
};

// ============================================
// CSS POUR IMPORT DES FONTS
// ============================================

export const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');
`;

// ============================================
// EXPORT PAR DÉFAUT
// ============================================

const theme = {
  colors: COLORS,
  fonts: FONTS,
  shadows: SHADOWS,
  spacing: SPACING,
  radius: RADIUS,
  breakpoints: BREAKPOINTS,
  transitions: TRANSITIONS,
  buttonStyles: BUTTON_STYLES,
  fontImport: FONT_IMPORT,
};

export default theme;
