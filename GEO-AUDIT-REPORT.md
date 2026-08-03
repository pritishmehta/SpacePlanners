# GEO Audit Report: Space Planners India

**Audit Date:** 2026-08-03 (third audit run today)
**Score history today:** 53/100 → 57/100 → **59/100** (plus 44/100 on 2026-07-27)
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Local/Enterprise hybrid — physical Mumbai HQ, sells to corporate/government/healthcare/education buyers, GeM Portal registered)
**Pages Analyzed:** 8 core pages (home, about, compactor-storage, industrial-racks, storage-lockers, filing-cabinets, projects, contact)

---

## Executive Summary

**Overall GEO Score: 59/100 (Poor, trending toward Fair)**

Net progress continues — AI Citability, Technical GEO, Content E-E-A-T, and Platform Optimization all improved again this round, driven by a genuinely strong, sitewide rollout: every one of the 4 product pages now has product-specific FAQ content and a technical specifications comparison table (verified directly, not just claimed — distinct questions and distinct spec data per page, no copy-paste). The `<body>` tag bug and the `contact.html` footer/breadcrumb issues are also fixed.

**But Schema & Structured Data keeps declining: 56 → 41 → 39/100 across the three audits today.** The `offers` price block is still missing on all 4 Product schemas, the homepage's duplicate FAQ markup (JSON-LD FAQPage vs. an unrooted Microdata block) is still unresolved, and a new bug — a missing closing brace that breaks the BreadcrumbList JSON entirely on 3 of 4 product pages — hasn't been touched. All three are small, mechanical fixes; none require new content.

### Score Breakdown — Full History

| Category | Weight | 07-27 | 08-03 #1 | 08-03 #2 | 08-03 #3 (now) |
|---|---|---|---|---|---|
| AI Citability | 25% | 54 | 70 | 80 | **86** |
| Brand Authority | 20% | 19 | 30 | 32 | **33** |
| Content E-E-A-T | 20% | 49 | 47 | 54 | **55** |
| Technical GEO | 15% | 64 | 64 | 68 | **71** |
| Schema & Structured Data | 10% | 39 | 56 | 41 | **39** |
| Platform Optimization | 10% | 37 | 47 | 53 | **57** |
| **Overall GEO Score** | | **44** | **53** | **57** | **59** |

---

## Fix This First: The Schema Regression

Three concrete, verified bugs are dragging the one category that's gone backwards. All three were re-confirmed via direct JSON parsing this round (not just relayed from a subagent):

1. **Broken BreadcrumbList JSON on 3 of 4 product pages.** `compactor-storage.html`, `industrial-racks.html`, and `storage-lockers.html` are each missing a single closing `}` before `</script>` — confirmed via `JSON.parse()`, all three fail with the identical syntax error. Any JSON-LD parser (Google's, an AI crawler's) silently drops the entire block. `filing-cabinets.html` doesn't have this bug. **Fix:** add one `}` on the line before `</script>` in each of the 3 files.

2. **`offers` still missing on all 4 Product schemas.** Confirmed absent via direct source read on every product page — no `price`, `lowPrice`, `highPrice`, or `priceCurrency`. Product schema is ineligible for any rich result without it. **Fix:**
   ```json
   "offers": {
     "@type": "AggregateOffer",
     "priceCurrency": "INR",
     "lowPrice": "[your typical low-end project price]",
     "highPrice": "[your typical high-end project price]",
     "availability": "https://schema.org/InStock",
     "seller": { "@type": "Organization", "@id": "https://spaceplannersindia.in/#organization" }
   }
   ```

3. **Homepage still ships two conflicting FAQ representations.** A static JSON-LD `FAQPage` (7 questions, server-rendered, valid) coexists with a second, JS-injected Microdata block (`renderFAQ()` writes `itemscope itemtype="Question"` items into `<ul id="faqList">` via `innerHTML`) that still has no `itemscope itemtype="FAQPage"` wrapper around it. AI crawlers that don't execute JS only see the valid JSON-LD version, so this is mainly a Google-rendered-DOM validation conflict rather than an AI-crawler-visible one — but it's still an unresolved defect. **Fix:** delete the Microdata block (simplest — the static JSON-LD FAQPage is already valid and sufficient) or properly type it and remove the JSON-LD duplicate. Don't ship both.

**Bonus, cheap win in the same category:** the `FAQPage` JSON-LD on the product pages only mirrors a *subset* of the now-expanded visible FAQ content — e.g., compactor-storage.html has 8 visible Q&As but only 4 are in the schema; industrial-racks.html has 8 visible but only 3 in schema; storage-lockers.html has 7 visible but only 2 in schema. The content already exists — this is just extending the JSON arrays to match.

---

## What's Confirmed Fixed (verified directly, not assumed)

