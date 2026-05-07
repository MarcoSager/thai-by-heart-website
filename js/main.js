/* Thai By Heart — Main JS */

/* ─── NAVBAR SCROLL ──────────────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 55);
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────── */

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* ─── INTERSECTION OBSERVER — SCROLL REVEALS ─────────── */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('revealed'), delay);
        revealObserver.unobserve(el);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

/* ─── HERO ENTRANCE ANIMATION ────────────────────────── */

window.addEventListener('load', () => {
    document.querySelectorAll('.hero-animate').forEach(el => {
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('revealed'), delay);
    });

    /* trigger hero stat counters after entrance */
    setTimeout(runHeroCounters, 800);
});

/* ─── COUNTER ANIMATION ──────────────────────────────── */

function animateCount(el, target, duration) {
    const start     = performance.now();
    const startVal  = 0;

    function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        el.textContent = Math.floor(startVal + eased * (target - startVal));
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    }

    requestAnimationFrame(tick);
}

function runHeroCounters() {
    document.querySelectorAll('.hero-count[data-target]').forEach(el => {
        animateCount(el, parseInt(el.dataset.target, 10), 1600);
    });
}

/* stat cards counters — trigger on scroll into view */
const statSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.count-num[data-target]').forEach(el => {
            animateCount(el, parseInt(el.dataset.target, 10), 1800);
        });
        statSectionObserver.unobserve(entry.target);
    });
}, { threshold: 0.35 });

const statSection = document.querySelector('.social-proof');
if (statSection) statSectionObserver.observe(statSection);

/* ─── SMOOTH SCROLL ──────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = 76;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    });
});

/* ─── BACKGROUND PARALLAX (hero bg only) ─────────────── */

const heroBg = document.getElementById('heroBg');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
            heroBg.style.transform = `translateY(${y * 0.28}px)`;
        }
    }, { passive: true });
}

/* ─── ACTIVE NAV LINK ON SCROLL ──────────────────────── */

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
            const match = link.getAttribute('href') === `#${id}`;
            link.style.color = match ? 'var(--accent)' : '';
        });
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));
