export type Strength = {
  title: string;
  description: string;
};

export type Weakness = {
  section: string;
  issue: string;
  severity: "low" | "medium" | "high";
};

export type Suggestion = {
  section: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
};

export type Overview = {
  atsScore: number;
  strengths: Strength[];
  weaknesses: Weakness[];
  suggestions: Suggestion[];
};

export type ResumeAnalysis = {
  overview: Overview;
};