/**
 * blog-features.js
 * Additional features for the blog page
 */

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.nav-mobile');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const floatingContactBtn = document.querySelector('.toggle-contact-options');
const contactOptions = document.getElementById('contact-options');
const newsletterForm = document.querySelector('.subscribe-form');

/**
 * Initialize additional blog features
 */
function initFeatures() {
  // Set up theme toggle
  setupThemeToggle();
  
  // Set up mobile menu
  setupMobileMenu();
  
  // Set up floating contact
  setupFloatingContact();
  
  // Set up newsletter form
  setupNewsletterForm();
  
  // Set up lazy loading for images
  setupLazyLoading();
  
  // Set up scroll animations
  setupScrollAnimations();
}

/**
 * Set up theme toggle functionality
 */
function setupThemeToggle() {
  if (!themeToggle) return;
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    updateThemeIcon(true);
  }
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', isDark.toString());
    updateThemeIcon(isDark);
  });
}

/**
 * Update theme toggle icon based on current theme
 * @param {boolean} isDark - Whether the theme is dark
 */
function updateThemeIcon(isDark) {
  const themeIcon = themeToggle.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = isDark ? '🌙' : '☀️';
  }
}

/**
 * Set up mobile menu functionality
 */
function setupMobileMenu() {
  if (!mobileMenuBtn || !mobileNav || !mobileMenuClose) return;
  
  // Open mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Focus on close button for accessibility
    setTimeout(() => mobileMenuClose.focus(), 100);
  });
  
  // Close mobile menu
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

/**
 * Close the mobile menu
 */
function closeMobileMenu() {
  mobileNav.classList.remove('active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = ''; // Restore scrolling
  
  // Return focus to menu button for accessibility
  setTimeout(() => mobileMenuBtn.focus(), 100);
}

/**
 * Set up floating contact functionality
 */
function setupFloatingContact() {
  if (!floatingContactBtn || !contactOptions) return;
  
  floatingContactBtn.addEventListener('click', () => {
    const isExpanded = contactOptions.classList.toggle('active');
    floatingContactBtn.setAttribute('aria-expanded', isExpanded.toString());
  });
  
  // Close contact options when clicking outside
  document.addEventListener('click', (event) => {
    if (contactOptions.classList.contains('active') && 
        !contactOptions.contains(event.target) && 
        !floatingContactBtn.contains(event.target)) {
      contactOptions.classList.remove('active');
      floatingContactBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Set up newsletter form functionality
 */
function setupNewsletterForm() {
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
      // In a real application, you would send this to the server
      // subscribeToNewsletter(email);
      
      // Show success message
      showNewsletterMessage(true);
      
      // Clear the form
      emailInput.value = '';
    } else {
      // Show error message
      showNewsletterMessage(false);
    }
  });
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show newsletter subscription message
 * @param {boolean} success - Whether the subscription was successful
 */
function showNewsletterMessage(success) {
  // Remove any existing message
  const existingMessage = document.querySelector('.newsletter-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `newsletter-message ${success ? 'success' : 'error'}`;
  
  // Get the current language
  const currentLang = document.documentElement.lang || 'fr';
  
  // Set the text based on language and success state
  if (success) {
    if (currentLang === 'fr') {
      messageDiv.textContent = 'Merci pour votre inscription ! Vérifiez votre boîte mail pour confirmer.';
    } else {
      messageDiv.textContent = 'Thank you for subscribing! Check your inbox to confirm.';
    }
  } else {
    if (currentLang === 'fr') {
      messageDiv.textContent = 'Veuillez entrer une adresse email valide.';
    } else {
      messageDiv.textContent = 'Please enter a valid email address.';
    }
  }
  
  // Add message to the form
  newsletterForm.appendChild(messageDiv);
  
  // Remove message after delay if it's a success message
  if (success) {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

/**
 * Set up lazy loading for images
 */
function setupLazyLoading() {
  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    // The 'loading="lazy"' attribute is already set in HTML
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        // Store the src in data-src if not already there
        if (!img.dataset.src && img.src) {
          img.dataset.src = img.src;
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        }
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      // Load all images immediately
      lazyImages.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }
  }
}

/**
 * Set up scroll animations
 */
function setupScrollAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.blog-card, .blog-hero-content, .newsletter-content');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      animationObserver.observe(el);
    });
  }
}

/**
 * Handle back-to-top functionality
 */
function setupBackToTop() {
  // Create back-to-top button if it doesn't exist
  let backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut');
    backToTopBtn.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(backToTopBtn);
    
    // Initially hide the button
    backToTopBtn.style.display = 'none';
  }
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initFeatures();
  setupBackToTop();
});

// Export functions for use in other modules
export {
  setupThemeToggle,
  setupMobileMenu,
  setupFloatingContact,
  setupNewsletterForm,
  setupLazyLoading,
  setupScrollAnimations,
  setupBackToTop
};