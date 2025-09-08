/**
 * blog-core.js
 * Core functionality for the blog page
 */

// DOM Elements
const blogGrid = document.getElementById('blog-grid');
const blogSearch = document.getElementById('blog-search');
const categoryButtons = document.querySelectorAll('.category-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loadMoreInfo = document.querySelector('.load-more-info');

// State
let currentCategory = 'all';
let searchQuery = '';
let visibleArticles = 6;
let totalArticles = 0;

/**
 * Initialize the blog functionality
 */
function initBlog() {
  // Count total articles
  totalArticles = document.querySelectorAll('.blog-card').length;
  
  // Update load more info
  updateLoadMoreInfo();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize article visibility
  updateArticleVisibility();
}

/**
 * Set up event listeners for blog interactions
 */
function setupEventListeners() {
  // Search functionality
  if (blogSearch) {
    blogSearch.addEventListener('input', handleSearch);
  }
  
  // Category filtering
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => handleCategoryChange(button));
  });
  
  // Load more articles
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreArticles);
  }
  
  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', handleLikeClick);
  });
  
  // Share buttons
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', handleShareClick);
  });
}

/**
 * Handle search input
 * @param {Event} event - The input event
 */
function handleSearch(event) {
  searchQuery = event.target.value.toLowerCase().trim();
  visibleArticles = 6; // Reset visible articles count when searching
  updateArticleVisibility();
}

/**
 * Handle category change
 * @param {HTMLElement} selectedButton - The clicked category button
 */
function handleCategoryChange(selectedButton) {
  // Update active state
  categoryButtons.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-pressed', 'false');
  });
  
  selectedButton.classList.add('active');
  selectedButton.setAttribute('aria-pressed', 'true');
  
  // Update current category
  currentCategory = selectedButton.dataset.category;
  
  // Reset visible articles count when changing category
  visibleArticles = 6;
  
  // Update article visibility
  updateArticleVisibility();
}

/**
 * Update article visibility based on current filters
 */
function updateArticleVisibility() {
  const articles = document.querySelectorAll('.blog-card');
  let visibleCount = 0;
  let totalMatchingCount = 0;
  
  articles.forEach((article, index) => {
    const articleCategory = article.dataset.category;
    const articleTitle = article.querySelector('.blog-title').textContent.toLowerCase();
    const articleExcerpt = article.querySelector('.blog-excerpt').textContent.toLowerCase();
    const articleTags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    
    // Check if article matches current filters
    const matchesCategory = currentCategory === 'all' || articleCategory === currentCategory;
    const matchesSearch = searchQuery === '' || 
                          articleTitle.includes(searchQuery) || 
                          articleExcerpt.includes(searchQuery) ||
                          articleTags.some(tag => tag.includes(searchQuery));
    
    const isVisible = matchesCategory && matchesSearch;
    
    // Count total matching articles
    if (isVisible) {
      totalMatchingCount++;
      
      // Show article if it's within the visible count
      if (visibleCount < visibleArticles) {
        article.style.display = '';
        visibleCount++;
      } else {
        article.style.display = 'none';
      }
    } else {
      article.style.display = 'none';
    }
  });
  
  // Update load more button visibility
  if (loadMoreBtn) {
    loadMoreBtn.style.display = visibleCount < totalMatchingCount ? '' : 'none';
  }
  
  // Update load more info text
  updateLoadMoreInfo(visibleCount, totalMatchingCount);
  
  // Show message if no results
  showNoResultsMessage(totalMatchingCount === 0);
}

/**
 * Load more articles
 */
function loadMoreArticles() {
  visibleArticles += 3; // Increase the number of visible articles
  updateArticleVisibility();
}

/**
 * Update the load more info text
 * @param {number} visibleCount - Number of currently visible articles
 * @param {number} totalCount - Total number of matching articles
 */
function updateLoadMoreInfo(visibleCount = visibleArticles, totalCount = totalArticles) {
  if (loadMoreInfo) {
    const infoText = document.querySelector('[data-i18n="loadMoreInfo"]');
    if (infoText) {
      // Get the current language
      const currentLang = document.documentElement.lang || 'fr';
      
      // Set the text based on language
      if (currentLang === 'fr') {
        infoText.textContent = `Affichage de ${visibleCount} articles sur ${totalCount}+`;
      } else {
        infoText.textContent = `Showing ${visibleCount} of ${totalCount}+ articles`;
      }
    }
  }
}

/**
 * Show a message when no results are found
 * @param {boolean} show - Whether to show the message
 */
function showNoResultsMessage(show) {
  // Remove existing message if any
  const existingMessage = document.getElementById('no-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  if (show && blogGrid) {
    // Create and insert message
    const messageDiv = document.createElement('div');
    messageDiv.id = 'no-results-message';
    messageDiv.className = 'no-results-message';
    
    // Get the current language
    const currentLang = document.documentElement.lang || 'fr';
    
    // Set the text based on language
    if (currentLang === 'fr') {
      messageDiv.textContent = 'Aucun article ne correspond à votre recherche. Essayez d\'autres termes ou catégories.';
    } else {
      messageDiv.textContent = 'No articles match your search. Try different terms or categories.';
    }
    
    blogGrid.appendChild(messageDiv);
  }
}

/**
 * Handle like button click
 * @param {Event} event - The click event
 */
function handleLikeClick(event) {
  const button = event.currentTarget;
  const isLiked = button.getAttribute('aria-pressed') === 'true';
  const countElement = button.querySelector('.action-count');
  const iconElement = button.querySelector('.icon');
  
  // Toggle like state
  button.setAttribute('aria-pressed', !isLiked);
  
  // Update count
  if (countElement) {
    let count = parseInt(countElement.textContent, 10) || 0;
    count = isLiked ? count - 1 : count + 1;
    countElement.textContent = count;
  }
  
  // Update icon
  if (iconElement) {
    iconElement.textContent = isLiked ? '🤍' : '❤️';
  }
  
  // In a real application, you would send this to the server
  // saveArticleLike(button.closest('.blog-card').dataset.id, !isLiked);
}

/**
 * Handle share button click
 * @param {Event} event - The click event
 */
function handleShareClick(event) {
  const article = event.currentTarget.closest('.blog-card');
  const articleTitle = article.querySelector('.blog-title a').textContent;
  const articleUrl = article.querySelector('.blog-title a').getAttribute('href');
  
  // Use Web Share API if available
  if (navigator.share) {
    navigator.share({
      title: articleTitle,
      url: new URL(articleUrl, window.location.origin).href
    }).catch(error => console.warn('Error sharing:', error));
  } else {
    // Fallback to copying to clipboard
    const fullUrl = new URL(articleUrl, window.location.origin).href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      // Show a temporary tooltip
      const button = event.currentTarget;
      const originalTitle = button.getAttribute('aria-label');
      
      // Get the current language
      const currentLang = document.documentElement.lang || 'fr';
      
      // Set the text based on language
      if (currentLang === 'fr') {
        button.setAttribute('aria-label', 'Lien copié !');
      } else {
        button.setAttribute('aria-label', 'Link copied!');
      }
      
      setTimeout(() => {
        button.setAttribute('aria-label', originalTitle);
      }, 2000);
    });
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBlog);

// Export functions for use in other modules
export {
  handleSearch,
  handleCategoryChange,
  loadMoreArticles,
  handleLikeClick,
  handleShareClick
};