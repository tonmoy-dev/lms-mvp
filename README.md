# LMS MVP - Codebase Architecture & Overview

This document provides a comprehensive overview of the Defense Academy LMS (Learning Management System) MVP codebase.

## Technology Stack
- **Framework:** Next.js 16.2.3 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS v4, Base UI, Shadcn UI
- **Animations:** Framer Motion (`framer-motion`), Tailwind Animate (`tw-animate-css`)
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast notifications)
- **Language:** TypeScript

## Application Structure (App Router Route Groups)
The application uses Next.js Route Groups (`(...)`) to organize different parts of the application logically without affecting the URL structure:

- `(marketing)`: The public-facing website.
  - Contains pages like Home, About, Blog, Contact, Courses, Privacy, Terms, and Profile.
  - The homepage dynamically loads sections from `src/components/sections`.
- `(auth)`: Authentication related pages.
  - Contains `signin`, `register`, and `forgot-password` flows.
- `(dashboard)`: Authenticated user views.
  - `dashboard`: Student dashboard area.
  - `instructor`: Instructor-specific dashboard area.
- `(player)`: The learning interface.
  - `learn`: Course consumption interface/video player for enrolled students.

## Source Code Directories (`src/`)

- `app/`: Next.js App Router root, containing the route groups, `layout.tsx` (RootLayout with ThemeProvider & AuthProvider), and global CSS.
- `components/`: 
  - `layout/`: Global layout components like `Navbar`, `Footer`, and `AnnouncementBar`.
  - `sections/`: Reusable page sections (e.g., `Hero`, `FeaturedCourses`, `Testimonials`, `WhyChooseUs`).
  - `ui/`: Core UI components (Shadcn UI base components).
  - `providers/`: Context providers (`theme-provider`, `auth-provider`).
  - `skeletons/`: Loading placeholders for dynamically imported components.
  - `motion/`: Wrapper components for Framer Motion animations.
- `data/`: Mock data files serving as a temporary database for the MVP demo.
  - `courses.ts`: Mock course listings and details.
  - `blog.ts`: Mock blog posts.
  - `reviews.ts`: Mock user reviews/testimonials.
  - `user.ts`: Mock user profiles and authentication data.
- `lib/`: Utility functions and shared logic.
  - `auth.ts`: Authentication utilities.
  - `course-utils.tsx`: Helpers for course-related operations.
  - `page-motion.ts`: Shared animation variants/utilities.
  - `utils.ts`: General helper functions (e.g., for Tailwind class merging).

## Key Concepts & Patterns

1. **Static/Demo Nature:** The site uses static mock data from `src/data` simulating backend APIs. 
2. **Dynamic Imports:** The homepage (`src/app/(marketing)/home-sections.tsx`) makes heavy use of Next.js `dynamic` imports with skeleton fallbacks to optimize initial load times.
3. **Theming:** The application supports dark/light mode, managed via `next-themes` (`ThemeProvider`).
4. **Authentication State:** A mock `AuthProvider` is set up in `src/components/providers/auth-provider.tsx` to handle frontend user state across the app.

---

*This file was generated based on the current state of the application to assist with future modifications.*
