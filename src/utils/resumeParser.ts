import type { ResumeSections } from "../types/resume";
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
    const sections: ResumeSections = {
        summary: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
        certifications: "",
    };

    const normalizedText = resumeText
        .replace(/\bSUMMARY\b/gi, "\nSUMMARY\n") // \b means match whole words only: Match only the whole word SUMMARY
        .replace(/\bSKILLS\b/gi, "\nSKILLS\n") // \n means inserting line breaks around SKILLS so text before and after it breaks into new lines
        .replace(/\bEXPERIENCE\b/gi, "\nEXPERIENCE\n") // \g means all EXPERIENCE gets replaced
        .replace(/\bEDUCATION\b/gi, "\nEDUCATION\n")// \i means ignore capitalization
        .replace(/\bPROJECTS\b/gi, "\nPROJECTS\n")
          .replace(/\bCERTIFICATIONS\b/gi, "\nCERTIFICATIONS\n")


    const lines = normalizedText
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean); //split text into lines;

    let currentSection: keyof ResumeSections | "" = "";
  
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