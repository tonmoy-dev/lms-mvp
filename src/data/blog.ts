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
    slug: "how-to-learn-web-development-in-2026",
    title: "How to Learn Web Development in 2026: A Complete Roadmap",
    excerpt:
      "The web development landscape has changed dramatically. Here's your updated, opinionated guide to going from zero to job-ready in the most efficient way possible.",
    content: `
## Why Web Development Is Still the Best First Skill

In 2026, web development remains the most in-demand technical skill worldwide. Despite AI tools handling more code generation than ever, companies still need skilled engineers to architect, review, and ship products. The demand gap has actually widened — there are more jobs than qualified candidates.

## The Modern Stack You Should Learn

**Step 1: HTML, CSS & JavaScript Fundamentals (4–6 weeks)**

Don't skip this. Every shortcut here will cost you three times later. Learn how the DOM works, how CSS cascade and specificity work, and how JavaScript handles asynchrony. These fundamentals underpin everything else.

**Step 2: React (4 weeks)**

React is still the king of UI libraries. Learn hooks (useState, useEffect, custom hooks), component composition, and state management. Skip class components entirely.

**Step 3: Next.js App Router (3 weeks)**

Once you understand React, Next.js is the natural next step. The App Router paradigm — server components, layouts, streaming — is the present and future of React development.

**Step 4: Backend Basics (4 weeks)**

Learn Node.js with Express or Hono, understand REST API design, and get comfortable with SQL (PostgreSQL is the default choice). You don't need to become a backend specialist, but you need to speak the language.

**Step 5: TypeScript (ongoing)**

Add TypeScript to everything you build from Step 2 onward. It slows you down for two weeks and then speeds you up forever.

## The Tools That Actually Matter

- **Version control**: Git + GitHub (non-negotiable)
- **Deployment**: Vercel for frontend, Railway or Render for backend
- **Database**: Supabase or PlanetScale for hosted Postgres
- **AI assistant**: GitHub Copilot or Cursor IDE (learn to use AI tools, not depend on them)

## How to Get Your First Job

Build three projects that solve real problems. Not todo apps, not weather apps — real things you'd actually use. Deploy them. Write a README. Get feedback on GitHub. Then apply widely: 100 applications, not 5.

The developers who get hired aren't always the most technically skilled. They're the ones who can communicate, ship code, and learn fast.
    `.trim(),
    author: {
      name: "Alex Rivera",
      initials: "AR",
      avatarColor: "bg-indigo-100 text-indigo-700",
      role: "Senior Software Engineer @ Stripe",
    },
    category: "Career",
    publishedAt: "2026-04-10",
    readTime: "8 min read",
    tags: ["Web Development", "Career", "React", "Next.js"],
    gradientFrom: "from-indigo-500",
    gradientTo: "to-violet-600",
    featured: true,
  },
  {
    slug: "machine-learning-for-beginners-2026",
    title: "Machine Learning for Beginners: Where to Start in 2026",
    excerpt:
      "With AI tools everywhere, it's tempting to skip the fundamentals. Here's why you shouldn't — and how to build a solid ML foundation that will last.",
    content: `
## The ML Paradox

Everyone wants to build AI products, but very few understand how the models actually work. This knowledge gap is both a problem and an opportunity. If you understand the fundamentals when most people don't, you become extremely valuable.

## What You Actually Need to Know

You do NOT need to be a PhD mathematician to work with ML. But you do need a working understanding of:

- **Linear algebra**: vectors, matrices, dot products, eigenvalues (at a high level)
- **Probability and statistics**: distributions, Bayes' theorem, hypothesis testing
- **Calculus**: gradients and partial derivatives (for understanding backpropagation)

Spend 2–3 weeks on these before writing any ML code. The 3Blue1Brown series on YouTube is the best resource that exists for visual intuition.

## The Learning Path

**Phase 1: Classical ML with scikit-learn**

Start with supervised learning: linear regression, logistic regression, decision trees, random forests, SVMs. Use scikit-learn. Focus on the intuition, not the math.

**Phase 2: Neural Networks with PyTorch**

Once you understand classical ML, move to PyTorch. Build a neural network from scratch. Understand forward pass, loss, backpropagation, and gradient descent at the code level.

**Phase 3: Applied Projects**

Build something real. An image classifier. A sentiment analyzer. A simple recommendation system. The best learning happens when you hit real problems.

## What About LLMs and Generative AI?

Fine-tuning and using large language models is a skill on top of the foundation, not a replacement for it. Learn the fundamentals first. Then you'll understand why prompt engineering works, when fine-tuning helps, and how to evaluate model outputs critically.

## Best Resources in 2026

- fast.ai practical deep learning course (free, project-first)
- Andrej Karpathy's "Neural Networks: Zero to Hero" series
- Stanford CS229 lecture notes (for the math)
- DevPath Academy ML & AI Fundamentals (for structured mentorship)
    `.trim(),
    author: {
      name: "Dr. Sarah Lin",
      initials: "SL",
      avatarColor: "bg-violet-100 text-violet-700",
      role: "ML Research Scientist @ Google DeepMind",
    },
    category: "Machine Learning",
    publishedAt: "2026-04-05",
    readTime: "7 min read",
    tags: ["Machine Learning", "AI", "Python", "Beginner"],
    gradientFrom: "from-violet-500",
    gradientTo: "to-pink-500",
    featured: true,
  },
  {
    slug: "aws-vs-other-clouds-2026",
    title: "AWS vs Azure vs GCP in 2026: Which Cloud Should You Learn?",
    excerpt:
      "The cloud market has matured. Here's an honest breakdown of the three major platforms — and a clear recommendation for developers just starting out.",
    content: `
## The Honest Answer

If you're just starting in cloud computing, **learn AWS first**. Not because it's the best in every category, but because it has the largest market share, the most job postings, and the best learning resources.

## The Market Share Reality

- AWS: ~32% of cloud infrastructure spend
- Azure: ~23% (dominant in enterprise Windows shops)
- GCP: ~12% (strong in data and ML workloads)

If you're a web developer or DevOps engineer, AWS is where the jobs are.

## When to Choose Azure

Choose Azure if you're working in enterprise environments, if your company is a Microsoft shop (Office 365, Active Directory, .NET stack), or if you're targeting government or regulated industries.

## When to Choose GCP

Choose GCP if you're doing heavy data engineering (BigQuery is genuinely superior), if you're working with ML pipelines (Vertex AI, TPUs), or if your company uses Google Workspace heavily.

## What to Learn on AWS

For developers, focus on:

1. **IAM** — Identity and access management. Get this right before anything else.
2. **EC2 & VPCs** — Virtual machines and networking fundamentals
3. **S3** — Object storage (the backbone of the modern web)
4. **Lambda & API Gateway** — Serverless architecture
5. **RDS** — Managed relational databases
6. **CloudFront** — CDN and edge computing
7. **CloudWatch** — Monitoring and logging

These seven services cover 80% of what most applications need.

## Certifications Worth Getting

The AWS Solutions Architect Associate (SAA-C03) is the most recognized cloud certification. It demonstrates a broad understanding of AWS services and is respected by hiring managers. Plan 3–4 months of study to pass it on the first attempt.
    `.trim(),
    author: {
      name: "Omar Khalid",
      initials: "OK",
      avatarColor: "bg-sky-100 text-sky-700",
      role: "Cloud Architect @ AWS",
    },
    category: "Cloud & DevOps",
    publishedAt: "2026-03-28",
    readTime: "6 min read",
    tags: ["AWS", "Cloud", "DevOps", "Career"],
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
  },
  {
    slug: "data-storytelling-with-python",
    title: "From Raw Data to Compelling Stories: Visualization Best Practices",
    excerpt:
      "Data without context is just noise. Here's how to use Python visualization tools to communicate insights that actually drive decisions.",
    content: `
## The Gap Between Analysis and Communication

Most data scientists can analyze data. Fewer can communicate what they found in a way that changes decisions. This is the skill that separates great data professionals from average ones.

## The Core Principle: Chart for Your Audience

Before you open Jupyter or Tableau, ask: who will see this chart, and what decision do I want them to make? Everything else flows from that question.

## Chart Selection Guide

| Goal | Best Chart Type |
|------|----------------|
| Compare categories | Bar chart (horizontal for many categories) |
| Show change over time | Line chart |
| Show distribution | Histogram or violin plot |
| Show correlation | Scatter plot |
| Show composition | Stacked bar or pie (for ≤5 categories) |
| Show geographic data | Choropleth map |

Never use a 3D pie chart. Never.

## Python Stack for Visualization

**For exploration**: Matplotlib + Seaborn. Fast to write, covers 90% of use cases.

**For interactive charts**: Plotly or Altair. Great for dashboards and web embedding.

**For dashboards**: Streamlit. You can go from a Python script to a shareable web app in an afternoon.

## Common Mistakes to Avoid

1. **Truncated Y-axis**: Starting your axis at anything other than 0 makes changes look larger than they are
2. **Too many colors**: Use color to encode meaning, not decoration. 3–5 colors maximum
3. **Missing context**: Always label axes, add a title, include a data source
4. **Chart junk**: Remove gridlines, borders, and decorations that don't add information (Tufte's data-ink ratio)

## The Annotation Habit

The most underused feature in every visualization tool is annotation. A single sentence pointing to the key insight ("Sales dropped 40% after the price increase") is worth more than any color scheme.
    `.trim(),
    author: {
      name: "James Okafor",
      initials: "JO",
      avatarColor: "bg-emerald-100 text-emerald-700",
      role: "Data Engineer @ Shopify",
    },
    category: "Data Science",
    publishedAt: "2026-03-15",
    readTime: "5 min read",
    tags: ["Data Science", "Python", "Visualization", "Matplotlib"],
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-500",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
