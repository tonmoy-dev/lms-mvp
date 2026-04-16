"use client";

import dynamic from "next/dynamic";

const HomeSections = dynamic(() => import("./home-sections"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[70vh] w-full animate-pulse bg-slate-50 dark:bg-slate-950"
      aria-hidden
    />
  ),
});

export default function HomePageLoader() {
  return <HomeSections />;
}
