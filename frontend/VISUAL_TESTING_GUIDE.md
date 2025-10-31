# Visual Testing Guide - Cheil Submission Form

## 🎯 Purpose

Dokumen ini adalah panduan untuk melakukan visual testing secara sistematis untuk memastikan UI/UX berfungsi dengan baik di semua kondisi dan device.

---

## 📱 Device Testing Matrix

### Desktop Testing

| Resolution | Browser | Priority | Status |
|------------|---------|----------|--------|
| 1920x1080  | Chrome  | High     | ⬜ |
| 1920x1080  | Firefox | High     | ⬜ |
| 1920x1080  | Edge    | Medium   | ⬜ |
| 1366x768   | Chrome  | High     | ⬜ |
| 1366x768   | Safari  | High     | ⬜ |

### Tablet Testing

| Device | Resolution | Orientation | Status |
|--------|------------|-------------|--------|
| iPad Pro | 1024x1366 | Portrait | ⬜ |
| iPad Pro | 1366x1024 | Landscape | ⬜ |
| iPad Air | 820x1180 | Portrait | ⬜ |
| Samsung Tab | 800x1280 | Portrait | ⬜ |

### Mobile Testing

| Device | Resolution | Priority | Status |
|--------|------------|----------|--------|
| iPhone 14 Pro | 393x852 | High | ⬜ |
| iPhone SE | 375x667 | High | ⬜ |
| Samsung S21 | 360x800 | High | ⬜ |
| Pixel 7 | 412x915 | Medium | ⬜ |

---

## 🎨 Visual Checklist

### 1. Initial Load (Empty State)

#### Desktop
- [ ] Header gradient displays correctly
- [ ] Title "Cheil Submission Form" centered and readable
- [ ] Subtitle text visible below title
- [ ] Form container has proper shadow and border-radius
- [ ] All form labels visible with red asterisk
- [ ] Input fields have light gray border
- [ ] Upload area shows upload icon and instructions
- [ ] Buttons (Reset & Submit) aligned to the right
- [ ] Footer text visible and centered
- [ ] Overall page centered on screen
- [ ] Background gradient visible

#### Mobile (< 768px)
- [ ] Header text size reduced appropriately
- [ ] Form has adequate padding
- [ ] Input fields full-width
- [ ] Buttons stacked vertically (Reset on top)
- [ ] Buttons full-width
- [ ] Upload area has appropriate height
- [ ] Text remains readable
- [ ] No horizontal scrolling

---

### 2. Focus States

