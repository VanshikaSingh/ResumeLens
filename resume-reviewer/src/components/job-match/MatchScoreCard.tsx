import { Target } from "lucide-react";

type Props = {
  score: number;
};

function MatchScoreCard({ score }: Props) {
  const color =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  let badge = "Needs Improvement";
  let badgeColor = "bg-red-100 text-red-700";

  if (score >= 80) {
    badge = "Excellent";
    badgeColor = "bg-green-100 text-green-700";
  } else if (score >= 60) {
    badge = "Good";
    badgeColor = "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />

            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Job Match
            </p>
          </div>

          <h2 className={`mt-4 text-6xl font-bold ${color}`}>
            {score}%
          </h2>

          <p className="mt-3 text-gray-600">
            Overall compatibility with the job description.
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}

export default MatchScoreCard;