# Theme Implementation Guide

## How to Use Themes in FaithfulPlanner

This guide explains how to implement and switch between different color themes for different clinics.

## Quick Start

### 1. Link a Theme File in HTML

Add the theme stylesheet in the HTML `<head>` section AFTER the main styles:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FaithfulPlanner - Clinic Scheduling</title>
    <style>
        /* Main styles with default CSS variables in :root */
        :root {
            --primary: #667eea;
            /* ... other variables ... */
        }
        /* ... rest of styles ... */
    </style>
    
    <!-- Link theme override -->
    <link rel="stylesheet" href="themes/blue-theme.css">
</head>
```

### 2. Switch Themes Dynamically with JavaScript

```javascript
function setTheme(themeName) {
    // Remove existing theme link
    const existingLink = document.querySelector('link[data-theme]');
    if (existingLink) {
        existingLink.remove();
    }
    
    // Add new theme link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `themes/${themeName}-theme.css`;
    link.setAttribute('data-theme', 'true');
    document.head.appendChild(link);
    
    // Store preference in localStorage
    localStorage.setItem('selectedTheme', themeName);
}

// Usage
setTheme('green'); // Will load themes/green-theme.css
setTheme('blue');  // Will load themes/blue-theme.css
setTheme('purple'); // Will load themes/purple-theme.css
```

### 3. Load Saved Theme on Page Load

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    if (savedTheme !== 'default') {
        setTheme(savedTheme);
    }
});
```

## Available Themes

### 1. **Blue Theme** (Default)
- File: `themes/blue-theme.css`
- Color: `#3b82f6`
- Best for: Professional medical centers, general clinics
- Dark: `#1d4ed8`
- Light: `#60a5fa`

### 2. **Green Theme**
- File: `themes/green-theme.css`
- Color: `#10b981`
- Best for: Community health clinics, wellness centers
- Dark: `#059669`
- Light: `#34d399`

### 3. **Purple Theme**
- File: `themes/purple-theme.css`
- Color: `#8b5cf6`
- Best for: Premium medical centers, specialized clinics
- Dark: `#7c3aed`
- Light: `#a78bfa`

### 4. **Red Theme**
- File: `themes/red-theme.css`
- Color: `#ef4444`
- Best for: Emergency clinics, urgent care centers
- Dark: `#dc2626`
- Light: `#f87171`

### 5. **Orange Theme**
- File: `themes/orange-theme.css`
- Color: `#f59e0b`
- Best for: Pediatric clinics, family health centers
- Dark: `#d97706`
- Light: `#fbbf24`

## Creating Custom Themes

### Step 1: Create a New Theme File

Create a new CSS file in the `themes/` directory:

```css
/* themes/custom-clinic-theme.css */
:root {
    /* Override only the variables you want to change */
    --primary: #your-color;
    --primary-dark: #darker-shade;
    --primary-light: #lighter-shade;
    --primary-ultra-light: #very-light-shade;
    
    /* Optional: override other colors */
    --success: #custom-success-color;
    --warning: #custom-warning-color;
    --error: #custom-error-color;
}
```

### Step 2: Use Your Theme

```html
<!-- In HTML -->
<link rel="stylesheet" href="themes/custom-clinic-theme.css">
```

Or with JavaScript:
```javascript
setTheme('custom-clinic');
```

## Theme Selector UI Component

Add a theme switcher to your header:

```html
<div class="theme-selector">
    <select id="themeSelect" onchange="setTheme(this.value)">
        <option value="blue">Blue Theme</option>
        <option value="green">Green Theme</option>
        <option value="purple">Purple Theme</option>
        <option value="red">Red Theme</option>
        <option value="orange">Orange Theme</option>
    </select>
</div>
```

CSS for the selector:
```css
.theme-selector select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 14px;
}
```

## Advanced: Multi-Color Customization

For more complex customization, override multiple variables:

```css
/* themes/luxury-clinic-theme.css */
:root {
    /* Colors */
    --primary: #c084fc;
    --primary-dark: #a855f7;
    --primary-light: #d8b4fe;
    --primary-ultra-light: #f3e8ff;
    
    /* Spacing adjustments */
    --spacing-15: 18px;
    --spacing-20: 24px;
    --spacing-30: 36px;
    
    /* Typography adjustments */
    --font-size-base: 15px;
    --font-size-md: 17px;
    
    /* Component sizing */
    --border-radius-lg: 12px;
    
    /* Shadow adjustments */
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 15px 35px rgba(0, 0, 0, 0.15);
}
```

## Tips for Creating Clinic-Specific Themes

### 1. Color Psychology
- **Blue**: Trust, professionalism, healthcare
- **Green**: Health, wellness, nature, vitality
- **Purple**: Premium, specialized care, innovation
- **Red**: Emergency, urgent, critical
- **Orange**: Warmth, care, pediatrics

### 2. Accessibility
- Ensure sufficient contrast between text and background
- Test with color blindness simulators
- Follow WCAG guidelines (minimum 4.5:1 contrast ratio)

### 3. Consistency
- Keep light and dark variations proportional
- Use the same color ratios across clinics
- Test in different lighting conditions

### 4. Logo Integration
- Adjust primary color to match clinic branding
- Ensure logo visibility on theme background
- Test across all UI states

## Troubleshooting

### Theme Not Applied
- Verify the theme CSS file is in the correct path
- Check browser console for 404 errors
- Ensure theme CSS is loaded AFTER main styles
- Clear browser cache and reload

### Colors Look Wrong
- Verify the color hex values are correct
- Check for typos in CSS variable names
- Ensure the theme file has no syntax errors
- Test in multiple browsers

### Performance Issues
- Avoid loading too many theme files simultaneously
- Use minified CSS in production
- Consider lazy-loading theme files on demand

## CLI Commands (Optional)

If you have a build process, generate themes programmatically:

```bash
# Generate a new theme
npm run generate-theme -- --color="#10b981" --name="custom"

# Preview theme
npm run preview-theme -- green

# Compile all themes
npm run build-themes
```

## Best Practices

✅ **Keep Variables Organized** - Group related variables together  
✅ **Name Logically** - Use semantic names (not `color-1`, `color-2`)  
✅ **Test Thoroughly** - Test theme across all clinic screens  
✅ **Document Changes** - Comment custom variable modifications  
✅ **Version Control** - Track theme changes in git  
✅ **User Preference** - Remember theme selection in localStorage  

## See Also

- [CSS Variables Guide](CSS_VARIABLES_GUIDE.md)
- [Design Documentation](design.md)

---

For more help, contact the development team.
