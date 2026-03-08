/* ========================================
   GSAP ADVANCED ANIMATIONS
   Kaur Complex - Professional Animation System
   ======================================== */

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // ========================================
  // 1. NAVBAR ANIMATIONS
  // ========================================
  
  // Navbar slide down on page load
  gsap.from('.simple-navbar', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  });
  
  // Navbar color change on scroll
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {
      className: 'scrolled',
      targets: '.simple-navbar'
    },
    onEnter: () => {
      gsap.to('.simple-navbar', {
        backgroundColor: 'rgba(255,255,255,0.98)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        duration: 0.3
      });
    },
    onLeaveBack: () => {
      gsap.to('.simple-navbar', {
        backgroundColor: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        duration: 0.3
      });
    }
  });
  
  // Mobile menu stagger animation
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isActive = navMenu.classList.contains('active');
      
      if (!isActive) {
        gsap.from(navLinks, {
          x: -50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.1
        });
      }
    });
  }
  
  // ========================================
  // 2. HERO SECTION ANIMATIONS
  // ========================================
  
  // Ken Burns effect for hero background
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  heroSlides.forEach(slide => {
    gsap.to(slide, {
      scale: 1.15,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  });
  
  // Desktop hero text stagger
  const heroTitle = document.querySelector('.desktop-hero-title');
  if (heroTitle) {
    const titleText = heroTitle.textContent;
    const words = titleText.split(' ');
    heroTitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    gsap.from('.desktop-hero-title .word', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.5
    });
  }
  
  // Hero subtitle and description
  gsap.from('.desktop-hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.2
  });
  
  gsap.from('.desktop-hero-description', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.5
  });
  
  // Hero buttons with bounce
  gsap.from('.desktop-hero-buttons .hero-btn', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    delay: 1.8
  });
  
  // Hero image with rotation
  gsap.from('.hero-building-img', {
    x: 100,
    opacity: 0,
    rotation: 5,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.8
  });
  
  // Button hover micro-interactions
  document.querySelectorAll('.hero-btn, .btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // ========================================
  // 3. MASTERPLAN SECTION
  // ========================================
  
  gsap.from('.masterplan-section .section-intro h2', {
    scrollTrigger: {
      trigger: '.masterplan-section',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.masterplan-section .section-intro p', {
    scrollTrigger: {
      trigger: '.masterplan-section',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    },
    x: 80,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.masterplan-image', {
    scrollTrigger: {
      trigger: '.masterplan-visual',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
  
  // Parallax effect for masterplan image
  gsap.to('.masterplan-image', {
    scrollTrigger: {
      trigger: '.masterplan-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -50,
    ease: 'none'
  });
  
  // ========================================
  // 4. TOWERS SECTION
  // ========================================
  
  const towerItems = document.querySelectorAll('.tower-item');
  
  towerItems.forEach((tower, index) => {
    // Entrance animation with different effects
    let animProps = {};
    
    switch(index % 4) {
      case 0:
        animProps = { x: -100, rotation: -5 };
        break;
      case 1:
        animProps = { y: 100, scale: 0.8 };
        break;
      case 2:
        animProps = { x: 100, rotation: 5 };
        break;
      case 3:
        animProps = { y: -50, scale: 0.9 };
        break;
    }
    
    gsap.from(tower, {
      scrollTrigger: {
        trigger: tower,
        start: 'top 85%',
        end: 'top 30%',
        toggleActions: 'play none none reverse'
      },
      ...animProps,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: index * 0.15
    });
    
    // 3D hover effect
    tower.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -12,
        rotationX: 2,
        rotationY: 2,
        scale: 1.02,
        boxShadow: '0 25px 60px rgba(212,175,55,0.25)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(this.querySelector('.tower-image-container img'), {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    
    tower.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(this.querySelector('.tower-image-container img'), {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
  
  // Progress bar animation
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      width: width,
      duration: 1.5,
      ease: 'power2.out'
    });
  });
  
  // Tower badges pulse
  gsap.to('.tower-badge', {
    scale: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
  
  // ========================================
  // 5. GALLERY SECTION
  // ========================================
  
  gsap.from('.showcase-title', {
    scrollTrigger: {
      trigger: '.premium-gallery-showcase',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.showcase-subtitle', {
    scrollTrigger: {
      trigger: '.premium-gallery-showcase',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  // Main gallery card entrance
  gsap.from('.main-gallery-card', {
    scrollTrigger: {
      trigger: '.main-gallery-card',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.2)'
  });
  
  // Gallery card hover effect
  const mainGalleryCard = document.querySelector('.main-gallery-card');
  if (mainGalleryCard) {
    mainGalleryCard.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.02,
        y: -8,
        boxShadow: '0 30px 70px rgba(212,175,55,0.3)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(this.querySelector('img'), {
        scale: 1.1,
        filter: 'brightness(1.1)',
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    
    mainGalleryCard.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        y: 0,
        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(this.querySelector('img'), {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }
  
  // Gallery grid items stagger
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    gsap.from(galleryItems, {
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        from: 'random'
      },
      ease: 'back.out(1.2)'
    });
    
    // Individual hover effects
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('img'), {
          scale: 1.15,
          filter: 'brightness(1.15)',
          duration: 0.5,
          ease: 'power2.out'
        });
      });
      
      item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('img'), {
          scale: 1,
          filter: 'brightness(1)',
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }
  
  // Gallery modal animation
  const hiddenGallery = document.getElementById('hiddenGallery');
  if (hiddenGallery) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'style') {
          if (hiddenGallery.style.display === 'block') {
            gsap.from(hiddenGallery, {
              scale: 0.9,
              opacity: 0,
              duration: 0.4,
              ease: 'back.out(1.4)'
            });
          }
        }
      });
    });
    
    observer.observe(hiddenGallery, { attributes: true });
  }
  
  // ========================================
  // 6. CTA SECTION
  // ========================================
  
  // Letter stagger for CTA heading
  const ctaHeading = document.querySelector('.cta-heading');
  if (ctaHeading) {
    const text = ctaHeading.innerHTML;
    const lines = text.split('<br>');
    
    ctaHeading.innerHTML = lines.map(line => {
      if (line.includes('highlight')) {
        return line;
      }
      const letters = line.split('').map(char => 
        char === ' ' ? ' ' : `<span class="letter">${char}</span>`
      ).join('');
      return letters;
    }).join('<br>');
    
    gsap.from('.cta-heading .letter', {
      scrollTrigger: {
        trigger: '.cta-heading',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      rotationX: -90,
      duration: 0.6,
      stagger: 0.03,
      ease: 'back.out(1.2)'
    });
  }
  
  gsap.from('.cta-heading .highlight', {
    scrollTrigger: {
      trigger: '.cta-heading',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scale: 0,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: 'elastic.out(1, 0.5)'
  });
  
  gsap.from('.cta-text', {
    scrollTrigger: {
      trigger: '.cta-text',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.cta-buttons .btn-primary, .cta-buttons .btn-secondary', {
    scrollTrigger: {
      trigger: '.cta-buttons',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    delay: 1
  });
  
  // Pulse animation for CTA buttons
  gsap.to('.cta-buttons .btn-primary', {
    scale: 1.05,
    boxShadow: '0 12px 35px rgba(212,175,55,0.6)',
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
  
  // ========================================
  // 7. LOCATION SECTION
  // ========================================
  
  gsap.from('.location-title', {
    scrollTrigger: {
      trigger: '.enhanced-location-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.location-subtitle', {
    scrollTrigger: {
      trigger: '.enhanced-location-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  // Info cards alternate slide
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: index % 2 === 0 ? -60 : 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Info icons float
  gsap.to('.info-icon', {
    y: -8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: 0.2,
    ease: 'power1.inOut'
  });
  
  // Map container scale in
  gsap.from('.map-container', {
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Directions button
  gsap.from('.directions-btn', {
    scrollTrigger: {
      trigger: '.directions-btn',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // ========================================
  // 8. GLOBAL MICRO-INTERACTIONS
  // ========================================
  
  // All links hover
  document.querySelectorAll('a:not(.nav-link):not(.hero-btn):not(.btn-primary):not(.btn-secondary)').forEach(link => {
    link.addEventListener('mouseenter', function() {
      gsap.to(this, {
        x: 3,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
    
    link.addEventListener('mouseleave', function() {
      gsap.to(this, {
        x: 0,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  });
  
  // Icons rotation on hover
  document.querySelectorAll('.fa, .fas, .far, .fab').forEach(icon => {
    icon.parentElement.addEventListener('mouseenter', function() {
      gsap.to(icon, {
        rotation: 360,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
  
  // ========================================
  // 9. SCROLL-TRIGGERED EXIT ANIMATIONS
  // ========================================
  
  // Fade out elements when scrolling past
  const exitElements = document.querySelectorAll('.tower-item, .info-card, .gallery-item');
  exitElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        gsap.to(el, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.3,
          ease: 'power1.out'
        });
      },
      onEnterBack: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    });
  });
  
  // ========================================
  // 10. PERFORMANCE OPTIMIZATIONS
  // ========================================
  
  // Smooth scroll with GSAP
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80
          },
          ease: 'power3.inOut'
        });
      }
    });
  });
  
  // Refresh ScrollTrigger on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
  
  console.log('🎨 GSAP Animations Initialized - Kaur Complex');
});
