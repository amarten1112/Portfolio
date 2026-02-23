/* ========================================
   CASE STUDY MODAL SYSTEM
   Load and display detailed project information from JSON
   ======================================== */

let projectsData = [];

// ========================================
// LOAD PROJECTS FROM JSON
// ========================================

/**
 * Load projects from JSON file
 */
async function loadProjects() {
    try {
        const response = await fetch('assets/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        projectsData = data.projects;
        console.log('✅ Projects loaded successfully:', projectsData.length + ' projects');
        initializeProjectCards();
    } catch (error) {
        console.error('❌ Error loading projects:', error);
        // Fallback: show error message in console
        showProjectLoadError();
    }
}

/**
 * Show error if projects fail to load
 */
function showProjectLoadError() {
    console.warn('⚠️ Could not load project data. Click handlers disabled.');
}

// ========================================
// MODAL MANAGEMENT
// ========================================

const modal = document.getElementById('caseStudyModal');
const closeBtn = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

/**
 * Open modal with project details
 */
function openCaseStudyModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Populate modal with project data
    const modalHTML = generateCaseStudyHTML(project);
    modalBody.innerHTML = modalHTML;

    // Show modal
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    closeBtn.focus();

    // Log for debugging
    console.log('📖 Opened case study:', project.title);
}

/**
 * Close modal
 */
function closeCaseStudyModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

/**
 * Generate HTML for case study modal from project data
 */
function generateCaseStudyHTML(project) {
    const resultsHTML = project.results 
        ? `<div class="case-study-section">
             <h3>Results</h3>
             <ul class="results-list">
               ${project.results.map(result => `<li>✓ ${result}</li>`).join('')}
             </ul>
           </div>`
        : '';

    const toolsHTML = project.tools 
        ? `<div class="case-study-section">
             <h3>Tools & Technologies</h3>
             <div class="tools-list">
               ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
             </div>
           </div>`
        : '';

    const imagesHTML = project.images && project.images.length > 0
        ? `<div class="case-study-section">
             <h3>Project Showcase</h3>
             <div class="project-images-gallery">
               ${project.images.map((image, index) => `
                 <div class="gallery-item">
                   <img src="${image.url}" alt="${image.caption || `${project.title} - Image ${index + 1}`}" loading="lazy">
                   ${image.caption ? `<p class="image-caption">${image.caption}</p>` : ''}
                 </div>
               `).join('')}
             </div>
           </div>`
        : '';

    const metaHTML = `
        <div class="case-study-meta">
            <div class="meta-item">
                <strong>Year:</strong> ${project.year}
            </div>
            <div class="meta-item">
                <strong>Client:</strong> ${project.client}
            </div>
            <div class="meta-item">
                <strong>Timeline:</strong> ${project.timeline}
            </div>
            <div class="meta-item">
                <strong>Team:</strong> ${project.teamSize} ${project.teamSize === 1 ? 'person' : 'people'}
            </div>
            <div class="meta-item">
                <strong>Type:</strong> ${project.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
        </div>
    `;

    const progressHTML = project.status === 'in-progress' 
        ? `<div class="case-study-section progress-section">
             <h3>Project Status</h3>
             <p class="progress-text">${project.progress || 'Currently in development'}</p>
           </div>`
        : '';

    return `
        <div class="case-study">
            <h2 class="case-study-title">${project.title}</h2>
            
            <div class="case-study-type">
                ${project.status === 'in-progress' ? '<span class="status-badge">IN PROGRESS</span>' : ''}
                <span class="type-badge">${project.type.split('-').join(' ')}</span>
            </div>

            <div class="case-study-intro">
                <p>${project.longDescription}</p>
            </div>

            <div class="case-study-meta-grid">
                ${metaHTML}
            </div>

            <div class="case-study-sections">
                ${imagesHTML}

                ${project.challenge ? `
                    <div class="case-study-section">
                        <h3>Challenge</h3>
                        <p>${project.challenge}</p>
                    </div>
                ` : ''}

                ${project.solution ? `
                    <div class="case-study-section">
                        <h3>Solution</h3>
                        <p>${project.solution}</p>
                    </div>
                ` : ''}

                ${resultsHTML}

                ${progressHTML}

                ${toolsHTML}
            </div>
        </div>
    `;
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Initialize click handlers for project cards
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card.clickable');

    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;

            const projectId = parseInt(this.getAttribute('data-id'));
            if (!isNaN(projectId)) {
                openCaseStudyModal(projectId);
            }
        });

        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = parseInt(this.getAttribute('data-id'));
                if (!isNaN(projectId)) {
                    openCaseStudyModal(projectId);
                }
            }
        });
    });

    console.log('✅ Initialized ' + projectCards.length + ' clickable project cards');
}

/**
 * Close modal on close button click
 */
closeBtn.addEventListener('click', closeCaseStudyModal);

/**
 * Close modal when clicking outside the modal content
 */
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeCaseStudyModal();
    }
});

/**
 * Close modal on Escape key
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeCaseStudyModal();
    }
});

// ========================================
// INITIALIZATION
// ========================================

// Load projects and initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}

console.log('📦 Case study module loaded');
