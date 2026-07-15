import os
import re

directory = '.'

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update tel: links
        content = re.sub(r'tel:\+919987733903', r'tel:02240033385', content)
        content = re.sub(r'tel:\+912240033385', r'tel:02240033385', content)
        
        # Update wa.me links
        content = re.sub(r'wa\.me/\+919987733903', r'wa.me/919987733903', content)
        content = re.sub(r'wa\.me/912240033385', r'wa.me/919987733903', content)

        # Update visible text
        content = re.sub(r'\+91-9987733903', r'022 4003 3385/86', content)
        content = re.sub(r'\+91-22-40033385', r'022 4003 3385/86', content)
        content = re.sub(r'>\s*\+919987733903\s*<', r'>022 4003 3385/86<', content)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

# Also check components directory
components_dir = os.path.join(directory, 'components')
if os.path.exists(components_dir):
    for filename in os.listdir(components_dir):
        if filename.endswith(".html"):
            path = os.path.join(components_dir, filename)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content = re.sub(r'tel:\+919987733903', r'tel:02240033385', content)
            content = re.sub(r'tel:\+912240033385', r'tel:02240033385', content)
            
            content = re.sub(r'wa\.me/\+919987733903', r'wa.me/919987733903', content)
            content = re.sub(r'wa\.me/912240033385', r'wa.me/919987733903', content)

            content = re.sub(r'\+91-9987733903', r'022 4003 3385/86', content)
            content = re.sub(r'\+91-22-40033385', r'022 4003 3385/86', content)
            content = re.sub(r'>\s*\+919987733903\s*<', r'>022 4003 3385/86<', content)

            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Done replacing phone numbers.")
