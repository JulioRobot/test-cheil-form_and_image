# UI/UX Quick Reference Guide

## 🎨 Styling Cheat Sheet

### Color Variables (Use These Values)

```css
/* Primary */
#667eea  /* Purple-Blue - Primary buttons, focus states */
#764ba2  /* Purple - Secondary color, gradients */

/* Success */
#22c55e  /* Green - Success messages, checkmarks */
#f0fdf4  /* Light Green - Success backgrounds */

/* Error */
#e53e3e  /* Red - Error messages, validation */
#fff5f5  /* Light Red - Error backgrounds */

/* Text */
#2d3748  /* Dark Gray - Primary text */
#718096  /* Medium Gray - Secondary text */
#a0aec0  /* Light Gray - Placeholders */

/* Borders & Backgrounds */
#e2e8f0  /* Border color */
#f7fafc  /* Background light */
#cbd5e0  /* Border hover */
```

---

## 📏 Spacing Scale

```css
4px   → gap-1, padding-1
8px   → gap-2, padding-2
12px  → gap-3, padding-3
16px  → gap-4, padding-4
20px  → gap-5, padding-5
24px  → gap-6, padding-6
32px  → gap-8, padding-8
40px  → gap-10, padding-10
```

---

## 🔤 Typography

```css
/* Font Sizes */
0.75rem  (12px)  → Helper text
0.875rem (14px)  → Small text, errors
0.9rem   (14.4px) → Secondary text
0.95rem  (15.2px) → Form labels
1rem     (16px)   → Body text, inputs
1.1rem   (17.6px) → Emphasized text
1.5rem   (24px)   → Small headings
2rem     (32px)   → Medium headings
2.5rem   (40px)   → Large headings

/* Font Weights */
400 → Normal text
500 → Medium (filenames, etc)
600 → Semibold (labels, buttons)
700 → Bold (headings)
```

---

## 🎭 Animations

### Available Animations

```css
/* Utility Classes */
.fade-in        → Fade in from transparent
.slide-up       → Slide up from bottom
.pulse          → Pulsing opacity
.skeleton       → Loading skeleton animation

/* Auto-Applied */
Buttons         → Ripple effect on click
Form inputs     → Lift on focus, shake on error
Notifications   → Bounce in, icon pop
Image upload    → Pulse border on drag
Progress bar    → Shimmer effect
```

### Animation Timing

```css
Fast:    0.2s  → Hover effects, transitions
Normal:  0.3s  → Fade, slide animations
Slow:    0.5s  → Complex animations, bounce
Loading: 1.5s  → Skeleton, shimmer effects
```

---

## 🎯 Common Patterns

### 1. Form Input Pattern

```tsx
<div className="form-group">
  <label htmlFor="fieldId" className="form-label">
    Field Label <span className="required">*</span>
  </label>
  <input
    id="fieldId"
    type="text"
    className={`form-input ${errors.field ? 'input-error' : ''}`}
    placeholder="Placeholder text"
    disabled={isSubmitting}
    {...register('field')}
    aria-invalid={errors.field ? 'true' : 'false'}
    aria-describedby={errors.field ? 'field-error' : undefined}
  />
  {errors.field && (
    <span className="error-text" id="field-error" role="alert">
      {errors.field.message}
    </span>
  )}
</div>
```

### 2. Button Pattern

```tsx
{/* Primary Button */}
<button
  type="submit"
  className="btn btn-primary"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <span className="spinner" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</button>

{/* Secondary Button */}
<button
  type="button"
  className="btn btn-secondary"
  onClick={handleAction}
>
  Cancel
</button>
```

### 3. Notification Pattern

```tsx
{/* Success */}
{showSuccess && (
  <div className="notification notification-success" role="alert">
    <svg>{/* Check icon */}</svg>
    <div>
      <h4>Success!</h4>
      <p>Operation completed successfully.</p>
    </div>
  </div>
)}

{/* Error */}
{showError && (
  <div className="notification notification-error" role="alert">
    <svg>{/* Alert icon */}</svg>
    <div>
      <h4>Error</h4>
      <p>{errorMessage}</p>
    </div>
  </div>
)}
```

### 4. Progress Bar Pattern

```tsx
{isUploading && progress > 0 && (
  <div className="progress-container">
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
    <span className="progress-text">{progress}% Uploaded</span>
  </div>
)}
```

### 5. Loading Skeleton Pattern

```tsx
{isLoading ? (
  <div className="skeleton" style={{ width: '100%', height: '44px' }} />
) : (
  <div>Content here</div>
)}
```

---

## ♿ Accessibility Checklist

### Every Interactive Element Should Have:

```tsx
✅ Proper HTML element (<button> not <div onClick>)
✅ Accessible label (label, aria-label, or aria-labelledby)
✅ Keyboard support (Enter, Space for buttons)
✅ Focus indicator (automatic via CSS)
✅ Disabled state handling
✅ Min 44x44px touch target
```

### Form Fields Must Have:

```tsx
✅ Associated <label> with htmlFor
✅ id attribute matching label
✅ aria-invalid when error exists
✅ aria-describedby pointing to error message
✅ role="alert" on error messages
✅ Placeholder text (optional but helpful)
```

### Screen Reader Text:

```tsx
<span className="sr-only">
  Text only for screen readers
</span>
```

---

## 📱 Responsive Design Tips

### Breakpoint Usage

```css
/* Desktop First (our approach) */
.element { /* Desktop styles (> 1024px) */ }

@media (max-width: 1024px) { /* Small Desktop/Tablet */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 640px)  { /* Mobile Landscape */ }
@media (max-width: 480px)  { /* Mobile Portrait */ }
@media (max-width: 360px)  { /* Extra Small */ }
```

