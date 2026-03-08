/* ========================================
   PORTFOLIO SITE - MAIN JAVASCRIPT
   Core Navigation & Interactivity
   ======================================== */

// ========================================
// NAVIGATION
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle hamburger menu
 */
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close menu when navigation link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

hamburger.addEventListener('click', toggleMenu);

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (currentPage === '' || currentPage === '/') {
            if (href === 'index.html' || href === '/') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else if (currentPage === href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

/**
 * Enhanced smooth scrolling for internal links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
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

// ========================================
// CONTACT FORM HANDLING
// ========================================
// Emails are sent via Web3Forms to amarten1112@gmail.com.
// Get your free access key at https://web3forms.com (use that email).

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const WEB3FORMS_ACCESS_KEY = '1315101a-ea81-486a-88b0-70f62413b3c8';

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            name: nameEl?.value?.trim() ?? '',
            email: emailEl?.value?.trim() ?? '',
            company: document.getElementById('company')?.value?.trim() ?? '',
            'project-type': document.getElementById('project-type')?.value ?? '',
            budget: document.getElementById('budget')?.value ?? '',
            message: document.getElementById('message')?.value?.trim() ?? '',
            timeline: document.getElementById('timeline')?.value ?? '',
            subject: 'Portfolio contact: ' + (nameEl?.value?.trim() || 'New message')
        };

        if (!formData.name || !formData.email || !formData['project-type'] || !formData.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY') {
            showFormStatus('Form is not configured yet. Add your Web3Forms access key in assets/js/main.js.', 'error');
            return;
        }

        submitContactForm(formData);
    });
}

/**
 * Display form status message
 */
function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    if (type === 'success' && contactForm) {
        setTimeout(() => {
            contactForm.reset();
            formStatus.className = 'form-status';
        }, 3000);
    }
}

/**
 * Send 1form data to Web3Forms; emails are delivered to amarten1112@gmail.com
 * when the access key is created with that address at https://web3forms.com
 */
function submitContactForm(formData) {
    showFormStatus('Sending…', 'sending');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showFormStatus('Thanks for reaching out! I\'ll get back to you soon.', 'success');
            } else {
                showFormStatus(data.message || 'Something went wrong. Please try again.', 'error');
            }
        })
        .catch(() => {
            showFormStatus('Something went wrong. Please try again.', 'error');
        });
}

// ========================================
// PROJECT CARD INTERACTIONS
// ========================================

/**
 * PROJECT CARD NOTE:
 * Hover interactions and click handlers are managed by:
 * - CSS (styles.css): :hover state styling and transitions
 * - case-study.js: Click event listeners for modal functionality
 * 
 * Removed inline JavaScript hover listeners to avoid conflicts
 * with CSS-based hover effects and modal click handlers.
 */

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance optimization
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

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ========================================
// MOCKUP CAROUSEL
// ========================================

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prev = document.getElementById('carouselPrev');
    const next = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('#carouselDots .dot');

    if (!track || !prev || !next) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    let current = 0;
    let autoTimer;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 4500);
    }

    function stopAuto() {
        clearInterval(autoTimer);
    }

    prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
    });

    goTo(0);
    startAuto();
}

document.addEventListener('DOMContentLoaded', initCarousel);

// ========================================
// INITIALIZATION
// ========================================

console.log('Portfolio site loaded successfully');