- `contact.html`'s unclosed `<script>` tag — fixed, JSON-LD parses, Google Ads conversion tracking (`gtag('config', ...)`) fires again
- `contact.html` now has a valid `BreadcrumbList` (previously had none) and a balanced `</footer>` tag (previously mismatched)
- `compactor-storage.html`'s missing `<body>` tag — fixed (open across two prior audits, now closed)
- Lead-capture modal + floating WhatsApp CTA — server-rendered on interior pages, confirmed via HTML diff (previously JS-only empty divs)
- Duplicate CSP conflict (HTTP header vs. meta tag) — resolved, meta tag removed
- Meta descriptions — present site-wide, confirmed on home/compactor/contact
- Conflicting business addresses — resolved, `contact.html` now matches the sitewide footer address
- Contradictory space-saving stats (60-70% / 50-60% / 75%) — resolved to a consistent 60-70% (superseded again by product-specific figures per page, all internally consistent)
- `storage-lockers.html` thin content (~450 words) — resolved, now ~900-1,300 words with real spec content
- **New this round, sitewide, verified per-page:** all 4 product pages now have distinct product-specific FAQ content (no shared/duplicated question text) and a technical specifications comparison table (compactor: manual vs. motorized; racks: pallet/slotted-angle/mezzanine; lockers: personal/cleanroom/digital; cabinets: vertical/sliding/pigeon-hole) — this closes out two issues that were open across all three audits today
- Organization `sameAs` swapped Facebook → Instagram consistently across all 8 pages (confirmed not a partial/inconsistent rollout) — net neutral for brand authority (still only 2 platforms, no net new external validation), but internally consistent
- Person schema for Pawan Sehgal / Mukesh Sehgal added on `about.html` with jobTitle and LinkedIn links

## Still Open (confirmed unchanged across all three audits today)

- **robots.txt Cloudflare-edge conflict** for ClaudeBot/Google-Extended — origin `robots.txt` is clean; the contradiction is injected by Cloudflare's "AI Crawl Control" dashboard setting and isn't fixable from the repo
- **No Wikipedia or Wikidata presence** — confirmed absent via direct API query, all three audits
- **No Reddit / organic community presence**
- **Brand fragmentation** across spaceplannersindia.in / spaceplanners.org / compactorstorage.co.in / IndiaMART / JustDial / TradeIndia
- **Every headline stat still uncited** (2,000+ installations, 500+ clients, 20+ years, 2M+ sq ft, "100% Compliance Rate") — repeated verbatim across every page, no methodology or source
- **Certifications still claimed as text only** — ISO 9001/14001/45001/50001, GMP, NABH, AIOTA/BIFMA/GREENGUARD/NSF/CF — no certificate numbers, badges, or verification links
- **No author/expert attribution on product pages** — the Person schema exists on `about.html` but isn't surfaced on the pages where technical claims (load capacity, compliance) actually live
- **Case studies still mostly anonymize clients** — only GVK Mumbai Airport is named; TCS/RBI/SBI/Indian Army remain homepage-logo-only
- **No visible publish/last-updated dates anywhere**, and now compounded by a **new minor finding:** `sitemap.xml`'s `<lastmod>2026-07-24</lastmod>` on every URL is ~10 days stale relative to actual file edit dates
- **IndexNow key file exists locally but is not yet live** — `.well-known/indexnow-key.txt` is present in the local working tree (uncommitted) but the live site still returns 404 for it, unlike other local edits which are already deployed. Worth checking why this particular file didn't sync.
- **Person `sameAs` still points to the company LinkedIn page**, not individual profiles, for both named leaders
- **No `knowsAbout` or `founder` cross-link** on the Organization schema
- **`BreadcrumbList` uses `@id` instead of `item`** on home/about/projects (product pages and contact.html now correctly use `item`)

---

## Category Deep Dives

### AI Citability (86/100, up from 80)

Real, broad improvement. The sitewide FAQ/spec-table rollout produces genuinely citable content — specific numbers (75-150kg vs. 500kg+ load capacity, ISO/GMP/NABH standards per product) replace what was previously generic marketing copy. Ceiling is now capped less by content quality and more by a schema/content mismatch: the JSON-LD FAQPage on each product page only includes a fraction of what's visibly on the page, so structured-data-reliant AI systems get a narrower slice than what a human (or a crawler reading rendered text) would see.

### Brand Authority (33/100, up 1 from 32)

Essentially flat, as expected — this round's edits were on-page content and schema hygiene, not external authority-building. Confirmed once more: no Wikipedia (direct API check, 404), no Reddit, YouTube channel exists but activity unverifiable. The Facebook→Instagram `sameAs` swap was confirmed consistent across all 8 pages, but it's a redirect of an existing signal, not new external validation. This remains the single largest lever left untouched across all three audits.

