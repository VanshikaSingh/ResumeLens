import { useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser"
import docsParser from "../utils/docxParser";
// import cleanResumeText from "../utils/cleanResumeText"
import { parseResume } from "../utils/resumeParser";

function Home() {
  const [file, setFile] = useState(null);
 const [resumeData, setResumeData] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 
  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setIsLoading(true)
    try{
       const rawText = selectedFile.type === "application/pdf" ? 
         await extractPdfText(selectedFile) : 
        await docsParser(selectedFile);
         const parsedResume = parseResume(rawText);
            setResumeData(parsedResume);    
console.log("1. Parsed resume:", parsedResume);

const response = await fetch("http://localhost:3000/analyze-resume", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    resume: parsedResume,
  }),
});

console.log("2. Fetch completed");

console.log("Status:", response.status);

const data = await response.json();

console.log("3. Response:", data);

             
    }catch(error){
        console.error(error)
    }
   setIsLoading(false)
  };


  return (
    <div className="min-h-screen p-8">
      <UploadScreen onFileSelect={handleFileSelect}
      isLoading={isLoading} />

      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
        </div>
      )}
     {resumeData && (
  <div className="mt-4">
    <h2>Extracted Text</h2>
    <div className="whitespace-wrap">
   <pre>{JSON.stringify(resumeData, null, 4)}</pre>
    </div>
  </div>
)}
    </div>
  );
}

export default Home;