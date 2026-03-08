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
footer_match = re.search(r'<!-- FOOTER -->\s*<footer class="footer">.*?</footer>', backup_html, re.DOTALL)
footer_section = footer_match.group(0) if footer_match else ''

# Check what went wrong earlier: did we delete "<!-- PROJECTS SECTION -->"?
if '<!-- PROJECTS SECTION -->' in current_html:
    print('Projects tag found')
else:
    print('Projects tag NOT found')

if '<script src="js/data.js"></script>' in current_html:
    print('Scripts found')
else:
    print('Scripts NOT found')

# Let's forcefully append them at the end before scripts or body close.
if map_section and "<!-- SERVICE COVERAGE MAP SECTION -->" not in current_html:
    current_html = re.sub(r'<!-- PROJECTS SECTION -->', map_section + '\n\n<!-- PROJECTS SECTION -->', current_html)
    
if faq_section and "<!-- FAQ SECTION -->" not in current_html:
    current_html = re.sub(r'<script src="js/data.js"></script>', faq_section + '\n\n<script src="js/data.js"></script>', current_html)

# We need to COMPLETELY REMOVE the existing bad footer first if any
bad_footer_match = re.search(r'<footer(.*?)</footer>', current_html, re.DOTALL)
if bad_footer_match:
    current_html = current_html[:bad_footer_match.start()] + footer_section + current_html[bad_footer_match.end():]
else:
    current_html = re.sub(r'<script src="js/data.js"></script>', footer_section + '\n\n<script src="js/data.js"></script>', current_html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(current_html)

print("Final HTML saved.")
