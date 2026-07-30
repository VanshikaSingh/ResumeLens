import type { Improvement } from "../../types/resume";

type Props = {
  improvements: Improvement[];
};

function TopImprovementsCard({ improvements }: Props) {
  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-purple-800">
        🚀 Top Improvements
      </h3>

      <div className="space-y-4">
        {improvements.map((improvement) => (
          <div
            key={improvement.title}
            className="rounded-lg border border-purple-100 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">
                {improvement.title}
              </h4>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  improvement.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : improvement.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {improvement.priority}
              </span>
            </div>

            <p className="mt-2 text-gray-700">
              {improvement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopImprovementsCard;