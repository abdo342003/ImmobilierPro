/**
 * i18n.js
 * Internationalization support for the blog
 */

// Available languages
const LANGUAGES = {
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    direction: 'ltr'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    direction: 'ltr'
  }
};

// Default language
const DEFAULT_LANGUAGE = 'fr';

// Translations
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.properties': 'Propriétés',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Blog page
    'blog.title': 'Notre Blog Immobilier',
    'blog.subtitle': 'Découvrez nos derniers articles, conseils et tendances du marché immobilier',
    'blog.search.placeholder': 'Rechercher un article...',
    'blog.categories.all': 'Toutes les catégories',
    'blog.categories.market': 'Marché immobilier',
    'blog.categories.investment': 'Investissement',
    'blog.categories.renovation': 'Rénovation',
    'blog.categories.legal': 'Juridique',
    'blog.categories.tips': 'Conseils',
    
    // Article metadata
    'article.readTime': 'min de lecture',
    'article.publishedOn': 'Publié le',
    'article.by': 'par',
    'article.tags': 'Tags:',
    'article.share': 'Partager',
    'article.like': 'J\'aime',
    'article.comments': 'Commentaires',
    
    // Load more
    'blog.loadMore': 'Charger plus d\'articles',
    'blog.noMoreArticles': 'Pas plus d\'articles à afficher',
    
    // Newsletter
    'newsletter.title': 'Abonnez-vous à notre newsletter',
    'newsletter.subtitle': 'Recevez nos derniers articles et conseils immobiliers directement dans votre boîte mail',
    'newsletter.placeholder': 'Votre adresse email',
    'newsletter.button': 'S\'abonner',
    'newsletter.success': 'Merci pour votre inscription ! Vérifiez votre boîte mail pour confirmer.',
    'newsletter.error': 'Veuillez entrer une adresse email valide.',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.whatsapp': 'WhatsApp',
    
    // Accessibility
    'a11y.skipToContent': 'Aller au contenu principal',
    'a11y.themeToggle': 'Changer de thème',
    'a11y.languageSelector': 'Sélectionner la langue',
    'a11y.mobileMenu': 'Menu mobile',
    'a11y.closeMenu': 'Fermer le menu',
    'a11y.backToTop': 'Retour en haut',
    
    // Footer
    'footer.copyright': 'Tous droits réservés',
    'footer.privacyPolicy': 'Politique de confidentialité',
    'footer.termsOfService': 'Conditions d\'utilisation'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Blog page
    'blog.title': 'Our Real Estate Blog',
    'blog.subtitle': 'Discover our latest articles, advice, and real estate market trends',
    'blog.search.placeholder': 'Search for an article...',
    'blog.categories.all': 'All categories',
    'blog.categories.market': 'Real estate market',
    'blog.categories.investment': 'Investment',
    'blog.categories.renovation': 'Renovation',
    'blog.categories.legal': 'Legal',
    'blog.categories.tips': 'Tips',
    
    // Article metadata
    'article.readTime': 'min read',
    'article.publishedOn': 'Published on',
    'article.by': 'by',
    'article.tags': 'Tags:',
    'article.share': 'Share',
    'article.like': 'Like',
    'article.comments': 'Comments',
    
    // Load more
    'blog.loadMore': 'Load more articles',
    'blog.noMoreArticles': 'No more articles to display',
    
    // Newsletter
    'newsletter.title': 'Subscribe to our newsletter',
    'newsletter.subtitle': 'Receive our latest articles and real estate advice directly in your inbox',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'Subscribe',
    'newsletter.success': 'Thank you for subscribing! Check your inbox to confirm.',
    'newsletter.error': 'Please enter a valid email address.',
    
    // Contact
    'contact.title': 'Contact us',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    
    // Accessibility
    'a11y.skipToContent': 'Skip to main content',
    'a11y.themeToggle': 'Toggle theme',
    'a11y.languageSelector': 'Select language',
    'a11y.mobileMenu': 'Mobile menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.backToTop': 'Back to top',
    
    // Footer
    'footer.copyright': 'All rights reserved',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service'
  }
};

/**
 * Get the current language from HTML lang attribute or localStorage
 * @returns {string} The current language code
 */
