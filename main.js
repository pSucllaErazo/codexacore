// Mouse tracking glow effect
const hero = document.getElementById('hero');
const heroSocials = document.getElementById('social-floating');

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
});

// Scroll Logic: Navbar visibility and Logo Morphing

const mainNav = document.getElementById('main-nav');
const morphedLogo = document.getElementById('morphed-logo-container');
const heroContent = document.getElementById('hero-content');
const exploreIndicator = document.getElementById('explore-indicator');

function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

function smoothStep(value) {
    return value * value * (3 - 2 * value);
}

function getHeroProgress() {
    const heroRect = hero.getBoundingClientRect();
    const scrollableDistance = hero.offsetHeight - window.innerHeight;

    if (scrollableDistance <= 0) return 1;

    const scrolledInsideHero = clamp(-heroRect.top, 0, scrollableDistance);

    return scrolledInsideHero / scrollableDistance;
}

function handleHeroScroll() {
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

    // Apagar luz morada cuando el logo ya está prácticamente en el navbar
    if (progress > 0.80) {
        morphedLogo.classList.add('logo-in-navbar');
    } else {
        morphedLogo.classList.remove('logo-in-navbar');
    }

    // El texto aparece cuando el logo ya empez贸 a subir.
    const enterProgress = clamp((progress - 0.50) / 0.1);


    const contentOpacity = enterProgress
    const contentY = 36 * (1 - enterProgress)

    if (heroContent) {
        heroContent.style.opacity = contentOpacity;
        heroContent.style.transform = `translateY(${contentY}px)`;

        if (contentOpacity > 0.15) {
            heroContent.classList.add('hero-content-active');
        } else {
            heroContent.classList.remove('hero-content-active');
        }
    }

    // "Explorar" solo se ve al inicio.
    if (exploreIndicator) {
        const exploreOpacity = clamp(1 - progress / 0.25);
        exploreIndicator.style.opacity = exploreOpacity * 0.5;
    }

    // Navbar aparece cuando el logo ya casi lleg贸.
    if (progress > 0.72) {
        mainNav.classList.add('visible');
    } else {
        mainNav.classList.remove('visible');
    }
    if (heroSocials) {
        if (progress > 0.50) {
            heroSocials.classList.add('socials-hidden');
        } else {
            heroSocials.classList.remove('socials-hidden');
        }
    }
}
handleHeroScroll();
window.addEventListener('scroll', handleHeroScroll, { passive: true });
window.addEventListener('resize', handleHeroScroll);


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