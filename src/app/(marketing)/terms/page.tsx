import type { Metadata } from "next";
import { RevealBlock } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Terms of Service — Defense Academy",
  description: "Terms and conditions for using Defense Academy.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <RevealBlock className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: April 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing or using Defense Academy, you agree to be bound by
              these Terms of Service. If you do not agree, please do not use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              2. Account Registration
            </h2>
            <p className="mt-2">
              You must provide accurate and complete information when creating
              an account. You are responsible for maintaining the security of
              your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              3. Course Access
            </h2>
            <p className="mt-2">
              Upon enrollment, you receive a non-transferable license to access
              course materials for personal, non-commercial use. Course content
              may not be reproduced or distributed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              4. Refund Policy
            </h2>
            <p className="mt-2">
              We offer a full refund within 14 days of enrollment if you are
              not satisfied with a course. Refund requests can be submitted via
              your account dashboard or by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              5. Intellectual Property
            </h2>
            <p className="mt-2">
              All course content, trademarks, and materials are the property of
              Defense Academy and its instructors. Unauthorized use is
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              6. Contact
            </h2>
            <p className="mt-2">
              For questions about these terms, email us at legal@devpath.academy.
            </p>
          </section>
        </div>
      </RevealBlock>
    </div>
  );
}
