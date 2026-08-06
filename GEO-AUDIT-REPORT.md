# GEO Audit Report: Space Planners India (Re-Audit)

**Audit Date:** 2026-08-06 (previous audit: 2026-08-05)
**URL:** https://spaceplannersindia.in/
**Business Type:** B2B Industrial Manufacturer (Agency/Services + Product Catalog hybrid) — mobile compactors, industrial racks, storage lockers, filing cabinets
**Pages Analyzed:** 47/47 sitemap URLs verified live (100% resolve) + llms.txt + robots.txt

---

## Executive Summary

**Overall GEO Score: 62/100 (Fair)** — up from **51/100 (Poor)**, a **+11 point improvement**

Space Planners India shipped a substantial round of GEO fixes since the last audit: the sitemap went from 70% broken to 100% working, the site gained proper Organization/LocalBusiness entity schema with `sameAs` links, and image accessibility improved. Technical infrastructure and Schema markup — the two weakest categories last time — saw the largest gains. The remaining gaps are now concentrated in **Brand Authority** (still the weakest category by far) and a handful of easy, low-effort content-consistency fixes (named blog authorship, named case-study clients) that the business has the underlying facts for but hasn't applied yet.

Two corrections from the audit process itself, disclosed for transparency:
1. The previous audit's "critical `${data.title}` template-literal bug" was a **misdiagnosis** — it's valid, properly-escaped JavaScript inside `<script>` tags for interactive modals, never rendered as visible text. It has been removed from this report's findings entirely.
2. This audit initially mis-flagged meta descriptions as "missing" site-wide due to a regex testing error (the tag is written across two lines in the site's HTML, e.g. `<meta name="description"\n    content="...">`, which a naive single-line pattern misses). Direct verification confirms **every page checked has a real, unique, well-written meta description.** This was never actually broken — it was a false negative in testing, not a real gap in either audit.

### Score Breakdown

| Category | Previous | New | Delta | Weight | Weighted Score |
|---|---|---|---|---|---|
| AI Citability | 78/100 | 79/100 | +1 | 25% | 19.75 |
| Brand Authority | 23/100 | 20/100 | -3 | 20% | 4.0 |
| Content E-E-A-T | 61/100 | 66/100 | +5 | 20% | 13.2 |
| Technical GEO | 44/100 | 85/100 | **+41** | 15% | 12.75 |
| Schema & Structured Data | 40/100 | 68/100 | **+28** | 10% | 6.8 |
| Platform Optimization | 42/100 | 54/100 | +12 | 10% | 5.4 |
| **Overall GEO Score** | **51.1** | **61.9 ≈ 62/100** | **+11** | | |

---

## What's Been Fixed (Resolved Since Last Audit)

1. **Sitemap fully repaired.** All 47/47 URLs in sitemap.xml now return HTTP 200 (previously 33 returned 404 due to a missing `/pages/` path prefix). Verified individually against every URL.
2. **Homepage and contact.html now carry proper Organization + LocalBusiness schema**, combined as `"@type": ["Organization", "LocalBusiness"]` with a shared `@id` anchor (`https://spaceplannersindia.in/#organization`), full NAP, logo, `foundingDate: "2004"`, `priceRange: "₹₹₹"`, and a `WebSite` schema block whose `publisher` correctly references the Organization by `@id`.
3. **`sameAs` entity links added** — Organization schema now links to a LinkedIn company page (linkedin.com/company/spaceplannersindia) and Instagram (instagram.com/spaceplanners.india). This was completely absent before.
4. **Image alt text added** on about.html (logo, association badges) — previously all images had no alt attributes.
5. **Deprecated HowTo/HowToStep schema removed** from the homepage (Google stopped supporting HowTo rich results in Sep 2023 — correctly cleaned up).
6. **robots.txt now documents intent** — the GPTBot block is now accompanied by an explanatory comment confirming it's a deliberate choice (block training scrape, allow live retrieval via OAI-SearchBot/ChatGPT-User), resolving the prior ambiguity.
7. **Meta descriptions confirmed present site-wide** (see correction note above) — every page checked (homepage, about, contact, all 4 category pages, projects, blog) has a unique, well-written description tag.

---

## Still Open Issues

### High Priority

1. **llms.txt has 7 broken internal links.** All 5 `/projects/*` case-study links and both `/blog/*` post links inside `llms.txt` are missing the `/pages/` prefix (e.g. it links to `https://spaceplannersindia.in/projects/heavy-duty-compactor-storage-for-a-leading-fmcg-manufacturer.html`, which 404s — the working URL is `/pages/projects/...`). This is the exact same bug class that broke the sitemap, now found in the one file built specifically for AI agents to discover content. Ironic and high-value to fix given llms.txt's outsized importance for AI citation.
2. **Brand entity confusion persists.** `spaceplanners.org` remains active with the same Malad West, Mumbai address and 2004 founding claim, and the IndiaMART listing (`m.indiamart.com/space-planners/profile.html`) still links to that competing domain, not spaceplannersindia.in. This actively risks AI systems conflating the two businesses' reviews, certifications, and history.
3. **No Wikipedia, Wikidata, YouTube, or verified Google Business Profile presence** — confirmed absent via direct search. This remains the single largest lever for Brand Authority, the weakest-scoring category.
4. **Blog authorship still generic.** Both blog posts are attributed to "Space Planners Technical Team" (an Organization-style byline), not a named individual — despite named, credentialed directors (Pawan Sehgal, Mukesh Sehgal) already existing in Person schema on about.html. The Article/BlogPosting `author` field is still `{"@type": "Organization"}`.
5. **Case studies still anonymize named clients.** projects.html continues to describe clients generically ("Leading FMCG Manufacturer," "Top reputed Technology Institute") even though about.html names real clients (Cipla, Mahindra & Mahindra, Hindustan Unilever, Coca-Cola) elsewhere on the same site.

### Medium Priority

6. **Director `sameAs` links are not substantive.** Both Pawan Sehgal's and Mukesh Sehgal's Person schema blocks now have a `sameAs` array, but both point to the *same* company LinkedIn URL rather than distinct personal profiles — this adds schema completeness but doesn't meaningfully improve individual expert verification.
7. **mod_security still returns HTTP 406** to requests with incomplete/spoofed-looking browser headers, though re-testing shows the pattern is narrower than first understood — it targets specifically browser-mimicking User-Agents with incomplete `Accept` headers, while minimal/no-UA requests and known-bot UAs generally pass. Still worth hardening for robustness.
8. **about.html has a visible FAQ section with no FAQPage schema**, while every product category page has one — inconsistent.
9. **Homepage/contact.html schema richness mismatch** — contact.html's LocalBusiness has a detailed `areaServed` array (7 cities + Country), while the homepage's equivalent block only has the ContactPoint-level `"areaServed": "IN"` — the two pages' structured data don't fully match.
10. **Blog post `datePublished` is not ISO 8601** — written as `"August 03, 2026"` instead of `"2026-08-03"`, a minor schema validation issue.
11. **No Review/AggregateRating schema anywhere** despite real named clients existing on the site. (Do not fabricate — only add once genuine review data exists.)
12. **Product-detail pages remain thin** (~116 words) with no FAQPage schema, despite their parent category pages having 7 relevant Q&A pairs each.

### Low Priority

13. No `SearchAction`/`potentialAction` on the WebSite schema (sitelinks search box opportunity, if site search exists).
14. No `Content-Signal:` directive in robots.txt (an emerging, not-yet-standard AI-crawler signal — optional).
15. No `msvalidate.01` or IndexNow verification signal detected for Bing.
16. Blog breadth still thin (2 posts total).

---

## Category Notes

### AI Citability (79/100, +1)
Essentially unchanged and already strong — FAQPage + SpeakableSpecification schema on the homepage and all 4 category pages remains excellent, citation-ready content. The llms.txt broken-link issue (see High Priority #1) is the main new drag on this category's discoverability, even though the content itself is well-formed.

### Brand Authority (20/100, -3)
Still the weakest category, and the score moved slightly negative on closer, fresher investigation. LinkedIn and Instagram links are a genuine (if modest) improvement, but they don't offset the continued absence of Wikipedia/Wikidata/YouTube presence and the confirmed, still-unresolved brand confusion with `spaceplanners.org` on IndiaMART. This is where further investment will move the overall score the most.

### Content E-E-A-T (66/100, +5)
Real progress from alt text and the Organization/Person schema infrastructure, but the two most-flagged issues from the original audit — generic blog authorship and anonymized case studies — are both still open. Both are low-effort fixes given the underlying facts (named directors, named clients) already exist elsewhere on the site.

### Technical GEO (85/100, +41)
The single biggest turnaround. The sitemap catastrophe that anchored the original 44/100 score is fully resolved, meta descriptions were confirmed present (correcting a testing error from both audits), and entity schema is now properly anchored. The remaining gap is the mod_security header-sensitivity issue and the llms.txt broken links.

### Schema & Structured Data (68/100, +28)
Major improvement — Organization + LocalBusiness + WebSite entity consolidation via shared `@id` is now correctly implemented, and the deprecated HowTo schema was cleaned up. Remaining gaps are all incremental: Person-authored blog posts, FAQPage on about.html, ISO date formatting, and richer `sameAs` coverage.

### Platform Optimization (54/100, +12)
Solid gains across the board, particularly for ChatGPT (crawler access confirmed clean, entity schema improved) and Bing Copilot (sitemap now fully valid). Google Gemini remains the weakest individual platform (40/100) due to no detected YouTube/Google Business Profile/Scholar presence — consistent with the broader Brand Authority gap.

---

## Quick Wins (Implement This Week)

1. **Fix llms.txt's 7 broken links** — add the missing `/pages/` prefix to all `/projects/*` and `/blog/*` entries. Same five-minute fix class as the sitemap, now overdue in the file AI agents specifically rely on.
2. **Update the IndiaMART listing** (and any other directory listings) to point to spaceplannersindia.in instead of spaceplanners.org, to start resolving brand entity confusion.
3. **Add named authorship to both blog posts** — attribute to Pawan Sehgal or Mukesh Sehgal (whoever is appropriate) with a Person schema `author` field, replacing the current Organization-only byline.
4. **Rename case-study clients** on projects.html to match the real names already disclosed on about.html (Cipla, Mahindra & Mahindra, HUL, Coca-Cola).
5. **Give each director a distinct personal LinkedIn URL** in their Person schema `sameAs`, instead of both pointing to the shared company page.

## 30-Day Action Plan

### Week 1: Close the Remaining Technical Gaps
- [ ] Fix llms.txt broken links (`/pages/` prefix)
- [ ] Fix blog `datePublished` to ISO 8601 format
- [ ] Harden mod_security rules to stop 406-ing incomplete-but-legitimate headers
- [ ] Sync homepage LocalBusiness `areaServed` with contact.html's fuller city list

### Week 2: Content Attribution & Consistency
- [ ] Add named Person authorship + schema to both blog posts
- [ ] Replace generic case-study client descriptors with real named clients
- [ ] Add FAQPage schema to about.html's existing FAQ section
- [ ] Give directors distinct personal LinkedIn `sameAs` links

### Week 3: Brand Authority Push
- [ ] Correct the IndiaMART listing (and audit other directories) to point to spaceplannersindia.in
- [ ] Claim/verify a Google Business Profile
- [ ] Investigate Wikipedia notability / pursue industry press citations
- [ ] Explore a YouTube presence (even a small install/demo video library)

### Week 4: Depth & Trust Signals
- [ ] Publish 2-3 additional blog posts under named authors
- [ ] Solicit 2-3 genuine client testimonials; add AggregateRating schema once real data exists
- [ ] Add FAQPage schema to top product-detail pages
- [ ] Add `SearchAction` to WebSite schema if site search exists

---

## Audit Methodology Note

This re-audit used live `curl` verification with realistic browser headers against the production site, cross-checked against 5 specialized subagent analyses (AI Visibility, Platform Optimization, Technical GEO, Content E-E-A-T, Schema & Structured Data). Two testing errors were caught and corrected during compilation: a false-positive "template literal bug" from the original audit, and a false-negative "missing meta description" finding that recurred in this audit's own initial testing due to a regex limitation (multi-line meta tags). Where subagent findings conflicted with direct verification, direct verification took precedence.
