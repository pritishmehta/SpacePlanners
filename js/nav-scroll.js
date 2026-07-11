/**
 * Adds .scrolled class to header when page is scrolled > 50px.
 * Works with both hardcoded headers and dynamically loaded ones.
 */
(function () {
    function initScrollBehaviour() {
        // Try multiple selectors to find the header
        const header = document.querySelector('header') || document.querySelector('.header-main');
        if (!header) return;
        
        // Avoid attaching duplicate listeners
        if (header.dataset.scrollInit) return;
        header.dataset.scrollInit = '1';

        // Detect if we are on a page that should have a transparent header at top
        // Home page, or any page with a hero-section or carousel-section
        const hasHero = document.querySelector('.hero-section') || 
                        document.querySelector('.carousel-section') || 
                        document.querySelector('.hero-wrap') ||
                        document.querySelector('main.home-main') ||
                        document.body.id === 'home' || 
                        window.location.pathname.endsWith('index.html') || 
                        window.location.pathname === '/';

        if (hasHero) {
            document.body.classList.add('home-page'); // Keep this class for backward compat with CSS
            document.body.classList.add('transparent-nav');
        } else {
            document.body.classList.remove('home-page');
            document.body.classList.remove('transparent-nav');
        }

        function onScroll() {
            const shouldScroll = window.scrollY > 50;
            if (header.classList.contains('scrolled') !== shouldScroll) {
                header.classList.toggle('scrolled', shouldScroll);
            }
            const bar = document.getElementById('spMobileCtaBar');
            if (bar) {
                bar.classList.toggle('sp-mobile-cta-visible', window.scrollY > 400);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run immediately in case page is already scrolled
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollBehaviour);
    } else {
        initScrollBehaviour();
    }

    // Re-initialize when components are dynamically loaded
    document.addEventListener('componentsLoaded', initScrollBehaviour);

    // Carousel Auto-Play and Swipe Support
    document.addEventListener('DOMContentLoaded', () => {
        // If carousel functions are defined, initialize timer
        if (typeof resetTimer === 'function' && typeof updateSlide === 'function') {
            updateSlide();
            resetTimer();
        }

        // Swipe support for all carousel sections
        const carouselSections = document.querySelectorAll('.carousel-section, .hero-section');
        carouselSections.forEach(section => {
            let touchstartX = 0;
            let touchendX = 0;
            
            section.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            section.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                if (typeof nextSlide === 'function' && typeof prevSlide === 'function' && typeof resetTimer === 'function') {
                    if (touchendX < touchstartX - 50) { nextSlide(); resetTimer(); }
                    if (touchendX > touchstartX + 50) { prevSlide(); resetTimer(); }
                }
            }
        });
    });
})();
