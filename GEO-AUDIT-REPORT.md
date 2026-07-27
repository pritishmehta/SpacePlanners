# GEO Audit Report — spaceplannersindia.in

**Date:** 2026-07-27
**Business type:** Local/B2B manufacturer (mobile compactors, industrial racks, storage lockers, filing cabinets) — Mumbai, India, founded 2004
**Pages audited:** Homepage, compactor-storage.html, industrial-racks.html, storage-lockers.html, filing-cabinets.html, projects.html, about.html, contact.html, privacy-policy.html, terms-of-use.html, disclaimer.html

---

## Composite GEO Score: 44 / 100 — Needs Work

| Category | Weight | Score | Weighted |
|---|---|---|---|
| AI Citability & Visibility | 25% | 54/100 | 13.5 |
| Brand Authority Signals | 20% | 19/100 | 3.8 |
| Content Quality & E-E-A-T | 20% | 49/100 | 9.8 |
| Technical Foundations | 15% | 64/100 | 9.6 |
| Structured Data | 10% | 39/100 | 3.9 |
| Platform Optimization | 10% | 37/100 | 3.7 |
| **Composite** | | | **44.3 ≈ 44** |

The site has real strengths — fast page loads, comprehensive JSON-LD, strong FAQ content, genuine case studies, a credible client roster — but they're consistently undercut by execution defects: a robots.txt that contradicts itself, broken image and social links baked into structured data, JS-only navigation on 10 of 11 pages, and an unresolved brand-confusion problem with a near-identically-named competitor. Most of the fixes below are low-effort, high-leverage.

---

## Top Priority Actions (deduplicated across all 5 analyses)

### Critical
1. **Fix the contradictory robots.txt rules for ClaudeBot and Google-Extended.** A Cloudflare-managed block near the top says `Disallow: /`; a custom block further down says `Allow: /` for the same user-agents. This is genuinely ambiguous — parser-dependent, not deterministic — so you cannot currently know whether Claude or Gemini can crawl the site. Delete the duplicate block or make the rule authoritative in one place. Every one of the 5 analyses flagged this independently. *(Flagged by: AI-visibility, Platform, Technical)*
2. **Bake header/footer/nav markup into every page's static HTML**, not just the homepage. `js/load-components.js` injects the header, footer, mobile nav, floating buttons, and client-logo strip via `fetch()` + `innerHTML`. The homepage has inline fallback content so it works even without JS — but all 10 other pages (`about.html`, `contact.html`, `projects.html`, all 4 product pages, and the legal pages) ship with **empty placeholder divs** and literally **zero internal links** in the raw HTML. A non-JS AI crawler landing directly on any inner page (a very common pattern — a user pastes a product-page URL to ChatGPT, or an engine indexes a deep link) sees content but no path to any other page on the site. *(Flagged by: Technical)*
3. **Fix the two 404s inside your own JSON-LD schema**: `LocalBusiness.image` points to `/office-image.jpg` and `/company-img.jpg` — both broken. Also `og:image`/`twitter:image` point to `og-image-1200x630.png` — also 404. These break link-preview cards on WhatsApp/LinkedIn/X and any AI system that renders a citation preview. *(Flagged by: Schema, Technical)*
4. **Fix the entity-confusion problem.** A separate, unaffiliated company (`spaceplanners.org`) also called "Space Planners," also in Malad West, Mumbai, also founded 2004, also selling mobile compactors/racks/lockers, exists online — plus `spaceplanner.in` and `spaceplannerindia.com` (different, unrelated businesses). With no Wikipedia/Wikidata anchor for spaceplannersindia.in, AI systems doing entity resolution have no authoritative way to tell these apart. This actively suppresses ChatGPT/Gemini/Perplexity citation confidence. *(Flagged by: AI-visibility, Platform)*
5. **Fix the three broken `sameAs` links in your own Organization schema.** LinkedIn and Facebook `sameAs` URLs use a hyphenated slug (`space-planners-india`) that 404s; the real profiles use `spaceplannersindia` (no hyphens). The YouTube `sameAs` link also 404s — no working channel exists at that handle. AI systems following your own schema to verify the brand hit three dead ends. *(Flagged by: AI-visibility)*

