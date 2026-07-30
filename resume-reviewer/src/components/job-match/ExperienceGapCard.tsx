type Props = {
  experienceGap: string;
};

function ExperienceGapCard({ experienceGap }: Props) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-blue-800">
        📈 Experience Gap
      </h3>

      <p className="leading-7 text-gray-700">
        {experienceGap}
      </p>
    </div>
  );
}

export default ExperienceGapCard;