const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Read cases array from js/data.js dynamically
const dataJsContent = fs.readFileSync(path.join(process.cwd(), 'js', 'data.js'), 'utf8');
const casesMatch = dataJsContent.match(/const cases = (\[[\s\S]*?\]);/);
if (!casesMatch) {
  console.error('Could not parse cases array from js/data.js');
  process.exit(1);
}

const cases = eval(casesMatch[1]);
console.log(`Loaded ${cases.length} cases from js/data.js`);

function generateProjectHTML(c, relPath = '../') {
  const pageSlug = slugify(c.title);
  const canonicalUrl = `https://spaceplannersindia.in/projects/${pageSlug}.html`;

  const resultsList = c.results.map(r => `
    <li style="display:flex; gap:12px; align-items:flex-start; margin-bottom:12px;">
      <span style="color:#e53935; font-size:18px; font-weight:bold;">✓</span>
      <div>
        ${r.metric ? `<strong style="color:#222; display:block;">${r.metric}</strong>` : ''}
        <span style="color:#555; font-size:15px;">${r.label}</span>
      </div>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NTQSLB54');</script>
<!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.title.trim()} | Space Planners India</title>
  <meta name="description" content="${c.challenge.substring(0, 155)}...">
  <link rel="icon" type="image/svg+xml" href="${relPath}favicon.svg">
  <link rel="canonical" href="${canonicalUrl}">
  
  <meta property="og:title" content="${c.title.trim()} | Space Planners India">
  <meta property="og:description" content="${c.challenge.substring(0, 155)}...">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://spaceplannersindia.in/${c.img}">
  <meta property="og:type" content="article">
  
  <meta name="theme-color" content="#e53935">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="stylesheet" href="${relPath}style.css?v=2">
  <script src="${relPath}js/load-components.js?v=2" defer></script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "${canonicalUrl}#article",
    "headline": "${c.title.trim().replace(/"/g, '\\"')}",
    "image": "https://spaceplannersindia.in/${c.img}",
    "description": "${c.challenge.replace(/"/g, '\\"')}",
    "author": {
      "@type": "Organization",
      "name": "Space Planners India"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://spaceplannersindia.in/#organization"
    }
  }
  </script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NTQSLB54"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
  <div id="mobile-nav-placeholder"></div>
  <header id="header-placeholder"></header>

  <main style="padding-top: 120px; padding-bottom: 80px; background: #f8f9fa;">
    <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; font-size: 14px; color: #666;">
        <a href="${relPath}index.html" style="color: #666; text-decoration: none;">Home</a> / 
        <a href="${relPath}projects.html" style="color: #666; text-decoration: none;">Case Studies</a> / 
        <span style="color: #e53935; font-weight: 600;">${c.industry}</span>
      </nav>

      <article style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="background: rgba(229,57,53,0.1); color: #e53935; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${c.industry}</span>
          <h1 style="font-size: 32px; color: #222; margin: 16px 0 8px; font-family: var(--font-serif, serif); line-height: 1.3;">${c.title.trim()}</h1>
          <p style="font-size: 16px; color: #666; font-weight: 600;">Client: ${c.client}</p>
          <p style="font-size: 14px; color: #888; margin-top: 4px;">${c.subtitle}</p>
        </div>

        <div style="border-radius: 12px; overflow: hidden; height: 350px; margin-bottom: 40px; background: #eee;">
          <img src="${relPath}${c.img}" alt="${c.title.trim()}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #e53935; letter-spacing: 1px; margin-bottom: 8px;">The Challenge</h2>
          <p style="font-size: 16px; line-height: 1.8; color: #444;">${c.challenge}</p>
        </div>

        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #e53935; letter-spacing: 1px; margin-bottom: 8px;">Our Solution</h2>
          <p style="font-size: 16px; line-height: 1.8; color: #222; font-weight: 500;">${c.solution}</p>
        </div>

        <div style="background: #fafafa; border: 1px solid #eee; border-radius: 12px; padding: 28px; margin-bottom: 40px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #222; margin-bottom: 16px; border-bottom: 2px solid rgba(229,57,53,0.2); padding-bottom: 8px; display: inline-block;">Key Outcomes</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${resultsList}
          </ul>
        </div>

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; pt: 20px; border-top: 1px solid #eee;">
          <button onclick="openInquiryModal({specificProduct:'Similar Project Inquiry'})" class="btn-primary" style="padding: 14px 28px; font-size: 15px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600;">
            Request Similar Project Quote &rarr;
          </button>
          <a href="${relPath}projects.html" style="padding: 14px 28px; font-size: 15px; border-radius: 8px; border: 2px solid #e53935; color: #e53935; background: transparent; text-decoration: none; font-weight: 600;">
            All Case Studies
          </a>
        </div>
      </article>
    </div>
  </main>

  <footer id="footer-placeholder"></footer>
  <div id="modals-placeholder"></div>
  <script src="${relPath}forms-handler.js" defer></script>
  <script src="${relPath}js/nav-scroll.js" defer></script>
</body>
</html>`;
}

// Write project pages to root projects/ and pages/projects/
cases.forEach(c => {
  const pageSlug = slugify(c.title);
  const rootProjectsDir = path.join(process.cwd(), 'projects');
  if (!fs.existsSync(rootProjectsDir)) fs.mkdirSync(rootProjectsDir, { recursive: true });
  fs.writeFileSync(path.join(rootProjectsDir, `${pageSlug}.html`), generateProjectHTML(c, '../'), 'utf8');

  const pagesProjectsDir = path.join(process.cwd(), 'pages', 'projects');
  if (!fs.existsSync(pagesProjectsDir)) fs.mkdirSync(pagesProjectsDir, { recursive: true });
  fs.writeFileSync(path.join(pagesProjectsDir, `${pageSlug}.html`), generateProjectHTML(c, '../../'), 'utf8');
});

console.log(`All ${cases.length} project case study pages generated in root projects/ and pages/projects/ successfully.`);
