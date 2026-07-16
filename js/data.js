/* ── SHARED DATA FOR ALL PAGES ── */

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

const faqs = [
    { q: "What does Space Planners India manufacture?", a: "Space Planners India manufactures industrial storage systems, including motorised mobile compactors, heavy-duty racking, storage lockers, and filing cabinets. Founded in 2004, the company has completed over 2,000 installations across more than 500 clients in sectors including pharmaceuticals, government, healthcare, education, and warehousing." },
    { q: "How much floor space can Space Planners' storage systems save?", a: "Space Planners' storage systems save an average of 75% of floor space compared to conventional static storage, based on data from over 2,000 installations. Mobile compactor systems specifically can save up to 60–70% of floor space by eliminating redundant access aisles." },
    { q: "Does Space Planners install storage systems across the world?", a: "Yes, Space Planners provides installation and after-sales support across the world, having installed more than 2 million square feet of storage systems across corporate, government, healthcare, industrial, and education clients." },
    { q: "How do I get a free storage assessment from Space Planners?", a: "You can request a free storage assessment by submitting the quote form on the Space Planners website with your name, phone number, and product interest. Our team will get back to you at the earliest. Typically with a response within 24 business hours." },
    { q: "What industries does Space Planners serve? ", a: "Space Planners serves pharmaceutical and healthcare facilities, corporate offices, warehouses and logistics operations, educational institutions and libraries, government offices, and museums and archives, with sector-specific compliance built into each solution." },
    { q: "What is your warranty and after-sales service policy?", a: "All products carry a manufacturer warranty against defects. We offer dedicated annual maintenance contracts (AMC)." },
];

const cases = [
    {
        title: " Heavy-Duty Compactor Storage for a Leading FMCG Manufacturer",
        subtitle: "SECURE RAW MATERIAL STORAGE",
        img: "FMCG Project.webp",
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
        title: "Mobile Compactor Storage System for India's Leading Engineering Institute's Library",
        subtitle: "HIGH-DENSITY LIBRARY STORAGE",
        img: "Library Project.webp",
        industry: "Education",
        client: "Top reputed Technology Institute (Powai Campus)",
        challenge: "Top reputed Technology Institute had floated a tender for a mobile compactor storage system, with the original design proposed by another vendor. Space Planners reviewed the tender specifications and identified an opportunity to deliver significantly greater storage efficiency through an improved design.",
        solution: "We engaged directly with the Top reputed Technology Institute authorities to understand their exact storage requirements, then leveraged our design expertise to propose an alternate configuration — one that increased storage capacity by nearly 40% over the original tender design.",
        results: [
            { metric: "", label: "Top reputed Technology Institute was impressed enough to cancel the original tender and issue a fresh one based on our proposed design and specifications" },
            { metric: "", label: "Space Planners won the re-tendered contract, competing against Godrej and six other vendors — eight participants in total" },
            { metric: "", label: "The relationship led to repeat business, including additional projects for Top reputed Technology Institute as well as IIT Kanpur" }
        ]
    },
    {
        title: "Mobile Compactor Modification for one of the Largest Airport in India",
        subtitle: "RESOLVING MOVEMENT ISSUES IN AN EXISTING SYSTEM",
        img: "Airpott Project.webp",
        industry: "Airport",
        client: "GVK Mumbai International Airport Limited, Santacruz",
        challenge: "A big corporate company maintaining airports was experiencing persistent movement issues with a mobile compactor system that had been supplied by another reputed vendor. The malfunctioning system was affecting their ability to reliably access stored records.",
        solution: "Our team carried out a thorough on-site inspection and diagnosed the root cause: the base trolleys — the core mechanism of the system — were not adequately designed to handle the load of the stored records. Rather than recommending a costly full replacement, we proposed replacing only the base trolleys with a newly engineered design, while retaining the client's existing superstructure where the files were stored.",
        results: [
            { metric: "", label: "Permanent resolution of the recurring movement issues" },
            { metric: "", label: "Cost-effective fix — by reusing the existing structure and replacing only the faulty component, the client avoided the expense of a complete system overhaul" },
            { metric: "", label: "Demonstrated Space Planners' ability to diagnose and solve problems in systems we didn't originally supply" }
        ]
    }
];
