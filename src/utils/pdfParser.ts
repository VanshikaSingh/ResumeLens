import pdfToText from "react-pdftotext";


export default async function extractPdfText(file:File) : Promise<string> {
    try{
    const text = await pdfToText(file);
    return text;
    } catch(error){
        console.error("Failed to extract text from PDF", error);
        throw error;
    }
  
}