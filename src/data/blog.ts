export interface BlogAuthor {
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-issb-2026",
    title: "How to Prepare for ISSB in 2026: A Complete Roadmap",
    excerpt:
      "The ISSB selection process is rigorous and demanding. Here's your updated guide to going from a beginner to a recommended candidate.",
    content: `
## Why Early Preparation is Crucial

In 2026, the competition for armed forces selection is higher than ever. It's not just about physical fitness; it's about your psychological profile, leadership qualities, and intellectual capabilities.

## The Preparation Stack

**Step 1: Physical Fitness (Ongoing)**

Don't skip this. Every shortcut here will cost you. Build stamina through daily running, push-ups, sit-ups, and chin-ups. Your physical agility is tested directly in the ISSB ground tasks.

**Step 2: Psychological Tests (4 weeks)**

The Word Association Test (WAT), Sentence Completion Test (SCT), and Picture Perception and Description Test (PP&DT) are the core of the psychological assessment. Practice writing positive, constructive, and action-oriented responses.

**Step 3: Group Tasks (3 weeks)**

Learn how to cooperate in a team. In the Progressive Group Task (PGT) and Half Group Task (HGT), your ability to lead without dominating and to follow without being passive is evaluated.

**Step 4: Interview Preparation (4 weeks)**

Be honest, be confident. Prepare answers regarding your family background, educational history, general knowledge, and current affairs. Remember, the interviewers are looking for integrity and officer-like qualities.

## How to Get Recommended

Consistency is key. The candidates who get recommended aren't always the ones who perform the best in a single task, but those who show consistent Officer Like Qualities (OLQs) throughout the 4 days.
    `.trim(),
    author: {
      name: "M Asif Rahman",
      initials: "AR",
      avatarColor: "bg-emerald-100 text-emerald-700",
      role: "Ex Officer Cadet, Founder & CEO",
    },
    category: "Preparation",
    publishedAt: "2026-04-10",
    readTime: "6 min read",
    tags: ["ISSB", "Army", "Preparation"],
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    featured: true,
  },
  {
    slug: "understanding-issb-psychology",
    title: "Understanding ISSB Psychology: Tips for Success",
    excerpt:
      "The psychological evaluation is often the most misunderstood part of ISSB. Here is how you can prepare for it effectively.",
    content: `
## The Core of the Psychological Assessment

The psychological tests are designed to reveal your subconscious mind. It's impossible to fake your personality consistently across all the tests.

## What You Actually Need to Know

You do NOT need to be a psychologist. But you do need a working understanding of:

- **Word Association Test (WAT)**: Respond with the first positive thought that comes to mind.
- **Thematic Apperception Test (TAT)**: Write stories that show problem-solving, leadership, and a positive outcome.
- **Self Description Test (SDT)**: Be honest about your strengths and weaknesses. Show how you are working on your weaknesses.

## The Learning Path

**Phase 1: Self-Reflection**

Spend time understanding yourself. Ask your friends and family for honest feedback.

**Phase 2: Practice Under Pressure**

The tests are time-bound. Practice writing stories and sentences with a stopwatch.

**Phase 3: Seek Professional Feedback**

This is where a mentor comes in. Have an expert review your responses to identify any negative traits you might be projecting unintentionally.
    `.trim(),
    author: {
      name: "M Asif Rahman",
      initials: "AR",
      avatarColor: "bg-emerald-100 text-emerald-700",
      role: "Ex Officer Cadet, Founder & CEO",
    },
    category: "Psychology",
    publishedAt: "2026-04-05",
    readTime: "5 min read",
    tags: ["Psychology", "ISSB", "Mindset"],
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-500",
    featured: true,
  },
  {
    slug: "physical-training-guide",
    title: "Physical Training Guide for Armed Forces Candidates",
    excerpt:
      "Physical fitness is a prerequisite for a career in the armed forces. Learn the essential exercises and routines to pass the physical tests.",
    content: `
## The Importance of Fitness

In the armed forces, your physical fitness is your lifeline. The ISSB physical tests are designed to evaluate your stamina, agility, and courage.

## The Daily Routine

**Morning Run:** Start with a 2km run and gradually increase it to 5km. Focus on building endurance.

**Core Strength:** Push-ups, sit-ups, and chin-ups are mandatory. Set daily targets and increase them weekly.

**Obstacle Course Prep:** Practice balancing, jumping over ditches, and climbing ropes if you have access to a training facility.

## Nutrition and Rest

Fitness is 50% exercise and 50% diet and rest. Maintain a balanced diet rich in protein and ensure you get 7-8 hours of sleep daily. Overtraining can lead to injuries, so listen to your body.
    `.trim(),
    author: {
      name: "PFDA Training Team",
      initials: "PT",
      avatarColor: "bg-teal-100 text-teal-700",
      role: "Physical Training Instructors",
    },
    category: "Fitness",
    publishedAt: "2026-03-28",
    readTime: "4 min read",
    tags: ["Fitness", "Training", "Health"],
    gradientFrom: "from-teal-400",
    gradientTo: "to-emerald-600",
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
