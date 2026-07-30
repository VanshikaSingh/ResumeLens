import type { JobMatchAnalysis } from "../../types/resume";

import { Target } from "lucide-react";

import MatchedSkillsCard from "./MatchedSkillsCard";
import MissingSkillsCard from "./MissingSkillsCard";
import MissingKeywordsCard from "./MissingKeywordsCard";
import ExperienceGapCard from "./ExperienceGapCard";
import TopImprovementsCard from "./TopImprovementsCard";

type Props = {
  jobMatch: JobMatchAnalysis;
};

function JobMatchSection({ jobMatch }: Props) {
  return (
    <section className="mx-auto mt-16 max-w-6xl">
      <div className="mb-8 flex items-center gap-3">
  <Target className="h-8 w-8 text-blue-600" />

  <h2 className="text-3xl font-bold">
    Job Match Analysis
  </h2>
</div>
<div className="grid gap-8 lg:grid-cols-2">
  <MatchedSkillsCard skills={jobMatch.matchedSkills} />

  <MissingSkillsCard skills={jobMatch.missingSkills} />

  <div className="lg:col-span-2">
    <ExperienceGapCard
      experienceGap={jobMatch.experienceGap}
    />
  </div>

  <div className="lg:col-span-2">
    <MissingKeywordsCard
      keywords={jobMatch.missingKeywords}
    />
  </div>

  <div className="lg:col-span-2">
    <TopImprovementsCard
      improvements={jobMatch.topImprovements}
    />
  </div>
</div>
    </section>
  );
}

export default JobMatchSection;