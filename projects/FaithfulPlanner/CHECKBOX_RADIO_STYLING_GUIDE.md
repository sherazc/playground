# Checkbox & Radio Button Styling Guide

## Overview

Custom styled checkboxes and radio buttons that use CSS variables for theming. These components automatically adapt to any clinic theme by leveraging the existing CSS variable system.

## Checkbox Styling

### HTML Structure

```html
<label class="checkbox-label">
    <input type="checkbox" checked>
    <span class="checkbox-box"></span>
    <span>Checkbox label text</span>
</label>
```

### CSS Classes

- `.checkbox-label` - Wrapper for the entire checkbox component
- `.checkbox-box` - Custom styled checkbox appearance
- `input[type="checkbox"]` - Native hidden input

### Features

- ✅ Theme-aware styling (uses CSS variables)
- ✅ Accessible (keyboard navigable)
- ✅ Focus states (outline on focus)
- ✅ Hover effects (border and shadow change)
- ✅ Smooth transitions
- ✅ Checkmark animation

### Example Usage

```html
<!-- Simple checkbox -->
<label class="checkbox-label">
    <input type="checkbox">
    <span class="checkbox-box"></span>
    <span>Remember me</span>
</label>

<!-- Checked by default -->
<label class="checkbox-label">
    <input type="checkbox" checked>
    <span class="checkbox-box"></span>
    <span>Enable notifications</span>
</label>

<!-- Multiple checkboxes -->
<div style="margin: var(--spacing-15) 0;">
    <label class="checkbox-label">
        <input type="checkbox" checked>
        <span class="checkbox-box"></span>
        <span>Email notifications</span>
    </label>
    <label class="checkbox-label">
        <input type="checkbox">
        <span class="checkbox-box"></span>
        <span>SMS notifications</span>
    </label>
</div>
```

## Radio Button Styling

### HTML Structure

```html
<label class="radio-label">
    <input type="radio" name="group-name" value="option1" checked>
    <span class="radio-box"></span>
    <span>Radio button label text</span>
</label>
```

### CSS Classes

- `.radio-label` - Wrapper for the entire radio button component
- `.radio-box` - Custom styled radio button appearance
- `input[type="radio"]` - Native hidden input

### Features

- ✅ Theme-aware styling (uses CSS variables)
- ✅ Accessible (keyboard navigable)
- ✅ Focus states (outline on focus)
- ✅ Hover effects (border and shadow change)
- ✅ Smooth transitions
- ✅ Filled dot animation

### Example Usage

```html
<!-- Radio button group -->
<div style="margin: var(--spacing-15) 0;">
    <label class="radio-label">
        <input type="radio" name="frequency" value="immediate" checked>
        <span class="radio-box"></span>
        <span>Immediate notifications</span>
    </label>
    <label class="radio-label">
        <input type="radio" name="frequency" value="daily">
        <span class="radio-box"></span>
        <span>Daily summary</span>
    </label>
    <label class="radio-label">
        <input type="radio" name="frequency" value="weekly">
        <span class="radio-box"></span>
        <span>Weekly summary</span>
    </label>
</div>
```

## CSS Variables Used

The checkbox and radio button styling automatically uses these CSS variables:

| Variable | Purpose |
|----------|---------|
| `--border-width` | Border thickness |
| `--border-color` | Default border color |
| `--border-radius-sm` | Checkbox corner radius |
| `--bg-primary` | Background color |
| `--primary` | Brand color (hover/checked state) |
| `--text-primary` | Label text color |
| `--text-on-primary` | Text color on brand background |
| `--spacing-12` | Margin between box and text |
| `--spacing-15` | Margin between items |
| `--shadow-xs` | Subtle shadow |
| `--shadow-sm` | Medium shadow on hover |
| `--transition-fast` | Animation speed |
| `--font-size-base` | Label font size |

## Theming

The checkboxes and radio buttons automatically adapt to any clinic theme:

```css
/* Theme: Green */
:root {
    --primary: #10b981;
    --primary-dark: #059669;
    --primary-light: #34d399;
    /* Checkboxes will now have green accents */
}
```

## Styling States

### Checkbox States

```
Normal          → Gray border, white background
Hover           → Primary color border, subtle shadow
Checked         → Primary color background, white checkmark
Focused         → Outline around the box
```

### Radio Button States

```
Normal          → Gray border, white background
Hover           → Primary color border, subtle shadow
Checked         → Primary color background, white dot
Focused         → Outline around the box
```

## Accessibility

- ✅ Keyboard navigable (Tab, Space, Arrow keys)
- ✅ Focus indicators visible
- ✅ Semantic HTML structure
- ✅ High contrast colors
- ✅ Works with screen readers (native inputs)

## Common Patterns

### Form Group with Checkboxes

```html
<div class="form-group">
    <label>Select options:</label>
    <div style="margin: var(--spacing-15) 0;">
        <label class="checkbox-label">
            <input type="checkbox" checked>
            <span class="checkbox-box"></span>
            <span>Option 1</span>
        </label>
        <label class="checkbox-label">
            <input type="checkbox">
            <span class="checkbox-box"></span>
            <span>Option 2</span>
        </label>
    </div>
</div>
```

### Settings Panel with Radio Buttons

```html
<div class="card">
    <h3>Preferences</h3>
    <h4 class="settings-section-title">Choose frequency:</h4>
    <div style="margin: var(--spacing-15) 0;">
        <label class="radio-label">
            <input type="radio" name="pref" value="high" checked>
            <span class="radio-box"></span>
            <span>High frequency</span>
        </label>
        <label class="radio-label">
            <input type="radio" name="pref" value="medium">
            <span class="radio-box"></span>
            <span>Medium frequency</span>
        </label>
        <label class="radio-label">
            <input type="radio" name="pref" value="low">
            <span class="radio-box"></span>
            <span>Low frequency</span>
        </label>
    </div>
</div>
```

## Size Customization

The default size is 20px × 20px. To customize, modify the related CSS variables or add custom styles:

```css
/* Make checkboxes larger */
.checkbox-box,
.radio-box {
    width: 24px;
    height: 24px;
    min-width: 24px;
}
```

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- Fallback: Native checkboxes/radios work in all browsers

## Tips

1. **Always include `.checkbox-box` or `.radio-box`** - This is the custom styled element
2. **Keep label text short** - Text wraps naturally if needed
3. **Use semantic names for radio buttons** - Use `name` attribute to group related radio buttons
4. **Test with themes** - Checkboxes automatically adapt to color themes
5. **Use standard spacing variables** - For consistent margins around groups

## Examples in Application

Current implementation in the Settings & Profile screen:

**Location:** Settings → Notification Preferences card

**Checkboxes:**
- Email notifications for shift reminders
- SMS notifications for urgent updates
- Daily digest of activities

**Radio Buttons:**
- Immediate notifications
- Daily summary
- Weekly summary

---

For more information about CSS variables and theming, see:
- CSS_VARIABLES_GUIDE.md
- THEME_IMPLEMENTATION_GUIDE.md
- CSS_VARIABLES_QUICK_REFERENCE.md
