/* =========================================
   CONCH RESORT — Main JavaScript
   ========================================= */

/* ---- NAVBAR scroll behaviour ---- */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navDrawer = document.querySelector('.nav-drawer');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }
  // Back to top
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    btt.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

// Hamburger toggle
if (hamburger && navDrawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navDrawer.classList.toggle('open');
    document.body.style.overflow = navDrawer.classList.contains('open') ? 'hidden' : '';
  });
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

/* ---- GALLERY LIGHTBOX ---- */
(function initLightbox() {
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const closeBtn    = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const prevBtn     = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const nextBtn     = lightbox ? lightbox.querySelector('.lightbox-next') : null;

  if (!lightbox) return;

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIdx = 0;

  function openAt(idx) {
    currentIdx = idx;
    const img = items[idx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { openAt((currentIdx - 1 + items.length) % items.length); }
  function next() { openAt((currentIdx + 1) % items.length); }

  items.forEach((item, i) => item.addEventListener('click', () => openAt(i)));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn)  prevBtn.addEventListener('click', prev);
  if (nextBtn)  nextBtn.addEventListener('click', next);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();

/* ---- TESTIMONIAL CAROUSEL ---- */
(function initTestimonials() {
  const track  = document.querySelector('.testimonial-track');
  const dots   = document.querySelectorAll('.t-dot');
  if (!track) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    current = (idx + dots.length) % dots.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function auto() { timer = setInterval(() => goTo(current + 1), 5000); }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { clearInterval(timer); goTo(i); auto(); });
  });

  auto();

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { clearInterval(timer); goTo(current + (dx < 0 ? 1 : -1)); auto(); }
  }, { passive: true });
})();

/* ---- FAQ ACCORDION ---- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- BACK TO TOP ---- */
const btt = document.querySelector('.back-to-top');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- BOOKING BAR — check-in min date ---- */
(function initBookingDates() {
  const chkin  = document.getElementById('checkin');
  const chkout = document.getElementById('checkout');
  if (!chkin || !chkout) return;

  const today = new Date();
  const fmt   = d => d.toISOString().split('T')[0];

  chkin.min  = fmt(today);
  chkout.min = fmt(today);

  // Set default values
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const dayAfter  = new Date(today); dayAfter.setDate(today.getDate() + 2);
  chkin.value  = fmt(tomorrow);
  chkout.value = fmt(dayAfter);

  chkin.addEventListener('change', () => {
    const d = new Date(chkin.value); d.setDate(d.getDate() + 1);
    chkout.min   = fmt(d);
    chkout.value = fmt(d);
  });
})();

/* ---- BOOKING BAR submit ---- */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    window.open('https://live.ipms247.com/booking/book-rooms-theconchresort', '_blank');
  });
}

/* ---- ROOM GALLERY THUMBS (detail pages) ---- */
(function initRoomGallery() {
  const main   = document.querySelector('.room-gallery-main img');
  const thumbs = document.querySelectorAll('.room-gallery-thumb');
  if (!main || !thumbs.length) return;

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      main.src = thumb.querySelector('img').src;
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
})();

/* ---- SMOOTH ACTIVE NAV HIGHLIGHT on scroll ---- */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active-nav'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active-nav');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
})();



(function() {
    console.log('Initializing WorksWheel...');
    const wwContainer = document.getElementById('works-wheel-container');
    console.log('Container:', wwContainer);
    if (wwContainer && window.WorksWheel) {
        const galleryItems = [
            { title: "Entrance", image: "images/WhatsApp Image 2026-06-08 at 11.00.07 AM.jpeg" },
            { title: "Facade", image: "images/WhatsApp Image 2026-06-08 at 11.00.08 AM (1).jpeg" },
            { title: "Pool", image: "images/WhatsApp Image 2026-06-08 at 11.00.08 AM.jpeg" },
            { title: "Bedroom", image: "images/WhatsApp Image 2026-06-08 at 11.00.09 AM.jpeg" },
            { title: "Garden", image: "images/WhatsApp Image 2026-06-08 at 11.00.10 AM.jpeg" },
            { title: "Pool Area", image: "images/WhatsApp Image 2026-06-08 at 11.00.10 AM (2).jpeg" },
            { title: "Interior", image: "images/WhatsApp Image 2026-06-08 at 11.00.11 AM.jpeg" },
            { title: "Bathroom", image: "images/WhatsApp Image 2026-06-08 at 11.00.11 AM (1).jpeg" },
            { title: "Tropical Garden", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM.jpeg" },
            { title: "Lounge", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (1).jpeg" },
            { title: "Evening", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (2).jpeg" },
            { title: "Detail", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (3).jpeg" }
        ];
        new WorksWheel(wwContainer, galleryItems);
        console.log('WorksWheel initialized!');
    } else {
        console.log('Missing container or WorksWheel class');
    }
})();

