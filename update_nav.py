import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['index.html', 'target.html'] and 'backup' not in f and 'old' not in f]

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

mobile_match = re.search(r'(<div class="mobile-nav" id="mobileNav">.*?<ul>)(.*?)(</ul>\s*<div class="mobile-nav-footer">)', index_content, re.DOTALL)
main_match = re.search(r'(<nav class="main-nav" aria-label="Main navigation">\s*<ul>)(.*?)(</ul>\s*</nav>)', index_content, re.DOTALL)

if not mobile_match or not main_match:
    print("Could not find nav blocks in index.html")
    exit(1)

mobile_ul_content = mobile_match.group(2)
main_ul_content = main_match.group(2)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'(<div class="mobile-nav" id="mobileNav">.*?<ul>)(.*?)(</ul>\s*<div class="mobile-nav-footer">)', lambda m: m.group(1) + mobile_ul_content + m.group(3), content, flags=re.DOTALL)
    content = re.sub(r'(<nav class="main-nav" aria-label="Main navigation">\s*<ul>)(.*?)(</ul>\s*</nav>)', lambda m: m.group(1) + main_ul_content + m.group(3), content, flags=re.DOTALL)
    
    # Also drop the "active" class on "🏠 Home" if it's not the index page, but actually the links are all hardcoded, so we'll just remove ' class="active"' from Home and add it based on filename later if needed, but for now just replicating navbar.
    content = content.replace('<li><a href="index.html" class="active">🏠 Home</a></li>', '<li><a href="index.html">🏠 Home</a></li>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print(f"Updated {len(html_files)} files: {html_files}")
