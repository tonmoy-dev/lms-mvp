"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Code2, LayoutDashboard, User, LogOut, BookOpen, GraduationCap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchTrigger } from "@/components/ui/search-modal";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 backdrop-blur-md dark:bg-slate-950/90 dark:border-slate-800/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            DevPath<span className="text-indigo-600 dark:text-indigo-400"> Academy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <SearchTrigger />
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    user.avatarColor
                  )}
                >
                  {user.initials}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-24 truncate">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  {user.role === "instructor" && (
                    <Link
                      href="/instructor"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <GraduationCap className="h-4 w-4" />
                      Instructor Panel
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Browse Courses
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => { setDropdownOpen(false); signOut(); }}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-indigo-600 hover:bg-indigo-700 text-white"
                )}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                    <Code2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    DevPath<span className="text-indigo-600 dark:text-indigo-400"> Academy</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              {user && (
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2.5">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold", user.avatarColor)}>
                    {user.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="mt-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
                      Dashboard
                    </Link>
                    {user.role === "instructor" && (
                      <Link href="/instructor" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
                        Instructor Panel
                      </Link>
                    )}
                  </>
                )}
              </nav>

              <div className="mt-6 flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center text-red-600 border-red-200 hover:bg-red-50")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants(),
                        "w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white"
                      )}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
