const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// 1. PRODUCTS DATA BY CATEGORY
const compactorProducts = [
  {
    "id": "c1",
    "name": "File Storage Compactors",
    "image": "Compactors/document compactor.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Offices, Banks, Libraries, Archives",
    "desc": "Precision-engineered mobile storage systems that maximize document capacity while creating a cleaner, more efficient workspace. Combining robust construction, smooth operation, and secure storage for today's evolving workplaces."
  },
  {
    "id": "c2",
    "name": "Pigeon Hole Compactors",
    "image": "Compactors/pigeon-hole-compactor-carousel-2.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Warehouses, Offices, Pharmaceutical, Education & Libraries, Retail & E-commerce",
    "desc": "Precision-engineered mobile storage systems that maximize the organization and accessibility of high-volume, small-item inventories. Combining modular pigeon hole shelving, space-saving design, and smooth operation for fast, efficient retrieval."
  },
  {
    "id": "c3",
    "name": "Heavy Duty Compactors",
    "image": "Compactors/heavy-duty-compactor-carousel-3.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Warehouses, Pharmaceutical, Engineering, Automobile",
    "desc": "Engineered to support heavy-duty storage applications while maximizing capacity in demanding industrial environments. Combining high load-bearing strength, robust construction, and smooth mobility for reliable, long-term performance."
  },
  {
    "id": "c4",
    "name": "Perforated Compactors",
    "image": "Compactors/perforated.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Pharmaceuticals, Archives, Flavors & Fragrances",
    "desc": "Specially engineered mobile storage systems that promote airflow for temperature and humidity-sensitive storage environments. Combining ventilated shelving, durable construction, and efficient space utilization to protect valuable inventory."
  },
  {
    "id": "c5",
    "name": "Drawer Compactors",
    "image": "Compactors/drawer-compactor-carousel-4.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Pharamceuticals, Hospital & Pharmacy, Flavors & Fragrances",
    "desc": "Intelligent mobile drawer storage systems designed to maximize capacity while keeping small components precisely organized. Combining configurable drawers, effortless accessibility, and space-efficient design for faster inventory management."
  },
  {
    "id": "c6",
    "name": "Stainless Steel Compactors",
    "image": "Compactors/ss-compactor.webp",
    "category": "Compactor Storage System",
    "categorySlug": "compactors",
    "categoryPage": "compactor-storage.html",
    "categoryLabel": "Mobile Compactors",
    "apps": "Pharmaceuticals, FMCG, Industrial",
    "desc": "Premium stainless steel mobile storage systems engineered for hygienic, corrosion-resistant, and sterile environments. Combining exceptional durability, seamless construction, and efficient space utilization for demanding cleanroom applications."
  }
];

