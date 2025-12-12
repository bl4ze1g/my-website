// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.init();
    }

    getCurrentTheme() {
        return this.theme;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    // Feather icons replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Add subtle animations to cards on load
    const cards = document.querySelectorAll('.social-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-card');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            const icon = this.querySelector('i[data-feather]');
            if (icon) {
                const original = icon.getAttribute('data-feather');
                icon.setAttribute('data-feather', original === 'send' ? 'mail' :
                    original === 'external-link' ? 'arrow-up-right' : original);
                feather.replace();
            }
        });

        link.addEventListener('mouseleave', function () {
            const icon = this.querySelector('i[data-feather]');
            if (icon) {
                const original = icon.getAttribute('data-feather');
                icon.setAttribute('data-feather', original === 'arrow-up-right' ? 'external-link' :
                    original === 'mail' ? 'send' : original);
                feather.replace();
            }
        });
    });

    // Dynamic year for footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function () {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}, 250));

// Export theme manager for web components
window.ThemeManager = themeManager;