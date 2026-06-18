// Mouse tracking glow effect
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
});

// Scroll Logic: Navbar visibility and Logo Morphing

if (hero) {
    hero.addEventListener('mousemove', (event) => {
        const rect = hero.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mouse-x', '35%');
        hero.style.setProperty('--mouse-y', '45%');
    });
}


// =========================
// LOGO INTRO VISUAL
// =========================

const morphedLogo = document.getElementById('morphed-logo-container');

let logoIntroActive = false;
let logoIntroTimer = null;
let logoIntroPlayed = false;

function startLogoIntro() {
    if (!morphedLogo || logoIntroPlayed) return;

    logoIntroPlayed = true;
    logoIntroActive = true;

    morphedLogo.classList.remove('intro-stopped');
    morphedLogo.classList.add('logo-intro');

    clearTimeout(logoIntroTimer);

    logoIntroTimer = setTimeout(() => {
        logoIntroActive = false;
        morphedLogo.classList.remove('logo-intro');
    }, 1400);
}

function stopLogoIntro() {
    if (!morphedLogo || !logoIntroActive) return;

    logoIntroActive = false;

    morphedLogo.classList.remove('logo-intro');
    morphedLogo.classList.add('intro-stopped');

    clearTimeout(logoIntroTimer);

    setTimeout(() => {
        morphedLogo.classList.remove('intro-stopped');
    }, 120);
}

// Intro inicial una sola vez
startLogoIntro();


// =========================
// SCROLL LOGIC: LOGO MORPHING
// =========================

const mainNav = document.getElementById('main-nav');
const heroContent = document.getElementById('hero-content');
const exploreIndicator = document.getElementById('explore-indicator');

function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

function smoothStep(value) {
    return value * value * (3 - 2 * value);
}

function getHeroProgress() {
    if (!hero) return 0;

    const heroRect = hero.getBoundingClientRect();
    const scrollableDistance = hero.offsetHeight - window.innerHeight;

    if (scrollableDistance <= 0) return 0;

    const scrolledInsideHero = clamp(-heroRect.top, 0, scrollableDistance);

    return scrolledInsideHero / scrollableDistance;
}

function handleHeroScroll() {
    // Si el usuario scrollea durante la intro, cortamos solo la intro visual.
    // El movimiento del logo sigue dependiendo del scroll.
    if (window.scrollY > 8) {
        stopLogoIntro();
    }

    const progress = getHeroProgress();
    const eased = smoothStep(progress);

    const startWidth = Math.min(620, window.innerWidth * 0.82);
    const endWidth = window.innerWidth <= 768 ? 110 : 128;

    const startLeft = window.innerWidth / 2;
    const startTop = window.innerHeight / 2;

    const navLeft = window.innerWidth <= 768
        ? 24
        : Math.max(24, (window.innerWidth - 1280) / 2 + 24);

    const navTop = 40;

    const currentLeft = startLeft + (navLeft - startLeft) * eased;
    const currentTop = startTop + (navTop - startTop) * eased;
    const currentWidth = startWidth + (endWidth - startWidth) * eased;

    if (morphedLogo) {
        morphedLogo.style.left = `${currentLeft}px`;
        morphedLogo.style.top = `${currentTop}px`;
        morphedLogo.style.width = `${currentWidth}px`;

        const translateX = -50 + (50 * eased);
        morphedLogo.style.transform = `translate(${translateX}%, -50%)`;
    }

    // Texto del hero:
    // aparece cuando el logo ya empezó a subir y se mantiene visible.
    const enterProgress = clamp((progress - 0.32) / 0.30);

    const contentOpacity = enterProgress;
    const contentY = 36 * (1 - enterProgress);

    if (heroContent) {
        heroContent.style.opacity = contentOpacity;
        heroContent.style.transform = `translateY(${contentY}px)`;

        if (contentOpacity > 0.15) {
            heroContent.classList.add('hero-content-active');
        } else {
            heroContent.classList.remove('hero-content-active');
        }
    }

    // Explorar desaparece suavemente cuando empieza el movimiento.
    if (exploreIndicator) {
        const exploreOpacity = clamp(1 - progress / 0.25);
        exploreIndicator.style.opacity = exploreOpacity * 0.5;
    }

    // Navbar aparece cuando el logo casi llegó arriba.
    if (mainNav) {
        if (progress > 0.72) {
            mainNav.classList.add('visible');
        } else {
            mainNav.classList.remove('visible');
        }
    }
}

window.addEventListener('scroll', handleHeroScroll, { passive: true });
window.addEventListener('resize', handleHeroScroll);

handleHeroScroll();

// const mainNav = document.getElementById('main-nav');
// const heroLogo = document.getElementById('hero-logo-container');
// const heroContent = document.getElementById('hero-content');

// window.addEventListener('scroll', () => {
//     const scrollY = window.scrollY;

//     // Navbar appearance
//     if (scrollY > 150) {
//         mainNav.classList.add('visible');
//     } else {
//         mainNav.classList.remove('visible');
//     }

//     // Hero Logo Morphing (Simple fade out and scale down as user scrolls)
//     const morphThreshold = 300;
//     const progress = Math.min(scrollY / morphThreshold, 1);

//     if (heroLogo) {
//         heroLogo.style.opacity = 1 - progress;
//         heroLogo.style.transform = `scale(${1 - progress * 0.5}) translateY(-${progress * 50}px)`;

//         if (progress >= 1) {
//             heroLogo.style.visibility = 'hidden';
//         } else {
//             heroLogo.style.visibility = 'visible';
//         }
//     }
// });

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, h2, h3, #proceso > div > div').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});