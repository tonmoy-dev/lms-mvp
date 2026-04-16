"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const perks = [
  "Set your own schedule and curriculum",
  "Earn 70% revenue on every enrollment",
  "Full platform support and marketing",
];

export function InstructorCta() {
  return (
    <section id="teach" className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center"
        >
          {/* Left copy */}
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
              For Educators &amp; Professionals
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Share Your Knowledge.{" "}
              <span className="text-indigo-400">Earn an Income.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Are you a software engineer, data scientist, or product specialist? Join
              DevPath Academy as an instructor and reach thousands of ambitious learners
              worldwide.
            </p>
            <ul className="mt-6 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 shrink-0 text-indigo-400" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA */}
          <div className="shrink-0">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
              )}
            >
              Apply to Teach <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
