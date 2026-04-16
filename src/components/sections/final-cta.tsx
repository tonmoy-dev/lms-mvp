"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-700"
      />
      {/* Subtle dot pattern (CSS class — avoids hydration/extension inline-style drift) */}
      <div
        aria-hidden
        className="final-cta-dot-pattern absolute inset-0 -z-10 opacity-10"
      />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start Your Learning Journey Today
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-indigo-100">
            Join 28,000+ learners worldwide and take the first step toward a career
            in tech. Flexible courses, real projects, expert mentors.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full bg-white text-indigo-700 hover:bg-indigo-50 sm:w-auto"
              )}
            >
              Get Started Free <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-white/40 text-white hover:bg-white/10 sm:w-auto"
              )}
            >
              Browse Courses
            </Link>
          </div>

          <p className="mt-4 text-xs text-indigo-200">
            Free to join · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
