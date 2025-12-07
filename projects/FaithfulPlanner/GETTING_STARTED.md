# FaithfulPlanner - Getting Started

Welcome to FaithfulPlanner! This is a comprehensive multi-tenant clinic scheduling platform with customizable theming and CSS variable-based design system.

## 📋 What is FaithfulPlanner?

FaithfulPlanner is a volunteer scheduling platform that enables healthcare organizations to independently manage their clinic schedules, providers, and volunteers. It features:

- **Multi-Tenant Architecture**: Complete data isolation between organizations
- **13 Screens**: Dashboard, provider management, volunteer management, scheduling, and more
- **5 Color Themes**: Blue, Green, Orange, Purple, Red (ready-to-use or customizable)
- **80+ CSS Variables**: Complete design system for customization
- **Role-Based Access**: Super Admin, Organization Admin, Provider, Volunteer

## 🎯 Quick Start Guides

### I want to change the clinic's theme colors
1. Navigate to `/themes/` folder
2. Choose your theme: `blue-theme.css`, `green-theme.css`, `purple-theme.css`, `orange-theme.css`, or `red-theme.css`
3. Either:
   - Link the theme in HTML: `<link rel="stylesheet" href="themes/blue-theme.css">`
   - Or dynamically switch with JavaScript (see THEME_FILES_GUIDE.md)

**More details:** See [THEME_FILES_GUIDE.md](THEME_FILES_GUIDE.md)

### I want to customize colors or typography
1. Open `index.html` and locate the `:root` CSS section
2. Modify CSS variables like `--primary`, `--font-size-base`, `--spacing-10`, etc.
3. Changes apply globally to all components

**More details:** See [CSS_VARIABLES_GUIDE.md](CSS_VARIABLES_GUIDE.md)

### I want to create a custom theme
1. Copy `themes/blue-theme.css` to `themes/my-custom-theme.css`
2. Modify the CSS variables to match your clinic's branding
3. Link it in HTML or switch dynamically via JavaScript

**See section:** CSS_VARIABLES_GUIDE.md → "Customization Examples"

### I want to convert to React.js
1. Review [STANDARDIZATION_REPORT.md](STANDARDIZATION_REPORT.md) for comprehensive analysis
2. All classes are already camelCased for React compatibility
3. Follow the recommended React conversion roadmap (13-19 hours estimated effort)

## 📚 Complete Documentation

### 1. **CSS_VARIABLES_GUIDE.md** ⭐ Primary Reference
- Complete list of all 80 CSS variables
- Organized by category (colors, spacing, typography, shadows, borders, layout)
- Default values and descriptions
- Customization examples
- Best practices and component styling

**Read this when:** You need to understand or customize CSS variables

