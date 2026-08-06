# GEO Audit Report: Space Planners India (Re-Audit #2)

**Audit Date:** 2026-08-06 (previous audits: 2026-08-05, 2026-08-06 earlier same day)
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Agency/Services + Product Catalog hybrid) — mobile compactors, industrial racks, storage lockers, filing cabinets
**Pages Analyzed:** 47/47 sitemap URLs verified live (100% resolve) + llms.txt + robots.txt + external listings (IndiaMART)

---

## Executive Summary

**Overall GEO Score: 63/100 (Fair)** — up marginally from **62/100**, a **+1 point change** this pass (cumulative +12 since the original 51/100 audit)

This pass shows the site continuing to ship real fixes — llms.txt's broken links are now corrected, `about.html` gained FAQPage schema, homepage `areaServed` now matches contact.html, and an `award` credential field (ISO 9001:2015, GMP, NABH) was added. But the net score barely moved because those gains were offset by a **newly discovered schema defect**: the homepage and about.html both declare the same Organization `@id` (meaning AI systems should treat them as one entity) but disagree on basic facts — different phone numbers and inconsistent `award` data between the two copies. Two independent subagents flagged this as the top remaining priority.

The recurring, still-unfixed issues from every pass so far — generic blog authorship, anonymized case-study clients, and the IndiaMART listing pointing to `spaceplanners.org` — remain the highest-leverage opportunities. The IndiaMART issue is understood to be in progress: the business cannot remove the IndiaMART/TradeIndia accounts (they need to keep them) but is working through those platforms' support channels to correct the listed website URL in place. Notably, the company's own LinkedIn page already correctly lists spaceplannersindia.in, which is a positive counter-signal while the IndiaMART fix is pending.

### Score Breakdown

| Category | Audit #1 | Audit #2 | Audit #3 (this pass) | Delta this pass | Weight | Weighted Score |
|---|---|---|---|---|---|---|
| AI Citability | 78 | 79 | 79 | 0 | 25% | 19.75 |
| Brand Authority | 23 | 20 | 20 | 0 | 20% | 4.0 |
| Content E-E-A-T | 61 | 66 | 68 | +2 | 20% | 13.6 |
| Technical GEO | 44 | 85 | 89 | +4 | 15% | 13.35 |
| Schema & Structured Data | 40 | 68 | 65 | **-3** | 10% | 6.5 |
| Platform Optimization | 42 | 54 | 62 | +8 | 10% | 6.2 |
| **Overall GEO Score** | **51.1** | **61.9** | **63.4 ≈ 63/100** | **+1** | | |

---

## What's Been Fixed This Pass (Resolved)

1. **llms.txt's 7 broken links are fixed.** All `/projects/*` and `/blog/*` entries now correctly include the `/pages/` prefix — verified all 18 links in the file resolve to HTTP 200. This lifted the llms.txt quality sub-score from 70 to 85/100.
2. **about.html now has FAQPage schema** properly marking up its existing 4-question FAQ section (previously visible but unmarked).
3. **Homepage `areaServed` now matches contact.html's full breakdown** (Mumbai, Delhi NCR, Bangalore, Pune, Chennai, Hyderabad, Ahmedabad, India) — previously just the bare country code "IN".
4. **Organization schema gained an `award` field** (ISO 9001:2015 Certified, GMP Compliant Manufacturing, NABH Certified) — though see the new inconsistency issue below.
5. **Blog post `datePublished` confirmed valid ISO 8601** (`"2026-08-02"`) in the actual schema data — an earlier pass's concern about non-ISO dates was based on visible byline text, not the schema itself, and does not need fixing.

---

## New Issue Found This Pass

**[CRITICAL] Duplicate Organization/LocalBusiness `@id` blocks disagree with each other.** The homepage and about.html both declare `"@id": "https://spaceplannersindia.in/#organization"` — meaning schema.org treats them as the *same* entity — but the two blocks contain conflicting data:
- **Phone number:** homepage shows `+91-9987733903`, about.html shows `022 4003 3385/86`
- **Award data:** about.html's copy includes the new `award` array (ISO 9001:2015, GMP, NABH); the homepage's copy of the same `@id` entity does not

This is a real validation defect — when two JSON-LD blocks share an `@id`, they should be identical or complementary, not contradictory. AI systems and structured-data validators may resolve this unpredictably (picking one, merging incorrectly, or discarding both). This is likely why the Schema category score dropped slightly (68 → 65) even though two genuine improvements landed this pass — the inconsistency is a fresh defect discovered on closer inspection, not a regression in existing functionality.

**Fix:** Sync both blocks to contain identical data — same phone number, same `award` array — for the shared `@id`.

---

## Still Open (Unchanged Across All 3 Audit Passes)

### High Priority

