import { useState } from "react";

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
    <div className="mx-auto max-w-xl">
      <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
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
          className={`inline-block rounded-md px-4 py-2 text-white transition ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Analyzing Resume..." : "Browse Files"}
        </label>

        <p className="mt-3 text-gray-500">
          Upload your resume as a PDF, DOC, or DOCX
        </p>
{isLoading ? (
  <p className="mt-4 text-sm text-blue-600">
    🤖 AI is analyzing your resume...
  </p>
) : null}
        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {isLoading && (
          <p className="mt-4 text-sm text-gray-600">
            Processing your resume with AI...
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadScreen;