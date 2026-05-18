export type Role = "client" | "freelancer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  title?: string;
  location?: string;
  bio?: string;
  hourlyRate?: number;
  skills?: string[];
  joinedAt: string;
  onboarded?: boolean;
}

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  successRate: number;
  jobsCompleted: number;
  earned: string;
  availability: "Available now" | "Available in 1 week" | "Busy";
  location: string;
  skills: string[];
  category: string;
  topRated: boolean;
  bio: string;
  portfolio: { id: string; title: string; image: string; tag: string }[];
  workHistory: {
    id: string;
    title: string;
    client: string;
    rating: number;
    review: string;
    date: string;
  }[];
  education: { school: string; degree: string; year: string }[];
  certifications: { name: string; issuer: string; year: string }[];
  languages: { name: string; level: string }[];
}

export interface JobClient {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  jobsPosted: number;
  hireRate: number;
  location: string;
  totalSpent: string;
  memberSince: string;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: "fixed" | "hourly";
  budgetMin: number;
  budgetMax: number;
  experienceLevel: "Entry" | "Intermediate" | "Expert";
  projectLength: "Less than 1 month" | "1 to 3 months" | "3 to 6 months" | "More than 6 months";
  proposalsCount: number;
  postedAt: string;
  client: JobClient;
  featured?: boolean;
}

export interface Proposal {
  id: string;
  jobId: string;
  jobTitle: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  status: "pending" | "accepted" | "declined" | "withdrawn";
  submittedAt: string;
}

export interface Message {
  id: string;
  from: string;
  text: string;
  at: string;
}

export interface Conversation {
  id: string;
  withId: string;
  withName: string;
  withAvatar: string;
  online: boolean;
  messages: Message[];
}
