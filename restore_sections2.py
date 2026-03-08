import re

html_path = r'c:\Users\priti\SpacePlanners\index.html'
backup_path = r'c:\Users\priti\SpacePlanners\index_backup.html'

with open(html_path, 'r', encoding='utf-8') as f:
    current_html = f.read()

with open(backup_path, 'r', encoding='utf-8') as f:
    backup_html = f.read()

# 1. Extract Map Section from Backup
map_match = re.search(r'<!-- SERVICE COVERAGE MAP SECTION -->.*?<div class="service-coverage-section">.*?</div>\s*</div>', backup_html, re.DOTALL)
map_section = map_match.group(0) if map_match else ''

# 2. Extract FAQ Section from Backup
faq_match = re.search(r'<!-- FAQ SECTION -->.*?<section class="faq-section" id="faq">.*?</section>', backup_html, re.DOTALL)
faq_section = faq_match.group(0) if faq_match else ''

# 3. Extract Footer from Backup
# The footer starts with <!-- FOOTER --> and goes to the end of the </footer> tag
footer_match = re.search(r'<!-- FOOTER -->\s*<footer class="footer">.*?</footer>', backup_html, re.DOTALL)
footer_section = footer_match.group(0) if footer_match else ''

# 4. Extract Stats Ribbon
stats_match = re.search(r'<!-- STATS RIBBON --.*?</section>', backup_html, re.DOTALL)
if not stats_match:
    stats_match = re.search(r'<section class="stats-ribbon".*?</section>', backup_html, re.DOTALL)
stats_section = stats_match.group(0) if stats_match else ''

# Now we need to inject them back into the current HTML.

d = {}

m = re.search(r'<!-- ==* H1.*?<!-- HERO CAROUSEL -->\s*<section class="carousel-section".*?</section>', current_html, re.DOTALL)
d['carousel'] = m.group(0) if m else ''

m = re.search(r'<!-- STORAGE SYSTEMS FOR EVERY SECTOR -->\s*<section class="storage-systems-section".*?</section>', current_html, re.DOTALL)
d['sectors'] = m.group(0) if m else ''

m = re.search(r'<!-- PRODUCTS SECTION -->\s*<section class="products-section".*?</section>', current_html, re.DOTALL)
d['products'] = m.group(0) if m else ''

m = re.search(r'<!-- SCHEDULE ASSESSMENT -->\s*<section class="product-finder-section".*?</section>', current_html, re.DOTALL)
d['assessment'] = m.group(0) if m else ''

m = re.search(r'<!-- CLIENT LOGOS - HORIZONTAL SCROLLABLE WITH BRANDFETCH CDN -->\s*<section class="clients-section">.*?</section>', current_html, re.DOTALL)
d['logos'] = m.group(0) if m else ''

m = re.search(r'<!-- TESTIMONIALS -->\s*<section class="testimonials-section".*?</section>', current_html, re.DOTALL)
d['testimonials'] = m.group(0) if m else ''

m = re.search(r'<!-- PROJECTS SECTION -->\s*<section class="projects-section".*?</section>', current_html, re.DOTALL)
d['projects'] = m.group(0) if m else ''

# New body compilation
new_body = "\n\n".join([
    d['carousel'],
    stats_section,
    d['sectors'],
    d['products'],
    d['assessment'],
    d['logos'],
    d['testimonials'],
    map_section,
    d['projects'],
    faq_section
])

# Find bounds of where all these sections are so we can replace them.
start_m = re.search(r'<!-- ==* H1', current_html)
end_m = re.search(r'<!-- FOOTER -->', current_html)
if not end_m:
    end_m = re.search(r'<footer[^>]*>', current_html)

if start_m and end_m:
    footer_end_m = re.search(r'</footer>', current_html[end_m.start():])
    
    top_html = current_html[:start_m.start()]
    if footer_end_m:
        bottom_html = current_html[end_m.start() + footer_end_m.end():]
    else:
        bottom_html = current_html[end_m.start():]
        
    new_html = top_html + new_body + "\n\n" + footer_section + "\n" + bottom_html
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Successfully restored sections")
else:
    print("Error finding bounds", "start_m:", bool(start_m), "end_m:", bool(end_m))

