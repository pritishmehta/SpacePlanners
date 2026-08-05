# GEO Audit Report: Space Planners India

**Audit Date:** 2026-08-05
**Score history:** 44/100 (07-27) → 53 → 57 → 59/100 (three runs on 08-03) → **this run**
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Local/Enterprise hybrid — physical Mumbai HQ, sells to corporate/government/healthcare/education buyers, GeM Portal registered)
**Pages Analyzed:** 12 (full current sitemap, up from 8 on 08-03 — `blog.html` is new since the last audit)
**Toolkit status:** GEO-SEO skill set diffed against upstream before this audit — already current, no update applied.

---

## Executive Summary

**Overall GEO Score: 52/100 (down from 59/100 on 08-03)**

The regression is not because prior fixes reverted — the sitewide FAQ/spec-table rollout, the `<body>`/`contact.html` fixes, and the other items logged as "Confirmed Fixed" on 08-03 are still in place (spot-checked below). **The score dropped because this audit expanded scope to `blog.html` (new since 08-03) and specifically dug into a question the previous three audits never asked: is the detailed content behind "Read More" a real, crawlable page, or a JS popup?** It's a JS popup — on all three of the site's main content types (products, projects, blog) — and that single architectural pattern is a bigger AI-visibility problem than everything fixed so far combined.

**This audit's primary finding, directly answering what was asked:** product specs, full case studies, and full blog articles are not in the static HTML. They live in JavaScript data objects and only render into the DOM inside a modal, triggered by an `onclick`. No AI crawler that doesn't execute JavaScript (which is most of them — GPTBot, PerplexityBot, and answer-engine crawlers generally fetch raw HTML) will ever see this content, and even one that does execute JS still can't cite it individually, because none of it has a unique URL — everything resolves back to the same shared `/projects.html` or `/blog.html`.

### Score Breakdown

| Category | Weight | 07-27 | 08-03 (final) | **08-05 (now)** | Δ |
|---|---|---|---|---|---|
| AI Citability | 25% | 54 | 86 | **48** | -38 |
| Brand Authority | 20% | 19 | 33 | **34** | +1 |
| Content E-E-A-T | 20% | 49 | 55 | **56** | +1 |
| Technical GEO | 15% | 64 | 71 | **58** | -13 |
| Schema & Structured Data | 10% | 39 | 39 | **45** | +6 |
| Platform Optimization | 10% | 37 | 57 | **52** | -5 |
| **Overall GEO Score** | | **44** | **59** | **52** | **-7** |

**Read the drop correctly:** AI Citability and Technical GEO didn't get worse in absolute terms — the 08-03 scores were measured against `compactor-storage.html`, `industrial-racks.html`, `storage-lockers.html`, and `filing-cabinets.html`'s *visible page text* (the FAQ/spec-table content, which is genuinely excellent and server-rendered). This audit measured the same pages against *what a non-JS crawler's raw fetch actually returns for the "View Details" / "Read Full Case Study" / "Read Complete Guide" content* — and that content isn't there. Both things are true at once: the visible page is strong; the content behind every "read more" affordance is invisible to most AI systems.

---

## Answering the specific question asked: are product / project / blog "pop-up" details crawlable?

**No.** Verified directly by comparing raw `curl` output (what a non-JS crawler sees) against the rendered DOM (what a browser shows), on the live site and cross-checked against the local repo files.

