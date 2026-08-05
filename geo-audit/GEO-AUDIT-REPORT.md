# GEO Audit Report: Space Planners India

**Audit Date:** 2026-08-04
**URL:** https://spaceplannersindia.in/
**Business Type:** Local/B2B Manufacturer (Industrial storage solutions — mobile compactors, racks, lockers, filing cabinets)
**Pages Analyzed:** 12 (full sitemap: homepage, 4 product pages, projects, about, contact, blog, 3 legal pages)

---

## Executive Summary

**Overall GEO Score: 59/100 (Poor–Fair borderline)**

Space Planners India has an unusually strong *technical* foundation for a B2B manufacturer site — real server-rendered JSON-LD (Organization, Product, FAQPage with `speakable`, BreadcrumbList), a working `llms.txt`, fast TTFB, full image alt coverage, and solid security headers. But it is being held back by two things: a **genuinely broken/ambiguous robots.txt** that creates conflicting Allow/Disallow rules for ClaudeBot and Google-Extended, and a near-total **absence of third-party verification** — no Wikipedia/Wikidata entry, no Reddit presence, unverified headline claims (2,000+ installations, 500+ clients), and a "Projects" page whose case studies are anonymized dead ends. Fixing the robots.txt conflict and building out real, evidence-backed case studies would move the needle more than anything else on this list.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 85/100 | 25% | 21.3 |
| Brand Authority | 36/100 | 20% | 7.2 |
| Content E-E-A-T | 35/100 | 20% | 7.0 |
| Technical GEO | 78/100 | 15% | 11.7 |
| Schema & Structured Data | 61/100 | 10% | 6.1 |
| Platform Optimization | 61/100 | 10% | 6.1 |
| **Overall GEO Score** | | | **59.4 ≈ 59/100** |

---

## Critical Issues (Fix Immediately)

1. **Conflicting robots.txt rules for ClaudeBot & Google-Extended.** A Cloudflare-managed block issues `Disallow: /` for ClaudeBot, GPTBot, Google-Extended, Amazonbot, Bytespider, CCBot, meta-externalagent, Applebot-Extended; a later custom block issues `Allow: /` for ClaudeBot, Google-Extended, OAI-SearchBot, ChatGPT-User, PerplexityBot. Two groups target the same user-agent with opposite directives — parser behavior is undefined/inconsistent across crawlers, so you cannot assume Claude or Gemini's AI-Overviews grounding actually has access. **Fix:** collapse to one directive per bot — remove the duplicate Disallow lines for ClaudeBot/Google-Extended, or disable Cloudflare's "Block AI Bots" managed rule for those two specifically.
2. **Projects page has no real case studies.** `/projects.html` lists anonymized entries ("FMCG Manufacturer," "Government Ministry") with "Read Full Case Study →" links that go nowhere. This page should be the evidence base for every stat used elsewhere on the site. **Fix:** build 5–10 real case study pages with named client (where permitted), scope, install date, problem/solution, before/after metrics, photos.
3. **Headline claims are unverified everywhere.** "2,000+ installations," "500+ clients," "2M+ sq ft installed" appear on homepage/About/product pages with no citation or link to proof. **Fix:** link each stat to the case-study hub or footnote its source/date.
4. **`priceRange` field in Organization schema is corrupted (mojibake).** Present on home, compactor-storage, about, and blog pages — raw ₹₹₹ symbol is double-encoded garbage in the JSON-LD. **Fix:** correct the character-encoding pipeline (ensure UTF-8 end-to-end) and re-output as a valid string.

## High Priority Issues (Fix Within 1 Week)

