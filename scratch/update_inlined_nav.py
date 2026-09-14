import glob

nav_snippet_root = """      <li><a href="projects.html">PROJECTS</a></li>
      <li class="has-dropdown">
        <a href="export/global-exports.html">GLOBAL EXPORTS <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="nav-chevron">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg></a>
        <ul class="nav-dropdown">
          <li><a href="export/global-exports.html">Overview</a></li>
          <li><a href="export/mobile-shelving-compactor.html">Mobile Shelving & Compactor Systems</a></li>
          <li><a href="export/heavy-duty-racks.html">Heavy Duty & Pallet Racks</a></li>
        </ul>
      </li>"""

nav_snippet_sub = """      <li><a href="../projects.html">PROJECTS</a></li>
      <li class="has-dropdown">
        <a href="../export/global-exports.html">GLOBAL EXPORTS <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="nav-chevron">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg></a>
        <ul class="nav-dropdown">
          <li><a href="../export/global-exports.html">Overview</a></li>
          <li><a href="../export/mobile-shelving-compactor.html">Mobile Shelving & Compactor Systems</a></li>
          <li><a href="../export/heavy-duty-racks.html">Heavy Duty & Pallet Racks</a></li>
        </ul>
      </li>"""

mobile_snippet_root = """    <li><a href="projects.html">PROJECTS</a></li>
    <li>
      <a href="export/global-exports.html" style="justify-content:space-between">GLOBAL EXPORTS <span>▾</span></a>
      <ul class="mobile-dropdown" style="background:#fcfcfc; padding:0; text-transform: none;">
        <li><a href="export/global-exports.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Overview</a></li>
        <li><a href="export/mobile-shelving-compactor.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Mobile Shelving & Compactor Systems</a></li>
        <li><a href="export/heavy-duty-racks.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Heavy Duty & Pallet Racks</a></li>
      </ul>
    </li>"""

mobile_snippet_sub = """    <li><a href="../projects.html">PROJECTS</a></li>
    <li>
      <a href="../export/global-exports.html" style="justify-content:space-between">GLOBAL EXPORTS <span>▾</span></a>
      <ul class="mobile-dropdown" style="background:#fcfcfc; padding:0; text-transform: none;">
        <li><a href="../export/global-exports.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Overview</a></li>
        <li><a href="../export/mobile-shelving-compactor.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Mobile Shelving & Compactor Systems</a></li>
        <li><a href="../export/heavy-duty-racks.html"
            style="padding-left:40px; padding-top:5px; padding-bottom:5px; font-size:16px; font-weight:bold; color:var(--red-dark);">Heavy Duty & Pallet Racks</a></li>
      </ul>
    </li>"""

files = glob.glob('*.html') + glob.glob('pages/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    is_sub = f.startswith('pages')
    nav_snp = nav_snippet_sub if is_sub else nav_snippet_root
    mob_snp = mobile_snippet_sub if is_sub else mobile_snippet_root
    proj_link = '../projects.html' if is_sub else 'projects.html'
    
    modified = False
    if 'GLOBAL EXPORTS' not in content:
        target_nav = f'<li><a href="{proj_link}">PROJECTS</a></li>'
        if target_nav in content:
            # Replace desktop nav
            content = content.replace(target_nav, nav_snp, 1)
            # Replace mobile nav if secondary occurrence exists
            if target_nav in content:
                content = content.replace(target_nav, mob_snp, 1)
            modified = True
            
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated nav in {f}")
