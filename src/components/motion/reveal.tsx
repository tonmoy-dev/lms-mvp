"use client";

import { motion, useReducedMotion } from "framer-motion";
import { lightTransition, revealViewport } from "@/lib/page-motion";

function makeRevealVariants(delay = 0) {
  return {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: lightTransition({ delay }),
    },
  };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds when multiple blocks enter the viewport together */
  delay?: number;
};

export function RevealSection({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className={className}
      variants={makeRevealVariants(delay)}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.section>
  );
}

export function RevealBlock({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={makeRevealVariants(delay)}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}
