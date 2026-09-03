import type {Strength} from "../../types/resume";

type StrengthCardProps = {
  strength: Strength;
};

export default function StrengthCard({
  strength,
}: StrengthCardProps) {
  
   const { title, description } = strength;
 
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">

        <div>
          <h3 className="text-lg font-semibold text-green-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-green-800">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}