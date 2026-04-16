"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  LayoutDashboard,
  BookOpen,
  User,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const studentNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/courses", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: User },
];

const instructorNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Instructor Panel", href: "/instructor", icon: GraduationCap },
  { label: "Browse Courses", href: "/courses", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user?.role === "instructor" ? instructorNav : studentNav;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col transition-transform duration-200 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              DevPath<span className="text-indigo-600"> Academy</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User card */}
        {user && (
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0",
                  user.avatarColor
                )}
              >
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <span className="mt-0.5 inline-block rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {label}
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-white dark:bg-slate-900 px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <Code2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              DevPath<span className="text-indigo-500"> Academy</span>
            </span>
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
