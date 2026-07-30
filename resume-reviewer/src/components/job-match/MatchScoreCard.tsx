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

  return (
  <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700">
        Match Score
      </h3>

      <p className={`mt-4 text-5xl font-bold ${color}`}>
        {score}%
      </p>

      <p className="mt-2 text-gray-500">
        Overall compatibility with the job description.
      </p>
    </div>
  );
}

export default MatchScoreCard;