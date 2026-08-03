import { ChartColumn } from "lucide-react";

type ATSScoreCardProps = {
  score: number;
};

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  const percentage = score * 10;

  let badge = "Needs Improvement";
  let badgeColor = "bg-red-100 text-red-700";

  if (score >= 8) {
    badge = "Excellent";
    badgeColor = "bg-green-100 text-green-700";
  } else if (score >= 6) {
    badge = "Good";
    badgeColor = "bg-yellow-100 text-yellow-700";
  }

  return (
<div className="flex items-start justify-between">
  <div>
    <div className="flex items-center gap-2">
      <ChartColumn className="h-5 w-5 text-blue-600" />

      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
        ATS Score
      </p>
    </div>

    <h2 className="mt-4 text-6xl font-bold text-blue-600">
      {score}
      <span className="text-3xl text-gray-400"> / 10</span>
    </h2>

    <p className="mt-3 text-gray-600">
      {percentage}% ATS compatibility
    </p>
  </div>

  <span
    className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor}`}
  >
    {badge}
  </span>
</div>
  );
}