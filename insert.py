import json

with open('snippets.json', 'r', encoding='utf-8') as f:
    snippets = json.load(f)

with open(r'c:\Users\priti\SpacePlanners\index.html', 'r', encoding='utf-8') as f:
    target = f.read()

# The map section goes BEFORE featured projects right? Let's check where case studies went in backup:
# In backup: map was inside case-studies-section. But we don't need case-studies. Let's put map right before projects section.
if snippets['map']:
    map_html = '<section class="case-studies-section" id="case-studies">\n' + snippets['map'] + '\n</section>\n'
    if '<!-- SERVICE COVERAGE MAP SECTION -->' not in target:
        target = target.replace('<!-- PROJECTS SECTION -->', map_html + '\n<!-- PROJECTS SECTION -->')

if snippets['faq'] and '<!-- FAQ -->' not in target:
    target = target.replace('<script src="https://maps', snippets['faq'] + '\n<script src="https://maps')

if snippets['footer']:
    import re
    # Remove existing footer
    target = re.sub(r'<footer>.*?</footer>', '', target, flags=re.DOTALL)
    target = target.replace('<!-- FOOTER -->', '')
    target = target.replace('<script src="https://maps', '<!-- FOOTER -->\n' + snippets['footer'] + '\n<script src="https://maps')

with open(r'c:\Users\priti\SpacePlanners\index.html', 'w', encoding='utf-8') as f:
    f.write(target)

print("Insertion complete")
