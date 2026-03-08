# 🎨 Animation Quick Reference - Kaur Complex

## 🚀 Quick Start

### Add Animation to Any Element

```html
<!-- Fade In -->
<div class="animate-fade">Content</div>

<!-- Slide Up -->
<div class="animate-slide-up">Content</div>

<!-- Zoom In -->
<div class="animate-zoom">Content</div>

<!-- 3D Card Effect -->
<div class="card-3d">Content</div>

<!-- Button with Hover Lift -->
<button class="btn-hover-lift">Click Me</button>
```

---

## 📋 Animation Class Reference

### Entrance Animations (Scroll-Triggered)

| Class | Effect | Use Case |
|-------|--------|----------|
| `.animate-fade` | Fade in | Text, images |
| `.animate-slide-up` | Slide from bottom | Cards, sections |
| `.animate-slide-down` | Slide from top | Headers, alerts |
| `.animate-slide-left` | Slide from left | Left-aligned content |
| `.animate-slide-right` | Slide from right | Right-aligned content |
| `.animate-zoom` | Zoom in (small to normal) | Images, icons |
| `.animate-zoom-out` | Zoom in (large to normal) | Hero images |
| `.animate-rotate` | Rotate and fade in | Special elements |
| `.animate-flip` | 3D flip effect | Cards, panels |
| `.animate-blur` | Blur to clear | Backgrounds |
| `.animate-scale` | Subtle scale | Subtle emphasis |

### Continuous Animations

| Class | Effect | Use Case |
|-------|--------|----------|
| `.ken-burns` | Slow zoom | Hero backgrounds |
| `.btn-pulse` | Pulse scale | CTA buttons |
| `.icon-float` | Floating motion | Icons |
| `.shimmer` | Gradient shimmer | Highlights |
| `.glow-pulse` | Glowing effect | Badges, alerts |

### Hover Effects

| Class | Effect | Use Case |
|-------|--------|----------|
| `.btn-hover-lift` | Lift on hover | Buttons, links |
| `.card-3d` | 3D lift on hover | Cards |
| `.img-zoom-hover` | Image zoom on hover | Gallery images |

### Performance Classes

| Class | Purpose |
|-------|---------|
| `.will-animate` | Pre-optimize for animation |
| `.gpu-accelerate` | Force GPU acceleration |

### Stagger Delays

| Class | Delay |
|-------|-------|
| `.stagger-1` | 0.1s |
| `.stagger-2` | 0.2s |
| `.stagger-3` | 0.3s |
| `.stagger-4` | 0.4s |
| `.stagger-5` | 0.5s |

---

## 🎯 Common Patterns

### Animated Card
```html
<div class="card-3d gpu-accelerate img-zoom-hover">
  <img src="image.jpg" alt="Image">
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Animated Button
```html
<button class="btn-primary btn-hover-lift btn-pulse">
  <i class="fas fa-star"></i>
  Click Me
</button>
```

### Staggered List
```html
<div class="list">
  <div class="item animate-slide-up stagger-1">Item 1</div>
  <div class="item animate-slide-up stagger-2">Item 2</div>
  <div class="item animate-slide-up stagger-3">Item 3</div>
</div>
```

### Hero Section
```html
<section class="hero">
  <div class="hero-bg ken-burns gpu-accelerate"></div>
  <h1 class="animate-slide-up">Welcome</h1>
  <p class="animate-fade stagger-2">Description</p>
  <button class="btn-hover-lift btn-pulse">Get Started</button>
</section>
```

### Gallery Grid
```html
<div class="gallery">
  <div class="gallery-item img-zoom-hover gpu-accelerate">
    <img src="1.jpg" alt="Image 1">
  </div>
  <div class="gallery-item img-zoom-hover gpu-accelerate">
    <img src="2.jpg" alt="Image 2">
  </div>
</div>
```

---

## 🎨 AOS Data Attributes

### Basic Usage
```html
<div data-aos="fade-up">Content</div>
```

### With Options
```html
<div 
  data-aos="fade-up"
  data-aos-duration="1000"
  data-aos-delay="200"
  data-aos-easing="ease-in-out"
  data-aos-anchor-placement="center-center">
  Content
</div>
```

### AOS Animation Types
- `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `zoom-in`, `zoom-out`
- `flip-left`, `flip-right`, `flip-up`, `flip-down`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`

---

## ⚙️ GSAP Custom Animations

### Simple Animation
```javascript
gsap.from('.element', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power2.out'
});
```

### Scroll-Triggered Animation
```javascript
gsap.from('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 50,
  opacity: 0,
  duration: 1
});
```

### Stagger Animation
```javascript
gsap.from('.items', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out'
});
```

### Hover Animation
```javascript
element.addEventListener('mouseenter', () => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.3
  });
});
```

---

## 🎭 Easing Functions

### GSAP Easing
- `power1.out`, `power2.out`, `power3.out`, `power4.out`
- `back.out(1.7)` - Overshoot effect
- `elastic.out(1, 0.5)` - Elastic bounce
- `bounce.out` - Bouncing effect

### CSS Easing
- `ease`, `ease-in`, `ease-out`, `ease-in-out`
- `linear`
- `cubic-bezier(0.34, 1.56, 0.64, 1)` - Custom

---

## 📱 Responsive Animations

### Disable on Mobile
```css
@media (max-width: 768px) {
  .animate-complex {
    animation: none !important;
  }
}
```

### Reduce Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

---

## 🔧 Debugging

### Check if GSAP is Loaded
```javascript
console.log(typeof gsap); // Should output "object"
```

### Refresh ScrollTrigger
```javascript
ScrollTrigger.refresh();
```

### Kill All Animations
```javascript
gsap.killTweensOf('*');
```

### Check Animation State
```javascript
console.log(gsap.getProperty('.element', 'opacity'));
```

---

## 💡 Pro Tips

1. **Combine Classes**: Mix utility classes for complex effects
   ```html
   <div class="card-3d gpu-accelerate animate-slide-up">
   ```

2. **Performance**: Always add `gpu-accelerate` to animated elements

3. **Stagger**: Use stagger for lists and grids (looks professional)

4. **Subtle is Better**: Don't over-animate; less is more

5. **Test on Mobile**: Animations may perform differently on mobile

6. **Use will-animate**: Add before animating for better performance

7. **Accessibility**: Always respect `prefers-reduced-motion`

---

## 🎯 Best Practices

✅ **DO:**
- Use GPU acceleration for smooth animations
- Add stagger delays for multiple elements
- Test on multiple devices
- Respect user motion preferences
- Keep animations under 1 second

❌ **DON'T:**
- Animate too many elements at once
- Use heavy animations on mobile
- Ignore accessibility
- Animate layout properties (width, height)
- Chain too many animations

---

## 📞 Need Help?

- **GSAP Docs**: https://greensock.com/docs/
- **AOS Docs**: https://michalsnik.github.io/aos/
- **CSS Animations**: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

---

**Happy Animating! 🎨✨**
