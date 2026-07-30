import { useEffect, useState } from "react";

const steps = [
  "Parsing resume...",
  "Extracting skills & experience...",
  "Comparing against job description...",
  "Generating AI recommendations...",
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center">
          🤖 ResumeLens AI
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Analyzing your resume...
        </p>

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              {index < currentStep ? (
                <span className="text-green-600">✓</span>
              ) : index === currentStep ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              ) : (
                <span className="text-gray-300">○</span>
              )}

              <span
                className={
                  index <= currentStep
                    ? "text-gray-800"
                    : "text-gray-400"
                }
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full origin-left animate-pulse bg-blue-600" />
        </div>
      </div>
    </div>
  );
}