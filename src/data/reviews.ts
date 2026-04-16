export interface CourseReview {
  id: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
}

export const courseReviews: Record<string, CourseReview[]> = {
  "fullstack-web-dev": [
    {
      id: "r1",
      authorName: "Marcus Reid",
      authorInitials: "MR",
      authorColor: "bg-indigo-100 text-indigo-700",
      rating: 5,
      date: "2026-04-08",
      title: "Best investment I've made in my career",
      body: "I went from knowing basic HTML to landing a junior developer role in 5 months. Alex is an incredible teacher — he explains the 'why' behind everything, not just the 'how'. The three projects you build are genuinely portfolio-worthy.",
      helpful: 42,
    },
    {
      id: "r2",
      authorName: "Yuki Tanaka",
      authorInitials: "YT",
      authorColor: "bg-violet-100 text-violet-700",
      rating: 5,
      date: "2026-03-22",
      title: "Incredibly comprehensive and well-paced",
      body: "I'd tried other bootcamps before but nothing stuck like this. The curriculum is perfectly structured — each concept builds on the last. The Discord community is also incredibly supportive.",
      helpful: 38,
    },
    {
      id: "r3",
      authorName: "Sofia Patel",
      authorInitials: "SP",
      authorColor: "bg-pink-100 text-pink-700",
      rating: 4,
      date: "2026-03-10",
      title: "Excellent content, wish there was more on testing",
      body: "The course content is top-notch and the instructor is clearly an expert. I knocked off one star because I would have loved more coverage of testing practices (Jest, Vitest). That said, everything else was outstanding.",
      helpful: 29,
    },
    {
      id: "r4",
      authorName: "Liam O'Brien",
      authorInitials: "LO",
      authorColor: "bg-emerald-100 text-emerald-700",
      rating: 5,
      date: "2026-02-18",
      title: "Changed my life trajectory",
      body: "Six months ago I was stuck in a job I hated. After completing this course, I got a full-stack developer job at a startup with a 60% salary increase. The investment in this course is nothing compared to the return.",
      helpful: 67,
    },
  ],
  "ml-ai-fundamentals": [
    {
      id: "r5",
      authorName: "Anika Bose",
      authorInitials: "AB",
      authorColor: "bg-violet-100 text-violet-700",
      rating: 5,
      date: "2026-04-02",
      title: "Dr. Lin makes the intimidating approachable",
      body: "I was terrified of the math involved in ML. Dr. Lin breaks it down with incredible visual intuitions and hands-on code. By week 3 I actually understood backpropagation. That felt like magic.",
      helpful: 55,
    },
    {
      id: "r6",
      authorName: "Chen Wei",
      authorInitials: "CW",
      authorColor: "bg-sky-100 text-sky-700",
      rating: 5,
      date: "2026-03-15",
      title: "The PyTorch section is world-class",
      body: "I've taken Coursera and fast.ai courses. This is better. The live sessions are where the magic happens — Dr. Lin does live debugging and answers questions in real time. Nothing beats that.",
      helpful: 48,
    },
    {
      id: "r7",
      authorName: "Priya Sharma",
      authorInitials: "PS",
      authorColor: "bg-rose-100 text-rose-700",
      rating: 4,
      date: "2026-02-28",
      title: "Dense but rewarding",
      body: "This is not a passive-watching course. You need to actively code along and re-watch sections. But if you put in the work, the payoff is enormous. My ML interview scores improved dramatically after this.",
      helpful: 31,
    },
  ],
  "data-science-python": [
    {
      id: "r8",
      authorName: "James K.",
      authorInitials: "JK",
      authorColor: "bg-emerald-100 text-emerald-700",
      rating: 5,
      date: "2026-04-05",
      title: "Perfect for data analyst career switchers",
      body: "I transitioned from marketing analytics to a data science role after completing this course. James is a phenomenal instructor and the real-world datasets make the learning stick.",
      helpful: 36,
    },
    {
      id: "r9",
      authorName: "Nina W.",
      authorInitials: "NW",
      authorColor: "bg-cyan-100 text-cyan-700",
      rating: 5,
      date: "2026-03-20",
      title: "The best Pandas curriculum I've found anywhere",
      body: "I've bought 8 data science courses on various platforms. The Pandas and data cleaning sections here are the most practically useful I've encountered. Hands down.",
      helpful: 27,
    },
  ],
  "react-nextjs-mastery": [
    {
      id: "r10",
      authorName: "Daniel Cho",
      authorInitials: "DC",
      authorColor: "bg-amber-100 text-amber-700",
      rating: 5,
      date: "2026-04-10",
      title: "Priya knows the Next.js ecosystem inside-out",
      body: "She literally works on the Next.js team. The insights you get about App Router internals and performance optimization are things you can't find in any tutorial. Worth every penny.",
      helpful: 61,
    },
    {
      id: "r11",
      authorName: "Maria Gonzalez",
      authorInitials: "MG",
      authorColor: "bg-orange-100 text-orange-700",
      rating: 5,
      date: "2026-03-25",
      title: "Finally understand server vs client components",
      body: "I was using Next.js for 6 months but didn't really understand server/client components. This course cleared everything up. The mental model is now crystal clear and my code is so much better.",
      helpful: 45,
    },
    {
      id: "r12",
      authorName: "Rahul M.",
      authorInitials: "RM",
      authorColor: "bg-yellow-100 text-yellow-700",
      rating: 4,
      date: "2026-03-05",
      title: "Great course, could use more exercises",
      body: "Very strong content and Priya's explanations are top tier. I would love more hands-on exercises between lessons — the capstone project is excellent but more mini-challenges would help reinforce concepts faster.",
      helpful: 22,
    },
  ],
  "aws-cloud-practitioner": [
    {
      id: "r13",
      authorName: "Tom Bailey",
      authorInitials: "TB",
      authorColor: "bg-sky-100 text-sky-700",
      rating: 5,
      date: "2026-03-30",
      title: "Passed my AWS SAA exam first attempt",
      body: "Omar's explanations of AWS architecture are so clear. I used this course alongside the official practice exams and passed SAA-C03 with 885/1000. The VPC and IAM modules are especially excellent.",
      helpful: 72,
    },
    {
      id: "r14",
      authorName: "Lisa T.",
      authorInitials: "LT",
      authorColor: "bg-blue-100 text-blue-700",
      rating: 4,
      date: "2026-03-12",
      title: "Excellent practical focus",
      body: "I appreciated that every concept is backed by a hands-on lab. The final capstone deployment project is realistic and genuinely challenging. A few labs had minor setup issues but support resolved them quickly.",
      helpful: 33,
    },
  ],
  "cybersecurity-fundamentals": [
    {
      id: "r15",
      authorName: "Kevin R.",
      authorInitials: "KR",
      authorColor: "bg-rose-100 text-rose-700",
      rating: 5,
      date: "2026-04-01",
      title: "Nina's real-world experience shines through",
      body: "Nina doesn't just teach theory — she shares real stories from her pentesting career. The hands-on labs with DVWA and HackTheBox are fantastic. I've learned more here than from any textbook.",
      helpful: 44,
    },
    {
      id: "r16",
      authorName: "Amy L.",
      authorInitials: "AL",
      authorColor: "bg-red-100 text-red-700",
      rating: 5,
      date: "2026-03-18",
      title: "Absolutely the best intro to cybersecurity",
      body: "I went from zero knowledge to understanding how SQL injection, XSS, and CSRF attacks work — and more importantly, how to prevent them. The ethical framing throughout the course is excellent.",
      helpful: 39,
    },
  ],
};

export function getReviewsForCourse(slug: string): CourseReview[] {
  return courseReviews[slug] ?? [];
}

export function getAverageRating(reviews: CourseReview[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function getRatingDistribution(reviews: CourseReview[]): Record<number, number> {
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    dist[r.rating] = (dist[r.rating] ?? 0) + 1;
  });
  return dist;
}
