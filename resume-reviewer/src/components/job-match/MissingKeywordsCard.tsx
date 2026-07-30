import type { MissingKeyword } from "../../types/resume";
import StatusBadge from "../common/StatusBadge";

type Props = {
  keywords: MissingKeyword[];
};

function MissingKeywordsCard({ keywords }: Props) {
  return (
    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-yellow-800">
        🏷️ Missing Keywords
      </h3>

      <div className="space-y-3">
        {keywords.map((keyword) => (
          <div
            key={keyword.keyword}
            className="flex items-center justify-between rounded-lg border border-yellow-100 bg-white p-3"
          >
            <span className="font-medium text-gray-800">
              {keyword.keyword}
            </span>

            <StatusBadge importance={keyword.importance} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissingKeywordsCard;