import type { ParsedResume } from "../types/resume";

//component where string transforms to ResumeSections
const sectionPatterns = {
  summary: /^(summary|professional summary)$/i, // JS objects
  skills: /^(skills|technical skills)$/i,// match start of line and end of line
  experience: /^(experience|work experience|professional experience)$/i,
  education: /^education$/i,
  projects: /^projects$/i,
  certifications: /^(certifications|licenses)$/i,
};
export const parseResume = (resumeText: string) => {
    const sections: ParsedResume = {
        header: "",
        summary: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
        certifications: "",
    };
const normalizedText = resumeText
    .replace(/\b(SUMMARY|SKILLS|EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)\b/g, "\n$1\n");

const lines = normalizedText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

   let currentSection: keyof ParsedResume = "header";
  
    //check if the line is a Heading
    for (const line of lines) {


        if (sectionPatterns.summary.test(line)) {
            currentSection = "summary";
            continue;
        }

        if (sectionPatterns.skills.test(line)) {
            
            currentSection = "skills";
            continue;
        }
        if (sectionPatterns.experience.test(line)) {
        
            currentSection = "experience";
            continue;
            
        }

        if (sectionPatterns.education.test(line)) {
            currentSection = "education";
            continue;
        }
        if (sectionPatterns.projects.test(line)) {
            currentSection = "projects";
            continue;
        }

        if (sectionPatterns.certifications.test(line)) {
            currentSection = "certifications";
            continue;
        }
        if (currentSection === "experience") {
  
}
        if (currentSection) {

            sections[currentSection] += `${line}\n`;
        }
    }

    return sections;

}