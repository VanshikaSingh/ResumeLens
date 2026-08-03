import { useEffect, useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser";
import docsParser from "../utils/docxParser";
import { parseResume } from "../utils/resumeParser";
import OverviewSection from "../components/overview/OverviewSection";
import JobMatchSection from "../components/job-match/JobMatchSection";
import ATSScoreCard from "../components/overview/ATSScoreCard";
import MatchScoreCard from "../components/job-match/MatchScoreCard";
import LoadingScreen from "../components/LoadingScreen";

import { motion } from "framer-motion";

import type { ResumeAnalysis } from "../types/resume";

export type ParsedResume = {
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  certifications: string;
};

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<ParsedResume | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "ResumeLens AI";
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    if (isLoading) return;

    setError("");
    setAnalysis(null);
    setResumeData(null);
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      const rawText =
        file.type === "application/pdf"
          ? await extractPdfText(file)
          : await docsParser(file);

      const parsedResume = parseResume(rawText);

      setResumeData(parsedResume);

      const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: parsedResume,
          jobDescription: jobDescription.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error || "Failed to analyze resume.");
      }

      const analysis: ResumeAnalysis = await response.json();

      setAnalysis(analysis);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);

      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong while analyzing your resume. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setJobDescription("");
    setFile(null);
    setResumeData(null);
    setError("");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen p-8">
      {error && (
        <div className="mx-auto mb-6 max-w-4xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!analysis ? (
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
              ResumeLens AI
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Get instant ATS feedback, identify missing skills, and compare
              your resume against any job description using AI.
            </p>
          </div>

          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <UploadScreen
              onFileSelect={handleFileSelect}
              isLoading={isLoading}
            />

            {file && (
              <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                Selected:{" "}
                <span className="font-medium">{file.name}</span>
              </div>
            )}

            <div className="mt-10">
              <label className="mb-3 block text-lg font-semibold text-gray-800">
                Job Description
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Optional)
                </span>
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={8}
                className="w-full resize-none rounded-xl border border-gray-300 p-4 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={!file || isLoading}
                  className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isLoading ? "Analyzing..." : "Analyze Resume"}
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Leave this blank if you only want a general resume review.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">
              Resume Analysis
            </h2>

            <p className="mt-1 text-gray-500">
              Your AI analysis is ready.
            </p>
          </div>

          <button
            onClick={resetAnalysis}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            New Analysis
          </button>
        </div>
      )}

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
            <ATSScoreCard score={analysis.overview.atsScore} />

            {analysis.jobMatch && (
              <MatchScoreCard
                score={analysis.jobMatch.matchScore}
              />
            )}
          </div>

          <OverviewSection overview={analysis.overview} />

          {analysis.jobMatch && (
            <JobMatchSection
              jobMatch={analysis.jobMatch}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Home;