### High
6. **Add `Product` schema to all 4 product pages** (compactor-storage, industrial-racks, storage-lockers, filing-cabinets) — currently none exists despite each page being a distinct, well-specified product line. This is the single biggest content-to-schema gap given the site's manufacturer business model. *(Schema)*
7. **Merge the Organization and LocalBusiness JSON-LD into one `@id`-anchored entity.** Three different Organization variants and two different LocalBusiness variants currently exist across pages for the same business, with no shared `@id` — AI/Google entity resolution reads this as inconsistent facts about the same company rather than one canonical profile. *(Schema)*
8. **Remove or back up the unverifiable `aggregateRating` (4.8★/150 reviews)** on about.html — no visible reviews anywhere on the site support this number, while five real, named-client testimonials on the homepage carry no Review markup at all. This is backwards and is exactly the kind of schema-vs-content mismatch that erodes AI trust scoring. *(Content, Schema)*
9. **Create `/llms.txt`** — currently 404. Near-zero cost since all the source facts (founding year, install count, service cities, product lines) already exist in your JSON-LD. Closes a full 10%-weighted category currently scoring 0. *(AI-visibility)*
10. **Reconcile the two different Content-Security-Policy headers** (HTTP header vs. `<meta>` tag) — the header-level policy is missing `api.web3forms.com`, which the meta tag explicitly allows, strongly suggesting your quote/contact form's fetch call is being silently blocked by the browser in practice. Verify in DevTools; this may be costing you real leads, independent of GEO. *(Technical)*
11. **Give leadership real bios.** "Pawan Sehgal — Founder & Managing Director" and "Mukesh Sehgal — Technical Director" are one line each with no photo, background, or credentials. Add `Person` schema linked via `sameAs` to LinkedIn. Cheapest, highest-leverage fix for the Expertise score. *(Content)*
12. **Add structured data to `/contact.html`** — currently the only page with zero JSON-LD, despite being the page AI systems would most want to resolve "how do I contact Space Planners" queries against. *(Schema, Technical)*

### Medium
13. Fix the LCP hero-image preload/src mismatch (`Compactors/Document Storage.webp` in the preload tag vs. the real `document-storage.webp`) and convert 3 oversized carousel PNGs (2.0–2.8MB each) to WebP — could cut ~6.5MB off the heaviest page assets.
14. De-duplicate the FAQPage schema — the same 5 Q&A pairs are copy-pasted verbatim across the homepage and 3 product pages instead of being product-specific.
15. Fix the broken `BreadcrumbList` on all 4 product pages (currently a single "Home" node instead of Home → Products → [Category] — already done correctly on about.html/projects.html).
16. Add explicit `Allow: /` robots.txt entries for OAI-SearchBot, ChatGPT-User, and PerplexityBot rather than relying on wildcard defaults — makes access intentional instead of incidental given the file already has one unresolved conflict.
17. Add missing `<meta name="description">` tags — present only on the homepage; absent on 6 of 8 other indexed pages.
18. Add HTTP→HTTPS and www→apex redirects (both currently return 200 instead of 301).
19. Convert product spec data (load capacity, dimensions, material, compliance) into real HTML `<table>` elements — none exist anywhere, and AI Overviews extracts tables directly.
20. Source the headline stats ("2,000+ installations," "75% space saved") — currently asserted with no methodology or dataset reference.

---

## Category Details

