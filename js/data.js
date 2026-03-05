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
    { q: "What products does Space Planners India offer?", a: "We offer a comprehensive range including mobile compactors, industrial racks, pallet racks, slotted angle racks, storage lockers, filing cabinets, storage cupboards, and mezzanine floor systems — all manufactured in-house." },
    { q: "Are your products suitable for industrial and heavy-duty use?", a: "Yes. All our racks and storage systems are engineered for industrial applications with load capacities up to 10 tons. They use galvanized, rust-resistant steel and comply with relevant safety standards." },
    { q: "Do you provide installation services across India?", a: "Absolutely. We have installation teams covering all major cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and Ahmedabad. Installation includes safety compliance checks." },
    { q: "Can your storage solutions be customized to our space?", a: "Yes — customization is our strength. We offer free on-site space assessments, 3D layout designs, and fully tailored systems to match your dimensions, compliance needs, and budget." },
    { q: "Are your products GMP and NABH compliant?", a: "Yes. Our mobile compactors and storage systems can be manufactured to meet GMP (pharmaceutical), NABH (healthcare), and GeM portal specifications for government procurement." },
    { q: "How quickly can I get a quotation?", a: "We deliver detailed quotations within 2 business hours of receiving your inquiry. Submit our online form, WhatsApp us, or call +91-22-40033385 to get started." },
    { q: "What is your warranty and after-sales service policy?", a: "All products carry a manufacturer warranty against defects. We offer dedicated annual maintenance contracts (AMC) and have service centers in 8 cities across India." }
];

