import re
import os

# Data from the PDF structured for the 4 pages
PAGE_DATA = {
    "compactor-storage.html": {
        "title": "Compactor Storage Systems",
        "desc": "Space-saving solutions for maximum storage capacity",
        "bg_image": "hero_compactor.png",
        "products": [
            {
                "id": "c1", "name": "Document Storage Compactor", "image": "hero_compactor.png",
                "apps": "Offices, Banks, Libraries, Archives"
            },
            {
                "id": "c2", "name": "Pigeon Hole Compactor", "image": "hero_compactor.png",
                "apps": "Engineering Components, Electronic Components, Hardware Items, Pharmaceutical Supplies"
            },
            {
                "id": "c3", "name": "Heavy Duty Compactor", "image": "hero_compactor.png",
                "apps": "Designed to accommodate items weighing up to 300 kilograms per level."
            },
            {
                "id": "c4", "name": "Perforated Compactor", "image": "hero_compactor.png",
                "apps": "For Temperature and Humidity Control: Medicine Storage, Archives"
            },
            {
                "id": "c5", "name": "Drawer Compactor", "image": "hero_compactor.png",
                "apps": "Maximum storage capacity for smaller items, such as medication, flavorings, and fragrance bottles."
            },
            {
                "id": "c6", "name": "Stainless Steel Compactor", "image": "hero_compactor.png",
                "apps": "Cold storage units for vaccines, perishable items, and other related materials."
            },
            {
                "id": "c7", "name": "Art Display Compactor", "image": "hero_compactor.png",
                "apps": "Art Gallery, Museum, Archives, Library, Art Collectors"
            },
            {
                "id": "c8", "name": "Art Storage Compactor", "image": "hero_compactor.png",
                "apps": "Art Gallery, Museum, Archives, Library, Art Collectors"
            },
            {
                "id": "c9", "name": "Rifle Storage Compactor", "image": "hero_compactor.png",
                "apps": "Police Stations, Military and Defense Facilities, Private Security Firms, Shooting Ranges, Museums and Archives"
            },
            {
                "id": "c10", "name": "Inbuilt Exhaust Compactor", "image": "hero_compactor.png",
                "apps": "Fragrance Storage, Flavor Storage, Chemical Storage"
            },
            {
                "id": "c11", "name": "Apparel Storage Compactor", "image": "hero_compactor.png",
                "apps": "Luxury Retail Outlets"
            },
            {
                "id": "c12", "name": "SS Uniform Storage Compactor", "image": "hero_compactor.png",
                "apps": "Hotels and Resorts"
            },
            {
                "id": "c13", "name": "Medium Duty Compactor", "image": "hero_compactor.png",
                "apps": "Warehouses, Retail Back Storage"
            },
            {
                "id": "c14", "name": "Specialised Medium Duty Compactor", "image": "hero_compactor.png",
                "apps": "Capacity per level: 100-300 kilograms. Applications: Industrial, warehousing, pharmaceutical. Suitable for seed storage."
            },
            {
                "id": "c15", "name": "Stepped Compactor", "image": "hero_compactor.png",
                "apps": "Sites with varying ceiling heights to optimize space utilization."
            },
            {
                "id": "c16", "name": "Compactor With Doors", "image": "hero_compactor.png",
                "apps": "Secure storage solutions. Utilization across multiple departments."
            }
        ]
    },
    "industrial-racks.html": {
        "title": "Industrial Racks",
        "desc": "Heavy-duty racking systems for warehouse and industrial storage",
        "bg_image": "hero_racks.png",
        "products": [
            {
                "id": "r1", "name": "Decking Panel Racking System", "image": "hero_racks.png",
                "apps": "Industrial and Warehouse Facilities for the Manual Storage of Smaller Items"
            },
            {
                "id": "r2", "name": "Pallet Racking System", "image": "hero_racks.png",
                "apps": "Industrial and Warehouse Storage Solutions for Larger, Heavier Items"
            },
            {
                "id": "r3", "name": "Slotted Angle Racks", "image": "hero_racks.png",
                "apps": "Multipurpose storage solutions: Back offices, Restaurants, Educational institutions, Retail shops, And more."
            },
            {
                "id": "r4", "name": "Sectional Panel Heavy Duty Racks", "image": "hero_racks.png",
                "apps": "Designed for heavy storage, accommodating up to 400 kg per level."
            },
            {
                "id": "r5", "name": "Multi-Tier Racking System", "image": "hero_racks.png",
                "apps": "Requirements for Multipurpose Industrial and Warehousing Applications"
            },
            {
                "id": "r6", "name": "Mezzanine Floor Systems", "image": "hero_racks.png",
                "apps": "Industrial Sheds and Warehouses Designed for Optimal Vertical Height Utilization"
            }
        ]
    },
    "storage-lockers.html": {
        "title": "Storage Lockers",
        "desc": "Secure personal and professional locker storage solutions",
        "bg_image": "hero_lockers.png",
        "products": [
            {
                "id": "l1", "name": "Gym Lockers", "image": "hero_lockers.png",
                "apps": "Gyms"
            },
            {
                "id": "l2", "name": "Personal Staff Locker", "image": "hero_lockers.png",
                "apps": "Industrial Workers"
            },
            {
                "id": "l3", "name": "Bag And Helmet Locker", "image": "hero_lockers.png",
                "apps": "Offices"
            },
            {
                "id": "l4", "name": "Mobile Phone Locker (Cam Lock)", "image": "hero_lockers.png",
                "apps": "Offices, Industries, Banks, Educational Institutions"
            },
            {
                "id": "l5", "name": "Mobile Phone Locker (Numerical Lock)", "image": "hero_lockers.png",
                "apps": "Offices, Industries, Banks, Educational Institutions"
            },
            {
                "id": "l6", "name": "Tower Locker", "image": "hero_lockers.png",
                "apps": "Offices"
            },
            {
                "id": "l7", "name": "Multicolored Lockers", "image": "hero_lockers.png",
                "apps": "Offices"
            }
        ]
    },
    "filing-cabinets.html": {
        "title": "Filing Cabinets & Cupboards",
        "desc": "Organized and accessible storage for documents and components",
        "bg_image": "hero_filing.png",
        "products": [
            {
                "id": "f1", "name": "Perforated Drawer Cabinet", "image": "hero_filing.png",
                "apps": "Pharmacy and Medicine Boxes"
            },
            {
                "id": "f2", "name": "Drawer Cabinet", "image": "hero_filing.png",
                "apps": "Archives, Small Components"
            },
            {
                "id": "f3", "name": "Poster Storage Drawer Cabinet", "image": "hero_filing.png",
                "apps": "Archives, Film Posters, Small Components"
            },
            {
                "id": "f4", "name": "Filing Cabinet", "image": "hero_filing.png",
                "apps": "Organizing Files and Documents"
            },
            {
                "id": "f5", "name": "Storewell Cupboard", "image": "hero_filing.png",
                "apps": "Library, Offices, Banks"
            },
            {
                "id": "f6", "name": "Glass Door Cupboard", "image": "hero_filing.png",
                "apps": "Library, Offices, Banks"
            },
            {
                "id": "f7", "name": "Pigeon Hole Cupboard", "image": "hero_filing.png",
                "apps": "Library, Offices, Banks"
            },
            {
                "id": "f8", "name": "Sliding Door Cupboard", "image": "hero_filing.png",
                "apps": "Library, Offices, Banks"
            }
        ]
    }
}

