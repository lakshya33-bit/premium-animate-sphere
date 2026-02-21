export interface CreditCard {
  id: string;
  name: string;
  network: string;
  fee: string;
  rating: number;
  rewards: string;
  lounge: string;
  vouchers: string[];
  color: string;
  image?: string;
  perks: string[];
  issuer: string;
  type: string;
  minIncome: string;
  welcomeBonus: string;
  fuelSurcharge: string;
  forexMarkup: string;
  rewardRate: string;
  milestones: string[];
  insurance: string[];
  bestFor: string[];
}

export const cards: CreditCard[] = [
  { id: "hdfc-infinia", name: "HDFC Infinia", network: "Visa", fee: "₹12,500", rating: 4.8, rewards: "3.3% value", lounge: "Unlimited", vouchers: ["Flipkart 7%", "Amazon 5%", "BigBasket 8%"], color: "#003D8F", perks: ["10x on SmartBuy", "Golf access", "Concierge service"], issuer: "HDFC Bank", type: "Super Premium", minIncome: "₹30L+/year", welcomeBonus: "12,500 reward points", fuelSurcharge: "1% waiver", forexMarkup: "2%", rewardRate: "5 RP per ₹150", milestones: ["₹8L spend = 5,000 bonus points", "₹15L spend = 10,000 bonus points"], insurance: ["Air accident cover ₹2Cr", "Emergency overseas hospitalization ₹25L"], bestFor: ["High spenders", "Frequent travelers", "Premium lifestyle"] },
  { id: "icici-emeralde", name: "ICICI Emeralde", network: "Visa", fee: "₹12,000", rating: 4.7, rewards: "3.5% value", lounge: "Unlimited", vouchers: ["Amazon 6%", "Zomato 10%", "MakeMyTrip 12%"], color: "#F58220", perks: ["2 int'l lounge", "Cleartrip rewards", "Buy 1 Get 1 movies"], issuer: "ICICI Bank", type: "Super Premium", minIncome: "₹25L+/year", welcomeBonus: "Cleartrip voucher worth ₹15,000", fuelSurcharge: "1% waiver", forexMarkup: "1.5%", rewardRate: "4 RP per ₹100", milestones: ["₹6L spend = Cleartrip ₹10,000", "₹10L spend = Taj voucher ₹15,000"], insurance: ["Travel insurance ₹1Cr", "Purchase protection ₹5L"], bestFor: ["Travel enthusiasts", "Entertainment lovers", "Online shoppers"] },
  { id: "axis-atlas", name: "Axis Atlas", network: "Visa", fee: "₹5,000", rating: 4.6, rewards: "2% value", lounge: "8/quarter", vouchers: ["MakeMyTrip 10%", "Uber 5%", "Zomato 8%"], color: "#97144D", perks: ["5x on travel", "Edge Miles", "Complimentary insurance"], issuer: "Axis Bank", type: "Premium", minIncome: "₹15L+/year", welcomeBonus: "5,000 Edge Miles", fuelSurcharge: "1% waiver", forexMarkup: "0%", rewardRate: "2 Edge Miles per ₹200", milestones: ["₹1.5L spend = 2,500 bonus miles", "₹7.5L spend = 12,500 bonus miles"], insurance: ["Comprehensive travel insurance", "Lost card liability ₹5L"], bestFor: ["International travelers", "Forex savings", "Travel bookings"] },
  { id: "sbi-elite", name: "SBI Elite", network: "Visa", fee: "₹4,999", rating: 4.4, rewards: "2.5% value", lounge: "6/year", vouchers: ["Amazon 5%", "BigBasket 6%", "Croma 5%"], color: "#0033A0", perks: ["Milestone benefits", "Movie tickets", "Dining discounts"], issuer: "SBI Card", type: "Premium", minIncome: "₹12L+/year", welcomeBonus: "5,000 reward points", fuelSurcharge: "1% waiver", forexMarkup: "1.99%", rewardRate: "2 RP per ₹100", milestones: ["₹5L spend = ₹5,000 voucher", "₹10L spend = ₹10,000 voucher"], insurance: ["Air accident cover ₹1Cr", "Purchase protection ₹2L"], bestFor: ["Milestone chasers", "Entertainment lovers", "Online shopping"] },
  { id: "hdfc-diners-black", name: "HDFC Diners Black", network: "Diners", fee: "₹10,000", rating: 4.7, rewards: "3.3% value", lounge: "Unlimited", vouchers: ["Zomato 10%", "Swiggy 8%", "MakeMyTrip 12%"], color: "#1A1A2E", perks: ["10x SmartBuy", "Golf worldwide", "Concierge"], issuer: "HDFC Bank", type: "Super Premium", minIncome: "₹15L+/year", welcomeBonus: "10,000 reward points", fuelSurcharge: "1% waiver", forexMarkup: "2%", rewardRate: "5 RP per ₹150", milestones: ["₹5L spend = 5,000 bonus", "₹10L spend = 10,000 bonus"], insurance: ["Air accident ₹1Cr", "Medical emergency ₹15L overseas"], bestFor: ["SmartBuy power users", "Dining enthusiasts", "Golf lovers"] },
  { id: "kotak-royale", name: "Kotak Royale", network: "Visa", fee: "₹3,000", rating: 4.2, rewards: "1.5% value", lounge: "4/quarter", vouchers: ["BookMyShow 10%", "Flipkart 5%", "Cult.fit 8%"], color: "#ED1C24", perks: ["PVR BOGO", "Airport lounge", "Fuel surcharge waiver"], issuer: "Kotak Mahindra", type: "Premium", minIncome: "₹6L+/year", welcomeBonus: "3,000 reward points", fuelSurcharge: "1% waiver up to ₹3,500", forexMarkup: "3.5%", rewardRate: "4 RP per ₹150", milestones: ["₹2L spend = PVR vouchers ₹1,000"], insurance: ["Personal accident cover ₹50L"], bestFor: ["Movie buffs", "Budget-conscious", "Entry-level premium"] },
];

export function getCardById(id: string) {
  return cards.find((c) => c.id === id);
}
