/**
 * Adds .scrolled class to header when page is scrolled > 50px.
 * Works with both hardcoded headers and dynamically loaded ones.
 */
(function () {
    function initScrollBehaviour() {
        const header = document.querySelector('header');
        if (!header) return;
        // Avoid attaching duplicate listeners
        if (header.dataset.scrollInit) return;
        header.dataset.scrollInit = '1';

        function onScroll() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run immediately in case page is already scrolled
    }

    // Works for hardcoded headers
    document.addEventListener('DOMContentLoaded', initScrollBehaviour);

    // Works when load-components.js finishes injecting the header
    document.addEventListener('componentsLoaded', initScrollBehaviour);
})();
