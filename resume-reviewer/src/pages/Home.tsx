import { useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser";
import docsParser from "../utils/docxParser";
import { parseResume } from "../utils/resumeParser";

type ResumeAnalysis = {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
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

      const data: ResumeAnalysis = await response.json();

      setAnalysis(data);

      console.log("Resume Analysis:", data);
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

      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
        </div>
      )}

      {resumeData && (
        <div className="mt-4">
          <h2>Parsed Resume</h2>

          <pre>{JSON.stringify(resumeData, null, 2)}</pre>
        </div>
      )}

      {analysis && (
        <div className="mt-8">
          <h2>AI Resume Analysis</h2>

          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Home;