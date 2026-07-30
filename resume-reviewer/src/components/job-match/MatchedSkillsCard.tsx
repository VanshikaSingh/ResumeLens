import { CircleCheck } from "lucide-react";

type Props = {
  skills: string[];
};

function MatchedSkillsCard({ skills }: Props) {
  return (

    <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
   <div className="mb-4 flex items-center gap-3">
  <CircleCheck className="h-6 w-6 text-green-700" />

  <h3 className="text-xl font-semibold text-green-800">
    Matched Skills
  </h3>
</div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  
  );
}

export default MatchedSkillsCard;