export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  bio: string;
  joinedDate: string;
  location: string;
  enrolledCourses: EnrolledCourse[];
  completedCourses: number;
  certificatesEarned: number;
  totalLearningHours: number;
}

export interface EnrolledCourse {
  slug: string;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  iconName: string;
  gradientFrom: string;
  gradientTo: string;
}

export const mockUser: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  initials: "AJ",
  avatarColor: "bg-indigo-100 text-indigo-700",
  bio: "Aspiring full-stack developer transitioning from a marketing career. Passionate about building beautiful web experiences and learning AI.",
  joinedDate: "2026-01-15",
  location: "San Francisco, CA",
  enrolledCourses: [
    {
      slug: "fullstack-web-dev",
      title: "Full-Stack Web Development Bootcamp",
      instructor: "Alex Rivera",
      progress: 68,
      lastAccessed: "2026-04-15",
      iconName: "Globe",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-violet-600",
    },
    {
      slug: "react-nextjs-mastery",
      title: "React & Next.js — Modern Frontend Mastery",
      instructor: "Priya Nair",
      progress: 35,
      lastAccessed: "2026-04-14",
      iconName: "Layers",
      gradientFrom: "from-amber-400",
      gradientTo: "to-orange-500",
    },
    {
      slug: "data-science-python",
      title: "Data Science & Analytics with Python",
      instructor: "James Okafor",
      progress: 100,
      lastAccessed: "2026-03-28",
      iconName: "BarChart2",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-cyan-500",
    },
  ],
  completedCourses: 1,
  certificatesEarned: 1,
  totalLearningHours: 47,
};