### 2. **THEME_FILES_GUIDE.md** ⭐ Theme Reference
- Overview of all 5 available themes
- Theme use cases and recommendations
- Complete CSS variables breakdown (what's in each theme)
- How to use themes (HTML linking, CSS imports, dynamic switching)
- How to create custom themes
- Theme integration with React

**Read this when:** You want to switch themes or create custom themes

### 3. **STANDARDIZATION_REPORT.md**
- Comprehensive pre-React-conversion code audit
- CSS, HTML, and JavaScript analysis
- Identified issues and recommendations
- React conversion roadmap with estimated effort
- Suggested folder structure and component architecture

**Read this when:** You're preparing for React migration

## 🎨 Available Themes

| Theme | File | Primary Color | Best For |
|-------|------|---------------|----------|
| **Blue** | `themes/blue-theme.css` | #3b82f6 | General clinics, professional centers |
| **Green** | `themes/green-theme.css` | #10b981 | Community health, wellness centers |
| **Orange** | `themes/orange-theme.css` | #f59e0b | Urgent care, time-sensitive operations |
| **Purple** | `themes/purple-theme.css` | #8b5cf6 | Premium clinics, specialized centers |
| **Red** | `themes/red-theme.css` | #ef4444 | Emergency departments, critical care |

## 📂 Project Structure

```
FaithfulPlanner/
├── index.html                          # Main application (4,115 lines)
├── themes/                             # 5 complete theme files
│   ├── blue-theme.css                 # Default theme
│   ├── green-theme.css
│   ├── orange-theme.css
│   ├── purple-theme.css
│   └── red-theme.css
├── GETTING_STARTED.md                 # ← You are here
├── CSS_VARIABLES_GUIDE.md             # CSS variables reference
├── THEME_FILES_GUIDE.md               # Theme system guide
└── STANDARDIZATION_REPORT.md          # Pre-React analysis
```

## 🔍 Understanding the Codebase

### HTML Structure
- **13 Screens**: Login, Dashboard, Organization Management, Provider Management, Volunteer Management, Schedule Management, and more
- **Consistent Patterns**: All screens follow the same layout structure
- **camelCase Classes**: All component classes use camelCase for React compatibility

### CSS System
- **80 CSS Variables**: Complete design tokens in `:root`
- **307 Class Definitions**: Well-organized component styles
- **camelCase Names**: Ready for React adoption
- **No Inline Styles**: All styling in CSS classes or CSS variables

### JavaScript Organization
- **37 Functions**: Well-named utility functions
- **Event-Driven**: 52 onclick handlers and 11 addEventListener calls
- **Global State**: Variables for currentOrganization, userRole, modalConfig, etc.
- **Modal System**: Fully configurable showModal() function

## ⚙️ Key Features Explained

### Multi-Tenant Architecture
Each organization operates in isolation with:
- Separate data storage
- Independent user management
- Custom branding options
- Organization-specific settings

### Role-Based Access Control
```
Super Admin → Full system access, manage all organizations
Org Admin → Full access within their organization
Provider → View schedules, manage availability
Volunteer → View assigned shifts, confirm availability
```

### Configurable Modal System
```javascript
showModal({
    title: "Confirm Action",
    message: "Are you sure?",
    type: "confirm",  // or "warning", "error"
    okLabel: "Yes",
    okFunction: () => { /* ... */ },
    cancelLabel: "No",
    cancelFunction: () => { /* ... */ }
});
```

## 🚀 Next Steps

### For Customization
1. Start with [THEME_FILES_GUIDE.md](THEME_FILES_GUIDE.md) to choose/switch themes
2. Use [CSS_VARIABLES_GUIDE.md](CSS_VARIABLES_GUIDE.md) for fine-tuning colors/spacing

### For React Migration
1. Review [STANDARDIZATION_REPORT.md](STANDARDIZATION_REPORT.md) for the complete plan
2. Set up React project structure
3. Begin extracting components following the recommendations

### For New Features
1. Add new screens following existing patterns (add to HTML, create CSS, add JavaScript)
2. Use CSS variables for all colors and dimensions
3. Follow camelCase naming convention for classes

## 📝 File Statistics

| File | Type | Lines | Status |
|------|------|-------|--------|
| index.html | HTML+CSS+JS | 4,115 | ✅ Production-ready |
| CSS_VARIABLES_GUIDE.md | Documentation | 361 | ✅ Current |
| THEME_FILES_GUIDE.md | Documentation | 219 | ✅ Current |
| STANDARDIZATION_REPORT.md | Analysis | ~300 | ✅ Current |
| blue-theme.css | CSS | 109 | ✅ 80 variables |
| green-theme.css | CSS | 109 | ✅ 80 variables |
| orange-theme.css | CSS | 109 | ✅ 80 variables |
| purple-theme.css | CSS | 109 | ✅ 80 variables |
| red-theme.css | CSS | 109 | ✅ 80 variables |

## ❓ Common Questions

**Q: How do I switch themes?**
A: Link the theme CSS file in HTML or use JavaScript to dynamically load it. See THEME_FILES_GUIDE.md for code examples.

**Q: Can I create my own theme?**
A: Yes! Copy any theme file, rename it, and customize the CSS variables. See CSS_VARIABLES_GUIDE.md for the variable list.

**Q: How many CSS variables are there?**
A: 80 variables covering colors, spacing, typography, shadows, borders, layout, and transitions.

**Q: Is this ready for React?**
A: Yes! All classes are camelCased and code is well-organized. See STANDARDIZATION_REPORT.md for the conversion roadmap.

**Q: What's the estimated React migration time?**
A: 13-19 hours for complete conversion (based on STANDARDIZATION_REPORT.md analysis).

---

**Last Updated:** December 7, 2025  
**Status:** ✅ Production-Ready for Theme Customization and React Migration