#### Keyboard Navigation
- [ ] Tab order follows logical flow: Name → Email → Phone → Upload → Reset → Submit
- [ ] Each focused element has visible blue outline
- [ ] Outline offset creates clear separation
- [ ] Focus indicator has 3px thickness
- [ ] Upload area focusable and shows focus ring
- [ ] All inputs show focus animation (slight lift)
- [ ] Focus ring color matches primary color (#667eea)

#### Visual Feedback
- [ ] Input border changes to blue (#667eea) on focus
- [ ] Input has subtle box-shadow on focus
- [ ] Input slightly lifts (translateY(-1px))
- [ ] Transition is smooth (0.2s)

---

### 3. Form Validation (Error States)

#### Name Field Errors
Test: Leave empty and click Submit
- [ ] Input border turns red (#e53e3e)
- [ ] Input performs shake animation
- [ ] Error message appears below input
- [ ] Error message has warning icon (⚠)
- [ ] Error message in red color
- [ ] Error message slides in from top
- [ ] aria-invalid="true" attribute present (check DevTools)

Test: Enter "A" (too short)
- [ ] Same error states as above
- [ ] Error message: "Nama harus minimal 2 karakter"

Test: Enter very long name (>100 chars)
- [ ] Error message appears
- [ ] Message: "Nama maksimal 100 karakter"

#### Email Field Errors
Test: Enter invalid email "test"
- [ ] Red border on input
- [ ] Error message: "Email tidak valid"
- [ ] Shake animation triggers

Test: Enter "test@" (incomplete)
- [ ] Same error validation

#### Phone Field Errors
Test: Enter "123" (too short)
- [ ] Error validation triggers
- [ ] Error message appears

Test: Enter letters "abcd"
- [ ] Error validation triggers

#### Image Upload Errors
Test: Don't select any image
- [ ] Error message appears below upload area
- [ ] Error has red background box
- [ ] Error icon visible
- [ ] Upload area has red border

Test: Upload file > 5MB
- [ ] Error message: "Ukuran file maksimal 5MB"
- [ ] File rejected immediately
- [ ] No preview shown

Test: Upload .pdf file (invalid type)
- [ ] Error message: "Tipe file harus JPG, PNG, atau WEBP"
- [ ] File rejected
- [ ] No preview shown

---

### 4. Image Upload Workflow

#### Before Upload
- [ ] Upload area shows icon
- [ ] Text: "Klik atau drag & drop gambar"
- [ ] Secondary text: "JPG, PNG, atau WEBP (Maks. 5MB)"
- [ ] Cursor changes to pointer on hover
- [ ] Slight background color change on hover

#### Drag & Drop
Test: Drag image over upload area
- [ ] Border color changes to blue
- [ ] Background color changes to light blue (#ebf4ff)
- [ ] Area slightly scales up (scale 1.02)
- [ ] Pulsing border animation activates
- [ ] Text changes to "Lepaskan file di sini"

#### After Selection (Click or Drop)
- [ ] Image preview appears immediately
- [ ] Image properly contained (not stretched)
- [ ] Max height respected (350px on desktop)

#### Image Preview Hover
- [ ] Dark overlay fades in smoothly
- [ ] Filename displays in white text
- [ ] Remove button appears
- [ ] Remove button has red background
- [ ] Remove button icon visible

#### Remove Button
- [ ] Button has hover effect (darker red)
- [ ] Icon rotates 90° on hover
- [ ] Button lifts on hover (translateY(-2px))
- [ ] Click removes image and shows upload area again
- [ ] Transition is smooth

---

### 5. Form Submission Flow

#### During Submission (Loading State)

Click Submit with valid data:

**Immediate Feedback:**
- [ ] Submit button shows spinner
- [ ] Button text changes to "Mengirim..."
- [ ] Button becomes disabled (can't click again)
- [ ] All form inputs become disabled
- [ ] Form inputs show disabled state (opacity reduced)

**Progress Bar:**
- [ ] Progress bar appears below image upload
- [ ] Progress fill animates smoothly
- [ ] Progress fill has gradient background
- [ ] Shimmer effect visible on progress bar
- [ ] Percentage text updates (e.g., "45% Uploaded")
- [ ] Text color matches primary color

**Button States:**
- [ ] Submit button shows ripple effect on click
- [ ] Button maintains gradient background
- [ ] Spinner rotates smoothly
- [ ] Reset button also disabled during submission

#### Success State

**Success Notification:**
- [ ] Green notification appears at top
- [ ] Notification has bounce animation on entry
- [ ] Check icon pops in with scale animation
- [ ] Title: "Submission Berhasil!"
- [ ] Message: "Data Anda telah berhasil dikirim."
- [ ] Green border visible
- [ ] Light green background
- [ ] Box shadow visible
- [ ] Progress bar at bottom (animates for 3 seconds)

**Form Reset (After 3 seconds):**
- [ ] All fields clear automatically
- [ ] Image preview removed
- [ ] Upload area returns to initial state
- [ ] Buttons re-enabled
- [ ] Notification disappears

#### Error State

Simulate error (disconnect internet or invalid backend):

**Error Notification:**
- [ ] Red notification appears
- [ ] Alert icon with pop animation
- [ ] Title: "Submission Gagal"
- [ ] Error message displays actual error
- [ ] Red border visible
- [ ] Light red background
- [ ] Form remains filled (not cleared)
- [ ] Buttons re-enabled
- [ ] User can retry submission

---

### 6. Responsive Behavior Testing

#### Breakpoint: 1024px (Small Desktop/Tablet)

**Changes to verify:**
- [ ] Max-width reduces to 700px
- [ ] Header h1 reduces to 2.2rem
- [ ] All spacing proportional
- [ ] Still horizontally centered

#### Breakpoint: 768px (Tablet Portrait)

**Major changes:**
- [ ] Body padding reduces to 10px
- [ ] App border-radius reduces to 16px
- [ ] Header padding: 24px
- [ ] Main content padding: 24px
- [ ] Buttons stack vertically
- [ ] Reset button on top, Submit below
- [ ] Both buttons full-width
- [ ] Notification layout stacks vertically
- [ ] Notification text centered
- [ ] Icon centers above text

#### Breakpoint: 640px (Mobile Landscape)

**Changes:**
- [ ] Header padding: 28px 20px
- [ ] Main padding: 20px
- [ ] H1 size: 1.85rem
- [ ] Form gap reduces to 20px

#### Breakpoint: 480px (Mobile Portrait)

**Critical changes:**
- [ ] Body padding: 5px
- [ ] Border-radius: 12px
- [ ] Input font-size: 16px (prevents iOS zoom)
- [ ] Upload area min-height: 200px
- [ ] Upload icon smaller (40x40px)
- [ ] Text sizes reduced appropriately
- [ ] All content readable
- [ ] No text truncation
- [ ] Touch targets still 44x44px minimum

#### Breakpoint: 360px (Extra Small)

**Extreme small screens:**
- [ ] H1 size: 1.5rem
- [ ] Buttons: min-width 100px
- [ ] All content still accessible
- [ ] No horizontal scroll
- [ ] Text remains legible

---

### 7. Touch Interaction Testing (Mobile Devices)

#### Touch Targets
- [ ] All buttons minimum 44x44px
- [ ] Easy to tap all form fields
- [ ] Upload area easy to tap
- [ ] Adequate spacing between interactive elements
- [ ] No accidental taps on wrong elements

#### Touch Feedback
- [ ] Button shows active state on touch
- [ ] Input shows focus on touch
- [ ] Ripple effect visible on button tap
- [ ] No delay in touch response
- [ ] Smooth scrolling

#### Gestures
- [ ] Scroll works smoothly
- [ ] Pinch zoom disabled on inputs (font-size: 16px)
- [ ] No horizontal scroll
- [ ] Pull-to-refresh works (if applicable)

---

### 8. Animation Performance Testing

#### Smooth Animations (60fps)
Test each animation:

- [ ] Page fade-in on load
- [ ] Input focus animation
- [ ] Input shake on error
- [ ] Button hover lift
- [ ] Button ripple effect
- [ ] Upload area drag-over animation
- [ ] Progress bar fill animation
- [ ] Progress bar shimmer
- [ ] Notification bounce-in
- [ ] Notification icon pop
- [ ] Image overlay fade
- [ ] Remove button icon rotation
- [ ] Spinner rotation

**Performance Check:**
- [ ] No janky animations
- [ ] No layout shifts
- [ ] Smooth transitions
- [ ] No flickering

#### Reduced Motion Support
Enable "Reduce Motion" in OS settings:
- [ ] All animations become instant (0.01ms)
- [ ] No motion discomfort
- [ ] Functionality still works
- [ ] Visual feedback still present

---

### 9. Accessibility Testing

#### Keyboard Navigation
- [ ] Can complete entire form using only keyboard
- [ ] Tab order is logical
- [ ] Shift+Tab works backwards
- [ ] Enter submits form from any input
- [ ] Space triggers buttons
- [ ] Enter/Space opens file picker on upload area
- [ ] Escape closes any modals (future)

#### Screen Reader Testing (NVDA/JAWS)

**Form Labels:**
- [ ] Each input announces its label
- [ ] Required fields announced as "required"
- [ ] Error messages announced when triggered
- [ ] Success message announced

**ARIA Attributes:**
- [ ] aria-invalid on error inputs
- [ ] aria-describedby links to error messages
- [ ] role="alert" on error/success messages
- [ ] role="progressbar" on progress bar
- [ ] aria-valuenow updates on progress bar
- [ ] aria-label on upload input

**Semantic HTML:**
- [ ] Proper heading hierarchy (h1, h4)
- [ ] Form element used
- [ ] Button elements (not divs)
- [ ] Label elements linked to inputs

#### Color Contrast
Use browser extension (e.g., axe DevTools):
- [ ] All text passes WCAG AA (4.5:1)
- [ ] Large text passes WCAG AA (3:1)
- [ ] Error text readable
- [ ] Button text readable
- [ ] Placeholder text sufficient contrast

#### Focus Indicators
- [ ] All focusable elements have visible focus
- [ ] Focus indicator 3px thickness
- [ ] Focus has sufficient contrast
- [ ] Focus visible on all backgrounds

---

### 10. Browser-Specific Testing

#### Chrome/Edge (Chromium)
- [ ] Gradient renders correctly
- [ ] Box-shadow displays properly
- [ ] Border-radius smooth
- [ ] Animations smooth
- [ ] File upload works
- [ ] All features functional

#### Firefox
- [ ] All styles match Chrome
- [ ] Animations perform well
- [ ] File upload works
- [ ] Focus outlines display
- [ ] No proprietary feature issues

#### Safari (Desktop)
- [ ] Webkit prefixes working
- [ ] Backdrop-filter works (if used)
- [ ] Animations smooth
- [ ] Form styling correct
- [ ] No Safari-specific bugs

#### Safari (iOS)
- [ ] No zoom on input focus (16px font)
- [ ] Touch targets adequate
- [ ] Smooth scrolling
- [ ] File upload from camera/library works
- [ ] Bottom navigation doesn't obscure content
- [ ] Safe area respected (notch)

---

## 🛠️ Testing Tools

### Browser DevTools

#### Responsive Mode
```
Chrome: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
```

**Test these presets:**
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- Pixel 5 (393x851)
- iPad Air (820x1180)
- iPad Pro (1024x1366)

#### Performance Tab
- [ ] Record page load
- [ ] Check FPS during animations
- [ ] Verify no layout thrashing
- [ ] Check paint times

#### Lighthouse Audit
Run audit and verify:
- [ ] Performance: > 90
- [ ] Accessibility: 100
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Accessibility Tools

#### Browser Extensions
- axe DevTools (Chrome/Firefox)
- WAVE (Chrome/Firefox)
- Lighthouse (Chrome built-in)

#### Manual Testing
- [ ] NVDA (Windows) - Free
- [ ] JAWS (Windows) - Trial available
- [ ] VoiceOver (Mac/iOS) - Built-in
- [ ] TalkBack (Android) - Built-in

---

## 📊 Bug Report Template

When you find an issue:

```markdown
### Bug Description
Clear description of the issue

### Device/Browser
- Device: [e.g., iPhone 14 Pro]
- Browser: [e.g., Safari 16]
- Screen Size: [e.g., 393x852]

### Steps to Reproduce
1. Go to form
2. Click on...
3. See error

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Screenshots
Attach screenshots

### Severity
- [ ] Critical (Breaks functionality)
- [ ] Major (Significant UX issue)
- [ ] Minor (Cosmetic issue)
- [ ] Enhancement (Nice to have)
```

---

## ✅ Final Checklist Before Launch

### Functionality
- [ ] All form fields validate correctly
- [ ] Image upload works with all supported formats
- [ ] Form submits successfully
- [ ] Error handling works
- [ ] Success feedback shows
- [ ] Form resets after success

### Visual Design
- [ ] Consistent colors throughout
- [ ] Proper spacing and alignment
- [ ] Responsive at all breakpoints
- [ ] Images display correctly
- [ ] No visual bugs

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Animations run at 60fps
- [ ] No console errors
- [ ] Lighthouse score > 90

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] Touch targets adequate
- [ ] ARIA attributes present

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Testing Complete
- [ ] Desktop testing (3 browsers)
- [ ] Tablet testing (2 devices)
- [ ] Mobile testing (3 devices)
- [ ] Accessibility audit passed
- [ ] Performance audit passed
- [ ] All critical bugs fixed

---

## 📸 Visual Testing Screenshots

### Recommended Screenshots to Take:

1. **Desktop - Empty State** (1920x1080)
2. **Desktop - Filled Form** (1920x1080)
3. **Desktop - Error State** (1920x1080)
4. **Desktop - Success State** (1920x1080)
5. **Desktop - Loading State** (1920x1080)
6. **Tablet - Portrait** (820x1180)
7. **Tablet - Landscape** (1180x820)
8. **Mobile - Empty State** (375x667)
9. **Mobile - Keyboard Open** (375x300 viewport)
10. **Mobile - Success State** (375x667)

Save screenshots in `/frontend/screenshots/` directory for reference.

---

## 🎓 Testing Best Practices

### DO ✅
- Test on real devices when possible
- Use browser DevTools for quick checks
- Test with slow network (throttle to 3G)
- Test with different zoom levels (100%, 125%, 150%)
- Clear cache between tests
- Test with adblockers enabled
- Test accessibility from the start
- Document all findings

### DON'T ❌
- Only test on your own device
- Skip mobile testing
- Ignore console warnings
- Test only with fast internet
- Assume one browser = all browsers
- Skip accessibility testing
- Test at the end only

---

**Last Updated**: October 30, 2025  
**Version**: 1.0.0  
**Status**: Ready for Testing 🎯

