import { useEffect, useState } from "react";

const steps = [
  "Parsing your resume",
  "Extracting skills & experience",
  "Comparing with the job description",
  "Generating ATS feedback",
  "Preparing recommendations",
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold">
          ResumeLens AI
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          We're analyzing your resume...
        </p>

        <div className="mt-12 space-y-5 text-left">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-4"
            >
              {index < currentStep ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                  ✓
                </div>
              ) : index === currentStep ? (
                <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-blue-600 border-t-transparent" />
              ) : (
                <div className="h-7 w-7 rounded-full border-2 border-gray-300" />
              )}

              <span
                className={`text-lg ${
                  index <= currentStep
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-full bg-gray-200">
          <div className="h-2 animate-pulse rounded-full bg-blue-600" />
        </div>
      </div>
    </div>
  );
}