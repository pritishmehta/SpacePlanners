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

new_content = current_html

if map_section and "<!-- SERVICE COVERAGE MAP SECTION -->" not in new_content:
    new_content = new_content.replace('<!-- PROJECTS SECTION -->', map_section + '\n\n<!-- PROJECTS SECTION -->')

if faq_section and "<!-- FAQ SECTION -->" not in new_content:
    # insert before scripts start
    new_content = new_content.replace('<script src="js/data.js"></script>', faq_section + '\n\n    <script src="js/data.js"></script>')

if footer_section and "<!-- FOOTER -->" not in new_content:
    new_content = new_content.replace('<script src="js/data.js"></script>', footer_section + '\n\n    <script src="js/data.js"></script>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("INJECT DONE")
