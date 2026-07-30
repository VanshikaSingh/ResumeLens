import type { JobMatchAnalysis } from "../../types/resume";

import MatchScoreCard from "./MatchScoreCard";
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
  <section className="mt-12">
  <h2 className="mb-8 text-3xl font-bold">
    🎯 Job Match Analysis
  </h2>

  <MatchScoreCard score={jobMatch.matchScore} />

  <div className="mt-8 grid gap-8 lg:grid-cols-2">
    <MatchedSkillsCard
      skills={jobMatch.matchedSkills}
    />

    <MissingSkillsCard
      skills={jobMatch.missingSkills}
    />

    <MissingKeywordsCard
      keywords={jobMatch.missingKeywords}
    />

    <ExperienceGapCard
      experienceGap={jobMatch.experienceGap}
    />

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