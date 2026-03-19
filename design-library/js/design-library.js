/**
 * Design Library JavaScript
 * Handles navigation state and dynamic data loading
 */

(function() {
  'use strict';

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.dl-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Handle both relative and absolute paths
      const linkPath = href.replace(/\.html$/, '').replace(/\/index$/, '/');
      const normalizedCurrent = currentPath.replace(/\.html$/, '').replace(/\/index$/, '/');

      if (normalizedCurrent.includes(linkPath) ||
          (linkPath.includes('index') && normalizedCurrent.endsWith('design-library/'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Load and display generation timestamp
  async function loadTimestamp() {
    try {
      const response = await fetch('./data/meta.json');
      const meta = await response.json();
      const timestampEls = document.querySelectorAll('.dl-generated-time');

      if (timestampEls.length && meta.generatedAt) {
        const date = new Date(meta.generatedAt);
        const formatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        timestampEls.forEach(el => {
          el.textContent = formatted;
        });
      }
    } catch (e) {
      console.log('Could not load meta.json:', e);
    }
  }

  // Copy to clipboard functionality
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', () => {
        const text = button.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          const originalText = button.textContent;
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = originalText;
          }, 1500);
        });
      });
    });
  }

  // State toggle for interactive previews
  function initStateToggles() {
    document.querySelectorAll('.dl-state-toggle').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const target = document.querySelector(e.target.dataset.target);
        const state = e.target.value;

        if (target) {
          // Remove all state classes
          target.classList.remove('hover', 'focus', 'active', 'disabled');
          // Add selected state
          if (state !== 'default') {
            target.classList.add(state);
          }
        }
      });
    });
  }

  // Smooth scroll for in-page navigation
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    loadTimestamp();
    initCopyButtons();
    initStateToggles();
    initSmoothScroll();
  });

})();
