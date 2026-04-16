import type { Metadata } from "next";
import { ProfileClient } from "@/components/sections/profile-client";
import { mockUser } from "@/data/user";

export const metadata: Metadata = {
  title: "My Profile — DevPath Academy",
  description: "View your learning progress and enrolled courses.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ProfileClient user={mockUser} />
    </div>
  );
}
