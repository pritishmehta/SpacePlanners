/* ── SHARED DATA FOR ALL PAGES ── */

const slides = [
    { title: "Mobile Compactor Storage", desc: "Space-saving motorized systems — up to 50% more storage capacity" },
    { title: "Industrial Storage Racks", desc: "Heavy-duty systems rated up to 10 tons for warehouse operations" },
    { title: "Professional Steel Lockers", desc: "Secure personal storage for offices, hospitals, and institutions" },
    { title: "Archive & Filing Systems", desc: "Organised document management for government and corporate use" }
];

const products = [
    { id: 1, name: "Mobile Compactors", type: "Storage", img: "product_compactor.png", desc: "Motorized storage on rail tracks — maximize floor space by up to 50%. GMP-compliant available.", fullDesc: "Advanced motorized storage systems that maximize floor space through intelligent rail-track design. Available in manual, mechanical, and electric configurations. GMP and NABH-compliant versions available for pharma and healthcare.", features: ["Motorized / manual options", "Adjustable shelves", "Security locks", "Climate control compatible", "GMP compliant available"], apps: "Documents, Archives, Pharmaceuticals, Libraries, Government" },
    { id: 2, name: "Industrial Racks", type: "Racks", img: "product_rack.png", desc: "Heavy-duty galvanized steel racks for warehouses and industrial operations.", fullDesc: "Engineered for maximum load capacity in demanding industrial environments. Compliant with OSHA safety standards and available in selective, drive-in, and push-back configurations.", features: ["Up to 10-ton capacity", "Galvanized steel", "Customizable heights", "Rust resistant", "Forklift compatible"], apps: "Warehouses, Manufacturing, Distribution, Cold Storage" },
    { id: 3, name: "Storage Lockers", type: "Lockers", img: "product_locker.png", desc: "Secure steel lockers with digital locking for professional environments.", fullDesc: "Professional-grade lockers with digital or combination locks. Available in single-tier, double-tier, and multi-tier configurations. Powder-coated finish for corrosion resistance.", features: ["Digital /combination locks", "Ventilation system", "Powder-coat finish", "Multiple tier options", "Custom colors"], apps: "Offices, Gyms, Hospitals, Universities, Factories" },
    { id: 4, name: "Filing Cabinets", type: "Storage", img: "product_cabinet.png", desc: "Professional multi-drawer filing for organized document management.", fullDesc: "High-quality steel filing cabinets with anti-tilt locking mechanism and smooth ball-bearing drawer slides. Available in 2, 3, and 4-drawer configurations.", features: ["2/3/4 drawer options", "Anti-tilt lock", "Label slots", "Full-extension drawers", "Central locking"], apps: "Corporate Offices, Legal Firms, Government, Hospitals" },
    { id: 5, name: "Storage Cupboards", type: "Storage", img: "product_cupboard.png", desc: "Versatile steel cupboards for general storage across all industries.", fullDesc: "Robust steel cupboards with adjustable shelving and secure door locks. Available in various heights and with glass or solid door options.", features: ["Adjustable shelves", "Secure door locks", "Heavy-gauge steel", "Multiple heights", "Compact or full-size"], apps: "Offices, Retail, Institutions, Classrooms" },
    { id: 6, name: "Pallet Racks", type: "Racks", img: "product_rack.png", desc: "Forklift-compatible pallet storage for high-volume warehouse operations.", fullDesc: "Purpose-built for efficient pallet storage in FMCG, e-commerce, and cold-chain operations. Compatible with standard and custom forklift equipment.", features: ["Forklift compatible", "Heavy-duty uprights", "Stackable beam levels", "Load capacity labels", "Safety accessories"], apps: "Warehouses, Distribution Centres, Cold Storage, FMCG" },
    { id: 7, name: "Slotted Angle Racks", type: "Racks", img: "product_slotted.png", desc: "Modular, tool-free assembly racks at competitive pricing.", fullDesc: "Flexible, cost-effective modular system using slotted steel angles and bolted connections. Infinite reconfiguration options — ideal for retail, workshops, and light warehousing.", features: ["Tool-free assembly", "Modular and expandable", "Paint or galvanized finish", "Light to medium duty", "Easy to relocate"], apps: "Retail Stores, Workshops, Small Warehouses, Showrooms" },
    { id: 8, name: "Mezzanine Systems", type: "Systems", img: "product_mezzanine.png", desc: "Multi-level steel platforms maximizing vertical space in warehouses.", fullDesc: "Engineered steel mezzanine platforms doubling your usable floor area without any civil construction. Suitable for storage, offices, or production areas above warehouse floor level.", features: ["Structural steel platform", "Up to 750 kg/sqm", "Staircase &amp; handrail included", "Custom design", "Professional installation"], apps: "Large Warehouses, Factories, Distribution Hubs, E-Commerce" }
];

