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
    // Improved dropdown logic for mobile
    document.querySelectorAll('.nav-dropdown').forEach(function(navDropdown) {
        var trigger = navDropdown.querySelector('span');
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    navDropdown.classList.toggle('dropdown-open');
                }
            });
        }
        var dropdownMenu = navDropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.stopPropagation();
                }
            });
        }
    });

    // Dropdown for Properties (mobile)
    const navDropdown = document.querySelector('.nav-dropdown');
    if (navDropdown) {
        const dropdownToggle = navDropdown.querySelector('span');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    navDropdown.classList.toggle('open');
                }
            });
        }
    }
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

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to set initial responsive state
    function setInitialNavState() {
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('active'); // Ensure menu is hidden on mobile
            navToggle.style.display = 'flex'; // Show hamburger menu
        } else {
            navMenu.classList.remove('active'); // Ensure menu is visible on desktop
            navToggle.style.display = 'none'; // Hide hamburger menu
        }
        // Set .scrolled class based on initial scroll position
        navbar.classList.toggle('scrolled', window.scrollY > 200);
    }

    // Run on page load
    setInitialNavState();

    // Update on resize
    window.addEventListener('resize', setInitialNavState);

    // Scroll handler for .scrolled class
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 200);
    });

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    // Update active link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
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
    let currentImageIndex = 0;
    const images = [];
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push({
            src: img.src,
            alt: img.alt,
            title: item.querySelector('h4')?.textContent || '',
            description: item.querySelector('p')?.textContent || ''
        });

        item.addEventListener('click', () => openLightbox(index));
        item.querySelector('.view-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        document.querySelector('.lightbox-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        const currentImage = images[currentImageIndex];
        const lightbox = document.querySelector('.lightbox-modal');
        lightbox.querySelector('.lightbox-image').src = currentImage.src;
        lightbox.querySelector('.image-title').textContent = currentImage.title;
        lightbox.querySelector('.image-description').textContent = currentImage.description;
    }

    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    document.querySelector('.prev-btn').addEventListener('click', () => navigateImage(-1));
    document.querySelector('.next-btn').addEventListener('click', () => navigateImage(1));

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        updateLightbox();
    }

    function closeLightbox() {
        document.querySelector('.lightbox-modal').classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (!document.querySelector('.lightbox-modal').classList.contains('active')) return;
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
window.addEventListener('scroll', () => {
    const showPosition = window.innerHeight / 2;
    backToTopBtn.classList.toggle('show', window.scrollY > showPosition);
});
}

// WhatsApp
function initWhatsApp() {
    document.querySelector('.whatsapp-float a')?.addEventListener('click', () => {
        console.log('WhatsApp clicked');
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
    
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('section-visible');
        });
    }, { threshold: 0.1 }).observe(document.querySelectorAll('section'));
}

// Testimonial Slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    
    const slides = document.querySelectorAll('.testimonial-card'); // Changed from .testimonial-slide
    const dotsContainer = document.querySelector('.testimonial-dots'); // Changed from .slider-dots
    let currentIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    const getSlideWidth = () => slides[0].offsetWidth;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        document.querySelector('.nav-btn.prev-btn').disabled = currentIndex === 0;
        document.querySelector('.nav-btn.next-btn').disabled = currentIndex === slides.length - 1;
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    }

    document.querySelector('.nav-btn.prev-btn').addEventListener('click', prevSlide);
    document.querySelector('.nav-btn.next-btn').addEventListener('click', nextSlide);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

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
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        const toggleBtn = card.querySelector('.value-toggle-btn');
        
        toggleBtn.addEventListener('click', function() {
            card.classList.toggle('active');
            
            // Close other open cards if needed
            // valueCards.forEach(otherCard => {
            //     if (otherCard !== card) {
            //         otherCard.classList.remove('active');
            //     }
            // });
        });
    });
});

