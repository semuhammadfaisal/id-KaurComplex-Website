# 🎨 Kaur Complex - Advanced Animation System Documentation

## Overview
This document describes the professional animation system implemented for the Kaur Complex website, featuring GSAP, ScrollTrigger, AOS, and custom animations.

---

## 📚 Animation Libraries Used

### 1. **GSAP (GreenSock Animation Platform) v3.12.5**
- **Purpose**: Core animation engine for advanced, performant animations
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **Features**: Timeline control, easing functions, micro-interactions

### 2. **ScrollTrigger Plugin**
- **Purpose**: Scroll-based animation triggers (IN/OUT animations)
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
- **Features**: Viewport detection, scroll progress, parallax effects

### 3. **ScrollToPlugin**
- **Purpose**: Smooth anchor link scrolling
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js`

### 4. **AOS (Animate On Scroll) v2.3.1**
- **Purpose**: Simple scroll animations with data attributes
- **CDN**: `https://unpkg.com/aos@2.3.1/dist/aos.js`
- **Features**: Easy-to-use, declarative animations

### 5. **Lenis Smooth Scroll (Optional)**
- **Purpose**: Ultra-smooth scrolling experience
- **CDN**: `https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js`
- **Status**: Commented out by default (enable if needed)

---

## 📁 File Structure

```
kaur-complex/
├── assets/
│   ├── css/
│   │   └── animations.css          # Animation utility classes & keyframes
│   └── js/
│       ├── gsap-animations.js      # GSAP animation logic
│       ├── smooth-scroll.js        # Smooth scrolling implementation
│       └── scroll-animations.js    # Additional scroll effects
└── index.html                      # Main HTML with animation classes
```

---

## 🎭 Animation Types Implemented

### **1. Entrance Animations (IN)**

#### Fade Animations
- `.animate-fade` - Simple fade in
- `.animate-fade-in` - Fade in with slight movement

#### Slide Animations
- `.animate-slide-up` - Slide from bottom
- `.animate-slide-down` - Slide from top
- `.animate-slide-left` - Slide from left
- `.animate-slide-right` - Slide from right

#### Scale Animations
- `.animate-zoom` - Zoom in from small
- `.animate-zoom-out` - Zoom in from large
- `.animate-scale` - Subtle scale effect

#### Rotation Animations
- `.animate-rotate` - Rotate and fade in
- `.animate-flip` - 3D flip effect

#### Special Effects
- `.animate-blur` - Blur to clear transition

### **2. Exit Animations (OUT)**

Automatically triggered when elements leave viewport:
- Fade out
- Scale down
- Slight opacity reduction

### **3. Continuous Animations**

#### Ken Burns Effect
```css
.ken-burns {
  animation: kenBurns 20s ease-out infinite alternate;
}
```
- Applied to hero background images
- Slow cinematic zoom effect

#### Button Pulse
```css
.btn-pulse {
  animation: btnPulse 2s ease-in-out infinite;
}
```
- Applied to CTA buttons
- Subtle scale and shadow pulse

#### Icon Float
```css
.icon-float {
  animation: iconFloat 3s ease-in-out infinite;
}
```
- Applied to location section icons
- Gentle floating motion

#### Shimmer Effect
```css
.shimmer {
  animation: shimmer 3s ease-in-out infinite;
}
```
- Applied to gallery click text
- Gradient shimmer effect

#### Glow Pulse
```css
.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```
- Applied to tower badges
- Pulsing glow effect

---

## 🎯 Section-Specific Animations

### **Navbar**
- **Load**: Slide down from top (0.8s)
- **Scroll**: Background color transition
- **Mobile Menu**: Staggered item appearance (0.1s delay each)

### **Hero Section**
- **Background**: Ken Burns zoom effect (20s loop)
- **Title**: Word-by-word stagger (0.15s delay)
- **Subtitle**: Fade up (1.2s delay)
- **Description**: Fade up (1.5s delay)
- **Buttons**: Bounce in (1.8s delay, 0.2s stagger)
- **Image**: Slide from right with rotation

### **Masterplan Section**
- **Heading**: Slide from left
- **Description**: Slide from right
- **Image**: Scale in + parallax scroll effect

### **Towers Section**
- **Cards**: Alternating entrance effects
  - Card 1: Slide left with rotation
  - Card 2: Zoom in
  - Card 3: Slide right with rotation
  - Card 4: Slide down
- **Hover**: 3D lift with image zoom
- **Progress Bars**: Animated width fill (1.5s)
- **Badges**: Continuous pulse + glow

