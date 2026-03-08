/* ========================================
   LENIS SMOOTH SCROLL INTEGRATION
   Ultra-smooth scrolling experience
   ======================================== */

// Initialize Lenis Smooth Scroll (Optional Enhancement)
// Uncomment the code below to enable Lenis smooth scrolling

/*
// Add this script tag to your HTML before closing </body>:
// <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Lenis scroll event
  lenis.on('scroll', (e) => {
    // Update ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.update();
    }
  });

  // Request animation frame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrate with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Anchor link smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  // Stop scroll on specific elements
  document.querySelectorAll('.modal, .lightbox').forEach(element => {
    element.addEventListener('mouseenter', () => lenis.stop());
    element.addEventListener('mouseleave', () => lenis.start());
  });

  console.log('✨ Lenis Smooth Scroll Initialized');
});
*/

// ========================================
// ALTERNATIVE: CSS-ONLY SMOOTH SCROLL
// Lightweight alternative without library
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Enable smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Enhanced anchor link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
  
  // Smooth scroll to top button (if exists)
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
  }
  
  console.log('✨ Smooth Scroll Ready');
});

// ========================================
// PERFORMANCE MONITORING (Disabled for production)
// ========================================

// Performance monitoring disabled to reduce console noise
// Uncomment below to enable FPS monitoring during development

/*
let lastScrollTime = Date.now();
let scrollCount = 0;

window.addEventListener('scroll', function() {
  scrollCount++;
  const now = Date.now();
  
  if (now - lastScrollTime > 1000) {
    const fps = scrollCount;
    if (fps < 30) {
      console.warn('⚠️ Low scroll performance detected:', fps, 'fps');
    }
    scrollCount = 0;
    lastScrollTime = now;
  }
}, { passive: true });
*/
