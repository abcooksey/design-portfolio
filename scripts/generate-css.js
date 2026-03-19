#!/usr/bin/env node
/**
 * CSS Generator Script
 *
 * Reads design-tokens.json and generates css/variables.css
 * This makes design-tokens.json the single source of truth.
 *
 * Usage: node scripts/generate-css.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const TOKENS_FILE = path.join(ROOT_DIR, 'design-tokens.json');
const OUTPUT_FILE = path.join(ROOT_DIR, 'css', 'variables.css');

function generateCSS() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));

  let css = `/* ==========================================================================
   Design System Variables
   Alex Hicks Portfolio

   AUTO-GENERATED from design-tokens.json
   Do not edit directly - modify design-tokens.json and run:
   node scripts/generate-css.js
   ========================================================================== */

:root {
  /* ===== Colors ===== */

  /* Primary - Electric Violet */
  --color-primary: ${tokens.colors.primary.base};
  --color-primary-light: ${tokens.colors.primary.light};
  --color-primary-dark: ${tokens.colors.primary.dark};
  --color-primary-subtle: ${tokens.colors.primary.subtle};

  /* Secondary - Coral Pink */
  --color-secondary: ${tokens.colors.secondary.base};
  --color-secondary-light: ${tokens.colors.secondary.light};
  --color-secondary-dark: ${tokens.colors.secondary.dark};

  /* Accent - Teal */
  --color-accent: ${tokens.colors.accent.base};
  --color-accent-light: ${tokens.colors.accent.light};
  --color-accent-dark: ${tokens.colors.accent.dark};

  /* Success - Mint */
  --color-success: ${tokens.colors.success};

  /* Neutrals */
  --color-dark: ${tokens.colors.neutral.dark};
  --color-light: ${tokens.colors.neutral.light};
  --color-white: ${tokens.colors.neutral.white};

  /* Text */
  --color-text-primary: ${tokens.colors.text.primary};
  --color-text-secondary: ${tokens.colors.text.secondary};
  --color-text-muted: ${tokens.colors.text.muted};
  --color-text-inverse: ${tokens.colors.text.inverse};

  /* Backgrounds */
  --color-bg-primary: ${tokens.colors.background.primary};
  --color-bg-secondary: ${tokens.colors.background.secondary};
  --color-bg-card: ${tokens.colors.background.card};
  --color-bg-dark: ${tokens.colors.background.dark};

  /* Borders */
  --color-border: ${tokens.colors.border.default};
  --color-border-light: ${tokens.colors.border.light};

  /* Gradients */
  --gradient-primary: linear-gradient(${tokens.gradients.primary.angle}, ${tokens.gradients.primary.stops.join(', ')});
  --gradient-hero: linear-gradient(${tokens.gradients.hero.angle}, ${tokens.gradients.hero.stops.join(', ')});
  --gradient-dark: linear-gradient(${tokens.gradients.dark.angle}, ${tokens.gradients.dark.stops.join(', ')});
  --gradient-card-hover: linear-gradient(${tokens.gradients.cardHover.angle}, ${tokens.gradients.cardHover.stops.join(', ')});

  /* ===== Typography ===== */

  /* Font Families */
  --font-heading: ${tokens.typography.fontFamilies.heading};
  --font-body: ${tokens.typography.fontFamilies.body};

  /* Font Sizes */
  --text-xs: ${tokens.typography.fontSizes.xs};
  --text-sm: ${tokens.typography.fontSizes.sm};
  --text-base: ${tokens.typography.fontSizes.base};
  --text-lg: ${tokens.typography.fontSizes.lg};
  --text-xl: ${tokens.typography.fontSizes.xl};
  --text-2xl: ${tokens.typography.fontSizes['2xl']};
  --text-3xl: ${tokens.typography.fontSizes['3xl']};
  --text-4xl: ${tokens.typography.fontSizes['4xl']};
  --text-5xl: ${tokens.typography.fontSizes['5xl']};
  --text-6xl: ${tokens.typography.fontSizes['6xl']};
  --text-7xl: ${tokens.typography.fontSizes['7xl']};

  /* Font Weights */
  --font-normal: ${tokens.typography.fontWeights.normal};
  --font-medium: ${tokens.typography.fontWeights.medium};
  --font-semibold: ${tokens.typography.fontWeights.semibold};
  --font-bold: ${tokens.typography.fontWeights.bold};

  /* Line Heights */
  --leading-tight: ${tokens.typography.lineHeights.tight};
  --leading-snug: ${tokens.typography.lineHeights.snug};
  --leading-normal: ${tokens.typography.lineHeights.normal};
  --leading-relaxed: ${tokens.typography.lineHeights.relaxed};

  /* Letter Spacing */
  --tracking-tight: ${tokens.typography.letterSpacing.tight};
  --tracking-normal: ${tokens.typography.letterSpacing.normal};
  --tracking-wide: ${tokens.typography.letterSpacing.wide};

  /* ===== Spacing ===== */
  --space-1: ${tokens.spacing['1']};
  --space-2: ${tokens.spacing['2']};
  --space-3: ${tokens.spacing['3']};
  --space-4: ${tokens.spacing['4']};
  --space-5: ${tokens.spacing['5']};
  --space-6: ${tokens.spacing['6']};
  --space-8: ${tokens.spacing['8']};
  --space-10: ${tokens.spacing['10']};
  --space-12: ${tokens.spacing['12']};
  --space-16: ${tokens.spacing['16']};
  --space-20: ${tokens.spacing['20']};
  --space-24: ${tokens.spacing['24']};
  --space-32: ${tokens.spacing['32']};

  /* ===== Layout ===== */
  --container-sm: ${tokens.layout.containers.sm};
  --container-md: ${tokens.layout.containers.md};
  --container-lg: ${tokens.layout.containers.lg};
  --container-xl: ${tokens.layout.containers.xl};
  --container-2xl: ${tokens.layout.containers['2xl']};

  /* ===== Borders ===== */
  --radius-sm: ${tokens.borders.radius.sm};
  --radius-md: ${tokens.borders.radius.md};
  --radius-lg: ${tokens.borders.radius.lg};
  --radius-xl: ${tokens.borders.radius.xl};
  --radius-2xl: ${tokens.borders.radius['2xl']};
  --radius-full: ${tokens.borders.radius.full};

  /* ===== Shadows ===== */
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};
  --shadow-xl: ${tokens.shadows.xl};
  --shadow-card: ${tokens.shadows.card};
  --shadow-card-hover: ${tokens.shadows.cardHover};

  /* ===== Transitions ===== */
  --transition-fast: ${tokens.transitions.fast};
  --transition-base: ${tokens.transitions.base};
  --transition-slow: ${tokens.transitions.slow};
  --transition-bounce: ${tokens.transitions.bounce};

  /* ===== Z-Index ===== */
  --z-dropdown: ${tokens.zIndex.dropdown};
  --z-sticky: ${tokens.zIndex.sticky};
  --z-fixed: ${tokens.zIndex.fixed};
  --z-modal-backdrop: ${tokens.zIndex.modalBackdrop};
  --z-modal: ${tokens.zIndex.modal};
  --z-tooltip: ${tokens.zIndex.tooltip};
}

/* Dark mode variables (optional future enhancement) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Can be enabled for dark mode support */
  }
}
`;

  fs.writeFileSync(OUTPUT_FILE, css);
  console.log('✅ Generated css/variables.css from design-tokens.json');
}

// Run if called directly
if (require.main === module) {
  generateCSS();
}

module.exports = { generateCSS };
