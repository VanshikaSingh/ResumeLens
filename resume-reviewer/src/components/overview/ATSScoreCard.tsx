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
    <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            ATS Score
          </p>

          <h2 className="mt-3 text-6xl font-bold text-blue-600">
            {score}
            <span className="text-3xl text-gray-400">
              {" "}
              / 10
            </span>
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
    </div>
  );
}