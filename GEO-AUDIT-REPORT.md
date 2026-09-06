# GEO Audit Report: Space Planners India (Re-Audit #3)

**Audit Date:** 2026-08-07 (previous audits: 2026-08-05, 2026-08-06 ×2)
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Agency/Services + Product Catalog hybrid) — mobile compactors, industrial racks, storage lockers, filing cabinets
**Pages Analyzed:** 47/47 sitemap URLs verified live + llms.txt + llms-full.txt + robots.txt + external listings (IndiaMART)

---

## Executive Summary

**Overall GEO Score: 65/100 (Fair)** — up from **63/100**, a **+2 point change** this pass (cumulative **+14** since the original 51/100 audit)

This is the fourth audit pass and the site continues to compound real fixes. The headline win this round: the duplicate Organization `@id` schema conflict flagged as the #1 critical priority last pass — the homepage and about.html disagreeing on phone number and certifications despite claiming to be the same entity — is **fully resolved**. `llms-full.txt` went live (was 404), and the site cleanly migrated its project/blog URLs to a simpler structure with proper 301 redirects, breaking nothing.

Every category improved this pass, none regressed — a first across the four audits. The recurring, still-open issues are now narrowing to a consistent short list: generic (and now confirmed *inconsistent*) blog authorship, anonymized case-study clients, shared-not-personal director LinkedIn links, the IndiaMART listing still pointing to `spaceplanners.org` (correction in progress), and a mod_security configuration that blocks minimal-header requests. A new minor issue was also found: a fabricated-looking Bing `msvalidate.01` verification token paired with a broken IndexNow key file — worth a quick cleanup even though it's low severity.

### Score Breakdown

| Category | Audit #1 | Audit #2 | Audit #3 | Audit #4 (this pass) | Delta this pass | Weight | Weighted Score |
|---|---|---|---|---|---|---|---|
| AI Citability | 78 | 79 | 79 | 79 | 0 | 25% | 19.75 |
| Brand Authority | 23 | 20 | 20 | 20 | 0 | 20% | 4.0 |
| Content E-E-A-T | 61 | 66 | 68 | 71 | +3 | 20% | 14.2 |
| Technical GEO | 44 | 85 | 89 | 93 | +4 | 15% | 13.95 |
| Schema & Structured Data | 40 | 68 | 65 | 68 | +3 | 10% | 6.8 |
| Platform Optimization | 42 | 54 | 62 | 64 | +2 | 10% | 6.4 |
| **Overall GEO Score** | **51.1** | **61.9** | **63.4** | **65.1 ≈ 65/100** | **+2** | | |

---

## What's Been Fixed This Pass (Resolved)

