

# Favorites Page -- Visual and UI Improvements

A focused plan to polish the Favorites page with missing page-level consistency, better interactivity, and a richer empty/populated experience.

---

## 1. Gold Gradient Accent, Document Title, and BackToTop

**Current state:** No gold radial gradient behind the hero (other pages now have this). No document title is set. No BackToTop component.

**Improvements:**
- Add the subtle gold radial gradient accent behind the hero for site-wide consistency
- Set document title to "My Favorites | CardPerks"
- Add BackToTop component at the bottom

---

## 2. Category Breakdown Stats Row

**Current state:** The hero shows a single "Items Saved" counter on the right. When the user has items across multiple categories, there's no at-a-glance breakdown without reading the filter pills.

**Improvements:**
- Replace the single counter with a compact stats row (similar to the Guides Hub stats pattern) showing counts per category with icons: "3 Cards, 2 Vouchers, 1 Guide, 1 Banking"
- Only show categories that have favorites (skip zero-count categories)
- Keep the total count as the primary large number, with per-category counts as secondary

---

## 3. Remove Animation on Unfavorite

**Current state:** Clicking the heart button on a favorited item instantly removes it from the list with no exit animation. Items just disappear and the grid snaps.

**Improvements:**
- Wrap each card item in an `AnimatePresence` with a fade + scale-down exit animation so removed items animate out gracefully
- Use `layout` prop on the grid items so remaining cards smoothly reposition after removal

---

## 4. Empty State per Category

**Current state:** When filtering by a specific category (e.g., "Guides") and there are no favorites in that category, nothing appears -- just blank space below the filter pills. The global empty state only shows when ALL categories are empty.

**Improvements:**
- Add a per-category empty state when filtering to a specific tab with zero items: show the category icon, a message like "No favorite guides yet", and a CTA button to browse that category
- Keep the global animated empty state for when totalCount is 0

---

## 5. Card Section -- Quick Compare CTA

**Current state:** Each card has a small compare icon button, but there's no way to quickly compare all favorited cards at once.

**Improvements:**
- When 2+ cards are favorited, show a prominent "Compare All Favorites" button in the Cards section header that links to `/compare?cards=id1,id2,...` with all favorited card IDs pre-filled
- This leverages the URL sync we just built in Compare Cards

---

## 6. Voucher Cards -- Show Supported Card Brands

**Current state:** Voucher cards show the icon, name, category, discount, best rate, and a "View Details" link. They don't show which credit cards support the voucher, which is a key piece of information.

**Improvements:**
- Add a row of small card brand pills (top 2-3 from `v.cards`) below the discount badge, truncated with a "+N more" indicator if there are many
- This helps users quickly see if their cards are eligible

---

## 7. Guide Cards -- Add Description Preview

**Current state:** Guide cards show icon, category, title, read time, and a link. No description is shown, making it hard to remember why a guide was saved.

**Improvements:**
- Add a 1-line truncated description below the title (`guide.description` with `line-clamp-1`)
- Add the author name as a subtle metadata line

---

## 8. Banking Tier Cards -- Show Min Balance

**Current state:** Banking tier cards show the tier name, bank name, RM badge, and eligible cards. They don't show the minimum balance requirement, which is a key differentiator.

**Improvements:**
- Add the minimum balance (e.g., "Min Balance: 10L") as a metadata line below the tier name
- Show 2-3 key perks from the tier's perks list as compact pills

---

## Technical Details

### Files to Modify
- `src/pages/Favorites.tsx` -- All improvements (gold gradient, document title, BackToTop, stats row, exit animations, per-category empty state, compare CTA, voucher card brands, guide descriptions, banking balance)

### No New Dependencies Required
All changes use existing framer-motion, lucide-react, react-router-dom, and Tailwind utilities.

### Key Implementation Notes
- **Exit animations:** Wrap each section's `.map()` output in `<AnimatePresence>` and add `exit={{ opacity: 0, scale: 0.95 }}` and `layout` to each `motion.div` card. Use the item ID as a stable `key`
- **Compare All link:** Build the URL with `favCards.map(c => c.id).join(",")` and link to `/compare?cards=...`
- **Per-category empty state:** After each section's conditional render, add an else-if for when the filter matches but the array is empty
- **Voucher card brands:** Access `v.cards` (array of card names that support this voucher) and show the first 2-3

### Implementation Order
1. Document title, gold gradient, BackToTop
2. Category breakdown stats row
3. Exit animations with AnimatePresence and layout
4. Per-category empty states
5. Cards section compare all CTA
6. Voucher cards supported brands
7. Guide cards description and author
8. Banking tier cards min balance and perks

