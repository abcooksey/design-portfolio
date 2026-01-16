/* ==========================================================================
   Animations & Microinteractions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTextRotation();
  initParallax();
  initCardHovers();
  initCountUp();
});

/* ===== Text Rotation Animation ===== */

function initTextRotation() {
  const rotatingText = document.querySelector('.text-rotate');

  if (!rotatingText) return;

  // Text rotation is handled by CSS animation
  // This function can be extended for more complex interactions
}

/* ===== Parallax Effect ===== */

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  const handleParallax = () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };

  // Use requestAnimationFrame for smooth animations
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ===== Card Hover Effects ===== */

function initCardHovers() {
  const cards = document.querySelectorAll('.card-elevated, .project-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      // Add subtle tilt effect based on mouse position
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* ===== Count Up Animation ===== */

function initCountUp() {
  const countElements = document.querySelectorAll('[data-count]');

  if (countElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.count, 10);
        const duration = parseInt(element.dataset.duration, 10) || 2000;
        const suffix = element.dataset.suffix || '';

        animateCount(element, target, duration, suffix);
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  countElements.forEach(el => observer.observe(el));
}

function animateCount(element, target, duration, suffix) {
  const start = 0;
  const startTime = performance.now();

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easeOutQuart(progress);
    const current = Math.round(start + (target - start) * easedProgress);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ===== Magnetic Buttons ===== */

function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.btn-magnetic');

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  });
}

/* ===== Cursor Effects (Optional Enhancement) ===== */

function initCustomCursor() {
  // Only enable on non-touch devices
  if ('ontouchstart' in window) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth follow for main cursor
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .card');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

/* ===== Image Lazy Loading ===== */

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/* ===== Scroll Progress Indicator ===== */

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');

  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;

    progressBar.style.width = `${scrolled}%`;
  });
}

// Initialize optional features if elements exist
document.addEventListener('DOMContentLoaded', () => {
  initLazyLoading();
  initScrollProgress();
});