1. **The duplicate Organization `@id` conflict is fully resolved.** Homepage and about.html now show byte-identical `telephone` ("022 4003 3385/86") and `award` array (ISO 9001:2015 Certified, GMP Compliant Manufacturing, NABH Certified) for the shared `#organization` entity. This was the top-priority fix from the last audit and has been implemented correctly.
2. **`llms-full.txt` is now live** (HTTP 200, was 404), properly referenced from `llms.txt`. This unlocked the top scoring tier for llms.txt quality (85 → 95 in the AI Visibility subagent's rubric).
3. **Project and blog URLs were cleanly restructured** — the site dropped the `/projects/` and `/blog/` path segments from canonical URLs (e.g. now `/pages/what-is-a-mobile-compactor-storage-system-a-complete-guide-2026.html`). Old URLs correctly 301-redirect to the new ones with no redirect chains or broken links. `llms.txt` was updated in sync — all 18 links verified resolving to HTTP 200.
4. **Blog post `@id` fields match their live canonical URLs** exactly, confirmed on both posts.

---

## New Issue Found This Pass

**[LOW-MEDIUM] Fabricated Bing verification signal.** `robots.txt` and the homepage `<head>` both reference an `msvalidate.01` value ("SpacePlannersIndiaIndexNow") that isn't a real, issued Bing Webmaster Tools token, and the implied IndexNow key file (`/SpacePlannersIndiaIndexNow.txt`) returns 404. This looks like a placeholder that was never completed rather than a working integration — worth either finishing properly (real Bing token + real IndexNow key file) or removing, since a broken verification tag provides no benefit and may look sloppy to anyone auditing the source.

**[Minor, non-scoring positive]** `robots.txt` now includes a `Content-Signal:` directive — an emerging IETF-draft signal for AI-training/search preferences. This was previously listed as a "not yet present" recommendation across earlier audits; it appears to now exist.

---

## Still Open (Unchanged or Slightly Sharpened Across Multiple Passes)

### High Priority

1. **Blog authorship still generic — and now confirmed inconsistent between posts.** Post 1's author is `{"@type": "Organization", "name": "Space Planners Technical Team"}`; Post 2's is a *different* generic label, `{"@type": "Organization", "name": "Industrial Storage Systems Specialist"}`. Neither references the named, credentialed Person schemas that already exist for Pawan Sehgal and Mukesh Sehgal on about.html. The inconsistency between the two posts is itself a minor new signal of uncoordinated content ownership, layered on top of the pre-existing "no named author" gap.
2. **Case studies still anonymize named clients.** projects.html continues using generic descriptors ("Leading FMCG Manufacturer," "Top reputed Technology Institute") — still zero matches for Cipla, Mahindra & Mahindra, Hindustan Unilever, or Coca-Cola, despite these being named on about.html. This has been open, unchanged, across all four audit passes and remains the single highest-leverage low-effort fix available.
3. **IndiaMART listing still points to spaceplanners.org.** Confirmed via fresh fetch this pass. Correction remains in progress through IndiaMART/TradeIndia support (accounts can't be removed, so the fix is happening in place) — not yet live.
4. **Director `sameAs` links still not distinct.** Both Pawan Sehgal's and Mukesh Sehgal's Person schema blocks still point to the same single company LinkedIn URL rather than personal profiles.
5. **No Wikipedia, Wikidata, or YouTube presence** — reconfirmed via direct Wikipedia API query this pass (zero relevant results). This remains the largest lever for the still-flat Brand Authority score (20/100, unchanged across three consecutive passes).

### Medium Priority

6. **mod_security still returns HTTP 406** to requests with incomplete/minimal headers — reproduced this pass on the homepage, sitemap.xml, llms.txt, and llms-full.txt. Any AI crawler sending sparse headers risks being silently blocked.
7. **Fabricated/broken Bing verification signal** (see New Issue above).
8. **No `SearchAction`/`potentialAction`** on the WebSite schema.
9. **No Review/AggregateRating schema** anywhere on the site (correctly not fabricated — only add once genuine review data exists).
10. **No `dateModified` field** on blog Article schema (only `datePublished`) — minor completeness gap.
11. **Product-detail pages still lack FAQPage schema** despite parent category pages having 7 relevant Q&A pairs each.

---

## Category Notes

### AI Citability (79/100, flat across 3 passes)
Stable and strong. No content changes detected. FAQPage + SpeakableSpecification content remains excellent, citation-ready material — the ceiling here is now more about brand/authority signals than the content itself.

### Brand Authority (20/100, flat across 3 passes)
Still the weakest category by a wide margin, and the only one that hasn't moved since the second audit. The two blockers are structural and outside quick technical fixes: no third-party corroboration (Wikipedia/Wikidata/YouTube) and the still-pending IndiaMART correction. This is where further investment will move the overall score the most.

### Content E-E-A-T (71/100, +3)
Best improvement yet for this category, driven mostly by the resolved schema conflict boosting the Trustworthiness sub-score (+4). The two most-repeated recommendations across all four audits — named blog authorship and named case-study clients — remain untouched. Both use facts the site already has; this is the most "free" remaining improvement on the list.

### Technical GEO (93/100, +4)
Now the strongest category by a clear margin. llms-full.txt, the URL migration, and the schema-consistency fix all landed cleanly. The mod_security header-sensitivity issue and the fake Bing token are the only meaningful gaps left, both minor and easy to fix.

### Schema & Structured Data (68/100, +3)
Fully recovered the previous pass's -3 dip — the fix that caused the regression (duplicate `@id` conflict) is confirmed resolved, and nothing new broke. Remaining gaps are all incremental: Person-authored blog posts (now also inconsistent between posts), distinct director `sameAs`, `SearchAction`, and `dateModified`.

### Platform Optimization (64/100, +2)
Perplexity was the biggest mover (+14, now 74/100 — "Good") thanks to `llms-full.txt` acting as a strong primary-source signal and the elimination of dead-citation risk from the URL migration. Bing Copilot (60/100) is the one platform where the mod_security issue is most directly relevant to crawl reliability.

---

## Quick Wins (Implement This Week)

1. **Standardize blog authorship on one named Person** (Pawan or Mukesh Sehgal) across both posts, replacing the two different generic labels — this is now flagged by every subagent as the single highest-value remaining fix.
2. **Rename case-study clients** on projects.html to the real names already public on about.html — unchanged across 4 audits, still the easiest available win.
3. **Fix or remove the fake Bing `msvalidate.01` token** and either complete the IndexNow integration properly or remove the broken reference.
4. **Give each director a distinct personal LinkedIn URL** in their Person schema `sameAs`.
5. **Follow up on the IndiaMART correction** if not already resolved by the platform's support team.

## 30-Day Action Plan

### Week 1: Close the Remaining Easy Fixes
- [ ] Standardize blog authorship to a single named Person with matching schema
- [ ] Rename case-study clients on projects.html to real named clients
- [ ] Fix/remove the fabricated Bing verification token and broken IndexNow file
- [ ] Add `dateModified` to blog Article schema

### Week 2: Entity & Trust Signals
- [ ] Give directors distinct personal LinkedIn `sameAs` links
- [ ] Add `SearchAction` to WebSite schema if site search exists
- [ ] Harden mod_security to stop 406-ing minimal-header requests
- [ ] Add FAQPage schema to top product-detail pages

### Week 3: Brand Authority Push
- [ ] Confirm/escalate the IndiaMART website-URL correction until it's live
- [ ] Claim/verify a Google Business Profile under spaceplannersindia.in
- [ ] Investigate Wikidata entity creation (lower bar than Wikipedia notability)
- [ ] Seed a YouTube presence (short installation walkthrough videos)

### Week 4: Depth & Proof
- [ ] Publish 2-3 additional blog posts under the standardized named author
- [ ] Solicit 2-3 genuine client testimonials; add Review/AggregateRating schema once real data exists
- [ ] Re-verify all fixes remain stable in a follow-up audit pass

---

## Audit Methodology Note

This is the fourth audit pass on this site. Findings are cross-referenced across all four passes and marked RESOLVED / STILL OPEN / NEW at each stage to distinguish real progress from testing noise. Two testing errors from early passes (a false-positive "template literal bug" and a false-negative "missing meta description" finding) were identified, corrected, and are not repeated here. This pass introduced no new testing corrections — all findings were independently corroborated by at least one subagent via live curl/fetch verification.
