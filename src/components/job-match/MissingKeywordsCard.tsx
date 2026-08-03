import type { MissingKeyword } from "../../types/resume";


import { SearchX } from "lucide-react";

type Props = {
  keywords: MissingKeyword[];
};

function MissingKeywordsCard({ keywords }: Props) {
  return (
    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
  <SearchX className="h-6 w-6 text-yellow-700" />

  <h3 className="text-xl font-semibold text-yellow-800">
    Missing Keywords
  </h3>
</div>

<div className="flex flex-wrap gap-3">
  {keywords.map((keyword) => (
    <span
      key={keyword.keyword}
      className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm"
    >
      {keyword.keyword}
    </span>
  ))}
</div>
    </div>
  );
}

export default MissingKeywordsCard;