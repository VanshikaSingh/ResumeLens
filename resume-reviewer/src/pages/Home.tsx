import { useState } from "react";
import UploadScreen from "../components/UploadScreen";
import extractPdfText from "../utils/pdfParser"

function Home() {
  const [file, setFile] = useState(null);
 const [text, setText] = useState("");
 const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setIsLoading(true)
    try{
        const extractedText = await extractPdfText(selectedFile);
        setText(extractedText);
        
    }catch(error){
        console.error(error)
    }
   setIsLoading(false)
  };

console.log(JSON.stringify(text));
  return (
    <div className="min-h-screen p-8">
      <UploadScreen onFileSelect={handleFileSelect}
      isLoading={isLoading} />

      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
        </div>
      )}
     {text && (
  <div className="mt-4">
    <h2>Extracted Text</h2>
    <div className="whitespace-wrap">
    <p>{text}</p>
    </div>
  </div>
)}
    </div>
  );
}

export default Home;