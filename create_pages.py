import os
import re

base_file = r'c:\Users\priti\SpacePlanners\products.html'

with open(base_file, 'r', encoding='utf-8') as f:
    content = f.read()

pages = [
    {
        "filename": "compactor-storage.html",
        "title": "Compactor Storage System",
        "desc": "Maximize your storage capacity with our high-density mobile compactor storage systems."
    },
    {
        "filename": "industrial-racks.html",
        "title": "Industrial Racks",
        "desc": "Heavy-duty pallet racking systems designed for modern warehouses and logistics operations."
    },
    {
        "filename": "storage-lockers.html",
        "title": "Storage Lockers",
        "desc": "Secure, premium steel lockers for corporate offices, gyms, and educational institutions."
    },
    {
        "filename": "filing-cabinets.html",
        "title": "Filing Cabinets & Cupboards",
        "desc": "Professional filing and organizational cupboards for efficient office document management."
    }
]

pattern = re.compile(r'<!-- HERO -->.*?<!-- FOOTER -->', re.DOTALL)

for p in pages:
    new_body = f'''<!-- HERO -->
    <section class="hero-section">
        <h1 class="hero-title">{p['title']}</h1>
        <nav class="hero-breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">/</span><a href="products.html">Products</a><span class="sep">/</span><span>{p['title']}</span>
        </nav>
    </section>

    <section class="page-section" style="padding: 80px 0; min-height: 50vh;">
        <div class="page-content" style="text-align:center; max-width: 900px; margin: 0 auto;">
            <h2 style="font-size: 32px; color: var(--dark); margin-bottom: 24px;">{p['title']}</h2>
            <p style="font-size: 18px; color: #666; line-height: 1.7; margin: 0 auto 40px;">
                {p['desc']}
            </p>
            <div style="background: #f9f9f9; padding: 60px; border-radius: 16px; border: 2px dashed #e0e0e0;">
                <p style="font-size: 16px; color: #888; font-weight: 500;">Detailed product specifications, images, and configuration options will be populated here.</p>
                <button class="btn-primary" style="margin-top: 24px;" onclick="openInquiryModal('{p['title']}')">Get a Quote for this Product</button>
            </div>
        </div>
    </section>

    <!-- FOOTER -->'''
    
    page_content = pattern.sub(new_body, content)
    
    # Also fix title tag
    page_content = re.sub(r'<title>.*?</title>', f'<title>{p["title"]} | Space Planners</title>', page_content)
    
    out_path = os.path.join(r'c:\Users\priti\SpacePlanners', p['filename'])
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(page_content)

print("Created 4 product pages.")
