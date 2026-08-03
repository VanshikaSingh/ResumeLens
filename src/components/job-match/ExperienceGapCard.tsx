import { BriefcaseBusiness } from "lucide-react";

type Props = {
  experienceGap: string;
};

function ExperienceGapCard({ experienceGap }: Props) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <BriefcaseBusiness className="h-6 w-6 text-blue-700" />

        <h3 className="text-xl font-semibold text-blue-800">
          Experience Gap
        </h3>
      </div>

<p className="leading-8 text-gray-700">
  {experienceGap}
</p>
    </div>
  );
}

export default ExperienceGapCard;