function getCurrentLanguage() {
  // Check localStorage first
  const savedLang = localStorage.getItem('language');
  if (savedLang && LANGUAGES[savedLang]) {
    return savedLang;
  }
  
  // Check HTML lang attribute
  const htmlLang = document.documentElement.lang;
  if (htmlLang && LANGUAGES[htmlLang]) {
    return htmlLang;
  }
  
  // Default to French
  return DEFAULT_LANGUAGE;
}

/**
 * Set the current language
 * @param {string} langCode - The language code to set
 */
function setLanguage(langCode) {
  if (!LANGUAGES[langCode]) {
    console.error(`Language ${langCode} is not supported`);
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('language', langCode);
  
  // Update HTML lang attribute
  document.documentElement.lang = langCode;
  document.documentElement.dir = LANGUAGES[langCode].direction;
  
  // Update all translatable elements
  updateTranslations();
  
  // Update language selector UI
  updateLanguageSelector(langCode);
  
  // Dispatch event for other components to react
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
}

/**
 * Update all translatable elements on the page
 */
function updateTranslations() {
  const currentLang = getCurrentLanguage();
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
  
  // Update placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.setAttribute('placeholder', translations[currentLang][key]);
    }
  });
  
  // Update aria-labels
  const ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
  ariaLabels.forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.setAttribute('aria-label', translations[currentLang][key]);
    }
  });
}

/**
 * Update the language selector UI
 * @param {string} langCode - The current language code
 */
function updateLanguageSelector(langCode) {
  const languageSelector = document.querySelector('.language-selector');
  if (!languageSelector) return;
  
  // Update current language display
  const currentLangDisplay = languageSelector.querySelector('.current-language');
  if (currentLangDisplay) {
    currentLangDisplay.textContent = `${LANGUAGES[langCode].flag} ${LANGUAGES[langCode].code.toUpperCase()}`;
  }
  
  // Update language options
  const languageOptions = languageSelector.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    const optionLang = option.getAttribute('data-lang');
    if (optionLang === langCode) {
      option.classList.add('active');
      option.setAttribute('aria-selected', 'true');
    } else {
      option.classList.remove('active');
      option.setAttribute('aria-selected', 'false');
    }
  });
}

/**
 * Initialize the internationalization system
 */
function initI18n() {
  const currentLang = getCurrentLanguage();
  
  // Set initial language
  setLanguage(currentLang);
  
  // Set up language selector
  setupLanguageSelector();
}

/**
 * Set up the language selector functionality
 */
function setupLanguageSelector() {
  const languageSelector = document.querySelector('.language-selector');
  if (!languageSelector) return;
  
  // Toggle language dropdown
  const currentLangBtn = languageSelector.querySelector('.current-language');
  const languageDropdown = languageSelector.querySelector('.language-dropdown');
  
  if (currentLangBtn && languageDropdown) {
    currentLangBtn.addEventListener('click', () => {
      const isExpanded = languageDropdown.classList.toggle('active');
      currentLangBtn.setAttribute('aria-expanded', isExpanded.toString());
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!languageSelector.contains(event.target)) {
        languageDropdown.classList.remove('active');
        currentLangBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Handle language selection
  const languageOptions = languageSelector.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    option.addEventListener('click', () => {
      const langCode = option.getAttribute('data-lang');
      setLanguage(langCode);
      
      // Close dropdown
      if (languageDropdown) {
        languageDropdown.classList.remove('active');
        if (currentLangBtn) {
          currentLangBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/**
 * Get a translation by key
 * @param {string} key - The translation key
 * @param {string} [lang] - Optional language code, defaults to current language
 * @returns {string} The translated text
 */
function translate(key, lang) {
  const langCode = lang || getCurrentLanguage();
  
  if (translations[langCode] && translations[langCode][key]) {
    return translations[langCode][key];
  }
  
  // Fallback to default language
  if (translations[DEFAULT_LANGUAGE] && translations[DEFAULT_LANGUAGE][key]) {
    return translations[DEFAULT_LANGUAGE][key];
  }
  
  // Return the key if no translation found
  return key;
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initI18n);

// Export functions for use in other modules
export {
  getCurrentLanguage,
  setLanguage,
  translate,
  LANGUAGES,
  DEFAULT_LANGUAGE
};