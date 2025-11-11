/**
 * Smooth scroll utility for hash navigation
 * Works with Lenis smooth scroll
 */
export const smoothScrollToSection = (hash, offset = 80) => {
  if (!hash) return;
  
  // Remove # if present
  const sectionId = hash.startsWith('#') ? hash.slice(1) : hash;
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Use Lenis if available, otherwise fallback to native smooth scroll
    if (window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -offset,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback to native smooth scroll
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
};

/**
 * Handle hash changes in URL
 */
export const handleHashNavigation = (hash, offset = 80) => {
  if (hash) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      smoothScrollToSection(hash, offset);
    }, 100);
  }
};

/**
 * Initialize hash navigation on page load
 */
export const initHashNavigation = (offset = 80) => {
  // Handle initial hash if present
  if (window.location.hash) {
    handleHashNavigation(window.location.hash, offset);
  }
  
  // Handle hash changes
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      handleHashNavigation(window.location.hash, offset);
    }
  });
};

