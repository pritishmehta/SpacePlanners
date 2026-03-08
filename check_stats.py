import re

with open('old_index.html', 'r', encoding='utf-8') as f:
    html = f.read()
    
# check if statInst is in the HTML part, before <script>
script_index = html.find('<script')
if script_index > 0:
    html_part = html[:script_index]
    if 'statInst' in html_part or 'stats-ribbon' in html_part or 'statsRibbon' in html_part:
        print("FOUND in HTML part of old_index.html")
        matches = re.finditer(r'<section.*?stats.*?</section>', html_part, re.DOTALL | re.IGNORECASE)
        for m in matches:
            print("---MATCH---")
            print(m.group(0))
    else:
        print("NOT FOUND in HTML part of old_index.html")
