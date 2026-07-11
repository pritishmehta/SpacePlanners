import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Remove duplicate floating-buttons-placeholder and modals-placeholder
    for div_id in ['floating-buttons-placeholder', 'modals-placeholder']:
        pattern = f'<div id="{div_id}"></div>'
        parts = content.split(pattern)
        if len(parts) > 2:
            # Reconstruct keeping only the first occurrence
            content = parts[0] + pattern + ''.join(parts[1:])
            
    # 3. Add defer to data.js, forms-handler.js, nav-scroll.js
    content = content.replace('<script src="js/data.js"></script>', '<script src="js/data.js" defer></script>')
    content = content.replace('<script src="js/forms-handler.js"></script>', '<script src="js/forms-handler.js" defer></script>')
    content = content.replace('<script src="js/nav-scroll.js"></script>', '<script src="js/nav-scroll.js" defer></script>')
    
    # 5. Merge two Google Fonts link tags into one
    # Assuming there are two googleapis links, let's just remove the second one that might be for print/preload
    fonts_regex = r'<link[^>]*href="https://fonts\.googleapis\.com/css2\?family=Playfair\+Display:wght@700;800&family=Poppins:wght@300;400;500;600;700&display=swap"[^>]*>'
    # We will remove the exact string found in index.html to avoid removing everything
    content = content.replace('''<link rel="preload" as="style"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" media="print" onload="this.media='all'"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@300;400;500;600;700&display=swap">''', '')

    # 10. Fix stat inconsistency: 50% space saved to 75%
    content = content.replace('data-target="50" data-suffix="%"', 'data-target="75" data-suffix="%"')
    content = content.replace('50<span>%</span>', '75<span>%</span>')

    if file == 'index.html':
        # 4. Remove duplicate style.css from index.html
        style_parts = content.split('<link rel="stylesheet" href="style.css">')
        if len(style_parts) > 2:
            content = style_parts[0] + '<link rel="stylesheet" href="style.css">' + ''.join(style_parts[1:])
            
    if file == 'industrial-racks.html':
        # 11. Fix updateSlideTitle() modulo
        content = content.replace('currentSlide % 4', 'currentSlide % 2')
        
    if file == 'about.html':
        # 2. Wire contactPageForm to submitFormToBackend
        # Replace simple WhatsApp link or form submit with submitFormToBackend
        # We will do a generic replacement if it's there
        if 'id="contactPageForm"' in content:
            # Look for the form tag and replace its onsubmit
            content = re.sub(r'(<form[^>]*id="contactPageForm"[^>]*)>', r'\1 onsubmit="event.preventDefault(); submitFormToBackend(this);">', content)
        
    # 9. Fix hero copy
    if file == 'storage-lockers.html':
        content = content.replace('State-of-the-art compactor storage systems', 'State-of-the-art locker storage systems')
        content = content.replace('Maximize your space with our premium compactors', 'Secure your belongings with our premium lockers')
        content = content.replace('Discover our premium compactor storage', 'Discover our premium locker storage')
        
    if file == 'filing-cabinets.html':
        content = content.replace('State-of-the-art compactor storage systems', 'State-of-the-art filing cabinets')
        content = content.replace('Maximize your space with our premium compactors', 'Organize your documents with our premium cabinets')
        content = content.replace('Discover our premium compactor storage', 'Discover our premium filing cabinets')

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
