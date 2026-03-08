import re

html_path = r'c:\Users\priti\SpacePlanners\index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    current_html = f.read()

# Let's see if FAQ SECTION is actually present
if '<!-- FAQ SECTION -->' in current_html:
    print("FAQ SECTION FOUND")
else:
    print("FAQ SECTION MISSING")
    # let's write it in manually 
    backup_path = r'c:\Users\priti\SpacePlanners\index_backup.html'
    with open(backup_path, 'r', encoding='utf-8') as fb:
        backup_html = fb.read()
    faq_match = re.search(r'<!-- FAQ SECTION -->.*?</section>', backup_html, re.DOTALL)
    if faq_match:
        faq_section = faq_match.group(0)
        # Put it right before the footer
        current_html = re.sub(r'<!-- FOOTER -->', faq_section + '\n\n<!-- FOOTER -->', current_html)
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(current_html)
        print("FAQ SECTION APPENDED")
