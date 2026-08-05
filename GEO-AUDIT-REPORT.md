# GEO Audit Report: Space Planners India

**Audit Date:** 2026-08-05 (second pass — re-run after commit `76aff84 "fixes"`)
**Score history:** 44/100 (07-27) → 53 → 57 → 59/100 (three runs on 08-03) → 52/100 (08-05 #1) → **54/100 (08-05 #2, now)**
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Local/Enterprise hybrid — physical Mumbai HQ, sells to corporate/government/healthcare/education buyers, GeM Portal registered)
**Pages Analyzed:** 12 (full sitemap) + `js/data.js` + `llms.txt` + `robots.txt`, all re-fetched live and diffed against the 08-05 #1 findings

---

## Executive Summary

**Overall GEO Score: 54/100 (up 2 from 52 on the same day)**

A real commit landed since the last audit (`76aff84`, touching `.htaccess`, `blog.html`, all 4 product pages, and `projects.html`). Verified directly against the live site rather than trusting the diff stat alone: **three of the prior audit's Critical/High findings are genuinely fixed**, one is **partially fixed with a new side-effect worth flagging**, and everything scoped for "Week 2" (unique URLs per product/case/article) is — as expected — still open, since that's a bigger structural change than a same-day patch.

### What's confirmed fixed

1. **Cloudflare robots.txt conflict for `ClaudeBot`/`Google-Extended` — resolved.** The live `robots.txt` now returns a single, clean rule set matching the repo's local file exactly (no more duplicated Cloudflare-injected block disallowing bots the site's own rules allow). Confirmed via direct `curl` fetch.
2. **`blog.html` now has the `<meta name="robots">` tag** matching every other page.
3. **`CollectionPage` schema on `projects.html` no longer describes fictitious case studies.** This was rebuilt two ways at once: the static JSON-LD block was hand-updated to list the 5 real case-study titles that are actually in the static HTML, *and* a new `<script>` was added that regenerates the same schema block at runtime from the live `cases` array (`mainEntity: cases.map(c => ({...}))`) so it can't drift again. Both the non-JS view and the JS-rendered view are now internally self-consistent (previously the schema simply didn't match anything).
4. **Individual `Product` schema added per variant, all 4 product pages.** `compactor-storage.html` now has 6 distinct Product schema blocks (File Storage, Pigeon Hole, Heavy Duty, Perforated, Drawer, Stainless Steel Compactors) instead of one generic entity; `industrial-racks.html`, `storage-lockers.html`, and `filing-cabinets.html` each got the equivalent treatment (7-8 variant-specific Product blocks apiece). This is a real, verified win for citability — **JSON-LD schema lives in static `<script>` tags, so it's visible to non-JS crawlers regardless of whether the visual product grid renders**, meaning AI systems now get accurate, differentiated product data even without executing JavaScript.

### New finding — a side-effect worth a decision, not necessarily a regression

