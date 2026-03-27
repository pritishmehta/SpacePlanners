/**
 * Space Planners India - Components Loader
 * Dynamically loads shared header, footer, nav and modals.
 */

document.addEventListener("DOMContentLoaded", () => {
    const components = [
        { id: "mobile-nav-placeholder", url: "components/mobile-nav.html" },
        { id: "header-placeholder", url: "components/header.html" },
        { id: "floating-buttons-placeholder", url: "components/floating-buttons.html" },
        { id: "footer-placeholder", url: "components/footer.html" },
        { id: "modals-placeholder", url: "components/modals.html" },
        { id: "client-logos-placeholder", url: "components/client-logos.html" },
        { id: "cookie-consent-placeholder", url: "components/cookie-consent.html" }
    ];

    let loadedCount = 0;

    const cacheBust = `?v=${Date.now()}`;

    components.forEach(comp => {
        let el = document.getElementById(comp.id);
        
        // Auto-create cookie placeholder if missing
        if (!el && comp.id === "cookie-consent-placeholder") {
            el = document.createElement('div');
            el.id = comp.id;
            document.body.appendChild(el);
        }

        if (el) {
            fetch(comp.url + cacheBust)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.text();
                })
                .then(data => {
                    el.innerHTML = data;
                    loadedCount++;
                    
                    // Post-load initialization
                    if (comp.id === "header-placeholder" || comp.id === "mobile-nav-placeholder") {
                        setActiveNavLink();
                    }
                    
                    // If everything is loaded, we can trigger any global re-scans if needed
                    if (loadedCount === components.filter(c => document.getElementById(c.id)).length) {
                        document.dispatchEvent(new CustomEvent('componentsLoaded'));
                    }
                })
                .catch(err => console.error(`Error loading ${comp.url}:`, err));
        }
    });

    function setActiveNavLink() {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath || (currentPath === "" && href === "index.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
});

/**
 * Common UX Functions
 */

function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

function openMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    if (hamburgerBtn) {
        hamburgerBtn.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (hamburgerBtn) {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
}

/**
 * Opens the Inquiry Modal.
 * @param {Object} [productInfo] - Optional context about which product triggered the modal.
 * @param {string} [productInfo.category]        - The main product category (maps to a radio value).
 * @param {string} [productInfo.specificProduct] - The specific product variant, e.g. "Document Storage Compactor".
 */
function openInquiryModal(productInfo) {
    const modal = document.getElementById('inquiryModal');
    if (!modal) return;

    // --- Pre-fill Step 1: auto-select the matching radio card ---
    if (productInfo && productInfo.category) {
        const radios = modal.querySelectorAll('input[name="product_interest"]');
        radios.forEach(radio => {
            const isMatch = radio.value.toLowerCase().includes(productInfo.category.toLowerCase()) ||
                            productInfo.category.toLowerCase().includes(radio.value.toLowerCase());
            radio.checked = isMatch;
            // Visually mark the selected card
            const card = radio.closest('.radio-card');
            if (card) card.classList.toggle('selected', isMatch);
        });
    } else {
        // Reset all selections when opened without context
        modal.querySelectorAll('input[name="product_interest"]').forEach(r => {
            r.checked = false;
            const card = r.closest('.radio-card');
            if (card) card.classList.remove('selected');
        });
    }

    // --- Inject / Update hidden field for specific product ---
    let hiddenField = modal.querySelector('#hidden-specific-product');
    if (!hiddenField) {
        hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.id = 'hidden-specific-product';
        hiddenField.name = 'specific_product';
        const form = modal.querySelector('#multiStepForm');
        if (form) form.appendChild(hiddenField);
    }
    hiddenField.value = (productInfo && productInfo.specificProduct) ? productInfo.specificProduct : '';

    // --- Show a banner in Step 2 if a specific product was passed ---
    let productBanner = modal.querySelector('#inq-product-banner');
    if (productBanner) productBanner.remove();
    if (productInfo && productInfo.specificProduct) {
        const step2 = modal.querySelector('#step2');
        if (step2) {
            productBanner = document.createElement('div');
            productBanner.id = 'inq-product-banner';
            productBanner.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(196,20,20,0.06); border-left:3px solid var(--primary,#c41414); border-radius:4px; padding:10px 14px; margin-bottom:18px; font-size:14px; color:var(--dark,#141414);';
            productBanner.innerHTML = `<span style="font-size:18px;">📦</span><span>Enquiring about: <strong>${productInfo.specificProduct}</strong></span>`;
            step2.insertBefore(productBanner, step2.firstChild);
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleFloatPopup(e) {
    if (e) e.stopPropagation();
    const popup = document.getElementById('floatPopup');
    const btn = document.getElementById('floatInqBtn');
    if (popup) {
        const isOpen = popup.classList.toggle('show');
        if (btn) btn.setAttribute('aria-expanded', isOpen);
    }
}

function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span><span>${msg}</span>`;
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(t);
        requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
    }
}

function scrollClients(delta) {
    const el = document.getElementById('clientsScroll');
    if (el) el.scrollBy({ left: delta, behavior: 'smooth' });
}

// Close popup on outside click
document.addEventListener('click', (e) => {
    const popup = document.getElementById('floatPopup');
    const stack = document.getElementById('floatStack');
    if (popup && popup.classList.contains('show') && stack && !stack.contains(e.target)) {
        popup.classList.remove('show');
        const btn = document.getElementById('floatInqBtn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
});

// ── GENERAL UI INITIALIZATION ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Back to top logic
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            btt.classList.toggle('visible', window.scrollY > 400);
        });
    }

    // Reveal animations observer
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Initial observation
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

    // Observe periodically for dynamically added elements (like product cards)
    const observer = new MutationObserver(() => {
        document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
            revealObs.observe(el);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Handle window resize - Close mobile nav if resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileNav();
        }
    });
});
