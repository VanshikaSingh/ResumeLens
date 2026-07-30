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
export type MissingSkill = {
  skill: string;
  importance: "high" | "medium" | "low";
};

export type MissingKeyword = {
  keyword: string;
  importance: "high" | "medium" | "low";
};

export type Improvement = {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

export type JobMatchAnalysis = {
  matchScore: number;

  matchedSkills: string[];

  missingSkills: MissingSkill[];

  missingKeywords: MissingKeyword[];

 experienceGap: string;

  topImprovements: Improvement[];
};

export type ResumeAnalysis = {
  overview: Overview;
  jobMatch: JobMatchAnalysis | null;
};
