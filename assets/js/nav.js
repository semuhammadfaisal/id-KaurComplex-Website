// Navigation Script
(function() {
  function initNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
    }
    
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          e.stopPropagation();
          
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Close mobile menu
            if (navMenu && navMenu.classList.contains('active')) {
              navMenu.classList.remove('active');
              navToggle.classList.remove('active');
              document.body.classList.remove('nav-open');
            }
          }
        }
      });
    });
  }
  
  // Wait for navbar to be loaded
  const checkNav = setInterval(function() {
    if (document.getElementById('nav-toggle')) {
      clearInterval(checkNav);
      initNav();
    }
  }, 100);
})();
