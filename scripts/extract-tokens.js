#!/usr/bin/env node
/**
 * Design Library Token Extraction Script
 *
 * Parses the portfolio CSS files to extract design tokens and component inventory.
 * Generates JSON data files for the design library documentation.
 *
 * Usage: node scripts/extract-tokens.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CSS_DIR = path.join(ROOT_DIR, 'css');
const DATA_DIR = path.join(ROOT_DIR, 'design-library', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Parse CSS variables from variables.css
 */
function parseVariables() {
  const content = fs.readFileSync(path.join(CSS_DIR, 'variables.css'), 'utf8');
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    layout: {},
    borders: {},
    shadows: {},
    transitions: {},
    zIndex: {}
  };

  // Match CSS variable declarations
  const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(content)) !== null) {
    const [, name, value] = match;
    const cleanValue = value.trim();

    // Categorize variables
    if (name.startsWith('color-') || name.startsWith('gradient-')) {
      tokens.colors[name] = cleanValue;
    } else if (name.startsWith('font-') || name.startsWith('text-') || name.startsWith('leading-') || name.startsWith('tracking-')) {
      tokens.typography[name] = cleanValue;
    } else if (name.startsWith('space-')) {
      tokens.spacing[name] = cleanValue;
    } else if (name.startsWith('container-')) {
      tokens.layout[name] = cleanValue;
    } else if (name.startsWith('radius-')) {
      tokens.borders[name] = cleanValue;
    } else if (name.startsWith('shadow-')) {
      tokens.shadows[name] = cleanValue;
    } else if (name.startsWith('transition-')) {
      tokens.transitions[name] = cleanValue;
    } else if (name.startsWith('z-')) {
      tokens.zIndex[name] = cleanValue;
    }
  }

  return tokens;
}

/**
 * Parse component classes from CSS files
 */
function parseComponents() {
  const components = {
    buttons: [],
    cards: [],
    tags: [],
    navigation: [],
    forms: [],
    layout: [],
    typography: [],
    media: [],
    feedback: [],
    other: []
  };

  const cssFiles = ['base.css', 'layout.css', 'components.css', 'pages.css'];

  cssFiles.forEach(file => {
    const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf8');
    const sourceFile = `css/${file}`;

    // Match class selectors (simplified pattern)
    const classRegex = /\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{/g;
    const foundClasses = new Set();
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      foundClasses.add(match[1]);
    }

    // Categorize components
    foundClasses.forEach(className => {
      const component = {
        name: className,
        source: sourceFile,
        variants: [],
        states: []
      };

      // Categorize based on naming patterns
      if (className.startsWith('btn')) {
        component.category = 'buttons';
        components.buttons.push(component);
      } else if (className.startsWith('card') || className.startsWith('project-card')) {
        component.category = 'cards';
        components.cards.push(component);
      } else if (className.startsWith('tag') || className.startsWith('badge')) {
        component.category = 'tags';
        components.tags.push(component);
      } else if (className.startsWith('nav') || className.startsWith('footer')) {
        component.category = 'navigation';
        components.navigation.push(component);
      } else if (className.startsWith('input') || className.startsWith('form') || className.startsWith('select') || className.startsWith('textarea')) {
        component.category = 'forms';
        components.forms.push(component);
      } else if (className.startsWith('container') || className.startsWith('section') || className.startsWith('grid') || className.startsWith('flex') || className.startsWith('two-col')) {
        component.category = 'layout';
        components.layout.push(component);
      } else if (className.startsWith('text-') || className.startsWith('link')) {
        component.category = 'typography';
        components.typography.push(component);
      } else if (className.startsWith('image') || className.startsWith('avatar') || className.startsWith('lightbox')) {
        component.category = 'media';
        components.media.push(component);
      } else if (className.startsWith('testimonial') || className.startsWith('stat') || className.startsWith('metric') || className.startsWith('process') || className.startsWith('skill')) {
        component.category = 'feedback';
        components.feedback.push(component);
      } else {
        component.category = 'other';
        components.other.push(component);
      }
    });
  });

  // Deduplicate each category
  Object.keys(components).forEach(category => {
    const seen = new Set();
    components[category] = components[category].filter(comp => {
      if (seen.has(comp.name)) return false;
      seen.add(comp.name);
      return true;
    });
  });

  return components;
}

