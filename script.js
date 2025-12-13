

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

class Typewriter {
    constructor(elementId, texts, waitTime = 3000) {
        this.element = document.getElementById(elementId);
        this.texts = texts;
        this.waitTime = waitTime;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
        this.element.classList.add('cursor');
    }

    type() {
        const currentHook = this.wordIndex % this.texts.length;
        const fullTxt = this.texts[currentHook];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Typewriter('typewriter-text', ['Jane Wirz', 'bl4zee']);
});

function updateAge() {
    const ageElement = document.getElementById('age-display');
    if (!ageElement) return;

    const birthDate = new Date('2005-12-16');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    ageElement.textContent = age + ' years old';
}

document.addEventListener('DOMContentLoaded', updateAge);
// Also update daily just in case the site is left open
setInterval(updateAge, 86400000);
