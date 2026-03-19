# Alex Hicks Design Portfolio

A modern, vibrant portfolio website for a Senior Product Designer specializing in EdTech.

## Quick Start

1. Open `index.html` in your browser to view the portfolio
2. All pages are fully responsive and work on desktop, tablet, and mobile

## File Structure

```
design-portfolio/
├── index.html              # Home page with about, work, skills, testimonials
├── case-studies.html       # All projects overview
├── case-study-1.html       # Question Experience (Top Hat)
├── case-study-2.html       # Mobile Search Adaptation
├── resume.html             # Resume/experience page
├── css/
│   ├── variables.css       # Design tokens (colors, typography, spacing)
│   ├── base.css            # Reset and typography
│   ├── layout.css          # Grid, containers, layout utilities
│   ├── components.css      # Buttons, cards, tags, etc.
│   └── pages.css           # Page-specific styles
├── js/
│   ├── main.js             # Navigation, scroll effects
│   └── animations.js       # Scroll animations, interactions
├── assets/
│   └── images/             # Image placeholders
└── README.md               # This file
```

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Electric Violet) | `#7C3AED` | CTAs, links, accents |
| Primary Light | `#A78BFA` | Hover states, highlights |
| Secondary (Coral Pink) | `#F472B6` | Secondary accents |
| Accent (Teal) | `#14B8A6` | Success states, contrast |
| Dark (Navy) | `#1E1B4B` | Headings, footer |
| Light | `#FAFAF9` | Background |
| Text Primary | `#334155` | Body text |
| Text Secondary | `#64748B` | Muted text |

### Typography

- **Headings:** Plus Jakarta Sans (700, 600)
- **Body:** Inter (400, 500)

### Spacing

Based on 8px system: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

## Webflow Migration Guide

This portfolio is designed for easy migration to Webflow. Here's how to translate each element:

### 1. Setup in Webflow

1. Create a new project
2. Go to Project Settings > Fonts and add:
   - Plus Jakarta Sans (500, 600, 700)
   - Inter (400, 500)

3. In Webflow Designer, create global styles using the color variables:
   - Create swatches for each color in the palette
   - Set up typography classes for H1-H6 and body text

### 2. Components to Create

**Navigation (Navbar)**
- Use Webflow's Navbar component
- Set position: fixed, background: rgba with blur
- Add scroll interaction to change background on scroll

**Hero Section**
- Use Section > Container structure
- Add background gradient using Webflow's gradient tool
- For animated text: use Webflow Interactions (Text Reveal or custom)

**Cards**
- Create a card symbol with:
  - Wrapper (flex column)
  - Image wrapper (16:10 aspect ratio)
  - Content area with padding
- Add hover interaction for lift effect

**Case Study Layout**
- Create template page
- Use Rich Text for content sections
- Max-width containers for readable text (800px)

### 3. Interactions to Add

| Element | Interaction |
|---------|-------------|
| Page load | Stagger fade-in for hero content |
| Scroll | Fade-in elements when entering viewport |
| Cards | Lift + shadow on hover |
| Buttons | Color shift + lift on hover |
| Nav | Background change on scroll |

### 4. Responsive Breakpoints

Configure breakpoints to match CSS:
- Desktop: 1200px+
- Laptop: 992px
- Tablet: 768px
- Mobile: 480px

### 5. CMS Setup (Optional)

For case studies, consider using Webflow CMS:
- Create "Case Studies" collection
- Fields: Title, Slug, Tags, Hero Image, Sections (Rich Text)
- Template page pulls from CMS

## Customization

### Adding Your Photos

Replace placeholder images in:
- `index.html` - Profile photo
- Each case study - Project screenshots
- Use 16:9 or 4:3 aspect ratios for consistency

### Updating Content

1. **Personal Info:** Update name, bio, and contact info in each HTML file
2. **Case Studies:** Replace placeholder content with your real projects
3. **Resume:** Update work history, skills, and education
4. **Links:** Update email and LinkedIn URLs

### Adding New Case Studies

