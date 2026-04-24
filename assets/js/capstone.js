/* ========================================
   CAPSTONE PAGE — Lightbox & Reflection Toggle
   ======================================== */

// ── Lightbox ──────────────────────────────

const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCap   = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

const screenshots = Array.from(document.querySelectorAll('.screenshot-item[data-full]'));
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const item = screenshots[index];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightboxCap.textContent = item.dataset.caption;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + screenshots.length) % screenshots.length;
    openLightbox(currentIndex);
}

screenshots.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigate(-1));
lightboxNext.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
});

// ── Reflection toggle ─────────────────────

const reflectionMore   = document.getElementById('reflectionMore');
const reflectionToggle = document.getElementById('reflectionToggle');

reflectionToggle.addEventListener('click', () => {
    const expanded = reflectionMore.style.display === 'block';
    reflectionMore.style.display = expanded ? 'none' : 'block';
    reflectionMore.setAttribute('aria-hidden', expanded ? 'true' : 'false');
    reflectionToggle.setAttribute('aria-expanded', String(!expanded));
    reflectionToggle.textContent = expanded ? 'Read More ↓' : 'Read Less ↑';
});