const rackProducts = [
  {
    "id": "r1",
    "name": "Decking Panel Racking System",
    "image": "Racks/Decking.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Industrial, Warehouse",
    "desc": "Engineered for versatile, high-capacity storage of cartons, raw materials, and finished goods across industrial environments. Combining robust decking panels, modular construction, and easy accessibility for efficient warehouse operations."
  },
  {
    "id": "r2",
    "name": "Pallet Racking System",
    "image": "Racks/Pallet Racking new.png",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Industrial, Warehouse",
    "desc": "Heavy-duty pallet storage systems engineered to maximize warehouse capacity while ensuring safe and organized inventory management. Combining high load-bearing strength, modular configurations, and easy forklift access for efficient material handling."
  },
  {
    "id": "r3",
    "name": "Slotted Angle Racks",
    "image": "Racks/slotted-angle-racking.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Restaurants, Offices, Pharamaceutical, Education & Libraries, Retail & E-Commerce",
    "desc": "Versatile shelving systems designed to organize light and medium-duty inventory across commercial and industrial spaces. Combining adjustable shelving, durable construction, and cost-effective design for everyday storage applications."
  },
  {
    "id": "r4",
    "name": "Sectional Panel Heavy Duty Racks",
    "image": "Racks/high-capacity-pallet-racks.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Warehouse, Pharamaceutical, Retail & E-Commerce",
    "desc": "Heavy-duty shelving systems engineered to support high-capacity storage without compromising accessibility or durability. Combining reinforced steel construction, adjustable shelves, and exceptional load-bearing performance for demanding environments."
  },
  {
    "id": "r5",
    "name": "Multi-Tier Racking System",
    "image": "Racks/mezzanine-floor-racking.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Warehouse, Industrial",
    "desc": "Maximize warehouse storage by utilizing vertical space with intelligently designed multi-level racking solutions. Combining structural strength, optimized accessibility, and scalable layouts to significantly increase storage capacity."
  },
  {
    "id": "r6",
    "name": "Mezzanine Floor Systems",
    "image": "Racks/multi-tier-storage-racks.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Warehouse, Industrial",
    "desc": "Create additional usable floor space by transforming unused vertical height into efficient storage or operational areas. Combining structural integrity, customized layouts, and seamless integration to maximize your facility's potential."
  },
  {
    "id": "r7",
    "name": "Stainless Steel Rack",
    "image": "Racks/ss rack.webp",
    "category": "Industrial Racks",
    "categorySlug": "racks",
    "categoryPage": "industrial-racks.html",
    "categoryLabel": "Industrial Racks",
    "apps": "Pharmaceutical, FMCG, Hospitals, Engineering",
    "desc": "Premium stainless steel shelving systems engineered for hygienic, corrosion-resistant storage in demanding industrial and clean environments. Combining exceptional durability, easy maintenance, and customizable configurations for reliable long-term performance."
  }
];

const lockerProducts = [
  {
    "id": "l1",
    "name": "Gym Lockers",
    "image": "Lockers/gym-storage-lockers.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Offices, Gyms, Education & Libraries, Industrial",
    "desc": "Modern locker systems designed to provide secure, organized storage for personal belongings in fitness and wellness facilities. Combining durable construction, ventilation features, and customizable locking options for everyday convenience and security."
  },
  {
    "id": "l2",
    "name": "Personal Staff Lockers",
    "image": "Lockers/factory-staff-lockers.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Offices, Education & Libraries, Industrial",
    "desc": "Secure and durable locker solutions designed to safely store employees' personal belongings in modern workplaces. Combining customizable configurations, reliable locking options, and robust construction for everyday security and convenience."
  },
  {
    "id": "l3",
    "name": "School Lockers",
    "image": "Lockers/bag-and-helmet-lockers.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Education & Libraries",
    "desc": "Functional and durable locker systems designed to keep students' belongings safe, organized, and easily accessible throughout the day. Combining space- efficient designs, sturdy construction, and secure locking options for educational environments."
  },
  {
    "id": "l4",
    "name": "Stainless Steel Lockers",
    "image": "Lockers/ss locker.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Offices, Industries, Banks, Educational Institutions",
    "desc": "Premium stainless steel locker systems engineered for hygienic, corrosion-resistant storage in demanding environments. Combining seamless construction, superior durability, and easy maintenance for long-lasting performance in clean facilities."
  },
  {
    "id": "l5",
    "name": "Mobile Phone Lockers",
    "image": "Lockers/mobile-phone-digital-lockers.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Offices, Industries, Banks, Educational Institutions",
    "desc": "Secure storage solutions designed for the safe management of mobile phones and personal electronic devices. Combining individual compartments, flexible locking options, and durable construction for organized and controlled access."
  },
  {
    "id": "l6",
    "name": "Tower Lockers",
    "image": "Lockers/tower-style-lockers.webp",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Offices",
    "desc": "Space-efficient vertical locker systems engineered to maximize personal storage in compact environments. Combining sleek design, durable steel construction, and customizable locking options for secure everyday use."
  },
  {
    "id": "l7",
    "name": "Changing Room Lockers",
    "image": "Lockers/CRLockers.jpeg",
    "category": "Storage Lockers",
    "categorySlug": "lockers",
    "categoryPage": "storage-lockers.html",
    "categoryLabel": "Storage Lockers",
    "apps": "Pharmaceutical, Hospital, Industrial",
    "desc": "Purpose-built locker systems designed to provide secure, hygienic storage for personnel in hospitals, pharmaceutical facilities, and industrial workplaces. Combining clean, durable construction, customizable compartments, and secure locking options to support changing room and staff welfare areas."
  }
];