| Content type | Files | Where the full content lives | What a non-JS crawler gets | Unique URL? |
|---|---|---|---|---|
| **Products** (6 variants × 4 product pages) | `compactor-storage.html`, `industrial-racks.html`, `storage-lockers.html`, `filing-cabinets.html` | Inline `productsData` JS array, injected by `renderProducts()` on load; full description + "Ideal Applications" only shown by `openProductModal(id)` on click | 3 hardcoded static fallback cards **that don't match** the 6 real products (different names, different copy) — these get silently replaced once JS runs, so the raw HTML a crawler fetches is factually stale | No — one shared `#productDetailContent` modal per page, no per-product URL |
| **Projects / Case Studies** | `projects.html` (data from `js/data.js`) | `cases` array (3 full case studies: FMCG, Engineering Institute Library, Airport — each with challenge/solution/named-client/quantified results), injected by `renderCases()`; full detail only via `openCaseModal(i)` | 5 *different* case studies hardcoded in the static HTML (FMCG, Library, Airport, Pharma cleanroom, Government) that get **overwritten down to 3** once JS runs — a real content-integrity bug, not just a GEO gap | No — one shared `#caseDetailContent` modal |
| **Blog articles** | `blog.html` | `articlesDB` JS object — 2 full long-form guides (10-section TOC each) injected only by `openArticleModal('art-1'/'art-2')` on click | A solid, genuinely crawlable ~60-word excerpt + highlight chips per article (this part is fine) — but the actual 10-minute guide, the part worth citing, is 100% invisible to any crawler that doesn't click | No — one shared `#modalArticleContent` modal, no per-article slug |

**Why this specifically hurts GEO/AEO:** AI answer engines build their index from raw or lightly-rendered HTML; they don't click buttons the way a person does. Even a rendering-capable crawler that executed every script on `projects.html` still couldn't deep-link a user to "the FMCG case study" — there is no such URL, only `/projects.html`, which resolves to whichever 3 cases are hardcoded into the JS at the time. This directly suppresses AI Overview citation, Perplexity source linking, and featured-snippet eligibility for the three content types most likely to contain the specific, differentiated detail someone would actually search for ("mobile compactor for pharma cleanroom," "how to choose industrial racks").

**Independent bug surfaced by this check:** the static fallback markup for products and case studies doesn't match the JS-rendered version — different product names, and 5 vs. 3 case studies. This means Google's rendered snapshot and a plain `curl` fetch of the same URL currently disagree with each other. That's a content-integrity defect on its own, separate from the JS-gating issue, and worth fixing regardless of any GEO consideration.

---

## Critical Issues (Fix Immediately)

1. **No indexable, linkable content for the site's three richest content types.** See table above. This is the highest-leverage single fix available on the site right now — bigger than any remaining schema fix.
2. **`projects.html`'s `CollectionPage` schema describes four case studies that don't exist anywhere on the page** ("Pharmaceutical Storage Case Study," "Hospital Locker System Case Study," "Warehouse Optimization Case Study," "Government Archive Case Study") — the real case studies are FMCG, Library, and Airport. Any AI system that trusts the schema over the rendered text will surface fabricated case-study titles. This is exactly the kind of structured-data/content mismatch Google's guidelines treat as spam-adjacent, even though here it's clearly an artifact of the schema being hand-written separately from the JS data rather than generated from it.
3. **Static HTML fallback for products (3 items) and cases (5 items) doesn't match the live JS-rendered data (6 products / 3 cases).** Confirmed by direct comparison of the static markup against `productsData` and `cases` in the page source. Whatever a non-JS system indexes right now is wrong, not just incomplete.

## High Priority Issues

1. **No per-item URL for any case study or blog article**, which caps AEO/AI-citation potential even after content visibility is fixed — a crawler needs somewhere specific to point a user.
2. **This pattern is confirmed identical across all 4 product pages** (`compactor-storage.html`, `industrial-racks.html`, `storage-lockers.html`, `filing-cabinets.html` all define their own `productsData` + `openProductModal`), so fixing it once as a template change fixes it everywhere.
3. `blog.html` is missing a `<meta name="robots">` tag (present on every other page checked).
4. Blog authorship is generic and unlinked ("Space Planners Engineering Team," "Industrial Storage Systems Specialist") — no bio, no credentials, no `Person` schema tie-in, unlike `about.html`'s Sehgal `Person` entries.

