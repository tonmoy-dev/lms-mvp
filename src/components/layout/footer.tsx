"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Web Development", href: "/courses?category=Web+Development" },
  { label: "Data Science", href: "/courses?category=Data+Science" },
  { label: "Machine Learning & AI", href: "/courses?category=AI+%26+Machine+Learning" },
  { label: "Cloud & DevOps", href: "/courses?category=Cloud+%26+DevOps" },
  { label: "Cybersecurity", href: "/courses?category=Cybersecurity" },
];

const support = [
  { label: "Help Center", href: "/contact" },
  { label: "Student Guide", href: "/about" },
  { label: "Teach with DevPath", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/terms" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-slate-200">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-slate-400 transition-colors hover:text-slate-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      toast.success("You're subscribed!", {
        description: "You'll receive course updates and dev tips.",
      });
    }
  }

  return (
    <footer className="bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-slate-800 pb-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand + Newsletter col (spans 2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                DevPath<span className="text-indigo-400"> Academy</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Empowering tech professionals worldwide through industry-relevant,
              project-based education.
            </p>

            <h4 className="mb-2 text-sm font-semibold text-slate-200">
              Stay updated with new courses &amp; cohorts
            </h4>
            <p className="mb-3 text-xs text-slate-500">
              No spam. Only course launches, cohort openings, and dev tips.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-indigo-400">
                You&apos;re subscribed!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-700 bg-slate-800 text-slate-200 placeholder-slate-500 focus-visible:ring-indigo-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 bg-indigo-600 hover:bg-indigo-500"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Categories" links={categories} />
          <FooterLinkGroup title="Support" links={support} />
          <FooterLinkGroup title="Legal" links={legal} />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} DevPath Academy. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with Next.js &middot; Tailwind CSS &middot; shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