import json

# Read base template (index.html)
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract essential global blocks using string indexing instead of complex regex
head_end = html.find('</head>')
head_html = html[:head_end+7].replace('<title>Mobile Compactors & Industrial Storage Solutions India | Space Planners</title>', '<title>{page_title} - Space Planners India</title>')

body_start = html.find('<body>')
header_end = html.find('</header>') + 9
header_html = html[body_start:header_end]

# Strip the preloader block entirely from the header HTML so product pages don't
# inherit the Loading.gif dependency that prevents the page from loading.
import re as re2
header_html = re2.sub(r'<!-- Preloader -->.*?</div>\s*</div>\s*</div>', '', header_html, flags=re2.DOTALL)
# Also remove the loader-line variant if present
header_html = re2.sub(r'<div class="preloader".*?</div>\s*</div>\s*</div>', '', header_html, flags=re2.DOTALL)

footer_html = "" # Index.html doesn't have a footer tag, so we gracefully default to empty.

stats_match = re.search(r'(<div class="stats-ribbon"[^>]*>[\s\S]*?</div>\s*</div>\s*</div>)', html)
stats_html = stats_match.group(1) if stats_match else ""

# Base layout for generating pages
page_template = """{head}
<style>
/* Product Pages Specific Styles */
.product-modal-split {{ display: flex; flex-direction: column; }}
@media(min-width: 768px) {{ .product-modal-split {{ flex-direction: row; align-items: stretch; }} .product-modal-image, .product-modal-details {{ flex: 1; }} }}
.product-modal-image {{ min-height: 300px; position: relative; overflow: hidden; }}
.product-modal-details {{ padding: 40px; display: flex; flex-direction: column; background: #fff; }}
.product-modal-label {{ font-size: 11px; font-weight: 700; text-transform: uppercase; color: #e53935; letter-spacing: 1px; }}
.product-card {{ transition: transform 0.3s ease, box-shadow 0.3s ease; }}
.product-card:hover {{ transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important; }}
.product-card:hover .product-image img {{ transform: scale(1.05) !important; }}
.product-card .btn-primary:hover {{ background: #c62828 !important; }}
</style>
{header}

    <!-- FLOATING BUTTONS -->
    <div class="float-stack" id="floatStack">
        <div style="position:relative;">
            <div class="float-inquiry-popup" id="floatPopup">
                <div class="popup-header">
                    <p class="popup-title">Quick Enquiry</p>
                    <button class="popup-close" onclick="toggleFloatPopup(event)">\u2715</button>
                </div>
                <input class="popup-input" type="text" id="pop-name" placeholder="Your name" autocomplete="name">
                <input class="popup-input" type="tel" id="pop-phone" placeholder="+91 phone number" autocomplete="tel">
                <input class="popup-input" type="email" id="pop-email" placeholder="Email address" autocomplete="email">
                <button class="popup-submit" onclick="submitPopupInquiry()">Send Enquiry \u2192</button>
                <p class="popup-note">\u26a1 We reply within 2 hours</p>
            </div>
            <button class="float-inquiry-btn" onclick="toggleFloatPopup(event)" aria-label="Quick inquiry" id="floatInqBtn" title="Quick Enquiry">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.79 1.79 3.75 3.75M3 17.25V21h3.75l11.06-11.06-3.75-3.75z" fill="white" /></svg>
            </button>
        </div>
        <div class="whatsapp-float">
            <a href="https://wa.me/912240033385?text=Hi%20Space%20Planners%2C%20I%20want%20a%20quote" class="whatsapp-btn" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.2 1.6 1.7-6-.4-.6C8 29.7 7 26.9 7 24 7 14.6 14.6 7 24 7s17 7.6 17 17-7.6 17-17 17z" /><path fill="#fff" d="M33.5 28.2c-.5-.3-2.9-1.4-3.3-1.6-.4-.1-.7-.2-1 .3-.3.5-1.2 1.6-1.5 1.9-.3.3-.5.3-1 .1-.5-.3-2-.7-3.8-2.4-1.4-1.3-2.4-2.9-2.6-3.4-.3-.5 0-.8.2-1l.9-1c.2-.3.2-.5.4-.8.1-.3 0-.6-.1-.8-.1-.3-1-2.5-1.4-3.4-.4-.9-.8-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.7 4.4 1.9 4.7c.2.3 3.3 5 8 7 1.1.5 2 .8 2.6 1 1.1.3 2.1.3 2.9.2.9-.1 2.9-1.2 3.3-2.3.4-1.2.4-2.1.3-2.3-.1-.2-.4-.4-.9-.6z" /></svg>
            </a>
        </div>
    </div>
    <button id="back-to-top" onclick="window.scrollTo({{top:0,behavior:'smooth'}})" aria-label="Back to top">\u2191</button>

    <!-- INQUIRY MODAL -->
    <div class="modal" id="inquiryModal" role="dialog" aria-modal="true">
        <div class="modal-content">
            <button class="close-btn" onclick="closeInquiryModal()">\u2715</button>
            <h2 class="modal-title">Get a Free Quote</h2>
            <form onsubmit="submitInquiry(event)">
                <div class="form-group"><label for="inq-name">Full Name *</label><input type="text" id="inq-name" name="name" placeholder="Your name" required autocomplete="name"></div>
                <div class="form-group"><label for="inq-email">Email *</label><input type="email" id="inq-email" name="email" placeholder="your@email.com" required autocomplete="email"></div>
                <div class="form-group"><label for="inq-phone">Phone *</label><input type="tel" id="inq-phone" name="phone" placeholder="+91 XXXXX XXXXX" required autocomplete="tel"></div>
                <div class="form-group"><label for="inq-msg">Message</label><textarea id="inq-msg" name="message" placeholder="Tell us about your storage needs\u2026"></textarea></div>
                <button type="submit" class="submit-btn">Send Inquiry \u2192</button>
            </form>
        </div>
    </div>

    <!-- 1. HERO CAROUSEL: one slide per product -->
    <section class="carousel-section" aria-label="{page_title}" style="position:relative; height:calc(100vh - 120px); min-height:500px; max-height:800px; overflow:hidden; background:#222;">
        <div class="carousel-container" id="heroCarousel" style="height:100%; position:relative;">
            {carousel_slides}
        </div>
        <!-- Dots -->
        <div id="carouselDots" style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:10;">
            {carousel_dots}
        </div>
        <!-- Arrows -->
        <button onclick="prevSlide()" aria-label="Previous" style="position:absolute;left:20px;top:50%;transform:translateY(-50%);z-index:10;background:rgba(255,255,255,0.2);border:none;color:#fff;width:48px;height:48px;border-radius:50%;font-size:22px;cursor:pointer;backdrop-filter:blur(4px);">\u276e</button>
        <button onclick="nextSlide()" aria-label="Next" style="position:absolute;right:20px;top:50%;transform:translateY(-50%);z-index:10;background:rgba(255,255,255,0.2);border:none;color:#fff;width:48px;height:48px;border-radius:50%;font-size:22px;cursor:pointer;backdrop-filter:blur(4px);">\u276f</button>
    </section>

    <!-- 2. BRUYNZEEL STATS RIBBON -->
    <div style="background:#fff; padding-bottom: 40px;">
        {stats}
    </div>

    <!-- 3. PRODUCT CARDS: Comprehensive Storage style -->
    <section style="background:#f8f8f8; padding: 64px 0 80px;">
        <div style="max-width:1240px; margin:0 auto; padding:0 24px;">
            <div class="section-header-small reveal" style="text-align:center; margin-bottom:48px;">
                <span class="section-badge">Our Range</span>
                <h2 class="section-title">{page_title}</h2>
                <div class="accent-line"></div>
                <p class="section-subtitle" style="max-width:640px; margin:16px auto 0;">{page_desc}</p>
            </div>

            <div id="productGrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:28px;">
                <!-- rendered by JS -->
            </div>
        </div>
    </section>

    <!-- SPLIT PRODUCT DETAIL MODAL -->
    <div class="modal" id="productModal" role="dialog" aria-modal="true">
        <div class="modal-content product-modal-content" style="max-width:960px; padding:0; overflow:hidden; border-radius:16px;">
            <button class="close-btn" onclick="closeProductModal()" aria-label="Close" style="z-index:10; background:#fff; width:40px; height:40px; border-radius:50%; box-shadow:0 4px 10px rgba(0,0,0,0.15); top:16px; right:16px;">\u2715</button>
            <div class="product-modal-split" id="productDetailContent">
                <!-- rendered by JS -->
            </div>
        </div>
    </div>

    <!-- 4. CLIENT LOGOS -->
    <section class="clients-section">
        <div class="clients-content">
            <p class="clients-label">Trusted by India's leading organisations</p>
            <div class="clients-scroll-wrapper">
                <button class="clients-nav left" onclick="scrollClients(-300)" aria-label="Scroll left">&#x276e;</button>
                <div class="clients-scroll" id="clientsScroll">
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/drdo.gov.in" alt="DRDO" loading="lazy"><span class="logo-name">DRDO</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/ongcindia.com" alt="ONGC" loading="lazy"><span class="logo-name">ONGC</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/aiims.edu" alt="AIIMS" loading="lazy"><span class="logo-name">AIIMS</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/tata.com" alt="Tata Group" loading="lazy"><span class="logo-name">Tata Group</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/isro.gov.in" alt="ISRO" loading="lazy"><span class="logo-name">ISRO</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/indianrailways.gov.in" alt="Indian Railways" loading="lazy"><span class="logo-name">Indian Railways</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/sunpharma.com" alt="Sun Pharma" loading="lazy"><span class="logo-name">Sun Pharma</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/sbi.co.in" alt="SBI" loading="lazy"><span class="logo-name">SBI</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/larsentoubro.com" alt="L&T" loading="lazy"><span class="logo-name">L&T</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/ril.com" alt="Reliance" loading="lazy"><span class="logo-name">Reliance</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/kokilabenhospital.com" alt="Kokilaben" loading="lazy"><span class="logo-name">Kokilaben</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/iitb.ac.in" alt="IIT Bombay" loading="lazy"><span class="logo-name">IIT Bombay</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/ntpc.co.in" alt="NTPC" loading="lazy"><span class="logo-name">NTPC</span></div>
                    <div class="client-logo-item"><img class="logo-img" src="https://cdn.brandfetch.io/rbi.org.in" alt="RBI" loading="lazy"><span class="logo-name">RBI</span></div>
                    <button class="clients-nav right" onclick="scrollClients(300)" aria-label="Scroll right">&#x276f;</button>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. FOOTER -->
    <footer>
        <div class="footer-inner">
            <div class="footer-brand">
                <div class="logo-footer">Space<span>Planners</span></div>
                <p>India's trusted manufacturer of premium storage solutions since 2004. Serving 500+ clients across every major city.</p>
                <div class="footer-social">
                    <a href="#" aria-label="LinkedIn">in</a>
                    <a href="#" aria-label="Facebook">f</a>
                    <a href="#" aria-label="YouTube">\u25b6</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Products</h4>
                <ul>
                    <li><a href="compactor-storage.html">Compactor Storage</a></li>
                    <li><a href="industrial-racks.html">Industrial Racks</a></li>
                    <li><a href="storage-lockers.html">Storage Lockers</a></li>
                    <li><a href="filing-cabinets.html">Filing Cabinets</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="projects.html">Projects</a></li>
                    <li><a href="case-studies.html">Case Studies</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <div class="footer-contact">
                    <a href="tel:+912240033385"><span class="icon">\ud83d\udcde</span>+91-22-40033385</a>
                    <a href="mailto:sales@spaceplannersindia.in"><span class="icon">\u2709\ufe0f</span>sales@spaceplannersindia.in</a>
                    <a href="https://wa.me/912240033385" target="_blank" rel="noopener"><span class="icon">\ud83d\udcac</span>WhatsApp Us</a>
                    <a href="#"><span class="icon">\ud83d\udccd</span>Mumbai, Maharashtra, India</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>\u00a9 2026 Space Planners India. All rights reserved.</p>
            <div class="footer-bottom-links">
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="terms-of-use.html">Terms of Use</a>
                <a href="disclaimer.html">Disclaimer</a>
            </div>
        </div>
    </footer>

    <script>
        // \u2500\u2500 CAROUSEL \u2500\u2500
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');

        function goToSlide(n) {{
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }}
        function nextSlide() {{ goToSlide(currentSlide + 1); }}
        function prevSlide() {{ goToSlide(currentSlide - 1); }}
        setInterval(nextSlide, 5000);

        // \u2500\u2500 CLIENTS SCROLL \u2500\u2500
        function scrollClients(delta) {{
            const el = document.getElementById('clientsScroll');
            if (el) el.scrollBy({{ left: delta, behavior: 'smooth' }});
        }}

        // \u2500\u2500 UTILITY \u2500\u2500
        function showToast(msg, type = 'success') {{
            const t = document.createElement('div');
            t.className = `toast ${{type}}`;
            t.innerHTML = `<span class="toast-icon">${{type === 'success' ? '\u2705' : '\u274c'}}</span><span>${{msg}}</span>`;
            document.getElementById('toast-container').appendChild(t);
            requestAnimationFrame(() => {{ requestAnimationFrame(() => t.classList.add('show')); }});
            setTimeout(() => {{ t.classList.remove('show'); setTimeout(() => t.remove(), 400); }}, 4000);
        }}
        function openInquiryModal() {{ document.getElementById('inquiryModal').classList.add('active'); document.body.style.overflow = 'hidden'; }}
        function closeInquiryModal() {{ document.getElementById('inquiryModal').classList.remove('active'); document.body.style.overflow = ''; }}
        function submitInquiry(e) {{ e.preventDefault(); showToast('Thank you! Our experts will contact you within 24 hours.'); closeInquiryModal(); e.target.reset(); }}
        function openMobileNav() {{ document.getElementById('mobileNav').classList.add('open'); document.getElementById('mobileOverlay').classList.add('open'); document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; }}
        function closeMobileNav() {{ document.getElementById('mobileNav').classList.remove('open'); document.getElementById('mobileOverlay').classList.remove('open'); document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }}
        function toggleFloatPopup(e) {{ e.stopPropagation(); const p = document.getElementById('floatPopup'); const b = document.getElementById('floatInqBtn'); const o = p.classList.toggle('show'); b.setAttribute('aria-expanded', o); }}
        document.addEventListener('click', e => {{ const p = document.getElementById('floatPopup'); const s = document.getElementById('floatStack'); if (p && p.classList.contains('show') && !s.contains(e.target)) {{ p.classList.remove('show'); document.getElementById('floatInqBtn').setAttribute('aria-expanded', 'false'); }} }});
        function submitPopupInquiry() {{ const n = document.getElementById('pop-name').value.trim(); const ph = document.getElementById('pop-phone').value.trim(); if (!n || !ph) {{ showToast('Please enter your name and phone number.', 'error'); return; }} showToast('Thank you ' + n + "! We'll call you within 2 hours."); document.getElementById('floatPopup').classList.remove('show');['pop-name', 'pop-phone', 'pop-email'].forEach(id => document.getElementById(id).value = ''); }}
        const revealObs = new IntersectionObserver(entries => {{ entries.forEach(e => {{ if (e.isIntersecting) {{ e.target.classList.add('visible'); revealObs.unobserve(e.target); }} }}); }}, {{ threshold: .12 }});
        document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));
        const btt = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
        document.addEventListener('keydown', e => {{ if (e.key === 'Escape') {{ closeInquiryModal(); closeProductModal(); closeMobileNav(); }} }});
        document.getElementById('inquiryModal').addEventListener('click', function(e) {{ if (e.target === this) closeInquiryModal(); }});

        // \u2500\u2500 PRODUCTS GRID \u2500\u2500
        const productsData = {json_data};

        function renderProducts() {{
            const grid = document.getElementById('productGrid');
            grid.innerHTML = productsData.map((p, i) => `
                <div class="product-card reveal${{i % 3 === 1 ? ' delay-1' : i % 3 === 2 ? ' delay-2' : ''}}" style="text-decoration:none; cursor:default; display:flex; flex-direction:column;">
                    <div class="product-image" style="overflow:hidden; border-radius:12px 12px 0 0;">
                        <img src="${{p.image}}" alt="${{p.name}}" loading="lazy" style="width:100%; height:220px; object-fit:cover; transition:transform 0.4s ease;" onerror="this.parentElement.style.background='linear-gradient(135deg,#e53935 0%,#b71c1c 100%)'; this.style.display='none';">
                    </div>
                    <div class="product-info" style="padding:24px; flex:1; display:flex; flex-direction:column; justify-content:space-between; background:#fff; border-radius:0 0 12px 12px; box-shadow:0 4px 20px rgba(0,0,0,0.07);">
                        <div>
                            <h3 class="product-name" style="font-size:17px; margin-bottom:8px; color:var(--dark);">${{p.name}}</h3>
                            <p class="product-description" style="color:var(--light); font-size:14px; line-height:1.6; margin-bottom:20px;">${{p.apps.length > 90 ? p.apps.substring(0,90) + '...' : p.apps}}</p>
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <button onclick="openProductModal('${{p.id}}')" class="btn-primary" style="padding:10px 18px; font-size:13px; border:none; cursor:pointer; flex:1; min-width:110px; text-align:center;">View Details</button>
                            <button onclick="openInquiryModal()" style="padding:10px 18px; font-size:13px; border:2px solid var(--primary,#e53935); background:transparent; color:var(--primary,#e53935); border-radius:6px; cursor:pointer; flex:1; min-width:110px; font-weight:600; transition:all 0.2s;" onmouseover="this.style.background='var(--primary,#e53935)';this.style.color='#fff';" onmouseout="this.style.background='transparent';this.style.color='var(--primary,#e53935)';">Get Quote</button>
                        </div>
                    </div>
                </div>
            `).join('');
            document.querySelectorAll('#productGrid .reveal, #productGrid .reveal-left, #productGrid .reveal-right').forEach(el => revealObs.observe(el));
        }}

        function openProductModal(id) {{
            const p = productsData.find(x => x.id === id);
            if (!p) return;
            const content = document.getElementById('productDetailContent');
            content.innerHTML = `
                <div class="product-modal-image" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);">
                    <img src="${{p.image}}" alt="${{p.name}}" onerror="this.style.opacity='0';" style="width:100%; height:100%; object-fit:cover; opacity:0.9;">
                </div>
                <div class="product-modal-details">
                    <span class="product-modal-label">Product Detail</span>
                    <h2 class="product-modal-title" style="font-size:24px; margin:12px 0 8px;">${{p.name}}</h2>
                    <div style="margin: 16px 0 20px;">
                        <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#aaa;">Ideal Applications</span>
                        <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px;">
                            ${{p.apps.split(',').map(a => `<span style="background:#f5f5f5; color:#444; padding:5px 12px; border-radius:20px; font-size:13px; font-weight:500;">${{a.trim()}}</span>`).join('')}}
                        </div>
                    </div>
                    <p style="color:var(--mid,#6b6b6b); line-height:1.7; font-size:14px; margin-bottom:24px;">
                        Built to the highest quality standards with precision engineering — providing maximum safety, durability, and operational efficiency for your facility.
                    </p>
                    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:auto; padding-top:16px; border-top:1px solid #f0f0f0;">
                        <button class="submit-btn" onclick="openInquiryModal()" style="padding:13px 28px; font-size:15px; flex:1;">
                            Get Free Quote
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                        <a href="https://wa.me/912240033385?text=I'm%20interested%20in%20${{encodeURIComponent(p.name)}}" target="_blank" rel="noopener" style="display:flex; align-items:center; gap:8px; padding:13px 20px; border:2px solid #25D366; color:#25D366; border-radius:8px; font-weight:600; font-size:14px; text-decoration:none; white-space:nowrap;">
                            \ud83d\udcac WhatsApp
                        </a>
                    </div>
                </div>
            `;
            document.getElementById('productModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }}

        function closeProductModal() {{
            document.getElementById('productModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }}
        document.getElementById('productModal').addEventListener('click', function(e) {{ if (e.target === this) closeProductModal(); }});

        // \u2500\u2500 STATS ANIMATION \u2500\u2500
        document.addEventListener('DOMContentLoaded', () => {{
            renderProducts();
            const strip = document.getElementById('statsRibbon');
            if (!strip) return;
            let animated = false;
            function animateAll() {{
                if (animated) return; animated = true;
                strip.querySelectorAll('.stat-strip-num').forEach(el => {{
                    const target = parseInt(el.dataset.target, 10);
                    const spanHTML = el.querySelector('span') ? '<span>' + el.querySelector('span').textContent + '</span>' : '';
                    if (isNaN(target)) return;
                    const start = performance.now();
                    (function step(now) {{
                        const p = Math.min((now - start) / 1600, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        const val = Math.round(ease * target);
                        el.innerHTML = (val >= 1000 ? val.toLocaleString() : val) + spanHTML;
                        if (p < 1) requestAnimationFrame(step);
                    }})(performance.now());
                }});
            }}
            new IntersectionObserver((entries) => {{ if (entries[0].isIntersecting) animateAll(); }}, {{ threshold: 0.2 }}).observe(strip);
        }});
    </script>
    <script src="excel-data-capture.js"></script>
</body>
</html>
"""