## Medium Priority Issues (carried forward, still open per 08-03 audit — re-verify)

- `offers` block still likely missing from Product schema (not re-verified this pass; flagged open as of 08-03 — confirm before assuming fixed)
- `js/data.js`'s top-level `projects` array (8 generic entries like "Leading PSU Headquarters, Delhi") appears unused by any page's rendering logic — likely dead data, worth confirming and removing or wiring up
- Only one generic `Product` schema entity on each product page despite 6 real variants per page — missed schema opportunity, independent of the modal issue

## Still Open — Not Fixable From the Repo (per 08-03 finding, unchanged)

- **robots.txt AI-crawler contradiction for `ClaudeBot`/`Google-Extended`.** Re-confirmed this run: the local `robots.txt` in this repo is clean and intentional — it explicitly `Allow`s `Googlebot`, `Bingbot`, `ClaudeBot`, `Google-Extended`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, and deliberately `Disallow`s `GPTBot`, `Amazonbot`, `Bytespider`, `CCBot` (a coherent policy: allow live-browsing/citation agents, block training scrapers). The contradiction only appears in the **live** robots.txt, where Cloudflare's edge-level "AI Crawl Control" injects a second, conflicting rule block that `Disallow`s `ClaudeBot` and `Google-Extended` again. This needs to be fixed in the **Cloudflare dashboard** (AI Crawl Control / Bot Management settings), not in this codebase.
- No Wikipedia/Wikidata, no Reddit presence, brand fragmentation across other domains/marketplaces — all unchanged from 08-03, see prior findings below.

---

## Category Deep Dives

### AI Citability (48/100, down from 86 — see "read the drop correctly" note above)
The visible, server-rendered page content (FAQ blocks, spec tables, hero copy) that earned the 86 score on 08-03 is still there and still strong — that part of the assessment holds. What's new is scoring the "read more" content, which is where a citation-hungry AI system would actually want to go deeper, and finding it inaccessible. Net: strong surface, empty basement.

### Brand Authority (34/100, roughly flat)
No change in findings from 08-03: LinkedIn/Instagram present via `sameAs`, no Wikipedia, no Reddit, YouTube presence unverified. Not re-investigated deeply this pass since the audit's focus was the content-crawlability question; treat the 08-03 deep dive as still current.

### Content E-E-A-T (56/100, flat)
Case studies contain genuine, specific, quantified outcomes (named client type, "70% increase in storage capacity — 300 to 500 bags in the same floor area") — strong Experience signal, *if* it were reachable. Blog articles have real depth (10-section guides) but generic, unlinked authorship. Both of these E-E-A-T strengths are undermined by the same JS-gating issue: the detail that would prove expertise is exactly the detail that's hidden.

### Technical GEO (58/100, down from 71 for the reason explained above)
HTTPS/HSTS/CSP all still solid. `llms.txt` is well-formed and accurately lists the real top-level pages. The score moved because this pass tests renderability of the deep content, not just the shell page — same site, stricter test.

