// Main JavaScript for Kaur Complex Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initCounters();
    initSmoothScrolling();
    initGallery();
    initForms();
    initBackToTop();
    initWhatsApp();
    initAnimations();
    initTestimonialSlider();
    initVideoEnhancements();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 300);
        }, 1000);
    }
}

// Navigation - Updated to use enhanced version
function initNavigation() {
    initEnhancedNavigation();
    initNavbarDropdown();
}

// Scroll Effects
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .stat-item, .gallery-item').forEach(el => observer.observe(el));
}

// Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000;
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / speed, 1);
            const currentValue = Math.floor(progress * (2 - progress) * target);
            counter.textContent = currentValue + suffix;
            if (progress < 1) requestAnimationFrame(updateCounter);
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return; // Exit if no gallery items
    
    let currentImageIndex = 0;
    const images = [];
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        images.push({
            src: img.src,
            alt: img.alt,
            title: item.querySelector('h4')?.textContent || '',
            description: item.querySelector('p')?.textContent || ''
        });

        item.addEventListener('click', () => openLightbox(index));
        const viewBtn = item.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        }
    });

    function openLightbox(index) {
        const lightboxModal = document.querySelector('.lightbox-modal');
        if (!lightboxModal) return;
        
        currentImageIndex = index;
        updateLightbox();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        const currentImage = images[currentImageIndex];
        const lightbox = document.querySelector('.lightbox-modal');
        if (!lightbox || !currentImage) return;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const imageTitle = lightbox.querySelector('.image-title');
        const imageDescription = lightbox.querySelector('.image-description');
        
        if (lightboxImage) lightboxImage.src = currentImage.src;
        if (imageTitle) imageTitle.textContent = currentImage.title;
        if (imageDescription) imageDescription.textContent = currentImage.description;
    }

    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateImage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateImage(1));

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        updateLightbox();
    }

    function closeLightbox() {
        const lightboxModal = document.querySelector('.lightbox-modal');
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('keydown', (e) => {
        const lightboxModal = document.querySelector('.lightbox-modal');
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
    });

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            
            galleryItems.forEach(item => {
                item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
            });
        });
    });
}

// Forms
function initForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.isConnected) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });
}

// Back to Top
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    window.addEventListener('scroll', () => {
        const showPosition = window.innerHeight / 2;
        backToTopBtn.classList.toggle('show', window.scrollY > showPosition);
    });
}

// WhatsApp
function initWhatsApp() {
    document.querySelector('.whatsapp-float a')?.addEventListener('click', () => {
    });
}

// Animations
function initAnimations() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Only apply parallax on larger screens
        function updateHeroTransform() {
            if (window.innerWidth > 768) {
                hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
            } else {
                hero.style.transform = 'none'; // Reset transform on mobile
            }
        }
        window.addEventListener('scroll', updateHeroTransform);
        window.addEventListener('resize', updateHeroTransform);
        updateHeroTransform(); // Run on page load
    }
    // Fix: Observe each section element individually
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('section-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// Testimonial Slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    
    const slides = document.querySelectorAll('.testimonial-card');
    if (!slides.length) return;

    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;

    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');
    const getSlideWidth = () => slides[0].offsetWidth;
    const prevBtn = document.querySelector('.nav-btn.prev-btn');
    const nextBtn = document.querySelector('.nav-btn.next-btn');

    if (!prevBtn || !nextBtn) return;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }

    function goToSlide(index) { currentIndex = index; updateSlider(); }
    function nextSlide() { if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1); }
    function prevSlide() { if (currentIndex > 0) goToSlide(currentIndex - 1); }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    let autoplay = setInterval(nextSlide, 5000);
    const container = document.querySelector('.testimonials-section');
    container?.addEventListener('mouseenter', () => clearInterval(autoplay));
    container?.addEventListener('mouseleave', () => autoplay = setInterval(nextSlide, 5000));

    window.addEventListener('resize', () => setTimeout(updateSlider, 100));
    updateSlider();
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// handle the click functionality
document.addEventListener('DOMContentLoaded', function() {
    // Value cards toggle
    document.querySelectorAll('.value-card').forEach(card => {
        card.querySelector('.value-toggle-btn')?.addEventListener('click', function() {
            card.classList.toggle('active');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question')?.addEventListener('click', () => {
            faqItems.forEach(other => { if (other !== item) other.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });
    if (faqItems.length > 0) faqItems[0].classList.add('active');
});

// Add to your main.js
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Enhanced navbar dropdown functionality
function initNavbarDropdown() {
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) return;
        
        // Mobile: Toggle dropdown on click
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                navDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('open');
            }
        });
        
        // Desktop: Handle hover with delay for better UX
        let hoverTimeout;
        
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                clearTimeout(hoverTimeout);
                dropdown.classList.add('hover');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                hoverTimeout = setTimeout(() => {
                    dropdown.classList.remove('hover');
                }, 150);
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            navDropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        }
    });
    
    // Close dropdowns when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
}

// Enhanced navigation with smooth animations
function initEnhancedNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Smooth scroll behavior for navbar background
    let ticking = false;
    
    function updateNavbar() {
        const scrolled = window.scrollY > 50;
        navbar?.classList.toggle('scrolled', scrolled);
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Enhanced mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navToggle.classList.contains('active');
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open', !isActive);
            
            // Add animation delay for menu items
            if (!isActive) {
                const menuItems = navMenu.querySelectorAll('.nav-link, .nav-cta');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('animate-in');
                });
            }
        });
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && 
            !navbar?.contains(e.target) && 
            navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active', 
                        href === `#${id}` || 
                        href === `../#${id}` || 
                        (href.includes('index.html') && id === 'home')
                    );
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Video Enhancement Utilities
function initVideoEnhancements() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        const container = video.closest('.video-container');
        if (!container) return;

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'video-loading';
        loadingDiv.innerHTML = '<div class="spinner"></div><p>Loading video...</p>';
        loadingDiv.style.display = 'none';
        container.appendChild(loadingDiv);

        video.addEventListener('loadstart', () => { loadingDiv.style.display = 'block'; });
        video.addEventListener('canplay', () => { loadingDiv.style.display = 'none'; });
        video.addEventListener('error', () => {
            loadingDiv.style.display = 'none';
            const errorDiv = container.querySelector('.video-error, #videoError');
            if (errorDiv) { video.style.display = 'none'; errorDiv.style.display = 'block'; }
        });
    });
}