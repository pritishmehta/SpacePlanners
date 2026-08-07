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

    // Calculate relative depth for components directory
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    let prefix = '';
    if (pathSegments.includes('pages') || pathSegments.length > 1) {
        prefix = '../';
    }

    function fixComponentPaths(html, pathPrefix) {
        if (!pathPrefix) return html;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const isAbsolute = (url) => {
            if (!url) return true;
            const u = url.trim();
            return u.startsWith('http://') ||
                   u.startsWith('https://') ||
                   u.startsWith('//') ||
                   u.startsWith('/') ||
                   u.startsWith('#') ||
                   u.startsWith('mailto:') ||
                   u.startsWith('tel:') ||
                   u.startsWith('javascript:') ||
                   u.startsWith('data:');
        };

        tempDiv.querySelectorAll('[src]').forEach(el => {
            const src = el.getAttribute('src');
            if (src && !isAbsolute(src)) {
                el.setAttribute('src', pathPrefix + src);
            }
        });

        tempDiv.querySelectorAll('[href]').forEach(el => {
            const href = el.getAttribute('href');
            if (href && !isAbsolute(href)) {
                el.setAttribute('href', pathPrefix + href);
            }
        });

        tempDiv.querySelectorAll('*').forEach(el => {
            if (el.hasAttribute('xlink:href')) {
                const href = el.getAttribute('xlink:href');
                if (href && !isAbsolute(href)) {
                    el.setAttribute('xlink:href', pathPrefix + href);
                }
            }
        });

        return tempDiv.innerHTML;
    }

    components.forEach(comp => {
        let el = document.getElementById(comp.id);
        
        // Auto-create cookie placeholder if missing
        if (!el && comp.id === "cookie-consent-placeholder") {
            el = document.createElement('div');
            el.id = comp.id;
            document.body.appendChild(el);
        }

        if (el) {
            // If the element already has content (e.g. inlined for performance), skip fetching except for footer
            if (el.innerHTML.trim() !== "" && comp.id !== "footer-placeholder") {
                if (prefix) {
                    el.innerHTML = fixComponentPaths(el.innerHTML, prefix);
                }
                loadedCount++;
                if (comp.id === "header-placeholder" || comp.id === "mobile-nav-placeholder") {
                    setActiveNavLink();
                }
                if (loadedCount === components.filter(c => document.getElementById(c.id)).length) {
                    document.dispatchEvent(new CustomEvent('componentsLoaded'));
                }
            } else {
                const fetchUrl = prefix + comp.url + cacheBust;

                fetch(fetchUrl)
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        return response.text();
                    })
                    .then(data => {
                        el.innerHTML = fixComponentPaths(data, prefix);
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
        }
    });

    function setActiveNavLink() {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;
            const cleanHref = href.split("?")[0].split("#")[0].split("/").pop();
            if (cleanHref === currentPath || (currentPath === "" && cleanHref === "index.html")) {
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
    let modal = document.getElementById('inquiryModal');
    if (!modal) {
        // Fallback: If modal HTML hasn't been fetched/injected yet, inject minimal modal structure
        const placeholder = document.getElementById('modals-placeholder') || document.body;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `
        <div class="modal" id="inquiryModal" role="dialog" aria-modal="true" aria-labelledby="inquiryTitle">
            <div class="modal-content">
                <button class="close-btn" onclick="closeInquiryModal()" aria-label="Close">✕</button>
                <h2 class="modal-title" id="inquiryTitle" style="margin-bottom:24px;">Get a Free Quote</h2>
                <form id="multiStepForm" novalidate aria-label="Free Quote Inquiry Form">
                    <input type="hidden" name="product_interest" id="hidden-product-interest" value="">
                    <div class="form-step" id="step2">
                        <div class="form-group">
                            <label for="inq-name">Full Name *</label>
                            <input type="text" id="inq-name" name="name" placeholder="Your full name" required autocomplete="name">
                        </div>
                        <div class="form-group">
                            <label for="inq-company">Company Name</label>
                            <input type="text" id="inq-company" name="company" placeholder="Your company name" autocomplete="organization">
                        </div>
                        <div class="form-group">
                            <label for="inq-email">Email Address *</label>
                            <input type="email" id="inq-email" name="email" placeholder="your@email.com" required autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label for="inq-phone">Phone Number *</label>
                            <input type="tel" id="inq-phone" name="phone" required autocomplete="tel">
                        </div>
                        <div class="form-group">
                            <label for="inq-msg">Message (Optional)</label>
                            <textarea id="inq-msg" name="message"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" id="finalSubmitBtn" class="btn-primary form-submit-btn">Submit Inquiry &rarr;</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>`.trim();
        while (tempDiv.firstChild) {
            placeholder.appendChild(tempDiv.firstChild);
        }
        modal = document.getElementById('inquiryModal');
        if (typeof initAllForms === 'function') {
            initAllForms();
        }
    }
    if (!modal) return;

    // --- Pre-fill hidden product_interest field ---
    let hiddenInterest = modal.querySelector('#hidden-product-interest');
    if (hiddenInterest) {
        hiddenInterest.value = (productInfo && productInfo.category) ? productInfo.category : 'General Inquiry';
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

    // Close any modal when clicking its overlay (outside modal-content)
    if (e.target && e.target.classList && e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (typeof closeInquiryModal === 'function') closeInquiryModal();
        if (typeof closeProductModal === 'function') closeProductModal();
        if (typeof closeMobileNav === 'function') closeMobileNav();
        document.querySelectorAll('.modal.active').forEach(m => {
            m.classList.remove('active');
        });
        document.body.style.overflow = '';
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

    // Handle product highlight from URL parameters
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const highlightProduct = urlParams.get('highlight');
        if (highlightProduct) {
            const cards = document.querySelectorAll('.product-card');
            for (let card of cards) {
                const nameEl = card.querySelector('.product-name');
                if (nameEl) {
                    const nameText = nameEl.textContent.trim().toLowerCase();
                    const highlightText = highlightProduct.trim().toLowerCase();
                    const baseName = nameText.replace(/s$/, '');
                    const baseHighlight = highlightText.replace(/s$/, '');
                    
                    if (baseName === baseHighlight || nameText.includes(baseHighlight) || highlightText.includes(baseName)) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.boxShadow = '0 0 20px rgba(229, 57, 53, 0.8)';
                        card.style.transform = 'scale(1.02)';
                        card.style.transition = 'all 0.5s ease';
                        // Revert after a few seconds
                        setTimeout(() => {
                            card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)';
                            card.style.transform = '';
                        }, 3000);
                        break;
                    }
                }
            }
        }
    }, 600); // Slight delay to ensure products are rendered by JS
});
