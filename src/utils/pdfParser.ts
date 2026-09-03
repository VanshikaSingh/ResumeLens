import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { ResumeLink } from "../types/resume";

GlobalWorkerOptions.workerSrc = workerUrl;

type PdfExtractionResult = {
  text: string;
  links: ResumeLink[];
};

export default async function extractPdfText(
  file: File
): Promise<PdfExtractionResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();

  const pdf = await getDocument({
  data: arrayBuffer,
}).promise;

    let text = "";
    const links: ResumeLink[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      text +=
        textContent.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ") + "\n";

      const annotations = await page.getAnnotations();

      for (const annotation of annotations) {
        if (annotation.subtype !== "Link") {
          continue;
        }

        const url = annotation.url ?? annotation.unsafeUrl;

        if (!url) {
          continue;
        }

        let label = "Link";

        try {
          const hostname = new URL(url).hostname.toLowerCase();

          if (hostname.includes("linkedin")) {
            label = "LinkedIn";
          } else if (hostname.includes("github")) {
            label = "GitHub";
          } else {
            label = "Portfolio";
          }
        } catch {
          // Keep generic label if URL cannot be parsed.
        }

        links.push({
          label,
          url,
        });
      }
    }

    return {
      text,
      links,
    };
  } catch (error) {
    console.error("Failed to extract text from PDF", error);
    throw error;
  }
}