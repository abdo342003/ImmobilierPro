# Blog Page Documentation

## Architecture Overview

The blog page is part of a hybrid application that combines:

1. **Static HTML/CSS/JS Pages**: The blog page (`blog.html`) is built using traditional web technologies with modern features.
2. **React Application**: The main application (`index.html`, `src/`) is built using React and communicates with a Django backend.

## File Structure

```
├── blog.html                # Static blog page
├── css/                     # CSS files (to be created)
│   ├── blog-styles.css      # Blog-specific styles
│   └── components.css       # Reusable component styles
├── js/                      # JavaScript files (to be created)
│   ├── blog-core.js         # Core blog functionality
│   ├── blog-features.js     # Additional blog features
│   └── i18n.js              # Internationalization support
├── src/                     # React application source
│   ├── App.jsx              # Main React component
│   ├── api.js               # API configuration
│   └── main.jsx             # React entry point
└── index.html               # React application entry point
```

## Blog Page Components

### HTML Structure

The blog page follows a semantic HTML structure with the following main sections:

1. **Header**: Navigation, language switcher, theme toggle, and mobile menu
2. **Main Content**:
   - Blog Hero Section: Title, description, and statistics
   - Blog Section: Search, categories, and article grid
   - Newsletter Section: Email subscription form
3. **Footer**: Site information and links
4. **Floating Contact**: Quick contact options

### CSS Organization

The CSS is organized into two main files:

1. **blog-styles.css**: Blog-specific styles including:
   - Layout and grid system
   - Typography and colors
   - Blog cards and article styling
   - Responsive design rules

2. **components.css**: Reusable components including:
   - Buttons and form elements
   - Navigation components
   - Cards and containers
   - Utility classes

### JavaScript Functionality

The JavaScript is organized into three main files:

1. **blog-core.js**: Core functionality including:
   - DOM manipulation
   - Event handling
   - Article filtering and search

2. **blog-features.js**: Additional features including:
   - Category filtering
   - Lazy loading of articles
   - Like and share functionality

3. **i18n.js**: Internationalization support including:
   - Language switching
   - Text translation
   - RTL/LTR support

## Adding New Content

### Adding a New Blog Post

To add a new blog post, follow this template structure:

```html
<article class="blog-card" data-category="category-name" data-id="unique-post-id">
    <div class="blog-image">
        <img src="path/to/image.jpg" alt="Descriptive alt text" loading="lazy">
        <div class="blog-category category-name-category">
            <span class="category-icon" aria-hidden="true">🔍</span>
            <span data-i18n="categoryName">Category Name</span>
        </div>
        <!-- Optional featured badge -->
    </div>
    <div class="blog-content">
        <div class="blog-meta">
            <div class="author-info">
                <img src="/path/to/author-image.jpg" alt="Author name" class="author-avatar">
                <span class="blog-author" data-i18n="byAuthor">By Author Name</span>
            </div>
            <div class="blog-details">
                <time datetime="YYYY-MM-DD" class="blog-date">Date</time>
                <span class="blog-separator" aria-hidden="true">•</span>
                <span class="blog-read-time" data-i18n="readTime">X min read</span>
                <span class="blog-separator" aria-hidden="true">•</span>
                <span class="blog-views">X views</span>
            </div>
        </div>
        <h3 class="blog-title">
            <a href="/blog/post-url" data-i18n="postTitleKey">Post Title</a>
        </h3>
        <p class="blog-excerpt" data-i18n="postExcerptKey">Post excerpt...</p>
        <div class="blog-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
        </div>
        <div class="blog-footer">
            <a href="/blog/post-url" class="read-more-btn">
                <span data-i18n="readMore">Read More</span>
                <span class="arrow" aria-hidden="true">→</span>
            </a>
            <div class="blog-actions">
                <button class="action-btn like-btn" aria-label="Like this article" aria-pressed="false">
                    <span class="icon" aria-hidden="true">🤍</span>
                    <span class="action-count">0</span>
                </button>
                <button class="action-btn share-btn" aria-label="Share this article">
                    <span class="icon" aria-hidden="true">↗</span>
                </button>
            </div>
        </div>
    </div>
</article>
```

### Adding a New Category

1. Add a new category button in the `.blog-categories` section:

```html
<button class="category-btn" data-category="new-category" aria-pressed="false">
    <span class="category-icon" aria-hidden="true">🔍</span>
    <span class="category-text" data-i18n="newCategoryKey">New Category</span>
    <span class="category-count" aria-label="X articles">X</span>
</button>
```

2. Add the category to the i18n.js file for internationalization support
3. Add CSS styles for the new category in blog-styles.css
4. Update the JavaScript filtering logic in blog-features.js

## Theme Switching

The theme switching functionality is implemented using the following approach:

1. The HTML document has a class attribute on the `<html>` element that can be toggled between `light` and `dark`
2. CSS variables are defined for both themes in blog-styles.css
3. The theme toggle button in the header triggers the theme change via JavaScript
4. The selected theme is stored in localStorage for persistence

### Implementation Notes

- Use the `data-theme` attribute for theme-specific styling
- Ensure all colors use CSS variables for easy theme switching
- Test both themes for sufficient contrast and accessibility

## Internationalization

The internationalization system uses the following approach:

1. HTML elements use `data-i18n` attributes to specify translation keys
2. The language switcher in the header allows toggling between languages
3. The i18n.js file contains the translation logic and language dictionaries
4. The `<html>` element's `lang` and `dir` attributes are updated based on the selected language

### Adding New Translations

1. Add new translation keys and values to the language dictionaries in i18n.js
2. Use the `data-i18n` attribute on HTML elements that need translation
3. For dynamic content, use the translation function provided in i18n.js

## Accessibility Features

The blog page implements the following accessibility features:

1. **Semantic HTML**: Proper use of headings, landmarks, and ARIA attributes
2. **Keyboard Navigation**: All interactive elements are keyboard accessible
3. **Screen Reader Support**: ARIA labels, roles, and descriptions for screen readers
4. **Focus Management**: Visible focus indicators and proper focus order
5. **Skip Link**: "Skip to main content" link for keyboard users

### Best Practices

- Always include alt text for images
- Use ARIA attributes only when necessary
- Test with keyboard navigation and screen readers
- Maintain sufficient color contrast
- Provide text alternatives for non-text content

## Best Practices and Gotchas

### Performance

- Use `loading="lazy"` for images below the fold
- Minimize JavaScript execution in the critical rendering path
- Use efficient CSS selectors
- Implement pagination or infinite scrolling for large article lists

### SEO

- Use proper heading hierarchy
- Include structured data (schema.org)
- Set appropriate meta tags
- Use canonical URLs
- Implement proper Open Graph tags for social sharing

### Browser Compatibility

- Test in multiple browsers and devices
- Use feature detection instead of browser detection
- Provide fallbacks for modern CSS features
- Consider using polyfills for older browsers

### Common Gotchas

1. **RTL Support**: When adding new CSS, ensure it works correctly in RTL mode
2. **Mobile Responsiveness**: Test all new features on various screen sizes
3. **Theme Consistency**: Ensure new elements respect the current theme
4. **Translation Keys**: Always add new text with translation keys
5. **Accessibility**: Don't forget to add ARIA attributes and test with keyboard

## Future Enhancements

1. **Comment System**: Add user comments and discussions
2. **Related Articles**: Show related articles based on tags or categories
3. **Author Pages**: Create dedicated pages for each author
4. **Advanced Search**: Implement full-text search with filters
5. **Analytics Integration**: Track article performance and user engagement