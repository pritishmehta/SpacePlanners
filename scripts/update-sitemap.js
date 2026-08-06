const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const baseDomain = 'https://spaceplannersindia.in';

const mainPages = [
  '',
  'compactor-storage.html',
  'industrial-racks.html',
  'storage-lockers.html',
  'filing-cabinets.html',
  'projects.html',
  'about.html',
  'contact.html',
  'blog.html',
  'privacy-policy.html',
  'terms-of-use.html',
  'disclaimer.html'
];

const compactorProducts = [
  'File Storage Compactors',
  'Pigeon Hole Compactors',
  'Heavy Duty Compactors',
  'Perforated Compactors',
  'Drawer Compactors',
  'Stainless Steel Compactors'
].map(name => `pages/compactors/${slugify(name)}.html`);

const rackProducts = [
  'Decking Panel Racking System',
  'Pallet Racking System',
  'Slotted Angle Racks',
  'Sectional Panel Heavy Duty Racks',
  'Multi-Tier Racking System',
  'Mezzanine Floor Systems',
  'Stainless Steel Rack'
].map(name => `pages/racks/${slugify(name)}.html`);

const lockerProducts = [
  'Gym Lockers',
  'Personal Staff Lockers',
  'School Lockers',
  'Stainless Steel Lockers',
  'Mobile Phone Lockers',
  'Tower Lockers',
  'Changing Room Lockers'
].map(name => `pages/lockers/${slugify(name)}.html`);

const cabinetProducts = [
  'Perforated Drawer Cabinet',
  'Drawer Cabinet',
  'Poster Storage Drawer Cabinet',
  'Filing Cabinet',
  'Storewell Cupboard',
  'Glass Door Cupboard',
  'Pigeon Hole Cupboard',
  'Sliding Door Cupboard'
].map(name => `pages/cabinets/${slugify(name)}.html`);

const dataJsContent = fs.readFileSync(path.join(process.cwd(), 'js', 'data.js'), 'utf8');
const casesMatch = dataJsContent.match(/const cases = (\[[\s\S]*?\]);/);
const casesData = eval(casesMatch[1]);
const projectPages = casesData.map(c => `pages/projects/${slugify(c.title)}.html`);

const blogPages = [
  'What is a Mobile Compactor Storage System? A Complete Guide (2026)',
  'How to Choose the Right Industrial Storage Rack: A Complete Buyer\'s Guide'
].map(name => `pages/blog/${slugify(name)}.html`);

const allRelativeUrls = [
  ...mainPages,
  ...compactorProducts,
  ...rackProducts,
  ...lockerProducts,
  ...cabinetProducts,
  ...projectPages,
  ...blogPages
];

const today = new Date().toISOString().split('T')[0];

const sitemapEntries = allRelativeUrls.map(rel => {
  const loc = rel ? `${baseDomain}/${rel}` : `${baseDomain}/`;
  let priority = '0.8';
  let changefreq = 'weekly';
  if (!rel) { priority = '1.0'; }
  else if (['compactor-storage.html', 'industrial-racks.html', 'storage-lockers.html', 'filing-cabinets.html'].includes(rel)) { priority = '0.9'; }
  else if (['privacy-policy.html', 'terms-of-use.html', 'disclaimer.html'].includes(rel)) { priority = '0.3'; changefreq = 'yearly'; }
  else if (rel.startsWith('pages/projects/') || rel.startsWith('pages/blog/')) { priority = '0.7'; changefreq = 'monthly'; }

  return `    <url>
        <loc>${loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}).join('\n');

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), 'sitemap.xml'), sitemapXML, 'utf8');
console.log(`sitemap.xml updated with ${allRelativeUrls.length} URLs.`);