const projects = [
    { id: 1, title: "Leading PSU Headquarters, Delhi", category: "Enterprise", desc: "Complete modular compactor storage system for a major financial institution's head office", scale: "50,000 sq ft", img: "project_corporate.png", details: "Replaced outdated shelving with state-of-the-art mobile compactors, increasing storage capacity by 200% while reducing floor space usage by 48%." },
    { id: 2, title: "Central Government Archive Facility", category: "Government", desc: "Secure document management system for a national archives ministry", scale: "75,000 sq ft", img: "project_corporate.png", details: "Designed a fully indexed filing system capable of storing 5 million documents with role-based access. GeM portal compliant procurement." },
    { id: 3, title: "Automotive Manufacturer Warehouse", category: "Industrial", desc: "High-density pallet rack system for a leading Indian auto component supplier", scale: "1,00,000 sq ft", img: "project_warehouse.png", details: "Installed drive-in and selective pallet racking with OSHA-compliant safety accessories. Improved picking efficiency by 35%." },
    { id: 4, title: "University Library Network", category: "Education", desc: "Integrated mobile shelving for a 3-campus university library system", scale: "35,000 sq ft", img: "project_corporate.png", details: "Accommodated 30% more books without extending the building. Integrated with the library's digital catalog system for seamless access." },
    { id: 5, title: "Multi-Specialty Hospital Record Room", category: "Healthcare", desc: "NABH-aligned secure patient records storage for a hospital chain", scale: "20,000 sq ft", img: "project_corporate.png", details: "Installed steel compactors with restricted access, meeting NABH guidelines. Patient file retrieval time reduced from 12 minutes to 3 minutes." },
    { id: 6, title: "Pan-India Retail Chain Hub", category: "Retail", desc: "Mobile compactor storage for inventory management across 50+ stores", scale: "60,000 sq ft", img: "project_warehouse.png", details: "Standardized storage across all distribution points, reducing inventory loss by 18% and auditing time by 40%." },
    { id: 7, title: "IT Park Corporate Campus, Pune", category: "Enterprise", desc: "Modern integrated storage for a fast-growing technology company", scale: "25,000 sq ft", img: "project_corporate.png", details: "Custom-color steel lockers, filing cabinets, and office storage cupboards installed across 8 floors. 2-week delivery and installation." },
    { id: 8, title: "FMCG Manufacturing Plant, Gujrat", category: "Industrial", desc: "High-capacity slotted angle and pallet racks for a production facility", scale: "1,20,000 sq ft", img: "project_warehouse.png", details: "Multi-level mezzanine with pallet racking below doubled the available storage without any civil construction. Delivered in 6 weeks." }
];