// gallery.js
class Gallery {
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.data = options.data || [];
        this.itemsPerLoad = options.itemsPerLoad || 12;
        this.currentItems = 0;
        this.activeFilter = 'all';
        this.currentLightboxIndex = 0;
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
        this.loadInitialItems();
    }

    renderGallery() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create loading placeholders
        for (let i = 0; i < this.itemsPerLoad; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'gallery-item loading-placeholder';
            this.container.appendChild(placeholder);
        }
    }

    loadInitialItems() {
        this.loadMoreItems();
    }

    loadMoreItems() {
        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(this.currentItems + this.itemsPerLoad, this.data.length);
        
        for (let i = this.currentItems; i < endIndex; i++) {
            const item = this.data[i];
            
            // Skip if item doesn't match current filter
            if (this.activeFilter !== 'all' && item.category !== this.activeFilter) {
                continue;
            }
            
            const galleryItem = this.createGalleryItem(item);
            fragment.appendChild(galleryItem);
        }
        
        // Replace placeholders with actual items
        const placeholders = this.container.querySelectorAll('.loading-placeholder');
        if (placeholders.length > 0) {
            placeholders[0].replaceWith(fragment);
        } else {
            this.container.appendChild(fragment);
        }
        
        this.currentItems = endIndex;
        
        // Update load more button visibility
        this.updateLoadMoreButton();
        
        // Initialize lazy loading for images
        this.initLazyLoading();
    }

    createGalleryItem(item) {
        const itemElement = document.createElement('div');
        itemElement.className = `gallery-item`;
        itemElement.dataset.category = item.category;
        
        itemElement.innerHTML = `
            <img src="${item.placeholder || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='}" 
                 data-src="${item.src}" 
                 alt="${item.alt}" 
                 loading="lazy"
                 class="lazy">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <i class="fas fa-expand" aria-hidden="true"></i>
            </div>
        `;
        
        return itemElement;
    }

    initLazyLoading() {
        const lazyImages = this.container.querySelectorAll('img.lazy');
        
        const lazyLoad = (image) => {
            if (image.classList.contains('loaded')) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        
                        img.onload = () => {
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        };
                    }
                });
            });
            
            observer.observe(image);
        };
        
        lazyImages.forEach(lazyLoad);
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.activeFilter = button.dataset.filter;
                
                // Update button states
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
                    btn.classList.toggle('active', btn === button);
                });
                
                // Filter items
                this.currentItems = 0;
                this.renderGallery();
                this.loadMoreItems();
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreItems());
        }
        
        // Gallery item clicks
        this.container.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            const expandBtn = e.target.closest('.fa-expand');
            
            if (galleryItem && expandBtn) {
                const index = Array.from(this.container.children).indexOf(galleryItem);
                this.openLightbox(index);
            }
        });
        
        // Lightbox controls
        document.getElementById('closeLightbox')?.addEventListener('click', () => this.closeLightbox());
        document.getElementById('prevBtn')?.addEventListener('click', () => this.navigateLightbox(-1));
        document.getElementById('nextBtn')?.addEventListener('click', () => this.navigateLightbox(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightboxModal');
            if (!lightbox || !lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigateLightbox(1);
            }
        });
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        const filteredItems = this.activeFilter === 'all' 
            ? this.data 
            : this.data.filter(item => item.category === this.activeFilter);
        
        loadMoreBtn.style.display = this.currentItems >= filteredItems.length ? 'none' : 'block';
    }

    openLightbox(index) {
        this.currentLightboxIndex = index;
        const item = this.data[index];
        const lightbox = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDesc = document.getElementById('lightboxDesc');
        const lightboxCounter = document.getElementById('lightboxCounter');
        
        // Set content
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
        lightboxCounter.textContent = `${index + 1} of ${this.data.length}`;
        
        // Show loading
        lightboxImg.classList.remove('loaded');
        
        // Load image
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        
        lightboxImg.onload = () => {
            lightboxImg.classList.add('loaded');
        };
        
        // Show lightbox
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightboxModal');
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        let newIndex = this.currentLightboxIndex + direction;
        
        // Wrap around
        if (newIndex < 0) {
            newIndex = this.data.length - 1;
        } else if (newIndex >= this.data.length) {
            newIndex = 0;
        }
        
        this.openLightbox(newIndex);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Optional: Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// Add to your main.js
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();