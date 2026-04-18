"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { homeHeroContainerVariants, homeHeroItemVariants } from "@/lib/page-motion";
import { CheckCircle, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  { value: 28000, suffix: "+", label: "Active Learners" },
  { value: 120, suffix: "+", label: "Expert Courses" },
  { value: 4.9, suffix: "★", label: "Avg. Rating", isFloat: true },
];

const trustBadges = [
  { icon: CheckCircle, text: "ISSB Preparation" },
  { icon: Sparkles, text: "Preliminary Training" },
  { icon: BookOpen, text: "Expert Mentorship" },
  { icon: CheckCircle, text: "High Success Rate" },
];

function useCountUp(target: number, duration = 1800, isFloat = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, isFloat]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  isFloat,
}: {
  value: number;
  suffix: string;
  label: string;
  isFloat?: boolean;
}) {
  const count = useCountUp(value, 1800, isFloat);
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-slate-900 dark:text-white">
        {isFloat ? count.toFixed(1) : count.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pb-20 pt-16">
      {/* Soft background gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-emerald-200 via-teal-100 to-pink-100 opacity-40"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={homeHeroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badge */}
          <motion.div variants={homeHeroItemVariants} className="mb-6 flex justify-center">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-emerald-700 text-sm font-medium"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by thousands of successful candidates
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={homeHeroItemVariants}
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Fulfill Your Dream of{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Becoming an Officer
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={homeHeroItemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400"
          >
            Join Defense Academy, founded by Ex-Officer Cadet M Asif Rahman. 
            We provide the best preparation for Bangladesh Army, Navy, and Air Force recruitment.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={homeHeroItemVariants}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/courses"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
              )}
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-slate-300 text-slate-700 hover:border-emerald-400 hover:text-emerald-600 sm:w-auto"
              )}
            >
              Check Eligibility
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={homeHeroItemVariants}
            className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={homeHeroItemVariants}
            className="mt-10 border-t border-slate-100 pt-8"
          >
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {trustBadges.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Icon className="h-4 w-4 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
