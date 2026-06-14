import { useState } from "react";
type ResumeUploadProps = {
  onFileSelect: (file: File) => void;
};
function UploadScreen({ onFileSelect }: ResumeUploadProps) {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setError("");
    onFileSelect(selectedFile);
  };
console.log(error, "error")
  return (
    <div className="max-w-xl mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="resume-upload"
          className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Browse Files
        </label>

        <p className="mt-3 text-gray-500">
          Upload your resume as a PDF
        </p>
   <input
          type="file"
          className="hidden"
 
        />
        {error && (
          <p className="mt-2 text-red-500 text-sm">
            {error}
          </p>
        )}
        {isLoading ?(
          <p>Processing Resume...</p>
         ): <p>Resume component loaded(new component)</p>}
      </div>
    </div>
  );
}

export default UploadScreen;