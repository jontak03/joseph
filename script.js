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