export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  market_demand?: number;
  growth_rate?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  learning_resources: LearningResource[];
}

export interface JobMarketInsight {
  skill_name: string;
  demand_score: number;
  growth_rate: number;
  avg_salary: number;
  job_count: number;
  top_companies: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'tutorial' | 'documentation' | 'github';
  url: string;
  platform: string;
  estimated_hours: number;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  recommended_projects: string[];
  estimated_time_months: number;
  market_demand: number;
  avg_salary: number;
}