import { Landmark, Users, Diamond, Crown, Shield, Star, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BankingTier {
  name: string;
  color: string;
  eligibility: string;
  eligibleCards: string[];
  benefits: string[];
  hasRM: boolean;
  keyTakeaways: string[];
}

export interface BankData {
  id: string;
  name: string;
  color: string;
  tiers: BankingTier[];
}

export const banks: BankData[] = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    color: "#003D8F",
    tiers: [
      {
        name: "Classic",
        color: "#6B7280",
        eligibility: "AMB of ₹1 Lakh in Savings OR ₹2 Lakhs in Current OR ₹1 Lakh net salary credit OR ₹5 Lakhs in Savings+FD combined",
        eligibleCards: ["HDFC Classic"],
        benefits: [
          "Standard locker rates apply",
          "Standard Demat account charges",
          "Nil charges on non-maintenance of minimum balance",
          "Free NEFT/RTGS through online mode",
          "Free chequebook issuance",
          "Priority branch servicing",
          "Dedicated customer care line",
        ],
        hasRM: false,
        keyTakeaways: ["Best card: HDFC Classic"],
      },
      {
        name: "Preferred",
        color: "#06B6D4",
        eligibility: "AMB of ₹2 Lakhs in Savings OR ₹5 Lakhs in Current OR ₹2 Lakhs net salary credit OR ₹15 Lakhs Retail Liability Value (Savings+FD)",
        eligibleCards: ["HDFC Preferred Platinum Chip"],
        benefits: [
          "Domestic Lounge: 4/year",
          "50% discount on annual locker rent for first locker per group",
          "Free Demat AMC with at least 1 transaction",
          "Preferred Platinum Chip Debit Card with premium benefits",
          "Dedicated Relationship Manager",
          "Priority processing for loans",
          "Preferential forex rates",
          "Free demand drafts",
        ],
        hasRM: true,
        keyTakeaways: ["Best card: HDFC Preferred Platinum Chip", "Dedicated RM included"],
      },
      {
        name: "Imperia",
        color: "#F59E0B",
        eligibility: "AMB of ₹10 Lakhs in Savings OR AQB ₹15 Lakhs in Current OR ₹3 Lakhs net salary credit OR ₹30 Lakhs in Savings+FD combined",
        eligibleCards: ["HDFC Imperia Platinum Chip"],
        benefits: [
          "Domestic Lounge: Unlimited",
          "International Lounge: 6/year",
          "Free locker (first locker per group)",
          "Free Demat AMC for life with Special Demat Value Plan",
          "Premium Imperia welcome kit with Imperia Platinum Chip Debit Card and exclusive lifestyle privileges",
          "Dedicated senior Relationship Manager",
          "Preferential pricing on home & auto loans",
          "Complimentary golf rounds",
        ],
        hasRM: true,
        keyTakeaways: ["Best card: HDFC Imperia Platinum Chip", "Dedicated RM included"],
      },
      {
        name: "Private Banking",
        color: "#A855F7",
        eligibility: "NRV of ₹10 Crores or above with HDFC Bank. By invitation only.",
        eligibleCards: ["HDFC Private World"],
        benefits: [
          "Domestic Lounge: Unlimited",
          "International Lounge: Unlimited",
          "Complimentary premium locker",
          "Free Demat with dedicated investment advisory and priority IPO processing",
          "Exclusive onboarding experience with personalized wealth assessment",
          "Private banking suite access at select branches",
          "Family banking privileges for immediate family",
          "Bespoke travel & lifestyle concierge",
        ],
        hasRM: true,
        keyTakeaways: ["Best card: HDFC Private World", "Dedicated RM included"],
      },
    ],
  },
  {
    id: "icici",
    name: "ICICI Bank",
    color: "#F58220",
    tiers: [
      {
        name: "Privilege",
        color: "#06B6D4",
        eligibility: "AMB of ₹1 Lakh in Savings OR ₹2 Lakhs in Current OR total relationship value ₹5 Lakhs",
        eligibleCards: ["ICICI Privilege Debit Card"],
        benefits: [
          "Priority branch servicing",
          "Preferential FD rates",
          "Free NEFT/RTGS",
          "Locker discount 25%",
          "Free chequebook",
        ],
        hasRM: false,
        keyTakeaways: ["Entry-level wealth tier"],
      },
      {
        name: "Wealth",
        color: "#F59E0B",
        eligibility: "AMB of ₹10 Lakhs in Savings OR NRV ₹25 Lakhs OR ₹3 Lakhs monthly salary credit",
        eligibleCards: ["ICICI Sapphiro Debit Card"],
        benefits: [
          "Domestic Lounge: 8/year",
          "International Lounge: 4/year",
          "Dedicated Relationship Manager",
          "Preferential loan pricing",
          "50% off on locker charges",
          "Free Demat AMC",
          "Priority processing",
        ],
        hasRM: true,
        keyTakeaways: ["Best card: ICICI Sapphiro", "Dedicated RM included"],
      },
      {
        name: "Private Banking",
        color: "#A855F7",
        eligibility: "NRV of ₹5 Crores or above with ICICI Bank. By invitation only.",
        eligibleCards: ["ICICI Private Banking Debit Card"],
        benefits: [
          "Domestic & International Lounge: Unlimited",
          "Complimentary premium locker",
          "Dedicated Private Banker",
          "Bespoke investment advisory",
          "Exclusive event invitations",
          "Family banking privileges",
          "Priority IPO processing",
        ],
        hasRM: true,
        keyTakeaways: ["Top-tier private banking", "Dedicated Private Banker"],
      },
    ],
  },
  {
    id: "axis",
    name: "Axis Bank",
    color: "#97144D",
    tiers: [
      {
        name: "Priority",
        color: "#06B6D4",
        eligibility: "AMB of ₹2 Lakhs in Savings OR ₹5 Lakhs in Current OR ₹2 Lakhs net salary credit",
        eligibleCards: ["Axis Priority Debit Card"],
        benefits: [
          "Domestic Lounge: 4/year",
          "Priority branch servicing",
          "Preferential FD rates",
          "Free demand drafts",
          "Dedicated helpline",
        ],
        hasRM: false,
        keyTakeaways: ["Entry-level priority banking"],
      },
      {
        name: "Burgundy",
        color: "#F59E0B",
        eligibility: "AMB of ₹5 Lakhs in Savings OR NRV ₹30 Lakhs OR ₹5 Lakhs monthly salary credit",
        eligibleCards: ["Axis Burgundy Debit Card"],
        benefits: [
          "Domestic Lounge: Unlimited",
          "International Lounge: 8/year",
          "Dedicated Relationship Manager",
          "Complimentary Burgundy Debit Card",
          "Preferential loan & forex rates",
          "Free locker (first year)",
          "Golf access: 4 rounds/year",
        ],
        hasRM: true,
        keyTakeaways: ["Best card: Axis Burgundy", "Dedicated RM included"],
      },
      {
        name: "Burgundy Private",
        color: "#A855F7",
        eligibility: "NRV of ₹5 Crores or above. By invitation only.",
        eligibleCards: ["Axis Burgundy Private World"],
        benefits: [
          "Domestic & International Lounge: Unlimited",
          "Dedicated Private Banker",
          "Complimentary premium locker",
          "Bespoke wealth management",
          "Exclusive lifestyle privileges",
          "Family banking benefits",
          "Priority IPO & mutual fund processing",
        ],
        hasRM: true,
        keyTakeaways: ["Top-tier Burgundy experience", "Dedicated Private Banker"],
      },
    ],
  },
  {
    id: "sbi",
    name: "State Bank of India",
    color: "#0033A0",
    tiers: [
      {
        name: "Gold",
        color: "#F59E0B",
        eligibility: "AMB of ₹1 Lakh OR ₹50,000 net salary credit OR ₹5 Lakhs in FD",
        eligibleCards: ["SBI Gold Debit Card"],
        benefits: [
          "Priority branch servicing",
          "Free NEFT/RTGS/IMPS",
          "Preferential FD rates",
          "Free chequebook & demand drafts",
          "Locker preference",
        ],
        hasRM: false,
        keyTakeaways: ["Largest branch network benefit"],
      },
      {
        name: "Wealth",
        color: "#06B6D4",
        eligibility: "NRV of ₹10 Lakhs OR ₹3 Lakhs monthly salary credit OR ₹30 Lakhs in FD",
        eligibleCards: ["SBI Wealth Debit Card"],
        benefits: [
          "Domestic Lounge: 8/year",
          "Dedicated Relationship Manager",
          "Preferential loan pricing",
          "Free Demat AMC",
          "50% off locker charges",
          "Priority processing for government schemes",
        ],
        hasRM: true,
        keyTakeaways: ["Best for government employees", "Dedicated RM included"],
      },
    ],
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    color: "#ED1C24",
    tiers: [
      {
        name: "Privy League",
        color: "#06B6D4",
        eligibility: "AMB of ₹5 Lakhs OR NRV ₹10 Lakhs OR ₹2 Lakhs salary credit",
        eligibleCards: ["Kotak Privy League Debit Card"],
        benefits: [
          "Domestic Lounge: 4/year",
          "Dedicated Relationship Manager",
          "Preferential rates on loans & FDs",
          "Free chequebook & demand drafts",
          "Priority servicing",
        ],
        hasRM: true,
        keyTakeaways: ["Good entry-level wealth banking"],
      },
      {
        name: "Privy League Signature",
        color: "#F59E0B",
        eligibility: "AMB of ₹10 Lakhs OR NRV ₹30 Lakhs OR ₹5 Lakhs salary credit",
        eligibleCards: ["Kotak Privy League Signature Debit Card"],
        benefits: [
          "Domestic Lounge: Unlimited",
          "International Lounge: 6/year",
          "Senior Relationship Manager",
          "Complimentary locker",
          "Golf access: 4 rounds/year",
          "Preferential pricing on all products",
          "Free Demat with advisory",
        ],
        hasRM: true,
        keyTakeaways: ["Best mid-tier wealth banking", "Senior RM included"],
      },
    ],
  },
];

export function getBankById(id: string) {
  return banks.find((b) => b.id === id);
}
