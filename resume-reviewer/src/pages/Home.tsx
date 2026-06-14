import { useState } from "react";
import UploadScreen from "../components/UploadScreen";

function Home() {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };
console.log(file, "--")
  return (
    <div className="min-h-screen p-8">
      <UploadScreen onFileSelect={handleFileSelect} />

      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </div>
  );
}

export default Home;