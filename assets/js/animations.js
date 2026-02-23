/* ========================================
   SCROLL ANIMATIONS & PARALLAX
   Intersection Observer-based animations and parallax effects
   ======================================== */

// ========================================
// PARALLAX SCROLLING
// ========================================

/**
 * Initialize fade out effect for elements with data-parallax attribute on scroll
 */
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    // Guard against multiple listener registration
    if (window._parallaxInitialized) return;
    window._parallaxInitialized = true;

    function updateFadeOut() {
        parallaxElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate fade based on scroll position
            // Element fades out as it scrolls up past the top of viewport
            const fadeStart = viewportHeight;
            const fadeEnd = -200;
            const distance = elementRect.top;
            
            // Calculate opacity (1 when in view, 0 when scrolled past)
            const opacity = Math.max(0, Math.min(1, (distance - fadeEnd) / (fadeStart - fadeEnd)));
            
            element.style.opacity = opacity;
        });
    }

    window.addEventListener('scroll', updateFadeOut, { passive: true });
}

// ========================================
// INTERSECTION OBSERVER - SCROLL REVEAL
// ========================================

/**
 * Initialize Intersection Observer for scroll reveal animations
 * NOTE: Removed .project-overlay from targets to prevent interference with hover states
 */
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .faq-item'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add reveal animation classes
                entry.target.classList.add('reveal-visible');
                
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

/**
 * Staggered reveal animation for grid items
 * NOTE: Excluded project cards to prevent interference with filter animations
 */
function initializeStaggeredReveal() {
    const gridContainers = document.querySelectorAll('.skills-grid');

    gridContainers.forEach(container => {
        const items = container.querySelectorAll('[class*="skill"]');
        
        items.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${index * 0.1}s`);
        });
    });
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

/**
 * Create and manage scroll progress bar
 */
function initializeScrollProgress() {
    // Check if progress bar already exists
    let progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================

/**
 * Animate numbers when they come into view
 * Usage: Add class="counter" and data-target="[target-number]" to elements
 */
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate a single counter from 0 to target value
 */
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// SMOOTH SCROLL ON HASH LINKS
// ========================================

/**
 * Smooth scroll behavior for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') {
                return;
            }

            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// HOVER ANIMATION ENHANCEMENTS
// ========================================

/**
 * Add enhanced hover effects to interactive elements
 */
function initializeHoverEnhancements() {
    const buttons = document.querySelectorAll('.cta-button, .filter-btn, .footer-link');
    const links = document.querySelectorAll('a');

    // Add ripple effect on button click
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple styling (CSS should be added to styles.css)
            // this.appendChild(ripple);
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECTS
// ========================================

/**
 * Add shadow to navbar on scroll
 */
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, 10));
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ANIMATION CSS INJECTION
// ========================================

/**
 * Inject required CSS for animations
 */
function injectAnimationStyles() {
    const styleId = 'animation-styles';
    
    // Check if styles are already injected
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* Scroll Reveal Animations */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
        }

        .reveal-visible {
            animation: revealAnimation 0.6s ease forwards;
            animation-delay: var(--reveal-delay, 0s);
        }

        @keyframes revealAnimation {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Filter Animations */
        .project-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .project-item.filter-exit {
            opacity: 0;
            transform: scale(0.95);
        }

        .project-item.filter-enter,
        .project-item.filter-visible {
            opacity: 1;
            transform: scale(1);
        }

        /* Scroll Progress Bar */
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, #FF0000, #1A1A1A);
            width: 0%;
            z-index: 999;
            transition: width 0.1s ease;
        }

        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Screen Reader Only */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    
    document.head.appendChild(style);
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all animations on DOM ready
 */
function initializeAnimations() {
    // Inject animation styles
    injectAnimationStyles();

    // Initialize various animation systems
    initializeParallax();
    initializeScrollReveal();
    initializeStaggeredReveal();
    initializeScrollProgress();
    initializeCounters();
    initializeSmoothScroll();
    initializeHoverEnhancements();
    initializeNavbarScroll();

    console.log('✨ All animations initialized');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}

// ========================================
// EXPORT FOR MODULE USE
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeParallax,
        initializeScrollReveal,
        initializeCounters,
        animateCounter
    };
}
