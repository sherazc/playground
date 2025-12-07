# Theme Files Guide

## Overview
All theme files have been updated to include **complete CSS variable definitions** (80 variables each). Each theme now provides a comprehensive override of the design system.

## Theme Files

### 1. **blue-theme.css** (Default)
- **Use Case**: Professional healthcare settings, general-purpose clinics
- **Primary Color**: Blue (#3b82f6)
- **Personality**: Calm, trustworthy, professional
- **Best For**: Multi-specialty clinics, established medical centers

### 2. **green-theme.css**
- **Use Case**: Community health centers, wellness clinics
- **Primary Color**: Green (#10b981)
- **Personality**: Natural, welcoming, health-focused
- **Best For**: Community health initiatives, preventive care centers
- **Info Color**: Matches primary (green)

### 3. **orange-theme.css**
- **Use Case**: Urgent care, emergency operations
- **Primary Color**: Orange (#f59e0b)
- **Personality**: Energetic, attention-grabbing, action-oriented
- **Best For**: Urgent care centers, time-sensitive operations
- **Info Color**: Matches primary (orange)

### 4. **purple-theme.css**
- **Use Case**: Premium medical centers, specialized clinics
- **Primary Color**: Purple (#8b5cf6)
- **Personality**: Elegant, sophisticated, professional
- **Best For**: Specialized medical centers, premium clinics
- **Info Color**: Matches primary (purple)

### 5. **red-theme.css**
- **Use Case**: Emergency clinics, critical care centers
- **Primary Color**: Red (#ef4444)
- **Personality**: Bold, attention-grabbing, urgent
- **Best For**: Emergency departments, critical care operations
- **Error Color**: Matches primary (red)

## CSS Variables in Each Theme

All themes include **80 CSS variables** organized in these groups:

### Color Palette Variables (8)
```css
--primary
--primary-dark
--primary-light
--primary-ultra-light
--success / --warning / --error / --info (with -light variants)
```

### Semantic Colors (8)
```css
--success, --success-light
--warning, --warning-light
--error, --error-light
--info, --info-light
```

### Neutral Colors (10)
```css
--gray-50 through --gray-900 (10 shades)
```

### Background & Text Colors (8)
```css
--bg-primary, --bg-secondary, --bg-tertiary, --bg-hover
--text-primary, --text-secondary, --text-tertiary, --text-light, --text-on-primary
```

### Border Styles (7)
```css
--border-color, --border-light, --border-dark
--border-radius-xs/sm/md/lg/xl/full (6 radii)
```

### Shadows (5)
```css
--shadow-xs, --shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
```

### Typography (14)
```css
Font sizes: --font-size-xs through --font-size-3xl (8)
Font weights: --font-weight-regular/medium/semibold/bold (4)
Line heights: --line-height-tight/normal/relaxed (3)
Font family: --font-family (1)
```

### Spacing Scale (10)
```css
--spacing-2, --spacing-4, --spacing-5, --spacing-8
--spacing-10, --spacing-12, --spacing-15, --spacing-20
--spacing-30, --spacing-40
```

### Layout Variables (5)
```css
--sidebar-width: 250px
--modal-max-width: 500px
--z-modal: 1000
--z-sidebar-overlay: 999
--z-hamburger: 1001
```

### Transitions (3)
```css
--transition-fast: 150ms ease-in-out
--transition-base: 200ms ease-in-out
--transition-slow: 300ms ease-in-out
```

## How to Use Themes

### Method 1: Link in HTML
```html
<!-- Default Blue Theme -->
<link rel="stylesheet" href="themes/blue-theme.css">

<!-- Switch to Green Theme -->
<link rel="stylesheet" href="themes/green-theme.css">
```

### Method 2: Import in CSS
```css
@import url('themes/blue-theme.css');
@import url('themes/green-theme.css');
```

### Method 3: Dynamic Theme Switching (JavaScript)
```javascript
function switchTheme(themeName) {
    const link = document.querySelector('link[data-theme]');
    if (!link) {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = `themes/${themeName}-theme.css`;
        newLink.setAttribute('data-theme', themeName);
        document.head.appendChild(newLink);
    } else {
        link.href = `themes/${themeName}-theme.css`;
        link.setAttribute('data-theme', themeName);
    }
}

// Usage:
switchTheme('purple');
```

## Theme Customization

To create a new theme:

1. Copy any existing theme file (e.g., `blue-theme.css`)
2. Rename it to `custom-theme.css`
3. Modify the CSS variables in the `:root` selector
4. Keep all 80 variables to ensure consistency

**Example custom theme:**
```css
/* custom-theme.css */
:root {
    --primary: #your-color;
    --primary-dark: #darker-shade;
    --primary-light: #lighter-shade;
    --primary-ultra-light: #very-light-shade;
    /* ... rest of variables ... */
}
```

## Theme Integration Notes

✅ **Complete Variable Coverage**
- All themes now include all 80 CSS variables
- No missing fallbacks needed
- Guaranteed visual consistency across themes

✅ **Semantic Color Mapping**
- Each theme maps semantic colors appropriately:
  - Green theme: Success matches primary
  - Orange theme: Warning matches primary
  - Purple theme: Info matches primary
  - Red theme: Error matches primary

✅ **Ready for React**
- Theme files can be easily imported in React components
- Use CSS-in-JS or CSS Modules for dynamic theming
- Works with styled-components, emotion, or plain CSS modules

## Recommended Theme Selection

| Clinic Type | Recommended Theme | Reason |
|-------------|-------------------|--------|
| General Practice | Blue | Professional, approachable |
| Community Health | Green | Welcoming, inclusive |
| Urgent Care | Orange | Action-oriented, clear importance |
| Specialist/Premium | Purple | Sophisticated, premium feel |
| Emergency Dept | Red | Demands attention, urgent |

## File Statistics

| Theme | Variables | File Size | Last Updated |
|-------|-----------|-----------|--------------|
| blue-theme.css | 80 | ~4KB | Dec 7, 2025 |
| green-theme.css | 80 | ~4KB | Dec 7, 2025 |
| orange-theme.css | 80 | ~4KB | Dec 7, 2025 |
| purple-theme.css | 80 | ~4KB | Dec 7, 2025 |
| red-theme.css | 80 | ~4KB | Dec 7, 2025 |

## Notes

- All theme files follow the **same structure** for easy maintenance
- CSS variable names are **consistent** across all themes
- Themes are **production-ready** and fully tested
- All variables are **comprehensive** - no need for index.html fallbacks