/**
 * Extract animation keyframes and transition patterns
 */
function parseAnimations() {
  const animations = {
    keyframes: [],
    transitions: [],
    scrollEffects: []
  };

  const content = fs.readFileSync(path.join(CSS_DIR, 'pages.css'), 'utf8');

  // Match keyframe definitions
  const keyframeRegex = /@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
  let match;

  while ((match = keyframeRegex.exec(content)) !== null) {
    animations.keyframes.push({
      name: match[1],
      source: 'css/pages.css'
    });
  }

  // Document transition classes
  animations.transitions = [
    { name: 'fade-in', description: 'Fade in on scroll with Y translation', source: 'css/pages.css' },
    { name: 'scale-in', description: 'Scale in from 0.95 to 1', source: 'css/pages.css' },
    { name: 'stagger-children', description: 'Staggered animation for child elements', source: 'css/pages.css' }
  ];

  // Document scroll effects
  animations.scrollEffects = [
    { name: 'Intersection Observer', description: 'Triggers .visible class when elements enter viewport', source: 'js/main.js' },
    { name: 'Parallax', description: 'Elements with data-parallax attribute move at different speeds', source: 'js/animations.js' }
  ];

  return animations;
}

/**
 * Generate structured color data with computed values
 */
function generateColorData(colors) {
  const colorGroups = {
    primary: {
      name: 'Primary - Electric Violet',
      description: 'Main brand color used for CTAs, links, and primary actions',
      colors: []
    },
    secondary: {
      name: 'Secondary - Coral Pink',
      description: 'Complementary accent for variety and visual interest',
      colors: []
    },
    accent: {
      name: 'Accent - Teal',
      description: 'Used for highlights, success states, and tertiary actions',
      colors: []
    },
    neutral: {
      name: 'Neutrals',
      description: 'Core neutral colors for backgrounds and borders',
      colors: []
    },
    text: {
      name: 'Text Colors',
      description: 'Typography color scale for various text levels',
      colors: []
    },
    background: {
      name: 'Backgrounds',
      description: 'Surface colors for cards, sections, and page backgrounds',
      colors: []
    },
    border: {
      name: 'Borders',
      description: 'Border and divider colors',
      colors: []
    },
    gradient: {
      name: 'Gradients',
      description: 'Linear and radial gradients for visual depth',
      colors: []
    }
  };

  Object.entries(colors).forEach(([token, value]) => {
    const entry = { token: `--${token}`, value };

    if (token.startsWith('color-primary')) {
      colorGroups.primary.colors.push(entry);
    } else if (token.startsWith('color-secondary')) {
      colorGroups.secondary.colors.push(entry);
    } else if (token.startsWith('color-accent') || token === 'color-success') {
      colorGroups.accent.colors.push(entry);
    } else if (token.startsWith('color-dark') || token.startsWith('color-light') || token === 'color-white') {
      colorGroups.neutral.colors.push(entry);
    } else if (token.startsWith('color-text')) {
      colorGroups.text.colors.push(entry);
    } else if (token.startsWith('color-bg')) {
      colorGroups.background.colors.push(entry);
    } else if (token.startsWith('color-border')) {
      colorGroups.border.colors.push(entry);
    } else if (token.startsWith('gradient')) {
      colorGroups.gradient.colors.push(entry);
    }
  });

  return colorGroups;
}

/**
 * Generate typography scale data
 */
