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

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            projectType: document.getElementById('project-type').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value,
            timeline: document.getElementById('timeline').value
        };
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        // In production, this would send data to a backend server
        simulateFormSubmission(formData);
    });
}

/**
 * Display form status message
 */
function showFormStatus(message, type) {
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    if (type === 'success') {
        setTimeout(() => {
            contactForm.reset();
            formStatus.className = 'form-status';
        }, 3000);
    }
}

/**
 * Simulate form submission
 * In production, this will be a fetch request to  backend
 */
function simulateFormSubmission(formData) {
    // Log form data (in production, send to server)
    console.log('Form submitted:', formData);
    
    // Show success message
    showFormStatus('Thanks for reaching out! I\'ll get back to you soon.', 'success');
    
    // Optional: Send to a backend service like Formspree, SendGrid, etc.
    // Example with Formspree:
    /*
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            showFormStatus('Thanks for reaching out! I\'ll get back to you soon.', 'success');
        } else {
            showFormStatus('Something went wrong. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormStatus('Something went wrong. Please try again.', 'error');
    });
    */
}

// ========================================
// PROJECT CARD INTERACTIONS
// ========================================

/**
 * Add enhanced hover interactions to project cards
 */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = 10;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = 1;
    });
});

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
// INITIALIZATION
// ========================================

console.log('Portfolio site loaded successfully');
