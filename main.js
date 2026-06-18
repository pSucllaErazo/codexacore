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
const mainNav = document.getElementById('main-nav');
const heroLogo = document.getElementById('hero-logo-container');
const heroContent = document.getElementById('hero-content');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar appearance
    if (scrollY > 150) {
        mainNav.classList.add('visible');
    } else {
        mainNav.classList.remove('visible');
    }

    // Hero Logo Morphing (Simple fade out and scale down as user scrolls)
    const morphThreshold = 300;
    const progress = Math.min(scrollY / morphThreshold, 1);

    if (heroLogo) {
        heroLogo.style.opacity = 1 - progress;
        heroLogo.style.transform = `scale(${1 - progress * 0.5}) translateY(-${progress * 50}px)`;

        if (progress >= 1) {
            heroLogo.style.visibility = 'hidden';
        } else {
            heroLogo.style.visibility = 'visible';
        }
    }
});

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