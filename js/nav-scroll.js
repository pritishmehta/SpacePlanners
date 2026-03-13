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

        // Detect if we are on the home page to apply transparency
        const isHome = document.querySelector('main.home-main') || document.body.id === 'home' || window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        if (isHome) {
            document.body.classList.add('home-page');
        }

        function onScroll() {
            const shouldScroll = window.scrollY > 50;
            // Only toggle if necessary to avoid redundant DOM updates/flashes
            if (header.classList.contains('scrolled') !== shouldScroll) {
                header.classList.toggle('scrolled', shouldScroll);
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
})();