### 1. AI Citability & Visibility — 54/100
- **Citability: 79/100** — FAQ content (schema-marked, direct Q&A) is the strongest content on the site; hero tagline and stat-strip tiles are weakest (no self-contained facts).
- **Crawler access: 40/100** — GPTBot fully blocked (consistent); ClaudeBot/Google-Extended contradictory (see Critical #1); Amazonbot/Bytespider/CCBot/Applebot-Extended/meta-externalagent blocked (consistent, likely intentional).
- **llms.txt: 0/100** — absent, see Critical #9.
- Full detail: see subagent transcript for citability passage scores and rewrite suggestions.

### 2. Brand Authority Signals — 19/100
- No Wikipedia, no Wikidata, no Reddit presence.
- LinkedIn page real and active (729 followers, 40 employees) but the schema link to it 404s.
- YouTube `sameAs` link 404s — no working channel found.
- Entity confusion with `spaceplanners.org` and similarly-named unrelated businesses (see Critical #4).
- Moderate presence on IndiaMART (3.8★, 73 reviews), TradeIndia, ZoomInfo.

### 3. Content Quality & E-E-A-T — 49/100
- **Experience 14/25** — 3 strong, specific, named-client case studies (FMCG, engineering institute, GVK airport) with real numbers; no first-person practitioner voice.
- **Expertise 12/25** — technically accurate FAQ content; zero named authors; leadership bios are one line each with no `Person` schema.
- **Authoritativeness 5/25** — strong client-logo roster (TCS, RBI, SBI, Indian Army, IIT) but no external citations/press; unverifiable aggregateRating claim (see Critical #8).
- **Trustworthiness 18/25** — complete NAP data, real testimonials, legitimate ISO/GMP/NABH certs; undermined by the aggregateRating mismatch.
- Product descriptions on compactor/rack pages are JS-injected (`productsData` in `js/data.js`) — same underlying issue as Technical finding #2, caps citability of the site's best content.
- A leftover `id="dummy-section"` on the homepage duplicates the About page's intro almost verbatim — looks like unfinished placeholder content.

### 4. Technical Foundations — 64/100
- Crawlability 6/15 (robots.txt conflict), Core Web Vitals 6/15 (oversized carousel images, preload mismatch), SSR 9/15 (JS-only nav on inner pages) are the weak spots.
- Indexability (10/12), URL structure (7/8), and mobile optimization (9/10) are strong.
- HSTS is excellently configured; CSP has the header/meta conflict noted in Critical #10.
- Sitemap and canonical tags are clean and correct.

### 5. Structured Data — 39/100
- JSON-LD used exclusively (no Microdata/RDFa) across 8 of the 11 pages — good format choice.
- Weakened by: unmerged Organization/LocalBusiness nodes, two broken image URLs, missing Product schema, broken BreadcrumbList on product pages, no Person/speakable/WebSite schema, contact.html has none at all.
- Full ready-to-paste JSON-LD templates (unified Organization+LocalBusiness, Product per page, fixed BreadcrumbList, WebSite, Review/AggregateRating, speakable) are in the subagent transcript — ask if you'd like these written directly into the HTML files.

### 6. Platform Optimization — 37/100 (avg across 5 platforms)
| Platform | Score |
|---|---|
| Bing Copilot | 51 |
| Google AI Overviews | 51 |
| Google Gemini | 41 |
| Perplexity AI | 30 |
| ChatGPT Web Search | 13 |

ChatGPT is weakest — driven by the entity-confusion problem and missing Wikipedia/Wikidata anchor, not by crawler blocking (OAI-SearchBot/ChatGPT-User, the crawlers ChatGPT's live search actually uses, are not blocked — only training-crawler GPTBot is). Gemini's biggest lever is a near-total absence of YouTube/video content.

---

## What's Already Working Well
- Fast page loads (homepage: 0.74s, 125KB) and clean, hyphenated, flat URL structure.
- Comprehensive JSON-LD coverage in principle (Organization, LocalBusiness, BreadcrumbList, FAQPage) — the problems are consistency/completeness, not format choice.
- Genuinely strong, specific case studies with real numbers and named clients/competitors.
- Credible, diverse client-logo roster (pharma, FMCG, banking, government, defense, education).
- Legitimate industry certifications (ISO 9001/14001/45001/50001).
- HSTS security header correctly configured with preload.
- Clean, valid XML sitemap referenced correctly from robots.txt.

---

*Generated by the geo-audit skill via 5 parallel subagents (geo-ai-visibility, geo-platform-analysis, geo-technical, geo-content, geo-schema). Full per-category transcripts with additional detail, JSON-LD snippets, and page-by-page breakdowns are available on request.*
