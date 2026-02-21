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

export const cardImages: Record<string, string> = {};

// Dynamic imports for card images
import axisNeoImg from "@/assets/cards/axis-neo.png";
import hdfcShoppersStopImg from "@/assets/cards/hdfc-shoppers-stop.png";
import hsbcPremierImg from "@/assets/cards/hsbc-premier.png";
import iciciEmeraldePrivateImg from "@/assets/cards/icici-emeralde-private-metal.png";
import iciciMakeMyTripImg from "@/assets/cards/icici-makemytrip-signature.png";
import iciciRubyxImg from "@/assets/cards/icici-rubyx.png";

export const cards: CreditCard[] = [
  { id: "axis-neo", name: "Axis Neo", network: "Visa", fee: "₹3,500", rating: 4.3, rewards: "2% value", lounge: "4/quarter", vouchers: ["Myntra 10%", "Flipkart 5%", "Tata CLiQ 8%"], color: "#C41E6A", image: axisNeoImg, perks: ["5x on fashion", "Dining discounts", "Fuel surcharge waiver"], issuer: "Axis Bank", type: "Premium", minIncome: "₹8L+/year", welcomeBonus: "2,000 Edge Reward points", fuelSurcharge: "1% waiver", forexMarkup: "2.5%", rewardRate: "2 RP per ₹200", milestones: ["₹3L spend = ₹2,000 voucher", "₹5L spend = ₹5,000 voucher"], insurance: ["Personal accident cover ₹25L", "Purchase protection ₹1L"], bestFor: ["Fashion shoppers", "Young professionals", "Online spenders"] },
  { id: "hdfc-shoppers-stop", name: "HDFC Shoppers Stop", network: "Visa", fee: "₹499", rating: 4.0, rewards: "2% value", lounge: "2/year", vouchers: ["Shoppers Stop 10%", "First Citizen 5%", "HomeStop 6%"], color: "#2A2A3A", image: hdfcShoppersStopImg, perks: ["First Citizen membership", "Birthday bonus", "10x on Shoppers Stop"], issuer: "HDFC Bank", type: "Co-branded", minIncome: "₹4L+/year", welcomeBonus: "₹500 Shoppers Stop voucher", fuelSurcharge: "1% waiver", forexMarkup: "3.5%", rewardRate: "6 RP per ₹150 at SS", milestones: ["₹2L spend = ₹1,000 voucher"], insurance: ["Lost card liability ₹1L"], bestFor: ["Shoppers Stop loyalists", "Fashion lovers", "Budget shoppers"] },
  { id: "hsbc-premier", name: "HSBC Premier", network: "Mastercard", fee: "₹10,000", rating: 4.5, rewards: "3% value", lounge: "Unlimited", vouchers: ["Amazon 5%", "MakeMyTrip 8%", "Tata CLiQ 7%"], color: "#1C1C1C", image: hsbcPremierImg, perks: ["Priority Pass", "Golf access worldwide", "Concierge service"], issuer: "HSBC", type: "Super Premium", minIncome: "₹20L+/year", welcomeBonus: "10,000 reward points", fuelSurcharge: "1% waiver", forexMarkup: "1.75%", rewardRate: "4 RP per ₹100", milestones: ["₹5L spend = 5,000 bonus points", "₹10L spend = 12,000 bonus points"], insurance: ["Travel insurance ₹1Cr", "Purchase protection ₹5L", "Emergency cash advance"], bestFor: ["NRI banking", "International travelers", "Premium banking customers"] },
  { id: "icici-emeralde-private", name: "ICICI Emeralde Private Metal", network: "Visa", fee: "₹15,000", rating: 4.9, rewards: "4% value", lounge: "Unlimited", vouchers: ["Taj 15%", "MakeMyTrip 12%", "Amazon 8%"], color: "#0B5E3C", image: iciciEmeraldePrivateImg, perks: ["Unlimited lounge worldwide", "Taj InnerCircle Epicure", "Golf access", "Concierge 24/7"], issuer: "ICICI Bank", type: "Ultra Premium", minIncome: "₹40L+/year", welcomeBonus: "Taj voucher ₹25,000", fuelSurcharge: "1% waiver", forexMarkup: "1.5%", rewardRate: "4 RP per ₹100", milestones: ["₹10L spend = Taj voucher ₹15,000", "₹15L spend = ₹25,000 bonus"], insurance: ["Travel insurance ₹2Cr", "Medical emergency ₹50L", "Purchase protection ₹10L"], bestFor: ["Ultra HNI customers", "Luxury travelers", "Taj enthusiasts"] },
  { id: "icici-makemytrip", name: "ICICI MakeMyTrip Signature", network: "Mastercard", fee: "₹2,500", rating: 4.3, rewards: "2.5% value", lounge: "4/quarter", vouchers: ["MakeMyTrip 10%", "GoIbibo 8%", "Uber 5%"], color: "#1A1A2E", image: iciciMakeMyTripImg, perks: ["5x on travel bookings", "MyBiz benefits", "Airport transfer"], issuer: "ICICI Bank", type: "Co-branded", minIncome: "₹6L+/year", welcomeBonus: "MakeMyTrip voucher ₹3,000", fuelSurcharge: "1% waiver", forexMarkup: "2%", rewardRate: "4 RP per ₹100 on travel", milestones: ["₹2L spend = MMT ₹2,000", "₹5L spend = MMT ₹5,000"], insurance: ["Travel insurance ₹50L", "Flight delay cover ₹10,000"], bestFor: ["Frequent travelers", "MakeMyTrip users", "Budget travelers"] },
  { id: "icici-rubyx", name: "ICICI Rubyx Emirates", network: "Visa", fee: "₹5,000", rating: 4.5, rewards: "3% value", lounge: "8/quarter", vouchers: ["Emirates 10%", "Landmark 8%", "MakeMyTrip 7%"], color: "#8B1A2B", image: iciciRubyxImg, perks: ["Emirates Skywards miles", "Lounge access", "Golf access"], issuer: "ICICI Bank", type: "Premium", minIncome: "₹12L+/year", welcomeBonus: "5,000 Skywards miles", fuelSurcharge: "1% waiver", forexMarkup: "1.5%", rewardRate: "2 Skywards miles per ₹100", milestones: ["₹3L spend = 3,000 bonus miles", "₹6L spend = 8,000 bonus miles"], insurance: ["Travel insurance ₹1Cr", "Lost luggage cover ₹1L"], bestFor: ["Emirates flyers", "International travelers", "Miles collectors"] },
];

export function getCardById(id: string) {
  return cards.find((c) => c.id === id);
}
