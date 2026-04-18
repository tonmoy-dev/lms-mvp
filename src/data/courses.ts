export type CourseType = "Live" | "Offline" | "Hybrid" | "Self-paced" | "Test";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory =
  | "ISSB Preparation"
  | "Preliminary"
  | "Written Test"
  | "Screening Test";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  preview?: boolean;
}

export interface CurriculumSection {
  title: string;
  lessons: Lesson[];
}

export interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  seats: number;
  seatsLeft: number;
  price: number;
  originalPrice?: number;
}

export interface Instructor {
  name: string;
  initials: string;
  title: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  avatarColor: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  type: CourseType;
  level: CourseLevel;
  language: string;
  certificate: boolean;
  lessonCount: number;
  studentCount: number;
  rating: number;
  price: number;
  originalPrice?: number;
  nextBatch?: string;
  gradientFrom: string;
  gradientTo: string;
  iconName: string;
  instructor: Instructor;
  about: string;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  batches: Batch[];
  featured?: boolean;
}

export const courses: Course[] = [
  {
    slug: "regular-offline-issb",
    title: "Regular Offline ISSB Course",
    subtitle:
      "Comprehensive offline training up to your ISSB exam with specialized mentors.",
    category: "ISSB Preparation",
    type: "Offline",
    level: "Intermediate",
    language: "Bengali",
    certificate: true,
    lessonCount: 40,
    studentCount: 1520,
    rating: 4.9,
    price: 8000,
    originalPrice: 9000,
    nextBatch: "Next Monday",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    iconName: "Shield",
    featured: true,
    instructor: {
      name: "M Asif Rahman",
      initials: "AR",
      title: "Founder & CEO, Ex Officer Cadet BAF",
      bio: "M Asif Rahman is an ex-Officer Cadet of the Bangladesh Air Force, author of the SNIPER Series, and a passionate educator committed to building the next generation of patriots and professionals.",
      rating: 4.9,
      students: 5200,
      courses: 5,
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    about:
      "Defense Academy's flagship offline ISSB course designed to rigorously train you for the Bangladesh Armed Forces selection process. Our extensive curriculum covers IQ tests, psychological profiling, physical training, and practical group tasks.",
    whatYouLearn: [
      "Master Psychological Tests (WAT, SRT, SDT)",
      "Excel in Progressive Group Tasks (PGT) and Half Group Tasks (HGT)",
      "Develop strong leadership and communication skills",
      "Participate in mock interviews with ex-officers",
      "Improve physical fitness and stamina",
    ],
    requirements: [
      "Eligible to apply for Bangladesh Armed Forces",
      "Dedication and physical fitness",
    ],
    curriculum: [
      {
        title: "Module 1 — IQ & Screening",
        lessons: [
          { id: "l1", title: "Verbal Intelligence", duration: "1.5 hours", preview: true },
          { id: "l2", title: "Non-Verbal Intelligence", duration: "2.0 hours", preview: true },
        ],
      },
      {
        title: "Module 2 — Psychology",
        lessons: [
          { id: "l3", title: "Word Association Test (WAT)", duration: "2 hours" },
          { id: "l4", title: "Situation Reaction Test (SRT)", duration: "2 hours" },
        ],
      },
    ],
    batches: [
      {
        id: "b1",
        name: "Upcoming Batch (Kochukhet)",
        startDate: "Rolling Admission",
        endDate: "Until ISSB Date",
        seats: 30,
        seatsLeft: 10,
        price: 8000,
        originalPrice: 9000,
      },
    ],
  },
  {
    slug: "regular-online-issb",
    title: "Regular Online ISSB Course",
    subtitle:
      "Complete ISSB preparation from the comfort of your home.",
    category: "ISSB Preparation",
    type: "Live",
    level: "Intermediate",
    language: "Bengali",
    certificate: true,
    lessonCount: 35,
    studentCount: 890,
    rating: 4.8,
    price: 8000,
    originalPrice: 9000,
    nextBatch: "Rolling Admission",
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    iconName: "Globe",
    featured: true,
    instructor: {
      name: "M Asif Rahman",
      initials: "AR",
      title: "Founder & CEO, Ex Officer Cadet BAF",
      bio: "M Asif Rahman is an ex-Officer Cadet of the Bangladesh Air Force, author of the SNIPER Series, and a passionate educator.",
      rating: 4.9,
      students: 5200,
      courses: 5,
      avatarColor: "bg-sky-100 text-sky-700",
    },
    about:
      "For candidates outside Dhaka, our online ISSB course offers the same rigorous theoretical and psychological training through interactive live sessions.",
    whatYouLearn: [
      "Understand ISSB testing structure thoroughly",
      "Practice IQ and Psychological assessments online",
      "Live mock interviews and feedback sessions",
      "Guidance for physical preparation at home",
    ],
    requirements: [
      "Stable internet connection",
      "Commitment to daily practice",
    ],
    curriculum: [
      {
        title: "Module 1 — Live IQ Training",
        lessons: [
          { id: "o1", title: "OIR Practice Test", duration: "1 hour", preview: true },
          { id: "o2", title: "PP&DT Explanation", duration: "1.5 hours" },
        ],
      },
    ],
    batches: [
      {
        id: "b2",
        name: "Online Cohort",
        startDate: "Join anytime",
        endDate: "Until ISSB Date",
        seats: 50,
        seatsLeft: 15,
        price: 8000,
        originalPrice: 9000,
      },
    ],
  },
  {
    slug: "oc-asif-special-recorded",
    title: "OC Asif's Special ISSB Recorded Course",
    subtitle:
      "A tailored recorded course featuring insights directly from the founder.",
    category: "ISSB Preparation",
    type: "Self-paced",
    level: "Intermediate",
    language: "Bengali",
    certificate: false,
    lessonCount: 20,
    studentCount: 3100,
    rating: 4.9,
    price: 4080,
    originalPrice: 5000,
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    iconName: "Video",
    featured: true,
    instructor: {
      name: "M Asif Rahman",
      initials: "AR",
      title: "Founder & CEO, Ex Officer Cadet BAF",
      bio: "M Asif Rahman is an ex-Officer Cadet of the Bangladesh Air Force.",
      rating: 4.9,
      students: 5200,
      courses: 5,
      avatarColor: "bg-amber-100 text-amber-700",
    },
    about:
      "Get exclusive access to OC Asif's personal tips, tricks, and strategies for clearing the ISSB exam in this highly requested recorded bundle.",
    whatYouLearn: [
      "Exclusive strategies for psychological tests",
      "Common mistakes to avoid during group discussions",
      "How to write effective self-descriptions",
    ],
    requirements: ["No special requirements"],
    curriculum: [
      {
        title: "Module 1 — Fundamentals",
        lessons: [
          { id: "r1", title: "Introduction to ISSB", duration: "30 min", preview: true },
          { id: "r2", title: "Psychology Deep Dive", duration: "45 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b3",
        name: "Self Paced Access",
        startDate: "Immediate",
        endDate: "Lifetime",
        seats: 9999,
        seatsLeft: 9999,
        price: 4080,
        originalPrice: 5000,
      },
    ],
  },
  {
    slug: "issb-screening-test",
    title: "ISSB Screening Test Mock",
    subtitle:
      "Test your preparation level with our simulated screening test.",
    category: "Screening Test",
    type: "Test",
    level: "Beginner",
    language: "English/Bengali",
    certificate: false,
    lessonCount: 1,
    studentCount: 450,
    rating: 4.6,
    price: 1000,
    gradientFrom: "from-rose-400",
    gradientTo: "to-red-600",
    iconName: "FileText",
    instructor: {
      name: "PFDA Assessment Team",
      initials: "PT",
      title: "Assessment Experts",
      bio: "Our internal team of experts who evaluate candidates based on armed forces standards.",
      rating: 4.6,
      students: 2000,
      courses: 2,
      avatarColor: "bg-rose-100 text-rose-700",
    },
    about:
      "A complete simulation of the first day screening test at the ISSB, including OIR and PP&DT evaluations.",
    whatYouLearn: [
      "Familiarize yourself with the exam pressure",
      "Get detailed feedback on PP&DT",
    ],
    requirements: ["Basic knowledge of ISSB screening"],
    curriculum: [
      {
        title: "Mock Exam",
        lessons: [
          { id: "t1", title: "Full Screening Test", duration: "3 hours", preview: false },
        ],
      },
    ],
    batches: [
      {
        id: "b4",
        name: "Weekly Mock",
        startDate: "Every Friday",
        endDate: "Every Friday",
        seats: 100,
        seatsLeft: 45,
        price: 1000,
      },
    ],
  },
  {
    slug: "briefing-classes-candidates",
    title: "Briefing Classes For All Candidates",
    subtitle:
      "A rapid crash course briefing all candidates on essential dos and don'ts.",
    category: "Preliminary",
    type: "Hybrid",
    level: "Beginner",
    language: "Bengali",
    certificate: false,
    lessonCount: 5,
    studentCount: 650,
    rating: 4.7,
    price: 3060,
    originalPrice: 4080,
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-500",
    iconName: "Target",
    instructor: {
      name: "Pathfinder Mentors",
      initials: "PM",
      title: "Senior Instructors",
      bio: "Dedicated team of ex-military personnel and psychologists.",
      rating: 4.8,
      students: 3000,
      courses: 3,
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    about:
      "Short on time? Join our briefing classes designed as a rapid course to give you the most critical information before your exam.",
    whatYouLearn: [
      "The absolute essentials of ISSB",
      "Immediate corrections to common physical test errors",
    ],
    requirements: ["Upcoming ISSB call up"],
    curriculum: [
      {
        title: "Briefing Series",
        lessons: [
          { id: "bc1", title: "Day 1 to Day 4 Overview", duration: "2 hours", preview: true },
        ],
      },
    ],
    batches: [
      {
        id: "b5",
        name: "Rapid Batch",
        startDate: "Every Monday",
        endDate: "Every Wednesday",
        seats: 40,
        seatsLeft: 12,
        price: 3060,
        originalPrice: 4080,
      },
    ],
  },
];

export const categories: { label: CourseCategory | "All"; count: number }[] = [
  { label: "All", count: courses.length },
  { label: "ISSB Preparation", count: courses.filter((c) => c.category === "ISSB Preparation").length },
  { label: "Preliminary", count: courses.filter((c) => c.category === "Preliminary").length },
  { label: "Written Test", count: courses.filter((c) => c.category === "Written Test").length },
  { label: "Screening Test", count: courses.filter((c) => c.category === "Screening Test").length },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
