# FaithfulPlanner CSS Variables Guide

## Overview

FaithfulPlanner uses comprehensive CSS variables for complete design system control. All colors, spacing, typography, shadows, borders, and layout dimensions are defined as CSS variables and can be easily customized per clinic or theme.

**Current Status:** 80 CSS variables across 5 complete theme files (Blue, Green, Orange, Purple, Red)

## Quick Reference - Most Common Variables

### Primary Colors
```css
--primary: #667eea              /* Main brand color */
--primary-dark: #5568d3         /* Hover/active states */
--primary-light: #8b9ff4        /* Secondary usage */
--primary-ultra-light: #f5f7ff  /* Backgrounds */
```

### Spacing Scale
```css
--spacing-2: 2px     /* Minimal gaps */
--spacing-5: 5px     /* Small gaps */
--spacing-10: 10px   /* Default gaps */
--spacing-15: 15px   /* Medium gaps */
--spacing-20: 20px   /* Large gaps */
--spacing-30: 30px   /* Extra large gaps */
--spacing-40: 40px   /* Maximum gaps */
```

### Text Colors
```css
--text-primary: #333333      /* Main text */
--text-secondary: #666666    /* Secondary text */
--text-tertiary: #999999     /* Tertiary text */
--text-light: #cccccc        /* Light text */
--text-on-primary: #ffffff   /* Text on primary background */
```

### Backgrounds
```css
--bg-primary: #ffffff        /* Main background */
--bg-secondary: #f8f8f9      /* Secondary background */
--bg-tertiary: #f0f0f0       /* Tertiary background */
--bg-hover: #f5f7ff          /* Hover states */
```

## Complete CSS Variables Structure

### 1. Color Palettes

#### Primary Colors
- `--primary`: Main brand color (default: `#667eea`)
- `--primary-dark`: Darker shade for hover states (default: `#5568d3`)
- `--primary-light`: Lighter shade (default: `#8b9ff4`)
- `--primary-ultra-light`: Very light shade for backgrounds (default: `#f5f7ff`)

#### Neutral Colors (Gray Scale)
- `--gray-50`: `#f9fafb`
- `--gray-100`: `#f3f4f6`
- `--gray-200`: `#e5e7eb`
- `--gray-300`: `#d1d5db`
- `--gray-400`: `#9ca3af`
- `--gray-500`: `#6b7280`
- `--gray-600`: `#4b5563`
- `--gray-700`: `#374151`
- `--gray-800`: `#1f2937`
- `--gray-900`: `#111827`

#### Semantic Colors
- `--success`: Success/positive state (default: `#10b981`)
- `--success-light`: Light success background (default: `#d1fae5`)
- `--warning`: Warning state (default: `#f59e0b`)
- `--warning-light`: Light warning background (default: `#fef3c7`)
- `--error`: Error/danger state (default: `#ef4444`)
- `--error-light`: Light error background (default: `#fee2e2`)
- `--info`: Information state (default: `#3b82f6`)
- `--info-light`: Light info background (default: `#dbeafe`)

#### Background Colors
- `--bg-primary`: Primary background (default: `#ffffff`)
- `--bg-secondary`: Secondary background (default: `#f8f8f9`)
- `--bg-tertiary`: Tertiary background (default: `#f0f0f0`)
- `--bg-hover`: Hover state background (default: `#f5f7ff`)

#### Text Colors
- `--text-primary`: Primary text color (default: `#333333`)
- `--text-secondary`: Secondary text color (default: `#666666`)
- `--text-tertiary`: Tertiary text color (default: `#999999`)
- `--text-light`: Light text color (default: `#cccccc`)
- `--text-on-primary`: Text on primary backgrounds (default: `#ffffff`)

#### Border Colors
- `--border-color`: Main border color (default: `#e0e0e0`)
- `--border-light`: Light border color (default: `#f0f0f0`)
- `--border-dark`: Dark border color (default: `#cccccc`)
- `--border-width`: Border width (default: `1px`)

### 2. Border Radius