const cases = [
    {
        title: "Banking Sector",
        subtitle: "Secure Document Management",
        img: "project_corporate.png",
        industry: "Financial Services",
        client: "Leading Private Bank - Multi-Branch Network",
        challenge: "A leading private bank needed secure, indexed storage for 2 million documents across 3 city branches with quick retrieval capability and audit compliance.",
        solution: "Implemented mobile compactor systems with electronic access control and custom shelf labeling. Each compactor row is mapped to branch, year, and account type.",
        results: [
            { metric: "60%", label: "Floor Space Reduction", icon: "📉" },
            { metric: "100%", label: "Audit Compliance", icon: "✓" },
            { metric: "80%", label: "Faster Retrieval", icon: "⚡" },
            { metric: "3 hrs", label: "Implementation Time Per Branch", icon: "📅" }
        ],
        testimony: "\"The system is flawless. Our audit team found zero non-compliance issues after implementation.\"",
        testimonyAuthor: "Chief Compliance Officer",
        whatsapp: "Banking+Sector+Storage"
    },
    {
        title: "Government Archives",
        subtitle: "Historical Record Preservation",
        img: "project_corporate.png",
        industry: "Government",
        client: "Central Government Ministry - National Archives Division",
        challenge: "A central government ministry needed specialized storage for 200+ years of historical records, with climate-compatible shelving and anti-tamper access.",
        solution: "Custom heavy-duty compactors with anti-tamper locks, GeM portal compliant procurement. System integrated with the ministry's file index software.",
        results: [
            { metric: "5M+", label: "Documents Stored", icon: "📚" },
            { metric: "90%", label: "Space Saved", icon: "📦" },
            { metric: "0", label: "Document Loss (3 years)", icon: "🛡️" },
            { metric: "200+", label: "Years of Records Protected", icon: "🏛️" }
        ],
        testimony: "\"Preserving our national heritage with this system ensures zero loss and perfect accessibility for researchers nationwide.\"",
        testimonyAuthor: "Director, National Archives",
        whatsapp: "Government+Archives+Storage"
    },
    {
        title: "Healthcare Network",
        subtitle: "NABH-Compliant Patient Records",
        img: "project_corporate.png",
        industry: "Healthcare",
        client: "6-Hospital Chain Network - Pan-India",
        challenge: "A 6-hospital chain required NABH-compliant storage for 5 lakh+ patient files, with role-based access and secure retrieval under 5 minutes.",
        solution: "Steel compactors with key-card access installed across all 6 hospitals. Staff trained in file indexing and retrieval protocol.",
        results: [
            { metric: "100%", label: "NABH Compliance", icon: "✓" },
            { metric: "75%", label: "Retrieval Time Cut (12→3 min)", icon: "⚡" },
            { metric: "0", label: "Compliance Findings", icon: "🎯" },
            { metric: "5L+", label: "Patient Records Secured", icon: "🏥" }
        ],
        testimony: "\"Implementation was seamless, and our compliance scores improved immediately. Patient care efficiency increased noticeably.\"",
        testimonyAuthor: "Operations Director, Hospital Chain",
        whatsapp: "Healthcare+Storage"
    },
    {
        title: "Retail Distribution",
        subtitle: "Inventory Management at Scale",
        img: "project_warehouse.png",
        industry: "Retail & Logistics",
        client: "National Retail Chain - 50+ Locations",
        challenge: "A retail chain needed standardized inventory storage across 50+ locations in India, with real-time coordination and minimal stock loss.",
        solution: "Standardised pallet rack systems with bin location tracking and barcode integration deployed across all warehouses.",
        results: [
            { metric: "25%", label: "Inventory Accuracy Boost", icon: "📊" },
            { metric: "15%", label: "Logistics Cost Cut", icon: "💰" },
            { metric: "40%", label: "Faster Stock Audits", icon: "✓" },
            { metric: "50+", label: "Locations Standardized", icon: "🗺️" }
        ],
        testimony: "\"Standardization across 50+ stores reduced our supply chain complexity drastically. Inventory discrepancies dropped from 8% to 1%.\"",
        testimonyAuthor: "Supply Chain Manager",
        whatsapp: "Retail+Storage"
    },
    {
        title: "University Library",
        subtitle: "Multi-Campus Library System",
        img: "project_corporate.png",
        industry: "Education",
        client: "National University - 3 Campus Network",
        challenge: "A 3-campus university needed to accommodate 20 lakh+ books without expanding the building, while providing 24/7 self-service access.",
        solution: "Mobile carriage compact shelving integrated with the digital catalog. Reader access QR-code system at each aisle.",
        results: [
            { metric: "30%", label: "More Books Stored", icon: "📚" },
            { metric: "24/7", label: "Self-Service Access", icon: "🔓" },
            { metric: "95%", label: "Student Satisfaction", icon: "😊" },
            { metric: "20L+", label: "Books Accommodated", icon: "📖" }
        ],
        testimony: "\"Students now have better access to resources than when our library was physical-only. Our circulation rates doubled.\"",
        testimonyAuthor: "Head Librarian, University",
        whatsapp: "University+Library+Storage"
    },
    {
        title: "Automotive Manufacturing",
        subtitle: "Parts & Production Storage",
        img: "project_warehouse.png",
        industry: "Manufacturing",
        client: "Tier-1 Automotive Supplier - Leading OEM",
        challenge: "A Tier-1 automotive supplier needed sub-5-minute picking for 50,000+ part SKUs across a production warehouse.",
        solution: "Heavy-duty cantilever and pallet racks with bin location labeling. Workflow routing optimized with operations team.",
        results: [
            { metric: "50%", label: "Picking Time Reduction", icon: "⚡" },
            { metric: "0", label: "Lost-Part Incidents", icon: "🛡️" },
            { metric: "20%", label: "Production Yield Boost", icon: "📈" },
            { metric: "50K+", label: "SKUs Organized", icon: "🏭" }
        ],
        testimony: "\"Production line downtime due to missing parts dropped from 2% to 0%. This system paid for itself in 4 months.\"",
        testimonyAuthor: "Plant Manager, Auto Supplier",
        whatsapp: "Automotive+Storage"
    }
];
