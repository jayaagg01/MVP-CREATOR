export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
}

export interface MVPPlan {
  projectName: string;
  summary: string;
  coreFeatures: string[];
  userPersonas: string[];
  techStack: TechStack;
  userStories: string[];
  monetizationStrategies: string[];
  successMetrics: string[];
}

export interface LandingPageFeature {
  title: string;
  description: string;
  icon: 'zap' | 'shield-check' | 'users' | 'globe' | 'trending-up' | 'star';
}

export interface LandingPageContent {
  headline: string;
  subheading: string;
  ctaButton: string;
  features: LandingPageFeature[];
}

export interface HistoryEntry {
  id: string;
  mvpPlan: MVPPlan;
  landingPageContent: LandingPageContent;
  createdAt: string;
}