### Mobile-Specific Rules

```css
/* Prevent iOS zoom on input focus */
font-size: 16px; /* On inputs at mobile breakpoints */

/* Touch-friendly sizes */
min-height: 44px; /* All interactive elements */
min-width: 44px;

/* Stack buttons vertically */
@media (max-width: 768px) {
  .form-actions {
    flex-direction: column-reverse;
  }
}
```

---

## 🎨 Custom Styling Guide

### Adding Custom Components

```css
/* Follow this structure */
.component-name {
  /* Layout */
  display: flex;
  
  /* Spacing */
  padding: 16px;
  gap: 8px;
  
  /* Visual */
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  
  /* Typography */
  font-size: 1rem;
  color: #2d3748;
  
  /* Animation */
  transition: all 0.2s ease;
}

.component-name:hover {
  /* Hover state */
  border-color: #cbd5e0;
}

.component-name:focus {
  /* Focus state */
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

### Animation Best Practices

```css
/* ✅ DO: Use transform & opacity */
.element {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.element:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* ❌ DON'T: Animate width, height, top, left */
.element {
  transition: width 0.2s ease; /* Causes reflow! */
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Button not clickable on mobile
```css
/* Solution: Ensure min touch target */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### Issue: Input zooms in on iOS
```css
/* Solution: Use 16px font size */
@media (max-width: 480px) {
  .form-input {
    font-size: 16px;
  }
}
```

### Issue: Animation causing lag
```css
/* Solution: Use transform instead of position */
/* ❌ Bad */
.element {
  transition: top 0.3s;
}

/* ✅ Good */
.element {
  transition: transform 0.3s;
}
```

### Issue: Hover not working on mobile
```css
/* Solution: Use :hover with :not(.touch) or detect touch */
.btn:hover:not(:disabled):not(.touch) {
  transform: translateY(-2px);
}
```

---

## 🎯 Testing Shortcuts

### Browser DevTools

```javascript
// Force hover state
document.querySelector('.btn').classList.add('hover');

// Force error state
document.querySelector('.form-input').classList.add('input-error');

// Test loading state
document.querySelector('.btn').disabled = true;

// Test progress
document.querySelector('.progress-fill').style.width = '75%';
```

### Accessibility Testing

```javascript
// Check ARIA attributes
document.querySelector('[aria-invalid]');
document.querySelector('[role="alert"]');

// Check tab order
document.querySelectorAll('[tabindex]');

// Check focus
document.activeElement;
```

---

## 📊 Performance Tips

### CSS Performance

```css
/* ✅ DO: Use class selectors */
.btn { }

/* ❌ AVOID: Complex selectors */
div > ul > li > a.btn { }

/* ✅ DO: Group related animations */
.btn {
  transition: all 0.2s ease;
}

/* ❌ AVOID: Multiple transition properties */
.btn {
  transition: transform 0.2s, opacity 0.2s, background 0.2s, color 0.2s;
}
```

### Animation Performance

```css
/* ✅ DO: Use will-change for frequently animated elements */
.animated-element {
  will-change: transform;
}

/* ❌ DON'T: Overuse will-change */
* {
  will-change: transform; /* Too much! */
}
```

---

## 🔧 Utility Classes Reference

```css
.sr-only           → Screen reader only text
.skeleton          → Loading skeleton animation
.pulse             → Pulsing opacity animation
.fade-in           → Fade in animation
.slide-up          → Slide up animation
.backdrop-blur     → Blur backdrop effect

/* Future utilities */
.modal-overlay     → Modal backdrop
.modal-content     → Modal content container
[data-tooltip]     → Tooltip on hover
```

---

## 📝 Code Review Checklist

Before committing UI changes:

- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile (real device or emulator)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Touch targets minimum 44x44px
- [ ] Color contrast passes WCAG AA
- [ ] Error states working
- [ ] Loading states working
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] Responsive at all breakpoints
- [ ] Accessibility attributes present

---

## 🚀 Quick Start for New Developers

### 1. Understanding the Structure

```
style.css
├── Global Styles          (Lines 1-40)
├── App Container          (Lines 41-90)
├── Form Styles            (Lines 91-213)
├── Image Upload           (Lines 214-373)
├── Progress Bar           (Lines 374-407)
├── Buttons               (Lines 408-492)
├── Notifications         (Lines 509-609)
├── Responsive Design     (Lines 611-805)
├── Utility Classes       (Lines 879-1122)
└── Performance           (Lines 1098-1122)
```

### 2. Making Your First Change

```css
/* Step 1: Find the right section */
/* Step 2: Add or modify styles */
/* Step 3: Test in browser */
/* Step 4: Check responsive breakpoints */
/* Step 5: Verify accessibility */
/* Step 6: Commit with descriptive message */
```

### 3. Adding New Components

```css
/* Template */
.new-component {
  /* Layout */
  display: flex;
  gap: 16px;
  
  /* Visual */
  background: white;
  border-radius: 8px;
  padding: 16px;
  
  /* Animation */
  transition: all 0.2s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .new-component {
    flex-direction: column;
    padding: 12px;
  }
}
```

---

## 📚 Resources

### Internal Docs
- `UI_UX_IMPLEMENTATION.md` - Full implementation guide
- `ARCHITECTURE_DIAGRAM.md` - Frontend architecture
- `README.md` - Project setup

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser support
- [CSS Tricks](https://css-tricks.com/) - CSS techniques

---

**Last Updated**: October 30, 2025  
**Version**: 1.0.0  
**Quick Reference**: Always at hand! 🎨

