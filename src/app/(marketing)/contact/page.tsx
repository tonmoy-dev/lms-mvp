import type { Metadata } from "next";
import { ContactClient } from "@/components/sections/contact-client";
import { RevealSection } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact Us — DevPath Academy",
  description: "Get in touch with the DevPath Academy team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <RevealSection className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Have a question, feedback, or partnership inquiry? We&apos;d love to
            hear from you.
          </p>
        </div>
      </RevealSection>
      <ContactClient />
    </div>
  );
}
