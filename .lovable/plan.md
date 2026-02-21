

# Compare Cards Page -- Visual and UI Improvements

A focused plan to elevate the card comparison experience with better visual hierarchy, a proper sticky header, winner highlights, and missing page-level polish.

---

## 1. Hero Area -- Gold Gradient, Document Title, BackToTop

**Current state:** The hero is plain with no gold radial gradient accent (other pages now have this). No document title is set. No BackToTop component.

**Improvements:**
- Add the gold radial gradient accent behind the hero for site-wide consistency
- Set document title to "Compare Cards | CardPerks"
- Add BackToTop component

---

## 2. Selected Card Slots -- Color Accent and Hover Polish

**Current state:** All selected card slots look identical -- plain glass-card with no visual link to the card's brand color. The cards just sit flat with no interactivity feedback.

**Improvements:**
- Add a 2px top border using the card's brand color on each selected slot (matching the Banking tier card pattern)
- Add a subtle hover lift effect (translateY -2px) on the selected card slots
- Add a subtle glow using the card's color behind the card image for visual richness

---

## 3. Selected Card Slots -- Sticky on Scroll

**Current state:** When the user scrolls down to see comparison rows, the selected card headers scroll away. There's no reference for which column belongs to which card -- you have to scroll back up.

**Improvements:**
- Make the selected card row sticky at the top (below navbar) when the user scrolls past it, so card names and images remain visible while browsing comparison fields
- Use a compact sticky version: just the card image, name, and remove button in a smaller bar
- Add a subtle blur backdrop for the sticky bar

---

## 4. Comparison Rows -- Winner Highlighting

**Current state:** All comparison field values look the same across cards. There's no visual signal for which card is "better" in a given field. Users have to mentally compare every row.

**Improvements:**
- For numeric/comparable fields (Annual Fee, Reward Value, Rating, Forex Markup), detect and highlight the best value with a subtle gold ring or badge
- For "Annual Fee" and "Forex Markup": lowest is best (highlight with a small "Lowest" pill)
- For "Reward Value" and "Rating": highest is best (highlight with a small "Best" pill)
- Keep the highlight subtle -- a gold border or tiny pill, not overwhelming

---

## 5. Comparison Rows -- Grouped Sections with Dividers

**Current state:** All 11 standard fields and 5 list-based fields are stacked in one continuous flat list. There's no visual grouping, making it hard to scan for specific categories (fees vs. rewards vs. travel).

**Improvements:**
- Group the comparison fields into logical sections with a section heading divider:
  - "Basics" -- Annual Fee, Network, Card Type, Issuer
  - "Income and Rewards" -- Min Income, Reward Rate, Reward Value, Welcome Bonus
  - "Travel and Forex" -- Lounge Access, Fuel Surcharge, Forex Markup
  - "Perks and Benefits" -- Key Perks, Milestones, Insurance, Best For, Vouchers
- Add a thin divider line and section label between groups

---

## 6. Empty State -- Popular Comparison Suggestions

**Current state:** When fewer than 2 cards are selected, the empty state just shows a credit card icon and text "Select at least 2 cards to compare." It's functional but misses an opportunity to guide users.

**Improvements:**
- Add 2-3 "Popular Comparisons" quick-start buttons below the empty state text
- Each button pre-selects a commonly compared pair (e.g., "HSBC Premier vs ICICI Emeralde", "Axis Neo vs ICICI MakeMyTrip")
- Clicking one auto-adds both cards to the comparison
- Style as glass-card chips with both card images side-by-side

---

## 7. Share Comparison Button

**Current state:** No way to share or bookmark a comparison. The URL does support `?cards=id1,id2` via searchParams, but the URL is not updated as cards are added/removed.

**Improvements:**
- Sync the URL search params as cards are added/removed (using `setSearchParams`)
- Add a "Share Comparison" button next to the hero that copies the current URL with card IDs to clipboard
- Show a sonner toast "Link copied!" on click
- Only show the button when 2+ cards are selected

---

## 8. Card Selector Dropdown -- Visual Improvement

**Current state:** The dropdown is functional but plain. Card images are tiny (40x26px). No card type or rating info shown.

**Improvements:**
- Increase the card image size slightly (48x30px) and add the card's brand color as a subtle left border accent on each row
- Show the card rating as a small star + number after the fee
- Add a subtle separator between cards from different issuers for easier scanning

---

## Technical Details

### Files to Modify
- `src/pages/CompareCards.tsx` -- All improvements (hero polish, sticky header, winner highlighting, grouped sections, empty state suggestions, share button, card selector enhancement, document title, BackToTop)

### No New Dependencies Required
All changes use existing framer-motion, lucide-react, sonner, react-router-dom, and Tailwind utilities.

### Key Implementation Notes
- **Sticky header:** Use a `useEffect` with an IntersectionObserver on the card selection grid. When it scrolls out of view, render a compact fixed bar with selected card thumbnails. Use `position: sticky; top: 80px` on a wrapper
- **Winner highlighting:** Parse fee strings by extracting the numeric value (e.g., "₹3,500" becomes 3500). For reward value, parse "2% value" to get the percentage. Compare across selected cards and mark the best
- **URL sync:** Call `setSearchParams({ cards: selected.map(c => c.id).join(",") })` inside a `useEffect` watching the `selected` array
- **Popular comparisons:** Hardcode 2-3 pairs like `[["hsbc-premier", "icici-emeralde-private"], ["axis-neo", "icici-makemytrip"]]`

### Implementation Order
1. Document title, gold gradient, BackToTop
2. Selected card slot color accents and hover lift
3. Comparison rows grouped into sections with dividers
4. Winner highlighting on comparable fields
5. Sticky selected card header
6. URL sync and share comparison button
7. Empty state popular comparison suggestions
8. Card selector dropdown visual improvement