const cabinetProducts = [
  {
    "id": "f1",
    "name": "Perforated Drawer Cabinet",
    "image": "Cupboard Cabinets/perforated-storage-cabinet.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Pharmacy and Medicine Boxes",
    "desc": "Ventilated drawer storage systems engineered for organized storage in temperature and humidity-controlled environments. Combining perforated construction, smooth drawer operation, and efficient space utilization to protect sensitive materials."
  },
  {
    "id": "f2",
    "name": "Drawer Cabinet",
    "image": "Cupboard Cabinets/vertical-drawer-filing-cabinet.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Archives, Small Components",
    "desc": "High-capacity drawer storage systems designed to organize drawings, documents, tools, and other flat or small-format materials. Combining smooth-glide drawers, durable steel construction, and customizable layouts for efficient storage and retrieval."
  },
  {
    "id": "f3",
    "name": "Poster Storage Drawer Cabinet",
    "image": "Cupboard Cabinets/secure-document-cabinet.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Archives, Film Posters, Small Components",
    "desc": "Specialized flat-file storage systems designed for the safe archiving and preservation of posters, maps, drawings, and large-format documents. Combining spacious flat drawers, durable steel construction, and smooth operation to protect valuable materials from damage."
  },
  {
    "id": "f4",
    "name": "Filing Cabinet",
    "image": "Cupboard Cabinets/standard-office-filing-cabinet.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Organizing Files and Documents",
    "desc": "Professional filing systems designed to keep documents secure, organized, and readily accessible in busy workplaces. Combining smooth drawer operation, secure locking mechanisms, and durable construction for dependable everyday use."
  },
  {
    "id": "f5",
    "name": "Storewell Cupboard",
    "image": "Cupboard Cabinets/indus sto.png",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Library, Offices, Banks",
    "desc": "Versatile steel storage cupboards designed for the secure organization of office supplies, files, equipment, and general inventory. Combining robust construction, adjustable shelving, and secure locking options for reliable everyday storage."
  },
  {
    "id": "f6",
    "name": "Glass Door Cupboard",
    "image": "Cupboard Cabinets/Glass door main.png",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Library, Offices, Banks",
    "desc": "Elegant storage cupboards featuring transparent glass doors. Perfect for displaying books, awards, or keeping easily identifiable files in offices."
  },
  {
    "id": "f7",
    "name": "Pigeon Hole Cupboard",
    "image": "Cupboard Cabinets/metal-filing-cabinet.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Library, Offices, Banks",
    "desc": "Efficient compartmentalized storage cupboards designed to organize files, mail, documents, and small inventory with ease. Combining modular pigeon hole compartments, durable construction, and quick accessibility for streamlined operations."
  },
  {
    "id": "f8",
    "name": "Sliding Door Cupboard",
    "image": "Cupboard Cabinets/steel-cupboard-storage.webp",
    "category": "Storage Cabinets & Cupboards",
    "categorySlug": "cabinets",
    "categoryPage": "filing-cabinets.html",
    "categoryLabel": "Filing Cabinets",
    "apps": "Library, Offices, Banks",
    "desc": "Space-saving steel cupboards engineered to provide secure storage where swing-door access is limited. Combining smooth sliding doors, adjustable shelving, and durable construction for efficient everyday organization."
  }
];

const allProducts = [...compactorProducts, ...rackProducts, ...lockerProducts, ...cabinetProducts];

