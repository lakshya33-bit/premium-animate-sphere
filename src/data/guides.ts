import { Star, TrendingUp, CreditCard, Gift, Shield, Plane, type LucideIcon } from "lucide-react";

export interface Guide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  icon: LucideIcon;
  description: string;
  featured: boolean;
  color: string;
  author: string;
  date: string;
  content: string[];
  tags: string[];
}

export const guideCategories = ["All", "Beginners", "Strategy", "Travel", "Rewards", "Security"];

export const guides: Guide[] = [
  { slug: "credit-card-rewards-101", title: "Credit Card Rewards 101: A Beginner's Guide", category: "Beginners", readTime: "8 min", icon: Star, description: "Everything you need to know about earning and redeeming credit card rewards in India. Start your journey to smarter spending.", featured: true, color: "#C4A35A", author: "Arjun Mehta", date: "Feb 15, 2026", tags: ["Beginners", "Rewards", "Getting Started"],
    content: [
      "Credit card rewards are one of the most underutilized financial perks available to Indian consumers. Every swipe of your credit card can earn you reward points, cashback, or miles — but most people never realize the full value of what they earn.",
      "## How Reward Points Work\n\nMost credit cards in India earn reward points on every transaction. The rate varies: HDFC Infinia gives 5 Reward Points per ₹150 spent, while SBI Elite offers 2 RP per ₹100. The key is understanding the *value per point* — not all points are created equal.",
      "## Types of Rewards\n\n**Cashback Cards** return a percentage of spending directly. **Reward Points Cards** accumulate points redeemable for vouchers, products, or miles. **Miles Cards** like Axis Atlas earn airline miles for travel redemption.",
      "## Maximizing Your Returns\n\n1. **Use the right card for each category** — dining cards for restaurants, travel cards for bookings\n2. **Always redeem through official portals** — SmartBuy, Edge Rewards, etc. for best rates\n3. **Never let points expire** — set calendar reminders for expiry dates\n4. **Stack offers** — combine card rewards with merchant promotions for double savings",
      "## Common Mistakes to Avoid\n\n- Paying annual fees without earning enough rewards to justify them\n- Carrying a balance and paying interest (which negates all rewards)\n- Redeeming points for products instead of vouchers (usually lower value)\n- Ignoring milestone benefits that give bonus points at spending thresholds",
    ] },
  { slug: "smartbuy-10x-hack", title: "The Ultimate SmartBuy Hack: 10x Points Strategy", category: "Strategy", readTime: "12 min", icon: TrendingUp, description: "How to maximize your HDFC reward points using SmartBuy portal. Step-by-step guide with real examples.", featured: true, color: "#4CAF50", author: "Priya Sharma", date: "Feb 10, 2026", tags: ["HDFC", "SmartBuy", "Strategy"],
    content: [
      "HDFC SmartBuy is the secret weapon of savvy credit card users. By routing your purchases through this portal, you can earn up to 10x reward points on HDFC Infinia and Diners Black cards — turning a 3.3% reward rate into an incredible 33% value proposition.",
      "## What is SmartBuy?\n\nSmartBuy is HDFC Bank's online shopping portal that partners with major brands. When you make purchases through SmartBuy using eligible HDFC cards, you earn accelerated reward points.",
      "## The 10x Strategy\n\n**Step 1:** Log in to SmartBuy with your HDFC NetBanking credentials\n**Step 2:** Select your voucher — Flipkart, Amazon, Swiggy, etc.\n**Step 3:** Pay with your HDFC Infinia or Diners Black card\n**Step 4:** Earn 10x reward points on the purchase\n\nWith HDFC Infinia at 5 RP per ₹150, the 10x accelerator gives you 50 RP per ₹150 — that's ₹16.5 worth of rewards on every ₹150 spent through SmartBuy.",
      "## Real Example\n\nBuying ₹5,000 Flipkart voucher through SmartBuy:\n- Regular earn: 167 points (₹55 value)\n- SmartBuy earn: 1,667 points (₹550 value)\n- Effective discount: 11% on top of Flipkart's 7% voucher value\n- **Total savings: ~18%**",
      "## Pro Tips\n\n- Check SmartBuy daily for flash deals and bonus multipliers\n- Buy vouchers in bulk during festive seasons for extra accelerators\n- Use the HDFC app for instant voucher delivery\n- Stack SmartBuy points with Flipkart/Amazon sale discounts for maximum value",
    ] },
  { slug: "lounge-access-2026", title: "Lounge Access: Complete 2026 Guide", category: "Travel", readTime: "10 min", icon: Plane, description: "Everything about airport lounge access — Priority Pass, Dreamfolks, and which cards give you the best deal.", featured: false, color: "#2196F3", author: "Rohan Gupta", date: "Feb 5, 2026", tags: ["Travel", "Lounge", "Airport"],
    content: [
      "Airport lounge access is one of the most valued perks of premium credit cards. In 2026, the landscape has evolved with Dreamfolks replacing Priority Pass for many Indian bank programs.",
      "## Priority Pass vs Dreamfolks\n\n**Priority Pass** covers 1,400+ lounges worldwide. **Dreamfolks** focuses on Indian domestic lounges (60+ locations). Most Indian banks now issue Dreamfolks for domestic and Priority Pass for international travel.",
      "## Best Cards for Lounge Access\n\n| Card | Domestic | International | Guest |\n|------|----------|---------------|-------|\n| HDFC Infinia | Unlimited | Unlimited | 1 free |\n| HDFC Diners Black | Unlimited | Unlimited | Paid |\n| ICICI Emeralde | Unlimited | 2/quarter | Paid |\n| Axis Atlas | 8/quarter | Via PP | Paid |",
      "## Tips for Smart Lounge Usage\n\n- Always book through the card's official lounge program (not walk-in) for complimentary access\n- Check guest policies — some cards charge ₹1,000+ per guest\n- International lounges often have better food and drinks than domestic ones\n- Download the Priority Pass or Dreamfolks app for real-time lounge availability",
    ] },
  { slug: "first-premium-card", title: "How to Choose Your First Premium Credit Card", category: "Beginners", readTime: "7 min", icon: CreditCard, description: "Confused between HDFC Regalia, SBI Elite, and Axis Privilege? Here's a data-driven comparison.", featured: false, color: "#FF9800", author: "Arjun Mehta", date: "Jan 28, 2026", tags: ["Beginners", "Comparison", "Premium"],
    content: [
      "Choosing your first premium credit card is a big decision. The annual fee, reward structure, and lifestyle benefits vary significantly between cards. Here's a data-driven approach to making the right choice.",
      "## Key Factors to Consider\n\n1. **Annual fee vs. rewards earned** — Can you spend enough to justify the fee?\n2. **Spending categories** — Where do you spend most? Online, dining, travel?\n3. **Lifestyle perks** — Lounge access, golf, concierge services\n4. **Milestone benefits** — Bonus rewards at specific spending thresholds",
      "## The Big Three Compared\n\n**HDFC Regalia (₹2,500/year)**\n- Best for: Online shopping via SmartBuy\n- 4 lounge visits/quarter\n- Good milestone benefits\n\n**SBI Elite (₹4,999/year)**\n- Best for: Milestone chasers\n- Movie and dining benefits\n- Trident hotel privileges\n\n**Axis Privilege (₹3,500/year)**\n- Best for: Dining and movies\n- Edge Rewards redemption\n- Grab Deals platform",
      "## Our Recommendation\n\nIf you spend ₹50,000+/month, start with HDFC Regalia — the SmartBuy portal alone can earn you ₹15,000+ in rewards annually, more than justifying the fee.",
    ] },
  { slug: "voucher-stacking", title: "Voucher Stacking: Double Your Savings", category: "Strategy", readTime: "9 min", icon: Gift, description: "The art of combining credit card vouchers with platform offers for maximum discounts.", featured: false, color: "#E91E63", author: "Priya Sharma", date: "Jan 20, 2026", tags: ["Strategy", "Vouchers", "Savings"],
    content: [
      "Voucher stacking is the most powerful savings technique that most credit card holders don't know about. By combining reward point vouchers with platform offers, you can effectively get 15-25% off on purchases.",
      "## How Stacking Works\n\n**Layer 1:** Buy a Flipkart voucher using reward points (7% value)\n**Layer 2:** Use the voucher during a Flipkart sale (additional 20-40% discount)\n**Layer 3:** Apply platform-specific bank offers (additional 5-10% off)\n\nResult: Your effective discount can exceed 30%!",
      "## Best Stacking Combos\n\n- **Flipkart + HDFC SmartBuy + BBD Sale** = Up to 35% savings\n- **Amazon + ICICI Rewards + Great Indian Sale** = Up to 30% savings\n- **Zomato + Diners Black + Zomato Gold** = Up to 25% savings on dining",
      "## Timing Your Stacks\n\nThe best time to stack is during major sales (BBD, Great Indian Festival, etc.) when platform discounts are highest. Buy vouchers 2-3 days before the sale starts to ensure you have them ready.",
    ] },
  { slug: "card-security", title: "Protecting Your Card: Security Best Practices", category: "Security", readTime: "6 min", icon: Shield, description: "Essential tips to protect your credit card from fraud, unauthorized transactions, and skimming.", featured: false, color: "#9C27B0", author: "Rohan Gupta", date: "Jan 12, 2026", tags: ["Security", "Fraud", "Protection"],
    content: [
      "Credit card fraud in India has increased by 35% in the last year. While banks have improved their fraud detection, you need to be proactive about protecting your cards.",
      "## Essential Security Practices\n\n1. **Enable transaction alerts** via SMS and email for every transaction\n2. **Set transaction limits** — lower your international and online limits when not in use\n3. **Use virtual card numbers** for online shopping (available on most premium cards)\n4. **Never share OTP** — no bank will ever call and ask for your OTP",
      "## If Your Card is Compromised\n\n1. **Immediately block** the card through your bank's app\n2. **Call the bank** to report unauthorized transactions\n3. **File a cyber crime complaint** at cybercrime.gov.in\n4. **Follow up in writing** — email the bank with transaction details\n\nUnder RBI guidelines, you have zero liability for unauthorized transactions if reported within 3 days.",
    ] },
  { slug: "international-travel-cards", title: "International Travel: Best Cards to Carry", category: "Travel", readTime: "11 min", icon: Plane, description: "Zero forex markup cards, international lounge access, and travel insurance — the ultimate combo.", featured: false, color: "#00BCD4", author: "Arjun Mehta", date: "Jan 5, 2026", tags: ["Travel", "International", "Forex"],
    content: [
      "Traveling internationally with the wrong credit card can cost you 3-5% extra on every transaction due to forex markup and poor conversion rates. Here's how to travel smart.",
      "## Zero Forex Markup Cards\n\n- **Axis Atlas** — 0% forex markup, the undisputed king for international travel\n- **HDFC Infinia** — 2% markup but high reward rate offsets it\n- **Niyo Global** — 0% markup debit card, great backup option",
      "## Must-Have Travel Card Features\n\n1. **Zero or low forex markup** — saves 2-3.5% per transaction\n2. **International lounge access** — Priority Pass membership\n3. **Travel insurance** — air accident, trip delay, baggage loss\n4. **Emergency card replacement** — if your card is lost abroad\n5. **Global concierge** — restaurant reservations, event tickets",
    ] },
  { slug: "reward-points-valuation", title: "Reward Points Valuation: Know What You Earn", category: "Rewards", readTime: "8 min", icon: TrendingUp, description: "Not all reward points are equal. Learn how to calculate the true value of your credit card points.", featured: false, color: "#8BC34A", author: "Priya Sharma", date: "Dec 28, 2025", tags: ["Rewards", "Valuation", "Points"],
    content: [
      "Understanding the true value of your reward points is critical to maximizing returns. Many cardholders leave money on the table by redeeming points sub-optimally.",
      "## Point Valuation Formula\n\nValue per point = Voucher value ÷ Points required\n\nExample: HDFC Infinia SmartBuy\n- 1 RP = ₹0.33 when redeemed via SmartBuy\n- 1 RP = ₹0.20 when redeemed for products\n- 1 RP = ₹0.10 when redeemed for statement credit\n\n**Always redeem through SmartBuy or equivalent portals for maximum value!**",
      "## Valuation Table\n\n| Card | Best Redemption | Value/Point |\n|------|----------------|-------------|\n| HDFC Infinia | SmartBuy vouchers | ₹0.33 |\n| ICICI Emeralde | Cleartrip booking | ₹0.35 |\n| Axis Atlas | Edge Miles transfer | ₹0.50 |\n| SBI Elite | SBI Rewardz vouchers | ₹0.25 |",
    ] },
  { slug: "annual-fee-waiver", title: "Annual Fee Waiver Strategies", category: "Strategy", readTime: "5 min", icon: CreditCard, description: "How to get your annual fee waived on premium cards. Proven strategies that actually work.", featured: false, color: "#FF5722", author: "Rohan Gupta", date: "Dec 20, 2025", tags: ["Strategy", "Fees", "Savings"],
    content: [
      "Premium credit cards come with hefty annual fees — ₹3,000 to ₹12,500. But with the right approach, you can often get these fees waived or reversed.",
      "## Proven Strategies\n\n1. **Spend-based waiver** — Most cards waive fees if you hit a spending threshold (usually ₹3-10L/year)\n2. **Retention call** — Call to cancel 30 days before renewal. Banks often offer fee waiver to retain you\n3. **Upgrade path** — Some banks waive the first year fee when upgrading from a lower card\n4. **Salary account linkage** — Having a salary account with the same bank can qualify you for lifetime free cards",
      "## Card-wise Waiver Thresholds\n\n- HDFC Infinia: ₹10L annual spend\n- HDFC Regalia: ₹3L annual spend\n- SBI Elite: ₹5L annual spend (renewal year points)\n- Axis Atlas: No spend-based waiver, but retention offers available",
    ] },
];

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
