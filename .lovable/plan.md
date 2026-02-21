

# Perk AI Page -- Visual and UI Improvements

A focused plan to elevate the Perk AI chat interface with better message rendering, smarter layout behavior, and richer interactive features.

---

## 1. Markdown Rendering for AI Responses

**Current state:** AI responses contain markdown formatting like `**bold**`, `| table |`, and bullet points, but they are rendered as raw plain text. Bold markers show as literal asterisks, and tables display as pipe-separated text.

**Improvements:**
- Install `react-markdown` and render all AI messages through it with proper prose styling
- Bold text, bullet lists, and comparison tables will display correctly
- Add a subtle `prose prose-sm` wrapper with gold-accented links and proper table styling
- Keep the TypingText component working by rendering the progressively-typed text through markdown once complete

---

## 2. Collapsible Hero on Active Chat

**Current state:** The hero section (icon + title + subtitle) takes up about 220px of vertical space and stays visible even when the user is deep in a conversation. This wastes valuable chat viewport.

**Improvements:**
- Auto-collapse the hero after the first user message is sent -- shrink to a compact inline bar showing just "Perk AI" with the sparkle icon (40px height)
- Add a smooth framer-motion height transition for the collapse
- Keep the full hero visible only on initial load (before any user interaction)

---

## 3. Quick Actions -- Context-Aware Visibility

**Current state:** The three quick action chips ("Top Rewards Cards", "Best Cashback Deals", "Card Strategy Help") remain visible even after the user starts chatting. They feel redundant once suggestions are showing inline with messages.

**Improvements:**
- Hide quick actions after the first user message is sent
- Add a fade-out animation when they disappear
- This reclaims about 50px of vertical space for the chat

---

## 4. Chat Area -- Full-Height Layout

**Current state:** The chat area has `max-h-[55vh]` and `min-h-[400px]`, which creates a small scrollable box. The input bar uses `sticky bottom-6` but the parent container doesn't support proper sticky behavior within a scrolling page. The footer is always visible below, eating into space.

**Improvements:**
- Switch to a full-viewport chat layout: hero at top, messages fill remaining height, input pinned at bottom
- Use `flex flex-col h-[calc(100vh-80px)]` on the chat container (80px for navbar)
- Remove the min/max height constraints and let the message area flex-grow with `overflow-y-auto`
- Make the input truly sticky at the bottom of the chat container, not the page

---

## 5. New Chat Button and Conversation Controls

**Current state:** There's no way to start a new conversation or clear the chat. Users have to refresh the page.

**Improvements:**
- Add a "New Chat" button in the compact header bar (visible once hero collapses) with a subtle icon
- Clicking it resets messages to initialMessages and re-expands the hero
- Add a subtle message count indicator (e.g., "3 messages") in the header bar

---

## 6. Suggestion Chips -- Only on Latest Message

**Current state:** Every AI message shows its suggestions, even older ones. As the conversation grows, this creates visual clutter with stale suggestions everywhere.

**Improvements:**
- Only show suggestion chips on the most recent AI message
- Hide suggestions from older messages to keep the chat clean
- Add a subtle fade-in delay so suggestions appear after the typing animation finishes

---

## 7. Message Timestamps and Copy

**Current state:** Messages have no timestamps and no way to copy the AI response.

**Improvements:**
- Add a subtle timestamp below each message (e.g., "just now", "2 min ago") in tiny muted text
- Add a small copy button on hover over AI messages that copies the response text to clipboard
- Show a brief "Copied!" toast feedback via sonner

---

## 8. Document Title and Page Polish

**Current state:** No document title is set. No gold gradient accent behind the header area (other pages have this).

**Improvements:**
- Set document title to "Perk AI | CardPerks"
- Add the subtle gold radial gradient accent behind the hero area (matching Banking, Vouchers pages)
- Add a subtle animated background pattern or particles effect behind the hero (reuse FloatingParticles at low opacity)

---

## 9. Enhanced Quick Action Categories

**Current state:** Only 3 quick action chips. They could cover more common use cases to make the landing state feel richer.

**Improvements:**
- Expand to 5-6 quick actions covering more scenarios: "Top Rewards Cards", "Best Cashback Deals", "Card Strategy Help", "Travel Card Finder", "Compare Two Cards", "Fee Waiver Tips"
- Arrange in a 2-row grid on mobile instead of flex-wrap for cleaner layout
- Add a subtle category icon color tint per chip

---

## Technical Details

### Files to Modify
- `src/pages/PerkAI.tsx` -- All improvements (markdown rendering, collapsible hero, full-height layout, new chat button, suggestion visibility, timestamps, copy button, document title, enhanced quick actions)

### New Dependency Required
- `react-markdown` -- for proper markdown rendering in AI responses (bold, tables, bullets, links)

### Key Implementation Notes
- TypingText + markdown: During typing animation, render raw text. Once typing is done, switch the message to render through ReactMarkdown
- Collapsible hero: Use a `hasStarted` state that flips to true on first `sendMessage` call. Wrap hero in a `motion.div` with `animate={{ height }}` 
- Full-height layout: Replace `<section className="py-8 sm:py-12">` with a flex column container that fills the viewport minus the navbar height
- Suggestion visibility: Change `{msg.suggestions && ...}` to `{msg.suggestions && i === messages.length - 1 && ...}` to only show on the latest AI message
- Copy button: Use `navigator.clipboard.writeText()` with sonner toast for feedback
- Timestamps: Store `Date.now()` with each message and format using `date-fns`'s `formatDistanceToNow`

### Implementation Order
1. Document title and gold gradient accent
2. Markdown rendering (install react-markdown, wrap AI messages)
3. Full-height chat layout restructure
4. Collapsible hero with animation
5. Quick actions context-aware visibility and expansion
6. Suggestion chips only on latest message
7. New Chat button and message count
8. Timestamps and copy button

