import { useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser";
import docsParser from "../utils/docxParser";
import { parseResume } from "../utils/resumeParser";
import OverviewSection from "../components/overview/OverviewSection";
import JobMatchSection from "../components/job-match/JobMatchSection";
import ATSScoreCard from "../components/overview/ATSScoreCard";
import MatchScoreCard from "../components/job-match/MatchScoreCard";
import LoadingScreen from "../components/LoadingScreen";

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

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsLoading(true);

    try {
      const rawText =
        selectedFile.type === "application/pdf"
          ? await extractPdfText(selectedFile)
          : await docsParser(selectedFile);

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
        throw new Error("Failed to analyze resume");
      }

      const analysis: ResumeAnalysis = await response.json();

      setAnalysis(analysis);

     
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
  {!analysis ? (
  <>
    <UploadScreen
      onFileSelect={handleFileSelect}
      isLoading={isLoading}
    />

    <div className="mt-8 max-w-4xl mx-auto">
      <label className="block mb-2 text-lg font-semibold">
        Job Description (Optional)
      </label>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        rows={10}
        className="w-full resize-y rounded-lg border border-gray-300 p-4"
      />
    </div>
  </>
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
      onClick={() => {
        setAnalysis(null);
        setJobDescription("");
      }}
      className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      New Analysis
    </button>
  </div>
)}

{analysis && (
  <>
    <OverviewSection overview={analysis.overview} />

  {analysis && (
  <>
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
  </>
)}
  </>
)}
{isLoading && <LoadingScreen />}
    </div>
  );
}

export default Home;