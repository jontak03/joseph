document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const loadingOverlay = document.querySelector('.loading-overlay');
    const fadeElements = document.querySelectorAll('.fade-in');
    const gridCards = document.querySelectorAll('.grid-card');
    const aboutContainer = document.querySelector('.about-container');
    let lastScrollTop = 0;

    // Existing menu functionality
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });

    // Hide loading overlay after a short delay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        aboutContainer.classList.add('visible');
    }, 1000);

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });

        gridCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100); // Staggered animation
            }
        });
    }

    // Hide/show header on scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        handleScrollAnimations();
    }, false);

    // Initial call to handle animations for elements already in viewport
    handleScrollAnimations();
});

// Function to animate counting up to a target number
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to start the animation when the stats section is in view
function handleStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    if (isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            animateValue(number, 0, target, 2000); // 2000ms (2 seconds) duration
        });
        statsSection.classList.add('animated');
    }
}

// Add event listener for scroll to trigger the animation
window.addEventListener('scroll', handleStatsAnimation);

// Call once on page load in case the stats section is already in view
document.addEventListener('DOMContentLoaded', handleStatsAnimation);
