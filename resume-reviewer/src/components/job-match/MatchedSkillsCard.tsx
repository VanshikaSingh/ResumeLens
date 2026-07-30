

type Props = {
  skills: string[];
};

function MatchedSkillsCard({ skills }: Props) {
  return (

    <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        ✅ Matched Skills
      </h3>

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