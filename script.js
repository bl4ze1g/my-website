

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
