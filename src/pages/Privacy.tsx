import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";

const sections = [
  { title: "Information We Collect", content: "We collect information you provide directly, such as your name and email when you create an account. We also collect usage data including pages viewed, features used, and interaction patterns to improve our service. We do NOT collect or store any credit card numbers, CVVs, or sensitive financial data." },
  { title: "How We Use Your Information", content: "Your information is used to: provide and improve our services, personalize your experience with relevant card recommendations, send you updates about voucher rate changes (if opted in), analyze platform usage to improve features, and ensure security and prevent fraud." },
  { title: "Data Storage & Security", content: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We use secure cloud infrastructure with regular security audits. Access to user data is strictly limited to authorized personnel. We never sell your personal data to third parties." },
  { title: "Cookies & Tracking", content: "We use essential cookies for authentication and session management. Analytics cookies help us understand how you use CardPerks. You can disable non-essential cookies through your browser settings. We use privacy-respecting analytics that don't track you across websites." },
  { title: "Third-Party Services", content: "We integrate with third-party services for analytics (privacy-focused), email delivery, and authentication (Google OAuth). These providers are bound by their own privacy policies and our data processing agreements. We do not share your personal data with advertisers." },
  { title: "Your Rights", content: "You have the right to: access your personal data, request data deletion, opt out of marketing communications, export your data, and lodge complaints with data protection authorities. To exercise these rights, contact us at privacy@cardperks.in." },
  { title: "Data Retention", content: "We retain your account data as long as your account is active. If you delete your account, we remove your personal data within 30 days, except where required by law. Anonymized usage data may be retained for analytics purposes." },
  { title: "Updates to This Policy", content: "We may update this privacy policy from time to time. We'll notify you of significant changes via email or in-app notification. Continued use of CardPerks after changes constitutes acceptance of the updated policy." },
];

export default function Privacy() {
  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Legal</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Privacy <span className="gold-gradient">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: February 2026</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-8 mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              At CardPerks, your privacy is fundamental to our mission. This policy explains what data we collect, how we use it, and how we protect it. We're committed to transparency and giving you control over your information.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="font-serif text-lg font-semibold mb-3 text-gold">{i + 1}. {s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10 text-center">
            <p className="text-xs text-muted-foreground">Questions? Contact us at <span className="text-gold">privacy@cardperks.in</span></p>
            <p className="text-xs text-muted-foreground mt-2">©2026 CardPerks. All rights reserved.</p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
