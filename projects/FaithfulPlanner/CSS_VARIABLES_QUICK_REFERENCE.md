# CSS Variables Quick Reference

## Most Important Variables

### Primary Colors
```css
--primary: #667eea              /* Main brand color */
--primary-dark: #5568d3         /* Hover/active states */
--primary-light: #8b9ff4        /* Secondary usage */
--primary-ultra-light: #f5f7ff  /* Backgrounds */
```

### Spacing Scale
```css
--spacing-5: 5px      /* Small gaps */
--spacing-10: 10px    /* Default gaps */
--spacing-15: 15px    /* Medium gaps */
--spacing-20: 20px    /* Large gaps */
--spacing-30: 30px    /* Extra large gaps */
```

### Text Colors
```css
--text-primary: #333333      /* Main text */
--text-secondary: #666666    /* Secondary text */
--text-tertiary: #999999     /* Tertiary text */
```

### Backgrounds
```css
--bg-primary: #ffffff        /* Main background */
--bg-secondary: #f8f8f9      /* Secondary background */
--bg-hover: #f5f7ff          /* Hover states */
```

### Border & Shadow
```css
--border-color: #e0e0e0      /* Main border */
--border-radius-lg: 10px     /* Large corners */
--shadow-md: 0 2px 10px rgba(0,0,0,0.1)  /* Medium shadow */
```

## Theme Colors

| Theme | Primary Color | File |
|-------|--------------|------|
| Blue | #3b82f6 | themes/blue-theme.css |
| Green | #10b981 | themes/green-theme.css |
| Purple | #8b5cf6 | themes/purple-theme.css |
| Red | #ef4444 | themes/red-theme.css |
| Orange | #f59e0b | themes/orange-theme.css |

## Common Usage Patterns

### Change Primary Color
```css
:root {
    --primary: #your-color;
    --primary-dark: #darker;
    --primary-light: #lighter;
    --primary-ultra-light: #lightest;
}
```

### Apply Spacing
```html
<div class="padding-20 margin-top-15">Content</div>
```

### Use Colors
```css
background: var(--bg-primary);
color: var(--text-primary);
border: 1px solid var(--border-color);
box-shadow: var(--shadow-md);
border-radius: var(--border-radius-lg);
```

### Component Styling
```css
.card {
    background: var(--bg-primary);
    padding: var(--spacing-20);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
}
```

## Switching Themes in HTML

```html
<!-- Load a specific theme -->
<link rel="stylesheet" href="themes/green-theme.css">
```

## Switching Themes with JavaScript

```javascript
function setTheme(themeName) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `themes/${themeName}-theme.css`;
    document.head.appendChild(link);
    localStorage.setItem('selectedTheme', themeName);
}

// Load saved theme on startup
window.addEventListener('load', () => {
    const saved = localStorage.getItem('selectedTheme');
    if (saved) setTheme(saved);
});
```

## All Variables by Category

### Colors (44)
- Primary (4): primary, primary-dark, primary-light, primary-ultra-light
- Gray (10): gray-50 through gray-900
- Semantic (8): success, warning, error, info + light variants
- Background (4): bg-primary, bg-secondary, bg-tertiary, bg-hover
- Text (5): text-primary, text-secondary, text-tertiary, text-light, text-on-primary
- Border (3): border-color, border-light, border-dark

### Design Tokens (41)
- Border Radius (6): xs, sm, md, lg, xl, full
- Shadows (5): xs, sm, md, lg, xl
- Typography (11): font-family, 8 sizes, 4 weights, 3 line-heights
- Spacing (12): 2px to 40px scale
- Transitions (3): fast, base, slow
- Sizes (5): sidebar-width, header-height, button-height, input-height, modal-max-width
- Z-index (6): dropdown, sticky, fixed, modal-backdrop, modal, notification

## Files to Reference

- **index.html** - All CSS variables in `:root` (lines 14-130)
- **CSS_VARIABLES_GUIDE.md** - Complete variable reference
- **THEME_IMPLEMENTATION_GUIDE.md** - Theme setup instructions
- **themes/\*.css** - Example theme overrides

## Pro Tips

✨ **Change spacing everywhere**: Update `--spacing-20` in `:root`  
✨ **Update brand color**: Change `--primary` and related shades  
✨ **Dark mode prep**: Create `:root[data-theme="dark"]` with dark variables  
✨ **Create custom themes**: Copy a theme file and modify color variables  
✨ **Test contrast**: Use WebAIM contrast checker on text/background pairs  

---

**For complete details, see CSS_VARIABLES_GUIDE.md**
