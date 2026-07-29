import { useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser";
import docsParser from "../utils/docxParser";
import { parseResume } from "../utils/resumeParser";
import OverviewSection from "../components/overview/OverviewSection";

type ResumeAnalysis = {
  overview: {
    atsScore: number;

    strengths: {
      title: string;
      description: string;
    }[];

    weaknesses: {
      section: string;
      issue: string;
      severity: "low" | "medium" | "high";
    }[];

    suggestions: {
      section: string;
      recommendation: string;
      priority: "high" | "medium" | "low";
    }[];
  };
};
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

      const response = await fetch("http://localhost:3000/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: parsedResume,
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
      <UploadScreen
        onFileSelect={handleFileSelect}
        isLoading={isLoading}
      />

{analysis && (
  <OverviewSection overview={analysis.overview} />
)}
    </div>
  );
}

export default Home;