5. **On `industrial-racks.html`, `storage-lockers.html`, and `filing-cabinets.html`, the static HTML fallback for the product grid was removed entirely** — `<div id="productGrid">` now contains only an HTML comment (`<!-- rendered by JS -->`), no hardcoded cards. This eliminates the old mismatch bug (stale card text vs. real JS data) by deleting the mismatched side rather than syncing it. Net effect: these 3 pages no longer show *wrong* product names to non-JS crawlers, but they now show *zero* visible product cards in the raw HTML — visual/textual product content on these pages is 100% JS-only. The new per-variant Product schema (finding #4) substantially offsets this for schema-reading AI systems, but a rendering-only or text-extraction crawler still sees an empty grid. **`compactor-storage.html` was not changed this way — it still has its original 3 stale, mismatched static cards** (Document Storage Compactor / Pigeon Hole Compactor / Heavy Duty Industrial Compactor), inconsistent with the other 3 pages' approach and still wrong relative to the real 6 products.

### Still open, unchanged from 08-05 #1

- **No unique URL for any product variant, case study, or blog article** — this remains the single biggest lever, untouched, as expected for a same-day patch.
- **`js/data.js`'s `cases` array still has only 3 entries** (FMCG, Library, Airport) while the static HTML on `projects.html` still shows 5 case-study cards (FMCG, Library, Airport, Pharma cleanroom, Government). The schema fix (finding #3) made both *views* internally consistent with themselves, but the underlying 5-vs-3 content mismatch between the static page and the JS-rendered page is not resolved — the 2 extra case studies (Pharma cleanroom, Government) still only exist as static text with no backing data entry, and will vanish for any real site visitor once JS runs.
- **No `offers`/price schema on any of the 4 Product schema blocks** (checked all 4 pages, `offers` count = 0 everywhere) — still ineligible for price-related rich results.
- **`js/data.js`'s dead `projects` array (8 unused generic entries)** — still present, still unreferenced.
- **Blog author attribution still generic** ("Space Planners Engineering Team," "Industrial Storage Systems Specialist") — no `Person` schema tie-in, unchanged.
- Everything under "Not Fixable From the Repo" in the prior report (Wikipedia/Reddit absence, brand fragmentation, unsourced headline stats) — not re-verified this pass, carry forward as still open.

### Score Breakdown

| Category | Weight | 08-05 #1 | **08-05 #2 (now)** | Δ | Why |
|---|---|---|---|---|---|
| AI Citability | 25% | 48 | **58** | +10 | Per-variant Product schema is a real, static, non-JS-visible citability gain that outweighs the loss of visible grid text on 3 pages |
| Brand Authority | 20% | 34 | **34** | 0 | Not touched by this commit |
| Content E-E-A-T | 20% | 56 | **56** | 0 | Blog authorship still generic; nothing else in scope changed |
| Technical GEO | 15% | 58 | **65** | +7 | robots.txt conflict resolved; meta robots consistency fixed |
| Schema & Structured Data | 10% | 45 | **62** | +17 | Fictitious CollectionPage content fixed; 24+ new Product entities added; offers still missing |
| Platform Optimization | 10% | 52 | **58** | +6 | Clean robots.txt materially helps ChatGPT/Perplexity trust; better schema helps AI Overviews |
| **Overall GEO Score** | | **52** | **54** | **+2** | |

---

## Updated Priority List

### Critical — still the top issue
1. **No unique URL for products, case studies, or blog articles.** Unchanged from last audit — this is the fix that would move the score the most, and it's the one thing this commit didn't attempt. See the 08-05 #1 findings below for the full breakdown by content type.
2. **`js/data.js`'s `cases` array (3 entries) still disagrees with `projects.html`'s static HTML (5 entries).** Either add the missing 2 case studies (Pharma cleanroom, Government) to the `cases` array with full challenge/solution/results fields, or remove them from the static HTML — don't leave the disagreement in place now that the schema dynamically trusts whichever one JS sees.

### High — pick one approach and apply it consistently
3. **Decide on one strategy for the product grid's non-JS fallback and apply it to all 4 pages.** Right now `compactor-storage.html` shows stale/wrong static cards while the other 3 show none at all — neither is ideal, and the inconsistency itself is worth fixing. Recommended: sync `compactor-storage.html`'s static fallback to its real 6 products (matching what appears to be the intended fix already applied elsewhere), rather than emptying it — an accurate static fallback is strictly better than none for text-extraction-based crawlers that don't parse JSON-LD.
4. **Add `offers` to all 4 Product schema blocks** (still 0 across the board) — see the exact JSON shape recommended in the prior report.
5. **Attribute blog articles to real people** (reuse the existing Sehgal `Person` schema pattern from `about.html`) — unchanged from last audit.

### Medium
6. **Remove or wire up the dead `projects` array in `js/data.js`** (8 unused entries) — unchanged.
7. Re-verify the "Still Open — Not Fixable From the Repo" and other carry-forward items from the 08-05 #1 report; none were in scope for this commit.

---

## Quick Wins (This Week)

1. Add the 2 missing case studies to `js/data.js`'s `cases` array (Pharma cleanroom, Government) so it matches the static HTML — or delete those 2 static cards if they're not meant to be kept. Either resolves the last remaining static/JS content mismatch.
2. Sync `compactor-storage.html`'s static `#productGrid` fallback to its real 6 `productsData` entries (bring it in line with how the other 3 product pages were already changed, but populate rather than empty it).
3. Add `offers` (AggregateOffer, INR, seller reference) to all 4 pages' Product schema blocks.
4. Real byline + Person schema for both blog articles.
5. Delete the unused `projects` array from `js/data.js` (or confirm it's meant for something and wire it up).

---

*This entry continues the audit history in this file. Full prior-run detail — including the original discovery of the JS-modal-gating pattern across products/projects/blog, the complete "no unique URL" analysis by content type, and all Brand Authority / E-E-A-T / certification findings not re-verified in this pass — is preserved below.*

---
---

# Previous Audit Run (2026-08-05, first pass — for reference)

**Score at time of this run:** 52/100
**Scope:** First audit to specifically test whether product/project/blog "read more" content is crawlable by non-JS AI systems.

## Summary of that run's core finding

Product specs, full case studies, and full blog articles were found to live only in JavaScript data objects, rendered into shared modals via `onclick` handlers, with no unique URL per item. A `curl` fetch (simulating a non-JS AI crawler) could not see this content; only a JS-executing browser could, and even then only after a simulated click, which no crawler performs. Additionally, `projects.html`'s `CollectionPage` schema was found to describe 4 case studies that did not exist anywhere on the page (now fixed — see above), and the static HTML fallback for products (3 items) and cases (5 items) did not match the live JS-rendered data (6 products / 3 cases at the time — the cases mismatch persists as of this second pass).

## Content-type breakdown (as found in the first pass — URL-per-item gap still open)

| Content type | Where the full content lives | Non-JS crawler sees | Unique URL? |
|---|---|---|---|
| Products (6 variants × 4 pages) | `productsData` JS array per page, modal-only detail | Static fallback (now empty on 3 of 4 pages, stale on the 4th — see "New finding" above) | No |
| Projects/Case Studies | `cases` array in `js/data.js`, modal-only full detail | Static fallback (5 cards, still doesn't match the 3-entry `cases` array) | No |
| Blog articles | `articlesDB` JS object, modal-only full guide | Crawlable ~60-word excerpt (fine) + highlight chips; full guide invisible | No |

## Carry-forward findings not re-verified in the second pass (assume still current)

- **Brand Authority (34/100):** LinkedIn/Instagram present via `sameAs`; no Wikipedia, no Reddit, YouTube presence unverified; extensive named-client-logo wall (Coca-Cola, TCS, SBI, RBI, HAL, Indian Army, etc.) not backed by any independently verifiable third-party source.
- **Content E-E-A-T (56/100):** Case studies contain genuine, specific, quantified outcomes; blog has real depth but generic/unlinked authorship (still true as of the second pass).
- **From the 08-03 audit, still open as of 08-05:**
  - No Wikipedia/Wikidata, no Reddit / organic community presence
  - Brand fragmentation across spaceplannersindia.in / spaceplanners.org / compactorstorage.co.in / IndiaMART / JustDial / TradeIndia
  - Every headline stat still uncited (2,000+ installations, 500+ clients, 20+ years, 2M+ sq ft, "100% Compliance Rate")
  - Certifications claimed as text only (ISO 9001/14001/45001/50001, GMP, NABH, etc.) — no certificate numbers, badges, or verification links
  - No author/expert attribution on product pages (Person schema exists on `about.html` only)
  - Case studies mostly anonymize clients (only GVK Mumbai Airport named)
  - No visible publish/last-updated dates; `sitemap.xml`'s `<lastmod>` values are stale (still `2026-07-24` on 10 of 12 URLs as of this pass — confirmed unchanged)
  - `.well-known/indexnow-key.txt` present locally but not confirmed live
  - Person `sameAs` still points to company LinkedIn, not individual profiles
  - No `knowsAbout`/`founder` cross-link on Organization schema
  - `BreadcrumbList` uses `@id` instead of `item` on home/about/projects

## 30-Day Action Plan (from the first pass — still the roadmap; Week 1 items are now mostly done)

### Week 1: Fix Data Integrity — **mostly complete as of this second pass**
- [x] Fix `robots.txt`/Cloudflare AI Crawl Control conflict *(confirmed resolved)*
- [x] Add per-variant Product schema *(confirmed added, all 4 pages)*
- [x] Fix `CollectionPage` fictitious content *(confirmed fixed)*
- [x] Add `<meta name="robots">` to `blog.html` *(confirmed added)*
- [ ] Sync static HTML fallback with live JS data (cases still mismatched; products fixed by removal on 3 pages, still stale on 1)
- [ ] Re-verify `offers` schema *(confirmed still missing)*

### Week 2: Give the Real Content Real URLs — **not started**
- [ ] Dedicated page per case study
- [ ] Dedicated page per blog article
- [ ] Dedicated sections/schema per product variant
- [ ] Update `sitemap.xml` and `llms.txt` accordingly

### Week 3: Structured Data Expansion — **partially done**
- [x] Individual Product schema per variant *(done)*
- [ ] Case-study-appropriate schema on dedicated project URLs (blocked on Week 2)
- [ ] Person/author schema on blog articles

### Week 4: Re-verify and Address Legacy Open Items — **pending**
- [ ] Re-run this audit after Week 2 URL work lands
- [ ] Revisit unsourced stats, certifications, brand fragmentation, Wikipedia/YouTube presence
