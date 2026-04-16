"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  id?: string;
}

function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-2 cursor-pointer group select-none"
    >
      <span className="relative shrink-0 mt-0.5">
        <input
          id={id}
          type="checkbox"
          className={cn(
            "peer h-4 w-4 appearance-none rounded border border-input bg-transparent transition-colors",
            "checked:bg-slate-900 checked:border-slate-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {/* Custom checkmark */}
        <svg
          className="pointer-events-none absolute inset-0 h-4 w-4 opacity-0 peer-checked:opacity-100 text-white"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M3.5 8L6.5 11L12.5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && (
        <span className="text-sm text-slate-600 leading-tight">{label}</span>
      )}
    </label>
  );
}

export { Checkbox };