1. **Blog authorship still generic.** Both blog posts attribute authorship to an Organization-style byline (one post: "Space Planners Technical Team"; the other, per this pass's finding, a *different* generic label: "Industrial Storage Systems Specialist" — itself a new inconsistency) rather than a named Person, despite named credentialed directors (Pawan Sehgal, Mukesh Sehgal) already existing in Person schema on about.html.
2. **Case studies still anonymize named clients.** projects.html continues using generic descriptors ("Leading FMCG Manufacturer," "Top reputed Technology Institute") — confirmed zero matches for Cipla, Mahindra & Mahindra, Hindustan Unilever, or Coca-Cola anywhere on the live page, even though these real clients are named on about.html.
3. **IndiaMART listing still points to spaceplanners.org.** Confirmed via fresh fetch this pass. This remains the single largest Brand Authority risk — a crawler cross-referencing sources will see conflicting website URLs for the same business name/address/founding year. **Status: in progress** — the business is pursuing a correction through IndiaMART/TradeIndia support since the accounts themselves can't be removed. Not yet resolved as of this audit.
4. **Director `sameAs` links still not distinct.** Both Pawan Sehgal's and Mukesh Sehgal's Person schema blocks still point to the same single company LinkedIn URL rather than personal profiles.
5. **No Wikipedia, Wikidata, or YouTube presence** — re-confirmed via direct API/search checks this pass. This remains the biggest lever for the still-weak Brand Authority score (20/100, flat).

### Medium Priority

6. **mod_security still returns HTTP 406** to requests with incomplete/spoofed-browser-looking headers — unchanged across all three passes.
7. **No `SearchAction`/`potentialAction`** on the WebSite schema.
8. **Product-detail pages still lack FAQPage schema** despite their parent category pages having 7 relevant Q&A pairs each.
9. **No Review/AggregateRating schema** anywhere on the site (correctly not fabricated — only add once genuine review data exists).
10. **No `Content-Signal:` directive or msvalidate.01/IndexNow** signals in robots.txt/head.
11. **No `/llms-full.txt`** — publishing one would unlock the top band of the llms.txt quality score.

---

## Category Notes

### AI Citability (79/100, flat)
No content changes detected this pass; score holds at the same strong level as before. FAQPage + SpeakableSpecification content remains excellent, citation-ready material.

### Brand Authority (20/100, flat)
Still the weakest category, and still anchored by the same two unresolved issues: no third-party corroboration (Wikipedia/Wikidata/YouTube) and the IndiaMART listing conflict. One genuine positive found this pass: the company's own LinkedIn page (728 followers, active) already correctly lists spaceplannersindia.in — a small but real counter-signal while the IndiaMART correction is pending.

### Content E-E-A-T (68/100, +2)
Modest gain from the `award` field and about.html's new FAQPage schema. The two highest-leverage fixes — named blog authorship and named case-study clients — remain untouched for a third consecutive audit pass despite being low-effort given the underlying facts already exist on the site.

### Technical GEO (89/100, +4)
Continues to be the site's strongest category. llms.txt links fixed, FAQPage and areaServed additions landed cleanly. The mod_security header-sensitivity issue is the only meaningful technical gap left.

### Schema & Structured Data (65/100, -3)
The only category to regress this pass — not because anything broke, but because closer inspection surfaced the duplicate-`@id`-with-conflicting-data issue (see New Issue above) and a second author-label inconsistency between the two blog posts. Both are fixable in under an hour.

### Platform Optimization (62/100, +8)
Broad gains across the board. Bing Copilot readiness is now "Good" (74/100) — B2B/enterprise content tone and the new award/certification schema suit procurement-style queries well. Perplexity remains the weakest individual platform (47/100), still held back by the IndiaMART entity conflict and lack of third-party community validation.

---

## Quick Wins (Implement This Week)

1. **Sync the two Organization `@id` blocks** (homepage vs. about.html) — same phone number, same `award` array. This is the single highest-priority fix from this pass; it's a data-consistency bug, not new work.
2. **Standardize blog post authorship** to one consistent named Person (Pawan or Mukesh Sehgal) across both posts — currently each post uses a *different* generic label, compounding the existing "no named author" issue with an internal inconsistency.
3. **Rename case-study clients** on projects.html to the real names already public on about.html.
4. **Escalate the IndiaMART correction** if not already actioned — this is confirmed the single largest remaining Brand Authority risk on the account.
5. **Give each director a distinct personal LinkedIn URL** in their Person schema `sameAs`.

## 30-Day Action Plan

### Week 1: Fix the New Regression + Close Technical Gaps
- [ ] Reconcile homepage and about.html Organization `@id` blocks (phone number, award array)
- [ ] Standardize blog author labeling across both posts
- [ ] Harden mod_security to stop 406-ing legitimate-but-minimal-header requests
- [ ] Publish `/llms-full.txt`

### Week 2: Content Attribution & Consistency
- [ ] Add named Person authorship + schema to both blog posts, referencing existing director `@id`s
- [ ] Replace generic case-study client descriptors with real named clients
- [ ] Add FAQPage schema to top product-detail pages
- [ ] Give directors distinct personal LinkedIn `sameAs` links

### Week 3: Brand Authority Push
- [ ] Follow up on the IndiaMART/TradeIndia website-URL correction until it's confirmed live
- [ ] Claim/verify a Google Business Profile under spaceplannersindia.in
- [ ] Investigate Wikipedia notability / pursue industry press citations
- [ ] Seed a YouTube presence (even short installation walkthrough videos)

### Week 4: Depth & Trust Signals
- [ ] Publish 2-3 additional blog posts under named authors
- [ ] Solicit 2-3 genuine client testimonials; add AggregateRating schema once real data exists
- [ ] Add `SearchAction` to WebSite schema if site search exists
- [ ] Add `Content-Signal:` directive to robots.txt

---

## Audit Methodology Note

This is the third audit pass on this site. Findings are cross-referenced across all three passes and marked RESOLVED / STILL OPEN / NEW at each stage to track real progress vs. testing noise. Two testing errors from earlier passes were identified and corrected: a false-positive "template literal bug" (valid JavaScript, not a defect) and a false-negative "missing meta description" finding (a regex limitation on multi-line meta tags, not a real gap) — both corrected in Re-Audit #1 and not repeated here. This pass's own new finding (duplicate `@id` schema inconsistency) was independently confirmed by two separate subagents (Technical GEO and Schema) before being included, and is treated as a genuine site defect, not a testing artifact.
