import type { Metadata } from "next";
import { RevealBlock } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — Defense Academy",
  description: "How Defense Academy collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <RevealBlock className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: April 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p className="mt-2">
              We collect information you provide directly when you create an
              account, enroll in courses, or contact our support team. This
              includes your name, email address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="mt-2">
              We use the information to provide and improve our services,
              process transactions, communicate with you about your account, and
              personalize your learning experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              3. Data Protection
            </h2>
            <p className="mt-2">
              We implement industry-standard security measures to protect your
              personal information. All data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              4. Your Rights
            </h2>
            <p className="mt-2">
              You have the right to access, update, or delete your personal
              data at any time. Contact us at privacy@devpath.academy for any
              data-related requests.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              5. Contact
            </h2>
            <p className="mt-2">
              For questions about this policy, email us at
              privacy@devpath.academy.
            </p>
          </section>
        </div>
      </RevealBlock>
    </div>
  );
}
