import re

with open(r'c:\Users\priti\SpacePlanners\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to extract sections safely. We will find their start indices and use string slicing.
d = {}

# 1. Carousel
m = re.search(r'<!-- ==* H1.*?<!-- HERO CAROUSEL -->\s*<section class="carousel-section".*?</section>', html, re.DOTALL)
d['carousel'] = m.group(0) if m else ''

# 2. Sectors
m = re.search(r'<!-- STORAGE SYSTEMS FOR EVERY SECTOR -->\s*<section class="storage-systems-section".*?</section>', html, re.DOTALL)
d['sectors'] = m.group(0) if m else ''

# 3. Products
m = re.search(r'<!-- PRODUCTS SECTION -->\s*<section class="products-section".*?</section>', html, re.DOTALL)
d['products'] = m.group(0) if m else ''

# 4. Free Assessment
m = re.search(r'<!-- SCHEDULE ASSESSMENT -->\s*<section class="product-finder-section".*?</section>', html, re.DOTALL)
d['assessment'] = m.group(0) if m else ''

# 5. Client Logos
m = re.search(r'<!-- CLIENT LOGOS - HORIZONTAL SCROLLABLE WITH BRANDFETCH CDN -->\s*<section class="clients-section">.*?</section>', html, re.DOTALL)
d['logos'] = m.group(0) if m else ''

# 6. Testimonials
m = re.search(r'<!-- TESTIMONIALS -->\s*<section class="testimonials-section".*?</section>', html, re.DOTALL)
d['testimonials'] = m.group(0) if m else ''

# 7. Map (Service Coverage)
m = re.search(r'<!-- SERVICE COVERAGE MAP SECTION -->\s*<div class="service-coverage-section">.*?</div>\s*</div>', html, re.DOTALL)
d['map'] = m.group(0) if m else ''

# 8. Featured Projects
m = re.search(r'<!-- PROJECTS SECTION -->\s*<section class="projects-section".*?</section>', html, re.DOTALL)
d['projects'] = m.group(0) if m else ''

# Construct new body sections
new_body = "\n\n".join([
    d['carousel'],
    d['sectors'],
    d['products'],
    d['assessment'],
    d['logos'],
    d['testimonials'],
    d['map'],
    d['projects']
])

# Find bounds of where all these sections used to be
start_m = re.search(r'<!-- ==* H1', html)
end_m = re.search(r'<!-- FOOTER -->', html)

if start_m and end_m:
    new_html = html[:start_m.start()] + new_body + "\n\n    " + html[end_m.start():]
    with open(r'c:\Users\priti\SpacePlanners\index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Successfully reordered index.html")
else:
    print("Error finding bounds")

