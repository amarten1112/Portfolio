/* ========================================
   CASE STUDY MODAL SYSTEM
   Load and display detailed project information from JSON
   ======================================== */

// ========================================
// PROJECT DATA
// ========================================

const projectsData = [
    {
        id: 1, title: "Typography", type: "print-design", featured: true,
        year: 2023, client: "Academic Project",
        longDescription: "Concept for two print layouts of a magazine article. The concept called for two distinct two-page layouts with images, title and subtitle. There was a requirement for at least one call out in each piece.",
        challenge: "Creating two distinct but cohesive magazine article layouts that incorporate images, titles, subtitles, and callouts effectively.",
        solution: "Developed two separate design approaches with distinct visual hierarchy, strategic image placement, and prominent callout elements that draw reader attention.",
        results: ["Two professional magazine layouts", "Effective visual hierarchy", "Strategic image integration", "Professional typographic treatment"],
        tools: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-1.jpg",
        images: [
            { url: "assets/images/typography-1.jpg", caption: "Magazine layout concept - Design approach 1" },
            { url: "assets/images/typography-2.jpg", caption: "Magazine layout concept - Design approach 2" }
        ]
    },
    {
        id: 2, title: "Desktop Publishing", type: "print-design", featured: true,
        year: 2023, client: "Restaurant Concept",
        longDescription: "Concept to create a print layout of a restaurant menu and brochure that appeals to high-end clientele and includes insights into their culture while delivering on the promise of creativity, conversation, and quality.",
        challenge: "Designing premium restaurant materials that communicate upscale positioning while effectively presenting menu information and brand culture.",
        solution: "Developed sophisticated print design incorporating premium aesthetics, clear hierarchy for menu navigation, cultural storytelling elements, and brand-consistent visual language.",
        results: ["Premium menu and brochure design", "Effective high-end brand positioning", "Clear information hierarchy", "Cultural brand integration"],
        tools: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-2.jpg",
        images: [
            { url: "assets/images/menu-brochure-1.jpg", caption: "Restaurant menu design" },
            { url: "assets/images/menu-brochure-2.jpg", caption: "Restaurant brochure design" }
        ]
    },
    {
        id: 3, title: "Digital Publishing", type: "digital-design", featured: true,
        year: 2023, client: "Magazine Publisher",
        longDescription: "Concept for a digital version of a magazine in the form of an EPUB in fixed layout that will target men over the age of 35 with the goal of increasing those viewers while maintaining or increasing the loyal readers. The concept calls for a digital version of the magazine that is entertaining with interactive elements that tie to the articles, visually appealing while keeping with their brand and easy to navigate.",
        challenge: "Creating an engaging digital magazine experience that attracts new male readers 35+ while retaining existing loyal subscribers, with interactive elements and brand consistency.",
        solution: "Designed interactive EPUB layout with compelling visual design, integrated interactive elements tied to article content, maintained brand aesthetic, and optimized navigation for digital reading experience.",
        results: ["Interactive EPUB design", "Target demographic engagement", "Brand consistency maintained", "Enhanced reader experience"],
        tools: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-3.jpg",
        images: [
            { url: "assets/images/digital-publishing-1.jpg", caption: "Digital magazine layout - Desktop view" },
            { url: "assets/images/digital-publishing-2.jpg", caption: "Digital magazine layout - Mobile view" }
        ]
    },
    {
        id: 4, title: "Graphics & Layout", type: "branding", featured: false,
        year: 2023, client: "Branding Project",
        longDescription: "Concept to create a logo and brand identity for a client, taking into consideration the needs and requirements of the client as well as applying the psychology of design to communicate the message you intend to the client's audience.",
        challenge: "Creating a distinctive logo and brand identity that strategically communicates client values using design psychology principles.",
        solution: "Conducted brand research, applied design psychology principles, and developed a logo and brand system that effectively communicates to target audience.",
        results: ["Professional logo design", "Brand psychology application", "Effective audience communication", "Complete brand system"],
        tools: ["Adobe Illustrator", "Adobe Photoshop"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-4.jpg",
        images: [
            { url: "assets/images/logo-1.png", caption: "Logo design - Desktop view" },
            { url: "assets/images/logo-2.png", caption: "Logo design - Multiple view" }
        ]
    },
    {
        id: 5, title: "Branding", type: "branding", featured: false,
        year: 2023, client: "Branding Project",
        longDescription: "Concept to create a logo and brand identity for a client, taking into consideration the needs and requirements of the client as well as applying the psychology of design to communicate the message you intend to the client's audience.",
        challenge: "Developing a comprehensive brand identity that reflects client needs and communicates effectively through design psychology.",
        solution: "Created strategic logo design and brand identity system incorporating client requirements and design psychology principles for target audience connection.",
        results: ["Cohesive brand identity", "Strategic logo design", "Effective brand communication", "Professional brand system"],
        tools: ["Adobe Illustrator", "Adobe Photoshop"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-5.jpg",
        images: [
            { url: "assets/images/branding-1.jpg", caption: "Branding design - Concept view" },
            { url: "assets/images/branding-2.jpg", caption: "Branding design - Production view" }
        ]
    },
    {
        id: 6, title: "Logo Design Layout", type: "branding", featured: false,
        year: 2023, client: "Logo Design Project",
        longDescription: "Concept to create a logo and brand identity for a client, taking into consideration the needs and requirements of the client as well as applying the psychology of design to communicate the message you intend to the client's audience.",
        challenge: "Designing a versatile logo that works across multiple applications while using design psychology to communicate brand message.",
        solution: "Developed flexible logo design and brand identity incorporating design psychology and client requirements, applicable across print and digital media.",
        results: ["Versatile logo design", "Multi-application branding", "Design psychology integrated", "Professional brand identity"],
        tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-6.jpg",
        images: [
            { url: "assets/images/logo-layout-1.png", caption: "Logo design layout - Concept view" },
            { url: "assets/images/logo-layout-2.png", caption: "Logo design layout - Production view" }
        ]
    },
    {
        id: 7, title: "Digital Imaging", type: "digital-design", featured: false,
        year: 2023, client: "Adventure Sports",
        longDescription: "My aim was to create a visually appealing and cohesive piece, which involved careful consideration of color, shape, balance, unity, and emphasis. I maintained consistency in messaging and colors to ensure that the design was cohesive across different media. Overall, I incorporated a background image that reflects the location where the adventure sports activities could take place.",
        challenge: "Creating visually cohesive digital advertisements for adventure sports with location-specific storytelling and consistent visual language.",
        solution: "Designed compelling digital ads emphasizing color psychology, visual balance, and unity through consistent messaging and imagery. Incorporated location-reflective backgrounds to enhance adventure sports narrative.",
        results: ["Professional digital ads", "Strong visual cohesion", "Location-specific storytelling", "Consistent brand messaging"],
        tools: ["Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-7.jpg",
        images: [
            { url: "assets/images/digital-imaging-1.png", caption: "Digital ad concept - Design approach 1" },
            { url: "assets/images/digital-imaging-2.jpg", caption: "Digital ad concept - Design approach 2" }
        ]
    },
    {
        id: 8, title: "Digital Graphic Design for Website", type: "web-design", featured: false,
        year: 2023, client: "Restaurant",
        longDescription: "The concept is to create a brand that appeals to high-end clientele and includes insights into their culture while delivering on the promise of creativity, conversation, and quality. The overall display and layout was consistent with the concept. It is an image-heavy site that is interactive and uses fonts, colors and the logo from the Client. The site is responsive and the navigation is intuitive and easy to use.",
        challenge: "Designing a premium restaurant website that communicates upscale positioning while being image-heavy, interactive, responsive, and user-friendly.",
        solution: "Developed premium web design with strong visual hierarchy, strategic image use, client branding integration, interactive elements, and responsive layout ensuring intuitive navigation on all devices.",
        results: ["Premium website design", "Responsive across devices", "Strong visual branding", "Intuitive navigation system"],
        tools: ["Dreamweaver", "Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-8.jpg",
        images: [
            { url: "assets/images/restaurant-website-1.jpg", caption: "Restaurant website design - Desktop view" },
            { url: "assets/images/restaurant-website-2.jpg", caption: "Restaurant website design - Mobile view" }
        ]
    },
    {
        id: 9, title: "Advanced Digital Graphic Design", type: "web-design", featured: false,
        year: 2023, client: "Portfolio Project",
        longDescription: "The concept is to apply the principles of User Experience and KIS guidelines to a portfolio website. The concept calls for a website that is attractive, intuitive, and easy to navigate.",
        challenge: "Creating a portfolio website that demonstrates UX expertise through application of user experience principles and Keep It Simple (KIS) guidelines.",
        solution: "Designed portfolio site implementing UX best practices, minimalist aesthetic, clear information hierarchy, intuitive navigation, and accessible design that showcases UX methodology.",
        results: ["Professional portfolio site", "UX principles demonstrated", "Minimalist design approach", "Excellent usability"],
        tools: ["Dreamweaver", "Adobe Illustrator", "Adobe Photoshop", "Bootstrap"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-9.jpg",
        images: [
            { url: "assets/images/portfolio-website-1.jpg", caption: "Portfolio website design - Conceptual view" },
            { url: "assets/images/portfolio-website-2.jpg", caption: "Portfolio website design - Wireframe view" }
        ]
    },
    {
        id: 10, title: "Advanced Multiplatform Design", type: "web-development", featured: false,
        year: 2023, client: "Outdoor Adventure Store",
        longDescription: "The concept is to design a website to ensure the visitor sees a consistent experience when visiting the site on different devices. The images, hierarchy and navigation will be consistent across the devices. Visitors will be able to share and access information between designs with no additional steps needed. Images, text and forms will be consistent over all the devices to provide a familiarity and comfort for the visitor. Visibility will be an important element to pay attention to by ensuring the images resize correctly and that the fonts will be visible and easy to read on smaller devices.",
        challenge: "Designing a responsive website ensuring consistent user experience, visual hierarchy, navigation, and form interactions across desktop, tablet, and mobile devices.",
        solution: "Developed comprehensive responsive design with consistent layout across devices, optimized images for various resolutions, readable typography at all sizes, and seamless cross-device navigation.",
        results: ["Consistent cross-device experience", "Responsive image optimization", "Readable typography on all screens", "Seamless device transitions"],
        tools: ["Dreamweaver", "Adobe Photoshop", "Adobe Illustrator", "Figma", "Bootstrap"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-10.jpg",
        images: [
            { url: "assets/images/multiplatform-design-1.jpg", caption: "Multiplatform design - Multi view" },
            { url: "assets/images/multiplatform-design-2.jpg", caption: "Multiplatform design - Conceptual view" }
        ]
    },
    {
        id: 11, title: "UI/UX Case Study", type: "web-development", featured: true,
        year: 2023, client: "Restaurant Website Redesign",
        longDescription: "The concept is for a website redesign and to create a user-friendly and visually appealing website that reflects the restaurant's brand identity. The new website should provide customers with easy access to information about the restaurant, including menus, hours of operation, location, and contact information. Additionally, the website needs to integrate an online ordering system that allows customers to place orders for pickup or delivery.",
        challenge: "Redesigning a restaurant website to improve user experience, address mobile issues, clarify menu presentation, and integrate online ordering while maintaining brand identity.",
        solution: "Conducted user research creating three detailed personas (Dan, John, Gabby), mapped user journeys, identified pain points, redesigned information architecture with web-optimized menus, integrated online ordering system, and optimized mobile experience.",
        results: ["User-centered redesign approach", "Three detailed user personas", "Improved information hierarchy", "Mobile-optimized experience", "Online ordering integration"],
        tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-11.jpg",
        images: [
            { url: "assets/images/ui-ux-case-study-1.png", caption: "UI/UX case study - User personas" },
            { url: "assets/images/ui-ux-case-study-2.png", caption: "UI/UX case study - User journey map" }
        ]
    },
    {
        id: 12, title: "Advanced Digital Graphic Design - Charity Website", type: "web-design", featured: false,
        year: 2026, client: "Portfolio Project",
        longDescription: "The concept is to apply the principles of design and user experience to a charity website. The concept calls for a website that is attractive, intuitive, and easy to navigate.",
        challenge: "Creating a modern charity website that demonstrates modern design trends and best practices in UX while adhering to Keep It Simple (KIS) guidelines.",
        solution: "Designed a site implementing design and development best practices, minimalist aesthetic, clear information hierarchy, intuitive navigation, and accessible design that showcases UX methodology.",
        results: ["Professional site", "UX principles demonstrated", "Modern design approach", "Excellent usability"],
        tools: ["Dreamweaver", "Adobe Illustrator", "Adobe Photoshop", "Bootstrap"],
        timeline: "Academic project", teamSize: 1,
        heroImage: "assets/images/project-12.jpg",
        images: []
    }
];

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

        // Hero image: prefer explicit heroImage, else first gallery image, else fallback by id
        const heroSrc = project.heroImage
                ? project.heroImage
                : (project.images && project.images.length > 0)
                        ? project.images[0].url
                        : `assets/images/project-${project.id}.jpg`;

        const heroAlt = project.title + ' — project hero image';

        const heroHTML = `<div class="case-study-hero">
                                                <img src="${heroSrc}" alt="${heroAlt}" loading="lazy">
                                            </div>`;

    return `
        <div class="case-study">
            <h2 class="case-study-title">${project.title}</h2>
            ${heroHTML}
            
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProjectCards);
} else {
    initializeProjectCards();
}

console.log('📦 Case study module loaded');
