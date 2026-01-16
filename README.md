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
├── case-study-3.html       # E-Commerce Platform
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

## Credits

- Fonts: Google Fonts (Plus Jakarta Sans, Inter)
- Icons: Feather Icons (inline SVG)
- Design: Custom for Alex Hicks

---

Questions? Contact alex@alexhicks.design
