import type { MissingSkill } from "../../types/resume";

type Props = {
  skills: MissingSkill[];
};

function MissingSkillsCard({ skills }: Props) {
  return (

    <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-red-800">
        ❌ Missing Skills
      </h3>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.skill}
            className="flex items-center justify-between rounded-lg border border-red-100 bg-white p-3"
          >
            <span className="font-medium text-gray-800">
              {skill.skill}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                skill.importance === "high"
                  ? "bg-red-100 text-red-700"
                  : skill.importance === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {skill.importance}
            </span>
          </div>
        ))}
      </div>
    </div>
   
  );
}

export default MissingSkillsCard;