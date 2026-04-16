export type CourseType = "Live" | "Bootcamp" | "Hybrid" | "Self-paced";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory =
  | "Web Development"
  | "Data Science"
  | "AI & Machine Learning"
  | "Cloud & DevOps"
  | "Cybersecurity";

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
    slug: "fullstack-web-dev",
    title: "Full-Stack Web Development Bootcamp",
    subtitle:
      "Master React, Node.js, PostgreSQL, and deploy production-ready apps from scratch.",
    category: "Web Development",
    type: "Bootcamp",
    level: "Beginner",
    language: "English",
    certificate: true,
    lessonCount: 48,
    studentCount: 3124,
    rating: 4.9,
    price: 199,
    originalPrice: 299,
    nextBatch: "2026-05-01",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-violet-600",
    iconName: "Globe",
    featured: true,
    instructor: {
      name: "Alex Rivera",
      initials: "AR",
      title: "Senior Software Engineer @ Stripe",
      bio: "Alex has 10+ years of full-stack engineering experience at startups and FAANG companies. He has mentored 500+ engineers and contributed to multiple open-source projects with 10k+ GitHub stars.",
      rating: 4.9,
      students: 5200,
      courses: 3,
      avatarColor: "bg-indigo-100 text-indigo-700",
    },
    about:
      "This comprehensive bootcamp takes you from zero to a production-ready developer. You will build three real-world projects — a SaaS dashboard, an e-commerce storefront, and a REST API — that you can immediately add to your portfolio. The curriculum covers HTML/CSS fundamentals, modern JavaScript (ES2024), React 19 with server components, Node.js/Express backends, PostgreSQL with Prisma ORM, authentication, deployment to Vercel and Render, and professional Git workflows.",
    whatYouLearn: [
      "Build pixel-perfect UIs with React 19 & Tailwind CSS",
      "Design and query relational databases with PostgreSQL",
      "Implement secure JWT and OAuth2 authentication",
      "Deploy full-stack apps to production on Vercel & Render",
      "Write clean, testable code with Jest & Vitest",
      "Use Git, GitHub, and CI/CD pipelines professionally",
    ],
    requirements: [
      "Basic computer literacy — no prior coding experience needed",
      "A laptop with internet access (Mac, Windows, or Linux)",
    ],
    curriculum: [
      {
        title: "Module 1 — Web Foundations",
        lessons: [
          { id: "l1", title: "How the Web Works", duration: "18 min", preview: true },
          { id: "l2", title: "HTML Structure & Semantics", duration: "32 min", preview: true },
          { id: "l3", title: "CSS Layouts: Flexbox & Grid", duration: "45 min" },
          { id: "l4", title: "Responsive Design Principles", duration: "28 min" },
        ],
      },
      {
        title: "Module 2 — JavaScript Essentials",
        lessons: [
          { id: "l5", title: "Variables, Types & Operators", duration: "22 min", preview: true },
          { id: "l6", title: "Functions & Closures", duration: "35 min" },
          { id: "l7", title: "Async JS: Promises & async/await", duration: "40 min" },
          { id: "l8", title: "DOM Manipulation", duration: "30 min" },
        ],
      },
      {
        title: "Module 3 — React 19",
        lessons: [
          { id: "l9", title: "Component Thinking", duration: "20 min" },
          { id: "l10", title: "State & Effects", duration: "38 min" },
          { id: "l11", title: "Server Components & Actions", duration: "44 min" },
          { id: "l12", title: "Project: SaaS Dashboard", duration: "90 min" },
        ],
      },
      {
        title: "Module 4 — Backend & Database",
        lessons: [
          { id: "l13", title: "Node.js & Express Fundamentals", duration: "36 min" },
          { id: "l14", title: "PostgreSQL & Prisma ORM", duration: "52 min" },
          { id: "l15", title: "REST API Design", duration: "28 min" },
          { id: "l16", title: "Authentication with JWT", duration: "42 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b1",
        name: "May 2026 Cohort",
        startDate: "2026-05-01",
        endDate: "2026-07-31",
        seats: 40,
        seatsLeft: 12,
        price: 199,
        originalPrice: 299,
      },
      {
        id: "b2",
        name: "August 2026 Cohort",
        startDate: "2026-08-01",
        endDate: "2026-10-31",
        seats: 40,
        seatsLeft: 40,
        price: 249,
      },
    ],
  },
  {
    slug: "ml-ai-fundamentals",
    title: "Machine Learning & AI Fundamentals",
    subtitle:
      "Learn the mathematical intuition and practical skills behind modern ML and AI systems.",
    category: "AI & Machine Learning",
    type: "Live",
    level: "Intermediate",
    language: "English",
    certificate: true,
    lessonCount: 32,
    studentCount: 1890,
    rating: 4.8,
    price: 249,
    originalPrice: 349,
    nextBatch: "2026-05-15",
    gradientFrom: "from-violet-500",
    gradientTo: "to-pink-500",
    iconName: "Brain",
    featured: true,
    instructor: {
      name: "Dr. Sarah Lin",
      initials: "SL",
      title: "ML Research Scientist @ Google DeepMind",
      bio: "Dr. Lin holds a PhD in Computer Science from MIT and has published 20+ papers in top ML conferences (NeurIPS, ICML). She leads a team building large language model infrastructure and has a passion for making AI education accessible.",
      rating: 4.9,
      students: 3800,
      courses: 2,
      avatarColor: "bg-violet-100 text-violet-700",
    },
    about:
      "This course demystifies machine learning and AI from the ground up. You'll build an intuitive understanding of how algorithms learn from data, implement models from scratch using NumPy, and then leverage PyTorch and scikit-learn for real projects. By the end you will have trained classification models, built a neural network, and deployed a simple ML API.",
    whatYouLearn: [
      "Understand the math behind linear & logistic regression",
      "Build and train neural networks with PyTorch",
      "Apply feature engineering and model evaluation techniques",
      "Use scikit-learn for classification, regression, and clustering",
      "Prevent overfitting with regularization and cross-validation",
      "Deploy an ML model as a REST API with FastAPI",
    ],
    requirements: [
      "Comfortable with Python (functions, loops, classes)",
      "Basic knowledge of high-school mathematics (algebra, statistics)",
    ],
    curriculum: [
      {
        title: "Module 1 — Math Refresher",
        lessons: [
          { id: "m1", title: "Linear Algebra Intuition", duration: "25 min", preview: true },
          { id: "m2", title: "Probability & Statistics Recap", duration: "30 min" },
          { id: "m3", title: "Calculus for Backprop", duration: "22 min" },
        ],
      },
      {
        title: "Module 2 — Classical ML",
        lessons: [
          { id: "m4", title: "Linear Regression from Scratch", duration: "40 min", preview: true },
          { id: "m5", title: "Logistic Regression & Decision Boundaries", duration: "35 min" },
          { id: "m6", title: "Decision Trees & Random Forests", duration: "38 min" },
          { id: "m7", title: "Clustering: K-Means & DBSCAN", duration: "32 min" },
        ],
      },
      {
        title: "Module 3 — Neural Networks",
        lessons: [
          { id: "m8", title: "Perceptrons & Activation Functions", duration: "28 min" },
          { id: "m9", title: "Backpropagation Deep Dive", duration: "42 min" },
          { id: "m10", title: "Convolutional Neural Networks", duration: "50 min" },
          { id: "m11", title: "Project: Image Classifier", duration: "75 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b3",
        name: "May 2026 Live Cohort",
        startDate: "2026-05-15",
        endDate: "2026-08-15",
        seats: 30,
        seatsLeft: 8,
        price: 249,
        originalPrice: 349,
      },
    ],
  },
  {
    slug: "data-science-python",
    title: "Data Science & Analytics with Python",
    subtitle:
      "Turn raw data into actionable insights using Pandas, NumPy, Matplotlib, and SQL.",
    category: "Data Science",
    type: "Hybrid",
    level: "Beginner",
    language: "English",
    certificate: true,
    lessonCount: 28,
    studentCount: 975,
    rating: 4.7,
    price: 179,
    originalPrice: 229,
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-500",
    iconName: "BarChart2",
    featured: true,
    instructor: {
      name: "James Okafor",
      initials: "JO",
      title: "Data Engineer @ Shopify",
      bio: "James is a data engineer with 8 years of experience building data pipelines and analytics systems at scale. He holds an MSc in Applied Statistics and runs a popular data science newsletter with 20k subscribers.",
      rating: 4.7,
      students: 2100,
      courses: 2,
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    about:
      "This course gives you a solid data science foundation with Python. You'll learn the full data workflow: loading and cleaning messy datasets, exploratory data analysis (EDA), statistical testing, visualization, and SQL for databases. Each module ends with a real dataset mini-project drawn from business, health, and sports analytics.",
    whatYouLearn: [
      "Wrangle and clean data with Pandas & NumPy",
      "Write SQL queries for analytics (GROUP BY, window functions, CTEs)",
      "Create compelling charts with Matplotlib and Seaborn",
      "Perform statistical tests and interpret p-values correctly",
      "Build interactive dashboards with Plotly & Streamlit",
      "Present data insights to non-technical stakeholders",
    ],
    requirements: [
      "Python basics (variables, lists, loops) — beginner-friendly",
      "No statistics knowledge required",
    ],
    curriculum: [
      {
        title: "Module 1 — Python for Data",
        lessons: [
          { id: "d1", title: "Python Data Types & Comprehensions", duration: "20 min", preview: true },
          { id: "d2", title: "NumPy Arrays & Broadcasting", duration: "30 min" },
          { id: "d3", title: "Pandas: DataFrames & Series", duration: "38 min" },
        ],
      },
      {
        title: "Module 2 — Data Cleaning & EDA",
        lessons: [
          { id: "d4", title: "Handling Missing Data", duration: "25 min", preview: true },
          { id: "d5", title: "Outlier Detection & Treatment", duration: "28 min" },
          { id: "d6", title: "Exploratory Data Analysis Workflow", duration: "40 min" },
        ],
      },
      {
        title: "Module 3 — Visualization",
        lessons: [
          { id: "d7", title: "Matplotlib: Anatomy of a Plot", duration: "22 min" },
          { id: "d8", title: "Seaborn for Statistical Plots", duration: "30 min" },
          { id: "d9", title: "Interactive Dashboards with Streamlit", duration: "45 min" },
          { id: "d10", title: "Project: Sales Analytics Dashboard", duration: "60 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b4",
        name: "Self-paced + Monthly Check-ins",
        startDate: "2026-05-01",
        endDate: "2026-08-01",
        seats: 50,
        seatsLeft: 35,
        price: 179,
        originalPrice: 229,
      },
    ],
  },
  {
    slug: "react-nextjs-mastery",
    title: "React & Next.js — Modern Frontend Mastery",
    subtitle:
      "Ship blazing-fast web apps with React 19, Next.js App Router, and TypeScript.",
    category: "Web Development",
    type: "Self-paced",
    level: "Intermediate",
    language: "English",
    certificate: true,
    lessonCount: 22,
    studentCount: 2450,
    rating: 4.9,
    price: 149,
    originalPrice: 199,
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    iconName: "Layers",
    featured: true,
    instructor: {
      name: "Priya Nair",
      initials: "PN",
      title: "Staff Frontend Engineer @ Vercel",
      bio: "Priya works on the Next.js team at Vercel and is a core contributor to the React ecosystem. She speaks at international conferences, maintains several popular npm packages, and is passionate about developer experience and web performance.",
      rating: 5.0,
      students: 4100,
      courses: 4,
      avatarColor: "bg-amber-100 text-amber-700",
    },
    about:
      "This course dives deep into the modern React and Next.js ecosystem. You'll master server components, streaming SSR, route handlers, React Server Actions, data fetching patterns, and the full App Router model. We also cover TypeScript, Tailwind CSS, and deployment to Vercel with edge functions. You'll build a production-quality SaaS app as the capstone project.",
    whatYouLearn: [
      "Use the Next.js 15 App Router confidently (layouts, loading, error boundaries)",
      "Distinguish between Server and Client Components and when to use each",
      "Fetch, cache, and revalidate data using Next.js built-in patterns",
      "Build type-safe APIs with Route Handlers and Zod validation",
      "Implement authentication with NextAuth.js v5",
      "Optimise Core Web Vitals and achieve 100 Lighthouse scores",
    ],
    requirements: [
      "Familiarity with HTML, CSS, and basic JavaScript",
      "Some React experience (hooks basics) is helpful but not required",
    ],
    curriculum: [
      {
        title: "Module 1 — React 19 Foundations",
        lessons: [
          { id: "r1", title: "JSX, Components & Props", duration: "18 min", preview: true },
          { id: "r2", title: "useState, useEffect & Custom Hooks", duration: "35 min" },
          { id: "r3", title: "Context API & Zustand", duration: "28 min" },
        ],
      },
      {
        title: "Module 2 — Next.js App Router",
        lessons: [
          { id: "r4", title: "File-based Routing & Layouts", duration: "22 min", preview: true },
          { id: "r5", title: "Server vs Client Components", duration: "40 min" },
          { id: "r6", title: "Data Fetching & Caching Strategies", duration: "36 min" },
          { id: "r7", title: "Route Handlers & Server Actions", duration: "38 min" },
        ],
      },
      {
        title: "Module 3 — Production Ready",
        lessons: [
          { id: "r8", title: "Auth with NextAuth.js v5", duration: "45 min" },
          { id: "r9", title: "Performance & Core Web Vitals", duration: "30 min" },
          { id: "r10", title: "Capstone: SaaS Starter", duration: "120 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b5",
        name: "Always Available (Self-paced)",
        startDate: "2026-01-01",
        endDate: "2099-12-31",
        seats: 9999,
        seatsLeft: 9999,
        price: 149,
        originalPrice: 199,
      },
    ],
  },
  {
    slug: "aws-cloud-practitioner",
    title: "AWS Cloud & DevOps for Developers",
    subtitle:
      "Deploy, scale, and monitor apps on AWS with EC2, S3, Lambda, RDS, and CI/CD pipelines.",
    category: "Cloud & DevOps",
    type: "Hybrid",
    level: "Intermediate",
    language: "English",
    certificate: true,
    lessonCount: 36,
    studentCount: 820,
    rating: 4.8,
    price: 219,
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    iconName: "Cloud",
    instructor: {
      name: "Omar Khalid",
      initials: "OK",
      title: "Cloud Architect @ AWS (Solutions Architect)",
      bio: "Omar is an AWS-certified Solutions Architect Professional with 12 years of cloud experience. He has designed infrastructure for companies serving millions of users and holds 6 AWS certifications.",
      rating: 4.8,
      students: 1500,
      courses: 2,
      avatarColor: "bg-sky-100 text-sky-700",
    },
    about:
      "This practical course walks through the most important AWS services for application developers. You will provision servers, store files at scale, build serverless functions, set up databases, and wire up GitHub Actions for automated deployments. By the end you will have a fully deployed, production-grade application running in the cloud.",
    whatYouLearn: [
      "Launch and secure EC2 instances and VPCs",
      "Store and serve files globally with S3 and CloudFront",
      "Build serverless APIs with AWS Lambda and API Gateway",
      "Set up managed databases with RDS and DynamoDB",
      "Automate deployments with GitHub Actions & CodePipeline",
      "Monitor and alert with CloudWatch",
    ],
    requirements: [
      "Comfortable using the command line (bash basics)",
      "Previous experience deploying a web app (any stack)",
    ],
    curriculum: [
      {
        title: "Module 1 — AWS Core Services",
        lessons: [
          { id: "a1", title: "IAM, Regions & Availability Zones", duration: "20 min", preview: true },
          { id: "a2", title: "EC2 & Security Groups", duration: "35 min" },
          { id: "a3", title: "S3 Buckets & Policies", duration: "28 min" },
        ],
      },
      {
        title: "Module 2 — Serverless & Databases",
        lessons: [
          { id: "a4", title: "AWS Lambda & API Gateway", duration: "40 min", preview: true },
          { id: "a5", title: "RDS PostgreSQL on AWS", duration: "32 min" },
          { id: "a6", title: "DynamoDB Fundamentals", duration: "30 min" },
        ],
      },
      {
        title: "Module 3 — CI/CD & Monitoring",
        lessons: [
          { id: "a7", title: "GitHub Actions for AWS Deployments", duration: "38 min" },
          { id: "a8", title: "CloudWatch Logs & Alarms", duration: "25 min" },
          { id: "a9", title: "Capstone: Deploy a Full-Stack App", duration: "90 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b6",
        name: "June 2026 Cohort",
        startDate: "2026-06-01",
        endDate: "2026-08-31",
        seats: 25,
        seatsLeft: 20,
        price: 219,
      },
    ],
  },
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity & Ethical Hacking Fundamentals",
    subtitle:
      "Understand attacker mindsets, secure web applications, and prepare for CompTIA Security+.",
    category: "Cybersecurity",
    type: "Self-paced",
    level: "Beginner",
    language: "English",
    certificate: true,
    lessonCount: 30,
    studentCount: 640,
    rating: 4.7,
    price: 169,
    originalPrice: 219,
    gradientFrom: "from-rose-400",
    gradientTo: "to-red-600",
    iconName: "Shield",
    instructor: {
      name: "Nina Vasquez",
      initials: "NV",
      title: "Penetration Tester & OSCP Certified",
      bio: "Nina is an offensive security specialist with 8 years of bug bounty and pentesting experience. She has reported critical vulnerabilities to Google, Facebook, and Twitter. She holds OSCP, CEH, and CompTIA Security+ certifications.",
      rating: 4.8,
      students: 1200,
      courses: 2,
      avatarColor: "bg-rose-100 text-rose-700",
    },
    about:
      "This beginner-friendly course builds a solid cybersecurity foundation. You'll learn how common attacks work (SQL injection, XSS, CSRF, phishing, man-in-the-middle), how to defend against them, and how penetration testers think. Labs are conducted in a safe, isolated environment using Kali Linux and deliberately vulnerable apps (DVWA, HackTheBox).",
    whatYouLearn: [
      "Identify and exploit common web vulnerabilities (OWASP Top 10)",
      "Perform network reconnaissance with Nmap and Wireshark",
      "Conduct ethical hacking labs safely with Kali Linux",
      "Implement HTTPS, CSP headers, and input validation correctly",
      "Understand cryptography: symmetric, asymmetric, and hashing",
      "Prepare for CompTIA Security+ exam objectives",
    ],
    requirements: [
      "No prior security experience needed",
      "Basic networking knowledge (IP addresses, HTTP) is helpful",
    ],
    curriculum: [
      {
        title: "Module 1 — Security Foundations",
        lessons: [
          { id: "s1", title: "CIA Triad & Security Concepts", duration: "20 min", preview: true },
          { id: "s2", title: "Networking for Hackers", duration: "28 min" },
          { id: "s3", title: "Setting Up Your Lab (Kali Linux)", duration: "15 min", preview: true },
        ],
      },
      {
        title: "Module 2 — Web Attacks",
        lessons: [
          { id: "s4", title: "OWASP Top 10 Overview", duration: "30 min" },
          { id: "s5", title: "SQL Injection — Hands-on Lab", duration: "45 min" },
          { id: "s6", title: "XSS & CSRF Attacks", duration: "38 min" },
        ],
      },
      {
        title: "Module 3 — Defensive Security",
        lessons: [
          { id: "s7", title: "Secure Coding Practices", duration: "32 min" },
          { id: "s8", title: "Cryptography Essentials", duration: "35 min" },
          { id: "s9", title: "Incident Response Basics", duration: "25 min" },
        ],
      },
    ],
    batches: [
      {
        id: "b7",
        name: "Always Available (Self-paced)",
        startDate: "2026-01-01",
        endDate: "2099-12-31",
        seats: 9999,
        seatsLeft: 9999,
        price: 169,
        originalPrice: 219,
      },
    ],
  },
];

export const categories: { label: CourseCategory | "All"; count: number }[] = [
  { label: "All", count: courses.length },
  { label: "Web Development", count: courses.filter((c) => c.category === "Web Development").length },
  { label: "Data Science", count: courses.filter((c) => c.category === "Data Science").length },
  { label: "AI & Machine Learning", count: courses.filter((c) => c.category === "AI & Machine Learning").length },
  { label: "Cloud & DevOps", count: courses.filter((c) => c.category === "Cloud & DevOps").length },
  { label: "Cybersecurity", count: courses.filter((c) => c.category === "Cybersecurity").length },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