function generateProductHTML(p, isSubfolder = true) {
  const relPath = isSubfolder ? '../' : '';
  const pageSlug = slugify(p.name);
  const canonicalUrl = `https://spaceplannersindia.in/${p.categorySlug}/${pageSlug}.html`;
  const appsList = p.apps.split(',').map(a => a.trim()).filter(Boolean);

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
  <title>${p.name} | Space Planners India</title>
  <meta name="description" content="${p.desc.substring(0, 155)}...">
  <link rel="icon" type="image/svg+xml" href="${relPath}favicon.svg">
  <link rel="canonical" href="${canonicalUrl}">
  
  <meta property="og:title" content="${p.name} | Space Planners India">
  <meta property="og:description" content="${p.desc.substring(0, 155)}...">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://spaceplannersindia.in/${p.image}">
  <meta property="og:type" content="product">
  
  <meta name="theme-color" content="#e53935">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="stylesheet" href="${relPath}style.css?v=2">
  <script src="${relPath}js/load-components.js?v=3" defer></script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "${canonicalUrl}#product",
    "name": "${p.name}",
    "image": "https://spaceplannersindia.in/${p.image}",
    "description": "${p.desc.replace(/"/g, '\\"')}",
    "brand": {
      "@type": "Brand",
      "name": "Space Planners India"
    },
    "manufacturer": {
      "@type": "Organization",
      "@id": "https://spaceplannersindia.in/#organization"
    },
    "category": "${p.category}"
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
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; font-size: 14px; color: #666;">
        <a href="${relPath}index.html" style="color: #666; text-decoration: none;">Home</a> / 
        <a href="${relPath}${p.categoryPage}" style="color: #666; text-decoration: none;">${p.categoryLabel}</a> / 
        <span style="color: #e53935; font-weight: 600;">${p.name}</span>
      </nav>

      <article style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); display: flex; flex-direction: column;">
        <div style="display: flex; flex-wrap: wrap; align-items: stretch;">
          <div style="flex: 1; min-width: 300px; max-height: 450px; overflow: hidden; position: relative; background: #eee;">
            <img src="${relPath}${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
          </div>
          <div style="flex: 1; min-width: 320px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #e53935; letter-spacing: 1px; margin-bottom: 8px;">${p.categoryLabel}</span>
              <h1 style="font-size: 32px; color: #222; margin-bottom: 20px; font-family: var(--font-serif, serif);">${p.name}</h1>
              <p style="font-size: 16px; line-height: 1.8; color: #444; margin-bottom: 32px;">
                ${p.desc}
              </p>
              
              <div style="margin-bottom: 32px;">
                <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 12px;">Ideal Applications</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${appsList.map(a => `<span class="product-modal-tag" style="font-size:13px; padding:6px 14px; background:rgba(229,57,53,0.08); color:#e53935; border-radius:20px; font-weight:600;">${a}</span>`).join(' ')}
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 16px; flex-wrap: wrap; pt: 20px; border-top: 1px solid #eee;">
              <button onclick="openInquiryModal({category:'${p.category}', specificProduct:'${p.name.replace(/'/g, "\\'")}'})" class="btn-primary" style="padding: 14px 28px; font-size: 15px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600;">
                Get Free Quote &rarr;
              </button>
              <a href="${relPath}${p.categoryPage}" class="btn-secondary" style="padding: 14px 28px; font-size: 15px; border-radius: 8px; border: 2px solid #e53935; color: #e53935; background: transparent; text-decoration: none; font-weight: 600; text-align: center;">
                Back to ${p.categoryLabel} Range
              </a>
            </div>
          </div>
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

// GENERATE PRODUCTS ONLY IN PAGES/ SUBFOLDERS
allProducts.forEach(p => {
  const pageSlug = slugify(p.name);
  const pagesSubfolder = path.join(process.cwd(), 'pages', p.categorySlug);
  if (!fs.existsSync(pagesSubfolder)) fs.mkdirSync(pagesSubfolder, { recursive: true });
  const htmlContentPagesSub = generateProductHTML(p, true).replace(/href="\.\.\//g, 'href="../../').replace(/src="\.\.\//g, 'src="../../');
  fs.writeFileSync(path.join(pagesSubfolder, `${pageSlug}.html`), htmlContentPagesSub, 'utf8');
});

console.log('All 28 product variant pages generated in pages/ subfolder successfully.');
