import type { Suggestion } from "../../types/resume";

type RecommendationCardProps = {
  suggestion: Suggestion;
};
  const priorityStyles = {
    high: {
      badge: "High Priority",
      badgeColor: "bg-red-100 text-red-700",
      border: "border-red-200",
      bg: "bg-red-50",
    },
    medium: {
      badge: "Medium Priority",
      badgeColor: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-200",
      bg: "bg-yellow-50",
    },
    low: {
      badge: "Low Priority",
      badgeColor: "bg-blue-100 text-blue-700",
      border: "border-blue-200",
      bg: "bg-blue-50",
    },
  };

export default function RecommendationCard({
    suggestion,
}: RecommendationCardProps) {

const { section, recommendation, priority } = suggestion;
  const style = priorityStyles[priority];

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${style.border} ${style.bg}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          {section}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badgeColor}`}
        >
          {style.badge}
        </span>
      </div>

      <p className="text-sm leading-6 text-gray-700">
        {recommendation}
      </p>
    </div>
  );
}