1. Duplicate `case-study-1.html`
2. Update content and images
3. Add link to `case-studies.html`
4. Update navigation links in existing case studies

## Browser Support

Tested and working in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Library (Internal)

This repository includes an internal design library that documents the visual language and component patterns used across the portfolio. Changes to design tokens automatically sync to the website CSS.

### Accessing the Design Library

```bash
# Using npx serve
npx serve

# Then navigate to: http://localhost:3000/design-library/
```

**Or simply open `design-library/index.html` in your browser.**

### What's Documented

| Category | Page | Contents |
|----------|------|----------|
| Overview | `index.html` | Component inventory, design principles, tech stack |
| Colors | `colors.html` | Full color palette with tokens and gradients |
| Typography | `typography.html` | Font families, type scale, text styles |
| Spacing | `spacing.html` | 8px-based spacing system, utilities |
| Foundations | `foundations.html` | Shadows, border radii, z-index, transitions |
| Buttons | `buttons.html` | Button variants, sizes, states |
| Cards | `cards.html` | Card types, project cards, tags |
| Navigation | `navigation.html` | Header, footer, mobile nav |
| Forms | `forms.html` | Filter tags, recommended input styles |
| Content Patterns | `content-patterns.html` | Heroes, stats, testimonials, process steps |
| Interactions | `interactions.html` | Animations, hover effects, focus states |
| Changelog | `changelog.html` | Version history, update process |

### Token Sync Workflow

Design tokens flow from `design-tokens.json` to `css/variables.css`:

1. **Source of Truth:** `design-tokens.json` contains all design tokens
2. **CSS Generation:** `scripts/generate-css.js` generates `css/variables.css` from tokens
3. **Website Uses CSS:** All pages reference the CSS variables

**To update tokens:**
```bash
# 1. Edit design-tokens.json in your editor
# 2. Regenerate CSS
node scripts/generate-css.js
```

### How Updates Work

The design library includes automated sync via GitHub Actions:

| Trigger | Action |
|---------|--------|
| Change `design-tokens.json` | Regenerates CSS, updates documentation |
| Change `css/**` files | Extracts tokens, updates documentation |
| Change generation scripts | Re-runs both generation and extraction |

**Manual commands:**
```bash
# Generate CSS from tokens
node scripts/generate-css.js

# Extract tokens for documentation
node scripts/extract-tokens.js
```

### Structure

```
design-portfolio/
├── design-tokens.json        # Source of truth for all tokens
├── scripts/
│   ├── generate-css.js       # Generates CSS from design-tokens.json
│   └── extract-tokens.js     # Extracts tokens for documentation
└── design-library/
    ├── index.html            # Overview and component inventory
    ├── colors.html           # Color documentation
    ├── typography.html       # Typography documentation
    ├── spacing.html          # Spacing documentation
    ├── foundations.html      # Elevation, borders, transitions
    ├── buttons.html          # Button component
    ├── cards.html            # Card component
    ├── navigation.html       # Navigation patterns
    ├── forms.html            # Form elements
    ├── content-patterns.html # Content layout patterns
    ├── interactions.html     # Animation and motion
    ├── changelog.html        # Version history
    ├── css/
    │   └── design-library.css
    ├── js/
    │   └── design-library.js
    └── data/
        ├── tokens.json       # Extracted design tokens
        ├── components.json   # Component inventory
        ├── animations.json   # Animation patterns
        └── meta.json         # Generation metadata
```

### Auto-generated vs. Manual

| Auto-generated | Manual |
|----------------|--------|
| Token values from CSS | Usage guidelines |
| Component class lists | Anatomy descriptions |
| Generation timestamps | Code examples |
| Statistics | Best practices |

### Not Publicly Linked

The design library is for development use only:
- Not linked from main navigation or footer
- `<meta name="robots" content="noindex, nofollow">` on all pages
- Can be exposed publicly by adding links if desired

## Credits

- Fonts: Google Fonts (Plus Jakarta Sans, Inter)
- Icons: Feather Icons (inline SVG)
- Design: Custom for Alex Hicks

---

Questions? Contact alex@alexhicks.design
