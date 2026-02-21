

# Banking Page -- Visual and UI Improvements

A focused plan to enhance the Banking page with better visual progression, richer tier comparisons, and missing page-level polish.

---

## 1. Hero Area -- Tighten Spacing and Add Context

**Current state:** The hero section has a large animated Landmark icon (96px), title, subtitle, and lots of vertical spacing. The icon + pulse animation is visually heavy, and the gap between the hero and the section toggle is too large (~64px). The page lacks a document title and BackToTop component.

**Improvements:**
- Reduce the hero icon size from 96px to 72px and tighten the spacing below it (mb-8 to mb-6)
- Reduce spacing between hero and section toggle (mb-16 to mb-10)
- Reduce spacing between section toggle and stats row (mb-12 to mb-8)
- Add a subtle gold gradient accent behind the entire header area (matching Homepage and Vouchers pattern)
- Set document title to "Banking | CardPerks"
- Add BackToTop component

---

## 2. Bank Filter Pills -- Visual Weight and Active Indicator

**Current state:** Bank filter pills are plain glass-card buttons with gold background on active. They work but all look the same weight, and there's no indication of how many tiers each bank has.

**Improvements:**
- Add a tier count badge next to each bank name (e.g., "HDFC Bank (4)", "SBI (2)")
- Add a small colored dot or accent using the bank's brand color next to the name for visual differentiation
- Reduce spacing between filter pills and tier cards (mb-14 to mb-8)

---

## 3. Tier Cards -- Visual Progression and Hierarchy

**Current state:** All four HDFC tiers look nearly identical in weight. The tier color is subtle (only in the icon and header gradient). There's no visual signal that Private Banking is "higher" than Classic. The cards are dense with eligibility, cards, benefits, RM badge, and key takeaways all stacked.

**Improvements:**
- Add a tier progression indicator -- a subtle top border bar using the tier's color (2px solid line at the very top of each card)
- Add a tier rank badge (e.g., "Tier 1", "Tier 2", etc.) as a small pill in the top-right of the header area, showing the progression
- Add an "Invite Only" badge on Private Banking tiers (when eligibility text contains "invitation only")
- Use different Diamond/Crown/Star icons per tier level instead of the same Diamond icon for all tiers -- Classic gets a simple icon, Private Banking gets a Crown
- Add a subtle hover lift effect (translateY -4px) for better interactivity feedback

---

## 4. Eligibility Section -- Readability Improvement

**Current state:** The eligibility text is a dense paragraph with multiple conditions separated by "OR". It's hard to quickly scan what qualifies you.

**Improvements:**
- Parse the eligibility text and display each "OR" condition as a separate bullet/line item with a small "OR" divider between them
- Highlight key monetary values (amounts like "Rs 1 Lakh", "Rs 10 Crores") in gold text for quick scanning

---

## 5. Cross-Bank Comparison Feature

**Current state:** You can only view one bank at a time. There's no way to compare similar tiers across banks (e.g., HDFC Imperia vs ICICI Wealth vs Axis Burgundy).

**Improvements:**
- Add a "Compare Tiers" section below the current bank tiers showing a quick comparison table of all banks' equivalent tiers side-by-side
- The table would show: Bank Name, Tier Name, Min. AMB, RM status, Lounge Access (extracted from benefits), and number of benefits
- Style it as a glass-card table with bank brand-color accents

---

## 6. Family Banking Tab -- Content Richness

**Current state:** The Family Banking section is a placeholder with three generic feature cards and a "Ask Perk AI" link. It feels empty compared to the Wealth Banking tab.

**Improvements:**
- Add a "How Family Banking Works" step flow (similar to homepage How It Works) with 3 steps: 1. Pool balances, 2. Qualify for higher tier, 3. Share benefits
- Add specific bank examples: "HDFC Family Banking requires combined AMB of Rs 30L for Imperia benefits"
- Add a comparison of which banks offer family banking programs with a small card for each

---

## 7. Section Toggle -- Active State Animation

**Current state:** The Wealth/Family toggle buttons switch content but the transition feels abrupt. The active state is just a gold background.

**Improvements:**
- Add a subtle sliding background indicator (like a tab underline that slides between the two options)
- Add content transition animation when switching between tabs (fade + slide)

---

## Technical Details

### Files to Modify
- `src/pages/Banking.tsx` -- All improvements (hero spacing, bank pill counts, tier card progression, eligibility parsing, cross-bank comparison, family banking content, document title, BackToTop)

### No New Dependencies Required
All changes use existing framer-motion, lucide-react, and Tailwind utilities.

### Data Considerations
- Tier icons can be mapped by index: `[Landmark, Diamond, Crown, Award]` for ascending tiers
- "Invite Only" detection: check if `tier.eligibility.toLowerCase().includes("invitation")`
- Eligibility parsing: split on " OR " to create bullet items
- Cross-bank comparison data can be derived from the existing `banks` array

### Implementation Order
1. Hero spacing tightening and document title + BackToTop
2. Bank filter pills with tier counts and brand-color dots
3. Tier card visual progression (top border, rank badge, varied icons, invite-only badge)
4. Eligibility text parsing into scannable bullet points
5. Cross-bank comparison table
6. Family Banking tab content enrichment
7. Section toggle animation polish