# Generate the files
for filename, d in PAGE_DATA.items():
    # Build carousel slides (one per product)
    slide_html_parts = []
    dot_html_parts = []
    for i, p in enumerate(d['products']):
        active_cls = ' active' if i == 0 else ''
        active_dot = ' style="background:#e53935;"' if i == 0 else ''
        slide_html_parts.append(
            f'<div class="carousel-slide{active_cls}">'
            f'<img src="{p["image"]}" alt="{p["name"]}" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0;" onerror="this.style.display=\'none\'">'
            f'<div class="slide-overlay"></div>'
            f'<div class="slide-content">'
            f'<p class="slide-eyebrow">Product Portfolio</p>'
            f'<h1 class="slide-title">{p["name"]}</h1>'
            f'<p class="slide-description">{p["apps"][:80]}...</p>'
            f'</div></div>'
        )
        dot_html_parts.append(
            f'<button class="carousel-dot" onclick="goToSlide({i})" aria-label="Slide {i+1}"'
            f'{active_dot} style="width:10px;height:10px;border-radius:50%;border:2px solid #fff;background:rgba(255,255,255,0.4);cursor:pointer;transition:background 0.3s;">'
            f'</button>'
        )
    carousel_slides = '\n'.join(slide_html_parts)
    carousel_dots = '\n'.join(dot_html_parts)

    rendered = page_template.format(
        head=head_html.replace('{page_title}', d['title']),
        header=header_html,
        page_title=d['title'],
        page_desc=d['desc'],
        bg_image=d['bg_image'],
        stats=stats_html,
        carousel_slides=carousel_slides,
        carousel_dots=carousel_dots,
        json_data=json.dumps(d['products'])
    )

    with open(filename, 'w', encoding='utf-8', errors='replace') as f:
        f.write(rendered)

    print(f"Generated {filename}")
