import {
  Globe,
  Brain,
  BarChart2,
  Layers,
  Cloud,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CourseType } from "@/data/courses";

/** Icon component constructors — use as <IconComp className="..." /> */
export const courseIconComponents: Record<string, LucideIcon> = {
  Globe,
  Brain,
  BarChart2,
  Layers,
  Cloud,
  Shield,
};

/** Pre-rendered small icons (h-8 w-8) — use as {courseIconMap[key]} */
export const courseIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-8 w-8" />,
  Brain: <Brain className="h-8 w-8" />,
  BarChart2: <BarChart2 className="h-8 w-8" />,
  Layers: <Layers className="h-8 w-8" />,
  Cloud: <Cloud className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
};

/** Pre-rendered large icons (h-10 w-10) — use as {courseIconMapLg[key]} */
export const courseIconMapLg: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-10 w-10" />,
  Brain: <Brain className="h-10 w-10" />,
  BarChart2: <BarChart2 className="h-10 w-10" />,
  Layers: <Layers className="h-10 w-10" />,
  Cloud: <Cloud className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
};

export const courseTypeStyles: Record<CourseType, string> = {
  Live: "bg-red-100 text-red-700 border-red-200",
  Bootcamp: "bg-violet-100 text-violet-700 border-violet-200",
  Hybrid: "bg-amber-100 text-amber-700 border-amber-200",
  "Self-paced": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export const courseLevelStyles: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};