### Content E-E-A-T (55/100, up 1 from 54)

The sitewide FAQ/spec-table rollout is confirmed here too — genuine, verifiable, not partial. It measurably helps Experience and, to a lesser extent, removes what was previously the clearest "templated AI content" signal on the site (identical FAQ text across pages). But the heaviest-weighted dimensions — Trustworthiness and Authoritativeness — didn't move, because the same unsourced stats and unproven certifications are still there, and the new Person schema still isn't surfaced on the product pages that most need an expertise signal.

### Technical GEO (71/100, up from 68)

Confirmed: `<body>` tag fixed, `contact.html` footer balanced, and the new spec tables were built with zero Core Web Vitals cost (plain HTML tables, no images, no JS, wrapped for mobile scroll). No new render-blocking scripts introduced. New minor finding: sitemap `lastmod` values are now stale relative to actual edits — cheap fix. The Cloudflare-edge robots.txt conflict remains the main thing holding this category back from "Excellent."

### Schema & Structured Data (39/100, down from 41 — still declining)

Third straight decline (56 → 41 → 39). The one genuine fix this round (contact.html gaining a valid BreadcrumbList) is outweighed by the newly-discovered broken BreadcrumbList JSON on 3 other pages, which silently drops that entire schema block from parsing. Every previously-open gap (offers, duplicate FAQ, Person sameAs, `@id` vs `item`, missing `knowsAbout`/`founder`/`speakable`/`WebSite`) is still unresolved, unchanged, three audits running.

### Platform Optimization (57/100, up from 53)

| Platform | 08-03 #2 | 08-03 #3 (now) | Δ |
|---|---|---|---|
| Google AI Overviews | 66 | 71 | +5 |
| Bing Copilot | 58 | 62 | +4 |
| ChatGPT Web Search | 55 | 58 | +3 |
| Google Gemini | 44 | 47 | +3 |
| Perplexity AI | 43 | 47 | +4 |

Every platform improved again, mainly from the new comparison tables (AIO's favorite extraction target) and product-specific FAQ content. A confirmed Bing Webmaster Tools verification file (`/7a8f6d2e9c1b4a3f8e5d0c2b1a9f8e7d.txt`) is live and matches the standard verification pattern — a genuine new signal for Bing. Perplexity and Gemini remain weakest, capped by the same untouched gaps: no visible freshness dates, no Google Business Profile link, no YouTube content.

---

## Quick Wins (Do These Next — all mechanical, no new content needed)

1. Add the missing `}` to the BreadcrumbList JSON-LD on `compactor-storage.html`, `industrial-racks.html`, `storage-lockers.html`.
2. Add an `offers` block (with a real or ranged price) to all 4 Product schemas.
3. Delete the homepage's JS-injected Microdata FAQ block (keep the existing valid JSON-LD FAQPage).
4. Extend each product page's `FAQPage` JSON-LD to include all the visible questions (currently only a subset is marked up).
5. Investigate why `.well-known/indexnow-key.txt` isn't deploying even though it's in the local working tree.
6. Update `sitemap.xml` `<lastmod>` values to match actual edit dates.

## 30-Day Action Plan

### Week 1: Close Out the Schema Regression
- [ ] Fix the 3 broken BreadcrumbList blocks (one-character fix each)
- [ ] Add `offers` to all 4 Product schemas
- [ ] Resolve the homepage duplicate FAQ markup
- [ ] Extend FAQPage schema on product pages to match visible content
- [ ] Fix the IndexNow deployment gap

### Week 2: Substantiate Claims (open since 07-27)
- [ ] Add methodology/citation for every headline stat
- [ ] Publish certificate numbers/badges for ISO/GMP/NABH claims
- [ ] Reconcile homepage vs. about.html certification lists

### Week 3: Close the Brand Authority Gap
- [ ] Publish a canonical-domain statement addressing spaceplanners.org / compactorstorage.co.in
- [ ] Expand `sameAs` to Google Business Profile, YouTube, IndiaMART/TradeIndia, GeM seller profile
- [ ] Fix Person `sameAs` to point to individual (not company) LinkedIn profiles; add `founder`/`knowsAbout`

### Week 4: Platform-Specific Polish
- [ ] Add author/reviewer attribution to product pages, leveraging the existing Sehgal Person schema
- [ ] Add visible "Last updated" dates + `dateModified` schema sitewide
- [ ] Name the two remaining anonymized case studies on `projects.html`
- [ ] Add `Permissions-Policy` header; add `speakable` and `WebSite`+`SearchAction` schema

---

*Report generated via the geo/geo-audit Claude Code skill, synthesizing 5 parallel subagent re-analyses against the live site, each explicitly diffing against the same-day 57/100 audit. Full history: 44/100 (07-27) → 53/100 → 57/100 → 59/100 (all 08-03).*
