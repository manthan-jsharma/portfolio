export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
  featured?: boolean;
  externalUrl?: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "modern-web-development-trends",
    title: "Modern Web Development Trends in 2025",
    excerpt:
      "Explore the latest trends and technologies shaping the future of web development in 2025 and beyond.",
    content: `
  # Modern Web Development Trends in 2025
  `,
    coverImage: "/webdev.png",
    date: "April 15, 2025",
    readingTime: "5 min read",
    category: "Web Development",
    featured: true,
  },
  {
    id: "mastering-react-server-components",
    title: "Mastering React Server Components: A Comprehensive Guide",
    excerpt:
      "Learn how to leverage the power of React Server Components to build faster, more efficient web applications.",
    content: `
  # Mastering React Server Components: A Comprehensive Guide
  
      `,
    coverImage: "/react.png",
    date: "March 22, 2025",
    readingTime: "8 min read",
    category: "React",
    featured: true,
  },
  {
    id: "designing-for-accessibility",
    title: "Designing for Accessibility: Beyond the Basics",
    excerpt:
      "Take your accessibility knowledge to the next level with advanced techniques and strategies for inclusive design.",
    content: `
  # Designing for Accessibility: Beyond the Basics
  
  
      `,
    coverImage: "/placeholder.svg",
    date: "February 10, 2025",
    readingTime: "6 min read",
    category: "Accessibility",
  },
  {
    id: "future-of-css",
    title: "The Future of CSS: What's Coming in 2025 and Beyond",
    excerpt:
      "Discover the exciting new features and capabilities coming to CSS in the near future.",
    content: `
  # The Future of CSS: What's Coming in 2025 and Beyond
      `,
    coverImage: "/css.png",
    date: "January 5, 2025",
    readingTime: "7 min read",
    category: "CSS",
  },
  {
    id: "optimizing-web-performance",
    title: "Optimizing Web Performance: Advanced Techniques",
    excerpt:
      "Learn advanced strategies for optimizing web performance and delivering lightning-fast user experiences.",
    content: `
  # Optimizing Web Performance: Advanced Techniques
  
      `,
    coverImage: "/optimizing.png",
    date: "December 12, 2024",
    readingTime: "9 min read",
    category: "Performance",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Large-Scale Applications",
    excerpt:
      "Discover how to effectively use TypeScript in large-scale applications to improve code quality and developer productivity.",
    content: `
  # TypeScript Best Practices for Large-Scale Applications
  
      `,
    coverImage: "/typescript.png",
    date: "November 8, 2024",
    readingTime: "10 min read",
    category: "TypeScript",
  },
  {
    id: "state-of-frontend-frameworks",
    title: "The State of Frontend Frameworks in 2025",
    excerpt:
      "An in-depth analysis of the current frontend framework landscape and where it's headed.",
    content: `
  # The State of Frontend Frameworks in 2025
      `,
    coverImage: "/frontend.png",
    date: "October 20, 2024",
    readingTime: "12 min read",
    category: "Frameworks",
    externalUrl: "https://medium.com/example/state-of-frontend-frameworks-2025",
  },
  {
    id: "ai-in-web-development",
    title: "AI in Web Development: Practical Applications",
    excerpt:
      "Explore practical ways to leverage AI in your web development workflow to improve productivity and outcomes.",
    content: `
  # AI in Web Development: Practical Applications
  
      `,
    coverImage: "/aiwebdev.png",
    date: "September 5, 2024",
    readingTime: "8 min read",
    category: "AI",
  },
];

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRecentPosts(count = 3): BlogPost[] {
  // Sort by date (newest first) and take the specified count
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}