5. **GPTBot fully blocked in robots.txt** (both rule blocks) — cuts off ChatGPT training/citation pathways entirely. OAI-SearchBot/ChatGPT-User (search-only) remain allowed. Decide intentionally and document the choice.
6. **No Wikipedia/Wikidata entity exists** for "Space Planners India" — the single strongest lever for AI entity recognition and ChatGPT/Perplexity citation. A legacy duplicate domain (`spaceplanners.org`) also surfaces in brand searches, diluting the entity signal.
7. **Blog posts have no real human byline** — "Space Planners Engineering Team" / "Industrial Storage Systems Specialist" are role titles, not named people with credentials/LinkedIn.
8. **Testimonials aren't verifiable** — five short homepage quotes with no reviewer name/title or link to an external review platform.
9. **No inline source citations** for stats like "80% capacity increase," "65% faster retrieval" — asserted with no attribution.
10. **BreadcrumbList schema uses invalid `@id` instead of `item`** on home.html and about.html (inner product pages already do this correctly) — breadcrumb rich results will fail validation on these two pages.
11. **`sameAs` schema has only 2 entries** (LinkedIn, Instagram) — missing YouTube, Facebook, IndiaMART/TradeIndia, Google Business Profile, Wikidata. This is the weakest link in the entity graph for cross-platform AI resolution.
12. **No `AggregateRating`/`Review` schema** despite a visible testimonials section on the homepage.
13. **No comparison/spec tables** on any product page (`/compactor-storage.html`, `/industrial-racks.html`, `/storage-lockers.html`, `/filing-cabinets.html`) — AI Overviews and Gemini extract HTML tables heavily for spec comparisons; this is the single highest-leverage content addition.
14. **Zero YouTube presence** — Gemini weights YouTube heavily; no installation demos, product videos, or client testimonial videos exist.
15. **No author bylines/credentials on product or service pages** (blog posts have this pattern already — extend it).
16. **Google-Extended disallowed in robots.txt** — limits how Gemini grounds answers using site content (tied to issue #1 — resolve together).
17. **WAF (Mod_Security via Cloudflare) returns HTTP 406 to generic/minimal-header user agents** not on its bot allowlist — a risk for lesser-known or future AI agents whose UA/header profile isn't recognized.

## Medium Priority Issues (Fix Within 1 Month)

18. **Phone number inconsistency** across schema — home/blog use `+91-9987733903`; compactor-storage/about use `022 4003 3385/86`. Standardize to one E.164 number sitewide for NAP consistency.
19. **ISO certifications (9001/14001/45001/50001)** only marked up as generic `award` strings on about.html — not in the sitewide Organization schema, not using `hasCredential`.
20. **No `geo` (GeoCoordinates) or `openingHoursSpecification`** on the LocalBusiness schema.
21. **Only 2 blog posts, both published the same day** — thin corpus, looks like a bulk content push rather than sustained expertise. Expand to 8–10 posts covering sector verticals (pharma compliance, banking/currency chest racking, hospital record storage).
22. **No IndexNow implementation** for faster Bing/Copilot indexing.
23. **No Bing Webmaster Tools verification** detected in homepage `<head>`.
24. **No community/forum validation signals** — zero presence in relevant subreddits (r/IndiaBusiness, r/msme) or Quora threads; Perplexity relies heavily on this kind of discussion.
25. **About page credentials aren't cross-linked** from product/projects pages, and certificates aren't shown as scanned images/badges.
26. **llms.txt missing `/llms-full.txt`** and dedicated About/Projects/FAQ sections (homepage FAQ content is already highly citable — reuse it there).
27. **Industry-sector one-line blurbs and testimonials score low on citability** (~40-45) — true but generic, not stat-backed enough to be independently quotable.
28. **Two `<h1>` tags on the homepage** (`.banner-title` and `.slide-title`) — demote one.
29. **`/blog.html` missing `<meta name="robots">` tag** — every other page has one.

## Low Priority Issues (Optimize When Possible)

30. FAQ answer overstates reach ("installs...across the world") vs. the site's India-centric positioning — reword for accuracy.
31. No Google Business Profile / local-pack signal verification referenced.
32. Meta descriptions are generic/thin on internal pages (only homepage confirmed reasonable).
33. Homepage `<title>` is 86 characters — will be truncated in SERPs; trim to ≤60.
34. Homepage HTML payload is 147KB (heaviest page, ~3x inner pages) — largely HTML comments from a prior SEO pass; consider minifying.
35. `HowTo` schema on homepage — Google removed HowTo rich results (Sep 2023); harmless but adds page weight.
36. No `WebSite` + `SearchAction` schema (minor — site has no on-site search).
37. Product schema lacks `offers`/`sku`/`mpn` — consider an `offers` block with "Contact for Quote" for completeness.
38. No "Published/Updated" dates visible on blog posts or product pages.

---

## Category Deep Dives

### AI Citability (85/100)
Homepage FAQ answers are the strongest asset — self-contained, stat-dense, quotable in 1–3 sentences (e.g., "60–70% floor space... based on data from over 2,000 installations"). Weakest: generic industry-sector one-liners and testimonials (~40–45), and one FAQ answer that overstates global reach.

### Brand Authority (36/100)
No Wikipedia entry (confirmed via API search). No Reddit discussion. A LinkedIn company page exists (531 followers). A YouTube channel exists but is sparse. Present on IndiaMART/ExportersIndia/ZoomInfo. A legacy duplicate domain (`spaceplanners.org`) dilutes entity clarity.

### Content E-E-A-T (35/100)
Strong trust infrastructure (real address, phone, ISO certs, named founders on About) undercut by zero verifiable evidence for headline claims, anonymized case studies, unnamed blog "authors," and unverifiable testimonials.

### Technical GEO (78/100)
Excellent SSR (all content in raw HTML, no JS dependency), full image alt coverage, strong security headers (HSTS/CSP/X-Frame/XCTO), valid sitewide JSON-LD, fast TTFB (~573ms). Held back by the robots.txt conflict, a WAF that may reject unrecognized bot UAs, duplicate H1 on homepage, and an oversized homepage payload.

### Schema & Structured Data (61/100)
Real, server-rendered Organization/Product/FAQPage/BreadcrumbList/Person schema already in place — well above typical baseline. Undermined by the corrupted `priceRange` encoding, invalid breadcrumb `@id` usage on two pages, thin `sameAs` list, and no Review/AggregateRating despite visible testimonials.

### Platform Optimization (61/100)
Google AI Overviews readiness is comparatively strong (72/100) thanks to the FAQ/schema foundation. ChatGPT (48), Perplexity (44), and Gemini (58) lag due to missing entity graph (Wikipedia/Wikidata), no YouTube, no comparison tables, and no forum/community presence.

---

## Quick Wins (Implement This Week)

1. Resolve the robots.txt ClaudeBot/Google-Extended conflict (#1) — single highest-leverage technical fix.
2. Fix the corrupted `priceRange` mojibake in JSON-LD (#4) — five-minute encoding fix, currently breaks structured data parsing.
3. Fix invalid BreadcrumbList `@id`→`item` on home.html and about.html (#10) — copy the pattern already correct on product pages.
4. Standardize the phone number across all schema (#18) — pick one E.164 format.
5. Demote the duplicate `<h1>` on the homepage (#28).

## 30-Day Action Plan

### Week 1: Fix What's Broken
- [ ] Resolve robots.txt conflicts for ClaudeBot/Google-Extended/GPTBot (decide intent, then fix)
- [ ] Fix corrupted `priceRange` encoding in JSON-LD
- [ ] Fix BreadcrumbList `item` property on home.html/about.html
- [ ] Standardize phone number across all schema
- [ ] Fix duplicate H1 on homepage; add missing meta robots tag to blog.html

### Week 2: Build the Evidence Base
- [ ] Build 5-10 real case studies on `/projects.html` with named clients, dates, metrics
- [ ] Link headline stats (2,000+ installations etc.) to supporting evidence
- [ ] Add named, credentialed bylines to blog posts and product pages
- [ ] Add reviewer name/title/link to homepage testimonials

### Week 3: Strengthen the Entity Graph
- [ ] Expand `sameAs` schema (YouTube, Facebook, IndiaMART, GBP, Wikidata once created)
- [ ] Assess Wikidata entry creation; clarify canonical domain vs. spaceplanners.org
- [ ] Add `AggregateRating`/`Review` schema for testimonials
- [ ] Add ISO certifications via `hasCredential` to sitewide Organization schema

### Week 4: Content & Platform Expansion
- [ ] Add spec/comparison tables to all 4 product pages
- [ ] Publish 3-5 short YouTube videos (demo, before/after, testimonial)
- [ ] Expand blog to 8-10 posts covering sector verticals
- [ ] Add `geo`/`openingHoursSpecification` to LocalBusiness schema; set up IndexNow and Bing Webmaster verification

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| / | Mobile Compactors & Industrial Storage Solutions \| Space Planners India | Duplicate H1, title too long, priceRange mojibake, breadcrumb @id bug |
| /compactor-storage.html | (product page) | No comparison table, priceRange mojibake, phone inconsistency |
| /industrial-racks.html | (product page) | No comparison table, no author byline |
| /storage-lockers.html | (product page) | No comparison table, no author byline |
| /filing-cabinets.html | (product page) | No comparison table, no author byline |
| /projects.html | (projects page) | Anonymized case studies, dead "Read Full Case Study" links |
| /about.html | (about page) | priceRange mojibake, breadcrumb @id bug, phone inconsistency |
| /contact.html | (contact page) | No geo/openingHours schema |
| /blog.html | (blog page) | Missing meta robots tag, no named author bylines, thin corpus (2 posts) |
| /privacy-policy.html | (legal) | — |
| /terms-of-use.html | (legal) | — |
| /disclaimer.html | (legal) | — |