const caseStudies = [
    {
        title: "Banking Sector",
        subtitle: "Secure Document Management",
        industry: "Financial Services",
        img: "project_corporate.png",
        results: [
            { metric: "60%", label: "Space Reduction", icon: "📉" },
            { metric: "100%", label: "Audit Compliance", icon: "✓" },
            { metric: "80%", label: "Faster Retrieval", icon: "⚡" },
            { metric: "2M+", label: "Documents", icon: "📄" }
        ],
        topResult: "60% space reduction"
    },
    {
        title: "Government Archives",
        subtitle: "Historical Record Preservation",
        industry: "Government",
        img: "project_corporate.png",
        results: [
            { metric: "5M+", label: "Docs Stored", icon: "📚" },
            { metric: "90%", label: "Space Saved", icon: "📦" },
            { metric: "0", label: "Document Loss", icon: "🛡️" },
            { metric: "200+", label: "Years Preserved", icon: "🏛️" }
        ],
        topResult: "90% space saved & 0 loss"
    },
    {
        title: "Healthcare Network",
        subtitle: "Patient Records System",
        industry: "Healthcare",
        img: "project_corporate.png",
        results: [
            { metric: "100%", label: "NABH Compliant", icon: "✓" },
            { metric: "75%", label: "Faster Retrieval", icon: "⚡" },
            { metric: "0", label: "Compliance Issues", icon: "🎯" },
            { metric: "5L+", label: "Patient Files", icon: "🏥" }
        ],
        topResult: "100% NABH compliance"
    },
    {
        title: "Retail Distribution",
        subtitle: "Inventory Management",
        industry: "Retail & Logistics",
        img: "project_warehouse.png",
        results: [
            { metric: "25%", label: "Accuracy Boost", icon: "📊" },
            { metric: "15%", label: "Cost Reduction", icon: "💰" },
            { metric: "40%", label: "Faster Audits", icon: "✓" },
            { metric: "50+", label: "Locations", icon: "🗺️" }
        ],
        topResult: "25% accuracy improvement"
    },
    {
        title: "University Library",
        subtitle: "Multi-Campus Library System",
        industry: "Education",
        img: "project_corporate.png",
        results: [
            { metric: "30%", label: "Capacity Increase", icon: "📚" },
            { metric: "24/7", label: "Self-Service", icon: "🔓" },
            { metric: "95%", label: "Student Satisfaction", icon: "😊" },
            { metric: "20L+", label: "Books Stored", icon: "📖" }
        ],
        topResult: "30% more books stored"
    },
    {
        title: "Automotive Manufacturing",
        subtitle: "Parts & Inventory Storage",
        industry: "Manufacturing",
        img: "project_warehouse.png",
        results: [
            { metric: "50%", label: "Pick Time Cut", icon: "⚡" },
            { metric: "0", label: "Lost Parts", icon: "🛡️" },
            { metric: "20%", label: "Yield Boost", icon: "📈" },
            { metric: "50K+", label: "SKUs Managed", icon: "🏭" }
        ],
        topResult: "50% picking time reduction"
    }
];

const faqs = [
    { q: "What does Space Planners India manufacture?", a: "Space Planners India manufactures industrial storage systems, including motorised mobile compactors, heavy-duty racking, storage lockers, and filing cabinets. Founded in 2004, the company has completed over 2,000 installations across more than 500 clients in sectors including pharmaceuticals, government, healthcare, education, and warehousing." },
    { q: "Is Space Planners India GMP-certified?", a: "Yes, Space Planners India is WHO-GMP certified for its mobile compactor and storage systems used in pharmaceutical and healthcare environments. The company's products are also NABH-approved for hospital use and GeM-registered for direct government procurement." },
    { q: "How much floor space can Space Planners' storage systems save?", a: "Space Planners' storage systems save an average of 75% of floor space compared to conventional static storage, based on data from over 2,000 installations. Mobile compactor systems specifically can save up to 50–60% of floor space by eliminating redundant access aisles." },
    { q: "Does Space Planners install storage systems across all of India?", a: "Yes, Space Planners provides pan-India installation and after-sales support, having installed more than 2 million square feet of storage systems nationally across corporate, government, healthcare, industrial, and education clients." },
    { q: "How do I get a free storage assessment from Space Planners?", a: "You can request a free storage assessment by submitting the quote form on the Space Planners website with your name, phone number, and product interest. A certified storage engineer will then conduct a site visit, propose a custom 3D design, and provide a quote — typically with a response within 24 business hours." },
    { q: "What industries does Space Planners serve? ", a: "Space Planners serves pharmaceutical and healthcare facilities, corporate offices, warehouses and logistics operations, educational institutions and libraries, government offices, and museums and archives, with sector-specific compliance (GMP, NABH, OSHA-aligned, RTI-ready, GeM-listed) built into each solution." },
    { q: "What is your warranty and after-sales service policy?", a: "All products carry a manufacturer warranty against defects. We offer dedicated annual maintenance contracts (AMC)." },
];

