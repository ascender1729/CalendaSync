export const APP_NAME = 'TalentIQ 360';
export const APP_DESCRIPTION = 'AI-powered career development and skill analysis platform';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SKILLS: '/skills',
  PROJECTS: '/projects',
  CAREER_PATHS: '/career-paths',
} as const;

export const SKILL_CATEGORIES = {
  TECHNICAL: 'technical',
  SOFT: 'soft',
  DOMAIN: 'domain',
} as const;

export const PROFICIENCY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const API_ENDPOINTS = {
  SKILLS: '/api/skills',
  PROJECTS: '/api/projects',
  CAREER_PATHS: '/api/career-paths',
  USER_PROFILE: '/api/user/profile',
} as const;