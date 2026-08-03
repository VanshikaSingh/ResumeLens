import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeaknessCard";
import RecommendationCard from "./RecommendationCard";

import type { Overview } from "../../types/resume";

type OverviewProps = {
  overview: Overview;
};

export default function OverviewSection({
  overview,
}: OverviewProps) {
  return (
    <section className="mt-10">
      <h2 className="mb-8 text-3xl font-bold">
        Resume Overview
      </h2>

      {/* Strengths + Weaknesses */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-2xl font-semibold">
            Strengths
          </h3>

          <div className="space-y-4">
            {overview.strengths.map((strength) => (
              <StrengthCard
                key={strength.title}
                strength={strength}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold">
             Weaknesses
          </h3>

          <div className="space-y-4">
            {overview.weaknesses.map((weakness) => (
              <WeaknessCard
                key={weakness.section + weakness.issue}
                weakness={weakness}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-semibold">
          💡 Top Recommendations
        </h3>

        <div className="space-y-4">
          {overview.suggestions.map((suggestion) => (
            <RecommendationCard
              key={suggestion.section + suggestion.recommendation}
              suggestion={suggestion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}