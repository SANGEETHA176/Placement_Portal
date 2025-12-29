// Initialize Icons
lucide.createIcons();

const themeBtn = document.getElementById('theme-btn');
const dropdown = document.getElementById('theme-dropdown');

// Toggle Dropdown
themeBtn.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
};

window.onclick = () => dropdown.classList.remove('show');

// Theme Logic
function setTheme(mode) {
    const root = document.documentElement;
    if (mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.removeItem('theme');
    } else {
        root.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
    }
    updateIcon(mode);
}

function updateIcon(mode) {
    const icon = document.getElementById('current-theme-icon');
    let name = mode === 'dark' ? 'moon' : mode === 'system' ? 'monitor' : 'sun';
    icon.setAttribute('data-lucide', name);
    lucide.createIcons();
}

// Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Count-up Animation
const animateStats = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Animation duration in ms

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let startTime = null;

        const update = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / speed, 1);
            
            // Ease-out Cubic function for premium feel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            counter.innerText = Math.floor(easedProgress * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(update);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    else setTheme('system');
    
    // Start animation
    animateStats();
});