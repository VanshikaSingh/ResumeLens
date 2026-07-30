import { useState } from "react";
import { FileText } from "lucide-react";

type ResumeUploadProps = {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
};

function UploadScreen({
  onFileSelect,
  isLoading,
}: ResumeUploadProps) {
  const [error, setError] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const allowedFileFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedFileFormats.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    setError("");
    onFileSelect(selectedFile);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center transition hover:border-blue-400 hover:bg-blue-50">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-100 p-5">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Your Resume
        </h2>

        <p className="mt-3 text-gray-600">
          Upload a PDF, DOC, or DOCX to receive an AI-powered resume analysis.
        </p>

        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <label
          htmlFor="resume-upload"
          className={`mt-8 inline-flex rounded-xl px-6 py-3 font-semibold text-white transition ${isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "cursor-pointer bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Browse Files
        </label>

        <p className="mt-4 text-sm text-gray-500">
          Supported formats: PDF • DOC • DOCX
        </p>
        {error && (
          <p className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadScreen;