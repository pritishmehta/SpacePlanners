import json

with open(r'c:\Users\priti\SpacePlanners\index_backup_utf8.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

map_section = []
in_map = False
for line in lines:
    if '<!-- SERVICE COVERAGE MAP SECTION -->' in line:
        in_map = True
    if in_map:
        map_section.append(line)
        # Ends after the closing of the section/div. Let's just hardcode the end by looking for "<!-- Case Studies Carousel -->" or "<!-- Projects Section -->".
        if '<div class="case-studies-content">' in line and 'Featured Case Studies' in ''.join(map_section):
            # This is too far. Let's find the exact bounds.
            pass

# Better approach:
content = "".join(lines)
import re
map_match = re.search(r'<!-- SERVICE COVERAGE MAP SECTION -->.*?<!-- Case Studies Carousel -->', content, re.DOTALL)
faq_match = re.search(r'<!-- FAQ -->.*?<!-- FOOTER -->', content, re.DOTALL)
footer_match = re.search(r'<!-- FOOTER -->.*?</footer>', content, re.DOTALL)

with open(r'c:\Users\priti\SpacePlanners\index.html', 'r', encoding='utf-8') as f:
    target = f.read()

# Remove bad footer
target = re.sub(r'<footer>.*?</footer>', '', target, flags=re.DOTALL)
# Remove bad leftovers
target = target.replace('<!-- FOOTER -->', '')

# Insert map before "<!-- Case Studies Carousel -->" in theory, but we deleted case studies! Our targeted map placement was before Featured projects. Wait, the map IS inside case-studies in backup?

# Let's just output the exact strings of map, faq, footer to files so multi_replace can use them, or we can just append them.
snippets = {
    'map': map_match.group(0).replace('<!-- Case Studies Carousel -->', '') if map_match else '',
    'faq': faq_match.group(0).replace('<!-- FOOTER -->', '') if faq_match else '',
    'footer': footer_match.group(0) if footer_match else ''
}

with open('snippets.json', 'w', encoding='utf-8') as f:
    json.dump(snippets, f)

print("Snippets extracted")
