/* ========================================
   PORTFOLIO FILTERING SYSTEM
   Filter projects by type with smooth animations
   ======================================== */

// ========================================
// FILTER FUNCTIONALITY
// ========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const projectsGrid = document.getElementById('projects-grid');

/**
 * Initialize filter event listeners
 */
function initializeFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterProjects(this.dataset.filter);
            updateActiveFilterBtn(this);
        });
    });
}

/**
 * Filter projects based on selected category
 */
function filterProjects(filterValue) {
    let visibleCount = 0;

    projectItems.forEach((item, index) => {
        const itemType = item.dataset.type;
        const shouldShow = filterValue === 'all' || itemType === filterValue;

        if (shouldShow) {
            // Stagger animation for projects coming into view
            setTimeout(() => {
                item.style.display = '';
                item.classList.add('filter-enter');
                // Trigger reflow to enable animation
                void item.offsetWidth;
                item.classList.add('filter-visible');
            }, visibleCount * 50); // Stagger by 50ms

            visibleCount++;
        } else {
            item.classList.remove('filter-visible');
            item.classList.add('filter-exit');
            
            // Remove animation classes and hide
            setTimeout(() => {
                if (!item.classList.contains('filter-visible')) {
                    item.style.display = 'none';
                    item.classList.remove('filter-exit');
                    item.classList.remove('filter-enter');
                }
            }, 300);
        }
    });

    // Announce to screen readers
    announceFilterChange(filterValue);
}

/**
 * Update active filter button styling
 */
function updateActiveFilterBtn(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

/**
 * Announce filter changes to screen readers
 */
function announceFilterChange(filterValue) {
    const visibleCount = Array.from(projectItems).filter(item => {
        return item.style.display !== 'none';
    }).length;

    const filterLabel = filterValue === 'all' 
        ? 'all projects' 
        : filterValue.split('-').join(' ') + ' projects';
    
    const announcement = `Showing ${visibleCount} ${filterLabel}`;
    
    // Create or update aria-live region for accessibility
    let liveRegion = document.querySelector('[role="status"][aria-live="polite"]');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = announcement;
}

/**
 * Reset all filters (call on page load)
 */
function resetFilters() {
    projectItems.forEach(item => {
        item.style.display = '';
        item.classList.remove('filter-visible', 'filter-enter', 'filter-exit');
    });
}

// ========================================
// INITIALIZATION
// ========================================

if (filterBtns.length > 0) {
    initializeFilters();
    resetFilters();
}

// ========================================
// ADVANCED FEATURES
// ========================================

/**
 * Count projects by type
 */
function countProjectsByType() {
    const counts = {
        all: 0,
        'web-design': 0,
        'web-development': 0,
        'print-design': 0
    };

    projectItems.forEach(item => {
        const type = item.dataset.type;
        counts[type]++;
        counts.all++;
    });

    return counts;
}

/**
 * Update filter button labels with project counts
 * Optional: Uncomment to show project counts on filter buttons
 */
function updateFilterCounts() {
    const counts = countProjectsByType();

    filterBtns.forEach(btn => {
        const filter = btn.dataset.filter;
        const count = counts[filter] || 0;
        // Uncomment below to show counts
        // btn.innerHTML = `${btn.textContent} <span class="count">(${count})</span>`;
    });
}

// Uncomment to enable count display
// updateFilterCounts();

/**
 * Export filter stats to console for debugging
 */
function logFilterStats() {
    const counts = countProjectsByType();
    console.log('Project Filter Statistics:', counts);
}

logFilterStats();

// ========================================
// CSS FOR FILTER ANIMATIONS
// ========================================

// Note: CSS for filter animations should be added to styles.css
// Add this to your styles.css for smooth filtering:

/*
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
*/