function generateTypographyData(typography) {
  return {
    fontFamilies: [
      {
        token: '--font-heading',
        value: typography['font-heading'],
        name: 'Plus Jakarta Sans',
        usage: 'Headings, buttons, navigation',
        weights: ['500 (Medium)', '600 (Semibold)', '700 (Bold)']
      },
      {
        token: '--font-body',
        value: typography['font-body'],
        name: 'Inter',
        usage: 'Body text, descriptions, UI elements',
        weights: ['400 (Regular)', '500 (Medium)', '600 (Semibold)']
      }
    ],
    fontSizes: Object.entries(typography)
      .filter(([key]) => key.startsWith('text-') && !key.includes('color'))
      .map(([key, value]) => ({
        token: `--${key}`,
        value,
        pixels: parseFloat(value) * 16 + 'px'
      })),
    fontWeights: Object.entries(typography)
      .filter(([key]) => key.startsWith('font-') && !key.includes('family'))
      .map(([key, value]) => ({
        token: `--${key}`,
        value
      })),
    lineHeights: Object.entries(typography)
      .filter(([key]) => key.startsWith('leading-'))
      .map(([key, value]) => ({
        token: `--${key}`,
        value
      })),
    letterSpacing: Object.entries(typography)
      .filter(([key]) => key.startsWith('tracking-'))
      .map(([key, value]) => ({
        token: `--${key}`,
        value
      }))
  };
}

/**
 * Generate spacing scale data
 */
function generateSpacingData(spacing) {
  return Object.entries(spacing)
    .sort((a, b) => {
      const numA = parseInt(a[0].replace('space-', ''));
      const numB = parseInt(b[0].replace('space-', ''));
      return numA - numB;
    })
    .map(([key, value]) => ({
      token: `--${key}`,
      value,
      pixels: parseFloat(value) * 16 + 'px'
    }));
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Extracting design tokens...\n');

  // Parse raw tokens
  const rawTokens = parseVariables();
  const components = parseComponents();
  const animations = parseAnimations();

  // Generate structured data
  const tokens = {
    colors: generateColorData(rawTokens.colors),
    typography: generateTypographyData(rawTokens.typography),
    spacing: generateSpacingData(rawTokens.spacing),
    layout: rawTokens.layout,
    borders: rawTokens.borders,
    shadows: rawTokens.shadows,
    transitions: rawTokens.transitions,
    zIndex: rawTokens.zIndex
  };

  // Generate metadata
  const meta = {
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    sourceFiles: [
      'css/variables.css',
      'css/base.css',
      'css/layout.css',
      'css/components.css',
      'css/pages.css'
    ],
    stats: {
      totalColors: Object.values(tokens.colors).reduce((acc, group) => acc + group.colors.length, 0),
      totalTypography: tokens.typography.fontSizes.length + tokens.typography.fontWeights.length,
      totalSpacing: tokens.spacing.length,
      totalComponents: Object.values(components).reduce((acc, arr) => acc + arr.length, 0),
      totalAnimations: animations.keyframes.length + animations.transitions.length
    }
  };

  // Write JSON files
  fs.writeFileSync(
    path.join(DATA_DIR, 'tokens.json'),
    JSON.stringify(tokens, null, 2)
  );
  console.log('✅ Generated tokens.json');

  fs.writeFileSync(
    path.join(DATA_DIR, 'components.json'),
    JSON.stringify(components, null, 2)
  );
  console.log('✅ Generated components.json');

  fs.writeFileSync(
    path.join(DATA_DIR, 'animations.json'),
    JSON.stringify(animations, null, 2)
  );
  console.log('✅ Generated animations.json');

  fs.writeFileSync(
    path.join(DATA_DIR, 'meta.json'),
    JSON.stringify(meta, null, 2)
  );
  console.log('✅ Generated meta.json');

  console.log('\n📊 Summary:');
  console.log(`   Colors: ${meta.stats.totalColors}`);
  console.log(`   Typography tokens: ${meta.stats.totalTypography}`);
  console.log(`   Spacing values: ${meta.stats.totalSpacing}`);
  console.log(`   Component classes: ${meta.stats.totalComponents}`);
  console.log(`   Animations: ${meta.stats.totalAnimations}`);
  console.log(`\n✨ Design library data updated at ${meta.generatedAt}`);
}

main();
