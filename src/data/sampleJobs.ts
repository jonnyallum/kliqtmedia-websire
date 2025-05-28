/**
 * Sample Jobs Data for KLIQT Media Jobs Board
 * These will be inserted via admin account
 */

export interface Job {
  id?: string
  title: string
  description: string
  type: 'wanted' | 'available'
  category: string
  tags: string[]
  budget_min?: number
  budget_max?: number
  currency: string
  location?: string
  remote: boolean
  featured?: boolean
  views?: number
  applications?: number
  created_at?: string
}

export const sampleJobs: Omit<Job, 'id' | 'posted_by' | 'created_at'>[] = [
  {
    title: "Build Mobile App for Aesthetics Business",
    description: "Design and build an elegant booking and client management app for a beauty/aesthetics business. Should include appointment scheduling, gallery, and payments. Looking for React Native or Flutter expertise with clean UI/UX design. Must integrate with existing booking systems and payment gateways.",
    type: "wanted",
    category: "Mobile Apps",
    tags: ["React Native", "Flutter", "UI/UX", "Booking System", "Payments"],
    budget_min: 3000,
    budget_max: 8000,
    currency: "GBP",
    location: "London, UK",
    remote: true,
    featured: true,
    views: 156,
    applications: 12
  },
  {
    title: "Build Mobile App for Trading Platform",
    description: "Create a high-performance mobile app for a fintech trading startup. Features include real-time charts, user authentication, live market feeds, and Stripe integration. Must handle high-frequency data updates and provide smooth user experience.",
    type: "wanted",
    category: "Mobile Apps",
    tags: ["React Native", "Fintech", "Real-time", "Charts", "Stripe"],
    budget_min: 8000,
    budget_max: 15000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: true,
    views: 203,
    applications: 18
  },
  {
    title: "Website for Air Travel Company",
    description: "Design and develop a responsive marketing site with flight booking inquiry forms, animated visuals, and customer testimonials. Need modern design with smooth animations and mobile-first approach.",
    type: "wanted",
    category: "Web Development",
    tags: ["Next.js", "React", "Animation", "Responsive", "Travel"],
    budget_min: 2500,
    budget_max: 6000,
    currency: "GBP",
    location: "Manchester, UK",
    remote: true,
    featured: false,
    views: 89,
    applications: 7
  },
  {
    title: "CRM for Asset Management Firm",
    description: "Build a custom CRM to handle investor portfolios, client communication, and performance tracking. Needs role-based access and dashboard UI. Must integrate with existing financial data sources.",
    type: "wanted",
    category: "Web Development",
    tags: ["CRM", "Dashboard", "Finance", "Role-based Access", "Data Integration"],
    budget_min: 10000,
    budget_max: 20000,
    currency: "GBP",
    location: "Edinburgh, UK",
    remote: true,
    featured: true,
    views: 134,
    applications: 9
  },
  {
    title: "Game Project",
    description: "Develop an engaging mobile or browser-based game. Theme and mechanics open to your creativity — bonus points for multiplayer or leaderboard elements. Looking for Unity or web-based game development.",
    type: "wanted",
    category: "Mobile Apps",
    tags: ["Unity", "Game Development", "Multiplayer", "Creative", "Mobile"],
    budget_min: 4000,
    budget_max: 12000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 167,
    applications: 15
  },
  {
    title: "Workflow Automation Project",
    description: "Build a tailored workflow automation system using n8n/Zapier for a client with custom logic needs. Must integrate multiple APIs and handle complex business rules.",
    type: "wanted",
    category: "AI & Automation",
    tags: ["n8n", "Zapier", "API Integration", "Workflow", "Automation"],
    budget_min: 1500,
    budget_max: 4000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 78,
    applications: 5
  },
  {
    title: "E-commerce Automation Suite",
    description: "Create automated workflows for inventory management, order processing, and customer communication. Integration with Shopify, WooCommerce, and various shipping providers required.",
    type: "wanted",
    category: "AI & Automation",
    tags: ["E-commerce", "Shopify", "WooCommerce", "Inventory", "Automation"],
    budget_min: 2000,
    budget_max: 5000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 92,
    applications: 8
  },
  {
    title: "Social Media Automation Platform",
    description: "Build a comprehensive social media management tool with scheduling, analytics, and AI-powered content suggestions. Must support multiple platforms and team collaboration.",
    type: "wanted",
    category: "AI & Automation",
    tags: ["Social Media", "Scheduling", "Analytics", "AI", "Team Collaboration"],
    budget_min: 5000,
    budget_max: 12000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 145,
    applications: 11
  },
  {
    title: "Lead Generation Automation",
    description: "Develop automated lead generation and nurturing workflows using various tools and APIs. Must include email sequences, lead scoring, and CRM integration.",
    type: "wanted",
    category: "AI & Automation",
    tags: ["Lead Generation", "Email Marketing", "CRM", "Lead Scoring", "APIs"],
    budget_min: 3000,
    budget_max: 7000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 67,
    applications: 4
  },
  {
    title: "Data Processing Automation",
    description: "Create automated data processing pipelines for financial reporting and analysis. Must handle large datasets and provide real-time insights with custom dashboards.",
    type: "wanted",
    category: "AI & Automation",
    tags: ["Data Processing", "Financial", "Dashboards", "Real-time", "Analytics"],
    budget_min: 4000,
    budget_max: 10000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 103,
    applications: 6
  },
  {
    title: "Corporate Website (Full Spec)",
    description: "Create a professional, scalable website for a consultancy firm — includes team pages, lead forms, and content CMS. Must be SEO optimized with fast loading times.",
    type: "wanted",
    category: "Web Development",
    tags: ["Corporate", "CMS", "SEO", "Lead Forms", "Professional"],
    budget_min: 3500,
    budget_max: 8000,
    currency: "GBP",
    location: "Birmingham, UK",
    remote: true,
    featured: false,
    views: 112,
    applications: 13
  },
  {
    title: "Shopify Platform Build",
    description: "End-to-end Shopify store setup with product import, design customisation, and payment gateway config. Need experience with Shopify Plus and custom app development.",
    type: "wanted",
    category: "E-commerce",
    tags: ["Shopify", "E-commerce", "Payment Gateway", "Custom Apps", "Design"],
    budget_min: 2000,
    budget_max: 6000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 87,
    applications: 9
  },
  {
    title: "Dropshipping Specialist Required",
    description: "Looking for someone with proven experience launching and managing dropshipping stores. Must know supplier sourcing, logistics, and marketing strategies for rapid scaling.",
    type: "wanted",
    category: "E-commerce",
    tags: ["Dropshipping", "Supplier Sourcing", "Logistics", "Marketing", "Scaling"],
    budget_min: 1000,
    budget_max: 3000,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 198,
    applications: 22
  },
  {
    title: "CapCut Video Editor Wanted",
    description: "Edit social content using CapCut. Needs punchy transitions, trending styles, and fast turnaround. Perfect for someone who understands social media trends and viral content.",
    type: "wanted",
    category: "Video Editing",
    tags: ["CapCut", "Social Media", "Trending", "Fast Turnaround", "Viral Content"],
    budget_min: 500,
    budget_max: 1500,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 234,
    applications: 28
  },
  // Available jobs (freelancers offering services)
  {
    title: "Full-Stack Developer Available",
    description: "Experienced full-stack developer specializing in React, Node.js, and cloud deployment. Available for long-term projects and can start immediately. 5+ years experience.",
    type: "available",
    category: "Web Development",
    tags: ["React", "Node.js", "Full-Stack", "Cloud", "Long-term"],
    budget_min: 400,
    budget_max: 800,
    currency: "GBP",
    location: "London, UK",
    remote: true,
    featured: false,
    views: 89,
    applications: 0
  },
  {
    title: "UI/UX Designer & Figma Expert",
    description: "Creative UI/UX designer with expertise in Figma, user research, and design systems. Available for design projects, prototyping, and design system creation.",
    type: "available",
    category: "Design",
    tags: ["UI/UX", "Figma", "Design Systems", "Prototyping", "User Research"],
    budget_min: 300,
    budget_max: 600,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 67,
    applications: 0
  },
  {
    title: "Video Editor & Motion Graphics",
    description: "Professional video editor specializing in corporate videos, social media content, and motion graphics. Expert in Adobe Creative Suite and DaVinci Resolve.",
    type: "available",
    category: "Video Editing",
    tags: ["Video Editing", "Motion Graphics", "Adobe", "DaVinci Resolve", "Corporate"],
    budget_min: 250,
    budget_max: 500,
    currency: "GBP",
    location: "Manchester, UK",
    remote: true,
    featured: false,
    views: 45,
    applications: 0
  },
  {
    title: "Digital Marketing Specialist",
    description: "Results-driven digital marketer with expertise in SEO, PPC, social media marketing, and content strategy. Available for marketing campaigns and growth strategies.",
    type: "available",
    category: "Marketing",
    tags: ["SEO", "PPC", "Social Media", "Content Strategy", "Growth"],
    budget_min: 350,
    budget_max: 700,
    currency: "GBP",
    location: "Remote",
    remote: true,
    featured: false,
    views: 78,
    applications: 0
  }
]

export default sampleJobs