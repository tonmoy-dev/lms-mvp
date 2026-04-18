"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { courses } from "@/data/courses";

const STORAGE_KEY = "devpath-announcement-dismissed";

function getNextBatchDate(): string | null {
  const now = new Date();
  const upcoming = courses
    .filter((c) => c.nextBatch && new Date(c.nextBatch) > now)
    .sort(
      (a, b) =>
        new Date(a.nextBatch!).getTime() - new Date(b.nextBatch!).getTime()
    );

  if (upcoming.length === 0) return null;

  return new Date(upcoming[0].nextBatch!).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "true") {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  }

  if (dismissed) return null;

  const nextDate = getNextBatchDate();

  return (
    <div className="relative bg-emerald-600 px-4 py-2.5 text-center text-sm text-white">
      <p className="font-medium">
        {nextDate
          ? `New cohort starting ${nextDate} — seats filling fast. `
          : "New cohorts opening soon — don\u2019t miss out. "}
        <Link
          href="/courses"
          className="underline underline-offset-2 font-semibold hover:text-emerald-100 transition-colors"
        >
          Enroll Now &rarr;
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-emerald-500 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
