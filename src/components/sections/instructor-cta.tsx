"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lightTransition } from "@/lib/page-motion";

const perks = [
  "Train the future leaders of the armed forces",
  "Flexible schedule and competitive remuneration",
  "Contribute directly to national defense excellence",
];

export function InstructorCta() {
  return (
    <section id="teach" className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={lightTransition()}
          className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center"
        >
          {/* Left copy */}
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              For Ex-Officers &amp; Psychologists
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Share Your Experience.{" "}
              <span className="text-emerald-400">Guide the Future.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Are you an Ex-Officer or a certified psychologist? Join Defense Academy as a mentor and guide ambitious candidates towards success in their armed forces journey.
            </p>
            <ul className="mt-6 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
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
                "gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
              )}
            >
              Apply as Mentor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