- `--border-radius-xs`: Extra small (default: `4px`)
- `--border-radius-sm`: Small (default: `6px`)
- `--border-radius-md`: Medium (default: `8px`)
- `--border-radius-lg`: Large (default: `10px`)
- `--border-radius-xl`: Extra large (default: `12px`)
- `--border-radius-full`: Full/pill shape (default: `50%`)

### 3. Shadows

- `--shadow-xs`: Extra small (default: `0 1px 2px rgba(0, 0, 0, 0.05)`)
- `--shadow-sm`: Small (default: `0 1px 2px rgba(0, 0, 0, 0.1)`)
- `--shadow-md`: Medium (default: `0 2px 10px rgba(0, 0, 0, 0.1)`)
- `--shadow-lg`: Large (default: `0 10px 25px rgba(0, 0, 0, 0.15)`)
- `--shadow-xl`: Extra large (default: `0 10px 40px rgba(0, 0, 0, 0.2)`)

### 4. Typography

#### Font Family
- `--font-family`: Main font (default: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`)

#### Font Sizes
- `--font-size-xs`: Extra small (default: `11px`)
- `--font-size-sm`: Small (default: `12px`)
- `--font-size-base`: Base size (default: `14px`)
- `--font-size-md`: Medium (default: `16px`)
- `--font-size-lg`: Large (default: `18px`)
- `--font-size-xl`: Extra large (default: `20px`)
- `--font-size-2xl`: 2x large (default: `24px`)
- `--font-size-3xl`: 3x large (default: `28px`)

#### Font Weights
- `--font-weight-regular`: Regular (default: `400`)
- `--font-weight-medium`: Medium (default: `500`)
- `--font-weight-semibold`: Semibold (default: `600`)
- `--font-weight-bold`: Bold (default: `700`)

#### Line Heights
- `--line-height-tight`: Tight spacing (default: `1.4`)
- `--line-height-normal`: Normal spacing (default: `1.6`)
- `--line-height-relaxed`: Relaxed spacing (default: `1.8`)

### 5. Spacing Scale

A consistent spacing scale for margins, padding, and gaps:

- `--spacing-2`: `2px`
- `--spacing-4`: `4px`
- `--spacing-5`: `5px`
- `--spacing-8`: `8px`
- `--spacing-10`: `10px`
- `--spacing-12`: `12px`
- `--spacing-15`: `15px`
- `--spacing-16`: `16px`
- `--spacing-20`: `20px`
- `--spacing-24`: `24px`
- `--spacing-30`: `30px`
- `--spacing-40`: `40px`

### 6. Transitions

- `--transition-fast`: Quick animations (default: `0.15s ease`)
- `--transition-base`: Standard animations (default: `0.3s ease`)
- `--transition-slow`: Slow animations (default: `0.5s ease`)

### 7. Component Sizes

- `--sidebar-width`: Sidebar width (default: `280px`)
- `--header-height`: Header height (default: `60px`)
- `--button-height`: Button height (default: `40px`)
- `--input-height`: Input field height (default: `40px`)
- `--modal-max-width`: Modal maximum width (default: `500px`)

### 8. Z-index Scale

- `--z-dropdown`: Dropdown layer (default: `100`)
- `--z-sticky`: Sticky elements (default: `200`)
- `--z-fixed`: Fixed elements (default: `300`)
- `--z-modal-backdrop`: Modal background (default: `400`)
- `--z-modal`: Modal content (default: `500`)
- `--z-notification`: Notifications (default: `600`)

## How to Customize for Different Clinics

### Method 1: Modify Root Variables (Recommended)

Edit the `:root` section in the `<style>` tag to change default values:

```css
:root {
    /* Primary Color Palette */
    --primary: #your-clinic-color;
    --primary-dark: #darker-shade;
    --primary-light: #lighter-shade;
    --primary-ultra-light: #very-light-shade;
    
    /* Customize other variables as needed */
}
```

### Method 2: Create Clinic-Specific CSS

Create a separate stylesheet for each clinic:

```html
<style>
    /* clinic-green.css - For Green Valley Clinic */
    :root {
        --primary: #059669;
        --primary-dark: #047857;
        --primary-light: #10b981;
        --primary-ultra-light: #d1fae5;
    }
</style>
```

### Method 3: JavaScript-Based Theming

```javascript
function setClinicTheme(clinicName, primaryColor) {
    const root = document.documentElement;
    root.style.setProperty('--primary', primaryColor);
    root.style.setProperty('--primary-dark', darkenColor(primaryColor));
    root.style.setProperty('--primary-light', lightenColor(primaryColor));
    root.style.setProperty('--primary-ultra-light', lightenColor(primaryColor, 0.9));
}

// Usage
setClinicTheme('Green Valley', '#059669');
```

## Example Clinic Themes

### Faith Healing Clinic (Blue)
```css
:root {
    --primary: #3b82f6;
    --primary-dark: #1d4ed8;
    --primary-light: #60a5fa;
    --primary-ultra-light: #dbeafe;
}
```

### Community Health Clinic (Green)
```css
:root {
    --primary: #10b981;
    --primary-dark: #059669;
    --primary-light: #34d399;
    --primary-ultra-light: #d1fae5;
}
```

### Urban Medical Center (Purple)
```css
:root {
    --primary: #8b5cf6;
    --primary-dark: #7c3aed;
    --primary-light: #a78bfa;
    --primary-ultra-light: #ede9fe;
}
```

### Pediatric Clinic (Orange)
```css
:root {
    --primary: #f59e0b;
    --primary-dark: #d97706;
    --primary-light: #fbbf24;
    --primary-ultra-light: #fef3c7;
}
```

## Customization Examples

### 1. Change Primary Colors
```css
:root {
    --primary: #e11d48;
    --primary-dark: #9f1239;
    --primary-light: #f43f5e;
    --primary-ultra-light: #ffe4e6;
}
```

### 2. Increase Spacing
```css
:root {
    --spacing-10: 12px;
    --spacing-15: 18px;
    --spacing-20: 24px;
    --spacing-30: 36px;
}
```

### 3. Change Typography
```css
:root {
    --font-family: 'Georgia', serif;
    --font-size-base: 16px;
    --font-size-lg: 20px;
}
```

### 4. Modify Border Radius
```css
:root {
    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 16px;
}
```

### 5. Adjust Shadows
```css
:root {
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 15px 35px rgba(0, 0, 0, 0.2);
}
```

## Component Styling with Variables

All components now use CSS variables. For example:

- **Buttons**: Use `--primary` for background, `--transition-base` for animations
- **Cards**: Use `--shadow-md`, `--border-radius-lg`, `--bg-primary`
- **Form Inputs**: Use `--border-color`, `--input-height`, `--font-size-base`
- **Tables**: Use `--bg-secondary` for headers, `--border-light` for dividers
- **Modals**: Use `--shadow-xl`, `--modal-max-width`, `--z-modal`

## Benefits of CSS Variables

✅ **Easy Theme Switching**: Change entire UI by modifying a few variables  
✅ **Consistency**: All components use the same design tokens  
✅ **Maintainability**: Update colors/spacing once, applies everywhere  
✅ **Scalability**: Easy to create new clinic themes  
✅ **Performance**: No additional HTTP requests needed  
✅ **Responsive**: Variables can be changed at different breakpoints  

## Best Practices

1. **Always modify `:root`** - Don't hardcode colors in individual components
2. **Maintain Ratios** - Keep color variations (dark, light, ultra-light) consistent
3. **Test Readability** - Ensure sufficient contrast for accessibility
4. **Use Semantic Colors** - Apply `--success`, `--error`, `--warning` appropriately
5. **Consistency** - Don't mix old hardcoded colors with new variables

## Browser Support

CSS Variables are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- Opera 36+

Modern browsers only. For older browser support, consider using PostCSS variables fallbacks.

---

For questions or custom theme requests, refer to the FaithfulPlanner documentation or contact the development team.