const cases = [
    {
        title: "Heavy-Duty Compactor Storage System for a Leading FMCG Company",
        subtitle: "Secure Document Management",
        img: "project_corporate.png",
        industry: "Heavy-Duty Compactor Storage System",
        client: "A reputed multinational FMCG company",
        challenge: "The client stored raw materials for soap manufacturing in 50 kg gunny bags on regular fixed racks. This conventional storage method consumed excessive floor space and limited how much material could be held in the warehouse at any given time.",
        solution: "Space Planners engineered a heavy-duty mobile compactor system built from robust slotted-angle racking. Each shelf was designed to safely bear the load of at least four gunny bags, or 200 kg, while the overall unit was capable of supporting up to 4,000 kg. Despite this substantial load capacity, the compactor mechanism was fine-tuned to move smoothly with just one finger.",
        results: [
            { metric: "70% increase", label: "in storage capacity — the client went from storing 300 bags to 500 bags in the exact same floor area" },
            { metric: "Reduced Space Requirements", label: "The compact mobile design freed up significant warehouse floor space compared to fixed racking" },
            { metric: "Improved operational efficiency", label: "Easy, one-touch access to stored materials streamlined day-to-day handling and supported smoother manufacturing operations" }
        ]
    },
    {
        title: "Mobile Compactor Tender - IIT Bombay Library",
        subtitle: "Mobile Compactor Storage System (Tender Project)",
        img: "project_corporate.png",
        industry: "Education",
        client: "IIT Bombay (Powai Campus)",
        challenge: "IIT Bombay had floated a tender for a mobile compactor storage system, with the original design proposed by another vendor. Space Planners reviewed the tender specifications and identified an opportunity to deliver significantly greater storage efficiency through an improved design.",
        solution: "We engaged directly with the IIT Bombay authorities to understand their exact storage requirements, then leveraged our design expertise to propose an alternate configuration — one that increased storage capacity by nearly 40% over the original tender design.",
        results: [
            { metric: "", label: "IIT Bombay was impressed enough to cancel the original tender and issue a fresh one based on our proposed design and specifications" },
            { metric: "", label: "Space Planners won the re-tendered contract, competing against Godrej and six other vendors — eight participants in total" },
            { metric: "", label: "The relationship led to repeat business, including additional projects for IIT Bombay as well as IIT Kanpur" }
        ]
    },
    {
        title: "Mobile Compactor Modification — GVK Mumbai International Airport Limited",
        subtitle: "Modification of an Existing Mobile Compactor System",
        img: "project_corporate.png",
        industry: "Healthcare",
        client: "GVK Mumbai International Airport Limited, Santacruz",
        challenge: "GVK was experiencing persistent movement issues with a mobile compactor system that had been supplied by another reputed vendor. The malfunctioning system was affecting their ability to reliably access stored records.",
        solution: "Our team carried out a thorough on-site inspection and diagnosed the root cause: the base trolleys — the core mechanism of the system — were not adequately designed to handle the load of the stored records. Rather than recommending a costly full replacement, we proposed replacing only the base trolleys with a newly engineered design, while retaining the client's existing superstructure where the files were stored.",
        results: [
            { metric: "", label: "Permanent resolution of the recurring movement issues" },
            { metric: "", label: "Cost-effective fix — by reusing the existing structure and replacing only the faulty component, the client avoided the expense of a complete system overhaul" },
            { metric: "", label: "Demonstrated Space Planners' ability to diagnose and solve problems in systems we didn't originally supply" }
        ]
    }
];
