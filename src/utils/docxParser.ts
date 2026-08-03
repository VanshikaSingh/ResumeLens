import mammoth from "mammoth";

export default async function docsParser(
  file: File
): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value;
  } catch (error) {
    console.error("Failed to extract text from DOCX", error);
    throw error;
  }
}