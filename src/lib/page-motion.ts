import type { Transition, Variants } from "framer-motion";

/** Shared easing for marketing pages — short, neutral motion */
export const LIGHT_EASE = [0.25, 0.1, 0.25, 1] as const;

export function lightTransition(overrides?: Partial<Transition>): Transition {
  return {
    duration: 0.32,
    ease: LIGHT_EASE,
    ...overrides,
  };
}

/** Home hero: light stagger, small vertical travel */
export const homeHeroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const homeHeroItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: lightTransition(),
  },
};

/** Grids: minimal stagger between cards */
export const homeGridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

export const homeGridItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: lightTransition(),
  },
};

export const revealViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -40px 0px" as const,
};