### **Gallery Section**
- **Title**: Slide from left
- **Subtitle**: Slide from right
- **Main Card**: Scale in with bounce
- **Grid Items**: Random stagger (masonry effect)
- **Hover**: Image zoom + brightness increase
- **Modal**: Scale in animation

### **CTA Section**
- **Heading Letters**: Individual letter stagger with 3D rotation
- **Highlight Text**: Elastic bounce in
- **Description**: Fade up
- **Buttons**: Bounce in with stagger + continuous pulse

### **Location Section**
- **Title**: Slide from left
- **Subtitle**: Slide from right
- **Info Cards**: Alternate left/right slide (0.1s stagger)
- **Icons**: Continuous float animation
- **Map**: Scale in
- **Directions Button**: Slide from right

---

## 🛠️ Utility Classes

### Performance Optimization
```css
.will-animate { will-change: transform, opacity; }
.gpu-accelerate { transform: translateZ(0); backface-visibility: hidden; }
```

### Hover Effects
```css
.btn-hover-lift        /* Button lift on hover */
.card-3d               /* 3D card lift effect */
.img-zoom-hover        /* Image zoom on hover */
```

### Stagger Delays
```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

---

## ⚙️ Configuration

### AOS Settings
```javascript
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: false,        // Repeat animations
  offset: 100,        // Trigger 100px before viewport
  mirror: true        // Animate on scroll up
});
```

### GSAP ScrollTrigger
```javascript
ScrollTrigger.create({
  trigger: element,
  start: 'top 80%',   // Start when element is 80% in viewport
  end: 'top 30%',
  toggleActions: 'play none none reverse'
});
```

---

## 🎨 Customization Guide

### Change Animation Duration
```javascript
// In gsap-animations.js
gsap.from(element, {
  duration: 1.5,  // Change this value (seconds)
  // ...
});
```

### Change Stagger Delay
```javascript
stagger: 0.2,  // Delay between each element (seconds)
```

### Change Easing Function
```javascript
ease: 'power3.out',  // Options: power1-4, back, elastic, bounce, etc.
```

### Add New Animation
```css
/* In animations.css */
@keyframes myAnimation {
  from { /* start state */ }
  to { /* end state */ }
}

.my-animation {
  animation: myAnimation 1s ease-in-out;
}
```

---

## 📊 Performance Metrics

### Optimization Techniques Used
1. **GPU Acceleration**: `transform: translateZ(0)`
2. **Will-Change**: Pre-optimize animated properties
3. **Passive Event Listeners**: Scroll performance
4. **Deferred Script Loading**: Non-blocking JavaScript
5. **Reduced Motion Support**: Accessibility compliance

### Expected Performance
- **FPS**: 60fps on modern devices
- **Scroll Performance**: Smooth at 60fps
- **Animation Load**: < 50ms initialization
- **Memory Usage**: Minimal (GSAP is highly optimized)

---

## ♿ Accessibility

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users with motion sensitivity will see instant transitions instead of animations.

---

## 🐛 Troubleshooting

### Animations Not Working
1. Check browser console for errors
2. Verify GSAP scripts load before custom scripts
3. Ensure elements have proper classes
4. Check ScrollTrigger.refresh() is called

### Performance Issues
1. Reduce number of simultaneous animations
2. Increase stagger delays
3. Disable Lenis smooth scroll
4. Check for memory leaks in console

### Mobile Issues
1. Test on actual devices (not just emulators)
2. Reduce animation complexity on mobile
3. Disable parallax on touch devices
4. Use CSS animations instead of JS where possible

---

## 🚀 Future Enhancements

### Potential Additions
- [ ] Magnetic cursor effect for buttons
- [ ] Page transition animations
- [ ] Loading screen animation
- [ ] Scroll progress indicator
- [ ] Interactive 3D tower models
- [ ] Video background with scroll effects
- [ ] Mouse parallax effects
- [ ] Text reveal animations

---

## 📞 Support

For animation-related questions or issues:
- Review GSAP documentation: https://greensock.com/docs/
- Check AOS documentation: https://michalsnik.github.io/aos/
- Test in multiple browsers for compatibility

---

## 📝 Version History

### v1.0.0 (Current)
- ✅ GSAP integration
- ✅ ScrollTrigger animations
- ✅ AOS animations
- ✅ Custom utility classes
- ✅ Performance optimizations
- ✅ Accessibility support
- ✅ Mobile responsiveness

---

**Built with ❤️ for Kaur Complex**
*Professional animations for luxury living*