### Schema & Structured Data (45/100, up from 39)
Net improvement despite the new `CollectionPage` mismatch finding, because `Organization`, `Product`, `FAQPage`, `HowTo`, and `BreadcrumbList` schema across the core pages remains solid (consistent with 08-03's "Confirmed Fixed" list). The `CollectionPage` issue is newly discovered, not a regression of something previously working.

### Platform Optimization (52/100, down from 57)
FAQ/HowTo schema still makes this site well-suited to Google AI Overviews and voice-style answers for the *visible* content. Perplexity- and ChatGPT-style deep citation is where this category takes the hit: those systems most reward pages with unique, deep-linkable URLs per topic, which is exactly what's missing for products, projects, and blog articles.

---

## Quick Wins (Implement This Week)

1. **Fix the `CollectionPage` schema on `projects.html`** to reference the 3 real case studies instead of 4 fictitious ones.
2. **Sync the static fallback HTML for products and case studies with the live JS data** (`productsData` / `cases`) on all 4 product pages + `projects.html` — a data-parity fix, no design work needed.
3. **Add `<meta name="robots">` to `blog.html`.**
4. **Add real bylines** to the two existing blog articles, linked to a `Person` schema (reuse the pattern already built for `about.html`'s Sehgal entries).
5. **Confirm in the Cloudflare dashboard** whether AI Crawl Control's block of `ClaudeBot`/`Google-Extended` is intentional; if not, correct it there (not in the repo — the repo's `robots.txt` is already correct).

## 30-Day Action Plan

### Week 1: Fix Data Integrity (mechanical, no design work)
- [ ] Regenerate `CollectionPage` schema on `projects.html` from the same `cases` data used to render the page
- [ ] Sync static HTML fallback with live `productsData`/`cases` arrays across all 5 affected pages
- [ ] Add missing `<meta name="robots">` to `blog.html`
- [ ] Re-verify `offers` schema and other items flagged open as of 08-03 (not re-checked this pass)

### Week 2: Give the Real Content Real URLs
- [ ] Convert each of the 3 case studies into its own page (e.g. `/projects/fmcg-storage.html`), keeping the modal as an optional enhancement rather than the only access path
- [ ] Convert each blog article into its own page with the full guide server-rendered
- [ ] Convert each of the 6×4 product variants into either dedicated sub-pages or at minimum server-rendered `<section id="...">` anchors with real content, not JS-injected-on-click-only
- [ ] Update `sitemap.xml` and `llms.txt` to include the new individual URLs

### Week 3: Structured Data Expansion
- [ ] Add individual `Product` schema per variant (24 products across 4 pages) instead of one generic entity per page
- [ ] Add case-study-appropriate schema to each new project URL, sourced from the same data used to render the page (prevents future mismatches by construction)
- [ ] Add `Person`/author schema to blog articles

### Week 4: Re-verify and Address Legacy Open Items
- [ ] Re-run this audit specifically checking whether the JS-gating and schema-mismatch fixes changed what a `curl` fetch returns (not just visual QA)
- [ ] Revisit the still-open items from 08-03: unsourced headline stats, unverified certifications, brand fragmentation across other domains, no Wikipedia/YouTube presence
- [ ] Confirm Cloudflare AI Crawl Control settings for ClaudeBot/Google-Extended match intent

---

## Appendix: Pages Analyzed

| URL | GEO Issues Found This Pass |
|---|---|
| / | Schema and content solid; not the focus of this pass |
| /compactor-storage.html | Static/JS product mismatch (3 vs 6); single generic Product schema for 6 real variants |
| /industrial-racks.html | Same `productsData`/`openProductModal` pattern confirmed present |
| /storage-lockers.html | Same `productsData`/`openProductModal` pattern confirmed present |
| /filing-cabinets.html | Same `productsData`/`openProductModal` pattern confirmed present |
| /projects.html | `CollectionPage` schema mismatch (fabricated case studies); static/JS case mismatch (5 vs 3); no per-case URLs |
| /about.html | Not re-checked this pass; treat 08-03 findings as current |
| /contact.html | Not re-checked this pass; treat 08-03 findings as current |
| /blog.html | **New page since 08-03.** Full articles JS-modal-only; missing meta robots tag; generic authorship |
| /privacy-policy.html, /terms-of-use.html, /disclaimer.html | Low priority, as expected |

**Scope note:** This pass deliberately re-focused on the JS-modal-content question rather than re-verifying every item from the 08-03 report. Items marked "not re-checked" should be assumed unchanged from the 08-03 findings above, not assumed fixed.

---

*This report continues the audit history in this file (07-27 → three runs on 08-03 → this run). Earlier runs' detailed findings for items not re-verified here (unsourced stats, certification claims, brand fragmentation, Person schema gaps) remain accurate and actionable — see the "Still Open" section above for the carry-forward list.*
