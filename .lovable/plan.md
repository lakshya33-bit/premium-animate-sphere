

# Guides Hub and Guide Detail -- Visual and UI Improvements

A focused plan to enhance the Guides Hub listing page and the Guide Detail reading experience with better content rendering, reading progress, and page-level polish.

---

## 1. Guides Hub -- Gold Gradient Accent and Document Title

**Current state:** The hero section lacks the gold radial gradient accent that other pages (Vouchers, Banking, Perk AI) now have. No document title is set. No BackToTop component.

**Improvements:**
- Add the subtle gold radial gradient behind the hero area for consistency across the site
- Set document title to "Guides Hub | CardPerks"
- Add BackToTop component

---

## 2. Guides Hub -- Category Filter Pill Counts

**Current state:** The category filter pills (Beginners, Strategy, Travel, etc.) show just the category name with no indication of how many guides are in each category.

**Improvements:**
- Add guide counts to each filter pill (e.g., "Beginners (2)", "Strategy (3)")
- This matches the pattern used on the Banking page for bank filter pills

---

## 3. Guides Hub -- Reading Progress Indicator on Cards

**Current state:** All guide cards look the same regardless of length. There's no sense of how substantial each guide is beyond the "X min" read time.

**Improvements:**
- Add a small visual indicator of guide depth -- show number of sections (content blocks) as a subtle "5 sections" label alongside the read time
- Add an estimated word count category: "Quick read" for under 7 min, "Deep dive" for 10+ min, as a small badge

---

## 4. Guides Hub -- Quick View Dialog Animation

**Current state:** The Quick View dialog opens without animation. It shows the first paragraph of content, author info, tags, and a "Read Full Guide" button.

**Improvements:**
- Add entry animation: scale from 0.95 with opacity fade (matching the pattern used on Cards and Vouchers Quick View dialogs)
- Add a table of contents preview -- show the section headings (extracted from ## markers in content) as a compact list so readers can see what the guide covers before clicking through

---

## 5. Guide Detail -- Proper Markdown Rendering

**Current state:** The guide detail page has a custom line-by-line markdown parser that handles ## headings, bold text, bullets, and numbered lists. However, it strips bold markers from inline text (e.g., "**Use the right card**" becomes "Use the right card" without bold), and markdown tables render as raw monospace text instead of proper table formatting.

**Improvements:**
- Replace the custom line-by-line parser with `react-markdown` (already installed for Perk AI) for proper rendering of bold, italic, tables, links, and nested formatting
- Style the markdown output with the same gold-accented prose treatment used in Perk AI (bold text in gold, proper table styling with borders and headers)
- This fixes the current issue where `**bold text**` inside paragraphs is stripped rather than rendered

---

## 6. Guide Detail -- Reading Progress Bar

**Current state:** No indication of how far through the article the reader is. Long guides (12 min SmartBuy hack) have no scroll progress feedback.

**Improvements:**
- Add a thin gold progress bar fixed at the top of the page (below the navbar) that fills as the reader scrolls through the article
- Use a simple scroll percentage calculation based on the article container height

---

## 7. Guide Detail -- Table of Contents Sidebar

**Current state:** Long guides have 4-5 content sections with ## headings, but there's no way to jump between sections or see the article structure at a glance.

**Improvements:**
- Add a sticky table of contents on the left side for desktop (extracted from ## headings in the content)
- Each heading becomes a clickable link that smooth-scrolls to that section
- Highlight the currently visible section as the user scrolls
- On mobile, show the TOC as a collapsible dropdown above the article content

---

## 8. Guide Detail -- Favorite, Share, and Document Title

**Current state:** No favorite button, no share button, no document title set. The header area is plain with just the back link, badges, title, description, meta, and tags.

**Improvements:**
- Add a favorite button using the existing FavoriteButton component and useFavorites hook
- Add a share button that copies the guide URL to clipboard with a sonner toast ("Link copied!")
- Set document title to "[Guide Title] | CardPerks"
- Add BackToTop component
- Add the gold gradient accent behind the header area

---

## 9. Guide Detail -- Related Guides Enhancement

**Current state:** The related guides section at the bottom shows up to 3 cards from the same category. Each card is minimal -- just the title and read time.

**Improvements:**
- Add the guide icon with its category color to each related guide card
- Add the author name and description (truncated to 1 line)
- Add a subtle hover glow effect using the guide's color (matching the hub cards)
- Show a "Next Guide" callout for the next guide in the same category, styled more prominently than the rest

---

## Technical Details

### Files to Modify
- `src/pages/GuidesHub.tsx` -- Gold gradient, document title, BackToTop, category counts, guide depth badge, Quick View animation and TOC preview
- `src/pages/GuideDetail.tsx` -- react-markdown rendering, reading progress bar, table of contents, favorite/share buttons, document title, BackToTop, related guides enhancement

### No New Dependencies Required
`react-markdown` is already installed. All other changes use existing framer-motion, lucide-react, and Tailwind utilities.

### Key Implementation Notes
- **Reading progress bar:** Use a `useEffect` with a scroll event listener to calculate `scrollTop / (scrollHeight - clientHeight)` and drive a fixed-position gold bar width
- **Table of contents extraction:** Parse guide.content arrays for lines starting with `## ` to extract section headings and generate anchor IDs
- **react-markdown in GuideDetail:** Replace the existing `section.split('\n').map(...)` parser with `<ReactMarkdown>` using the same component overrides from PerkAI (gold bold, styled tables)
- **Category counts in hub:** Compute `guides.filter(g => g.category === cat).length` for each category pill

### Implementation Order
1. GuidesHub: gold gradient, document title, BackToTop
2. GuidesHub: category filter pill counts and depth badges
3. GuidesHub: Quick View animation and TOC preview
4. GuideDetail: react-markdown rendering replacement
5. GuideDetail: reading progress bar
6. GuideDetail: table of contents (desktop sidebar + mobile collapsible)
7. GuideDetail: favorite, share, document title, BackToTop
8. GuideDetail: related guides visual enhancement

