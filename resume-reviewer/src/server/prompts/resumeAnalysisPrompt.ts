
export function buildResumeAnalysisPrompt(
  resume: unknown,
  jobDescription?: string
) {
  return `
You are an expert ATS resume reviewer and career coach.

Analyze the provided resume.

If a job description is provided, compare the resume against the job description and generate a job match analysis.

Resume:

${JSON.stringify(resume, null, 2)}

Job Description:

${jobDescription ?? "Not provided"}

Return your analysis using this structure:

overview
- atsScore (0-10)
- strengths (exactly 3)
- weaknesses (exactly 3)
- suggestions (exactly 3)

If a job description is provided, also generate:

jobMatch
- matchScore (0-100)
- matchedSkills
- missingSkills
- missingKeywords
- experienceGap
- topImprovements

Rules

Overview

ATS Score
- Return a number from 0 to 10.

Strengths
- Return exactly 3.
- Each strength must include:
  - title
  - description

Weaknesses
- Return exactly 3.
- Each weakness must include:
  - section
  - issue
  - severity

Suggestions
- Return exactly 3.
- Each suggestion must include:
  - section
  - recommendation
  - priority

Job Match

Only generate the jobMatch object if a job description is provided.

Match Score
- Return a number from 0 to 100.
- Base the score only on the provided resume and job description.

Matched Skills
- Include only technical skills present in both the resume and the job description.

Missing Skills
- Include only technical skills explicitly required by the job description but not demonstrated in the resume.
- Assign each a priority of high, medium, or low.

Missing Keywords
- Include only important keywords that appear in the job description but not in the resume.
- Assign each a priority of high, medium, or low.

Experience Gap
- Summarize the most significant experience gap in one concise paragraph.

Top Improvements
- Return exactly 3.
- Each improvement must include:
  - title
  - description
  - priority

General Rules
- Do not invent skills or experience.
- Do not infer information that isn't explicitly stated.
- Base all conclusions only on the provided data.
`;
}