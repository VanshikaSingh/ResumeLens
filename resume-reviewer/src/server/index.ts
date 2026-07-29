import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ResumeAnalysisSchema = z.object({
  overview: z.object({
    atsScore: z.number().min(0).max(10),

    strengths: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .length(3),

    weaknesses: z
      .array(
        z.object({
          section: z.string(),
          issue: z.string(),
          severity: z.enum(["low", "medium", "high"]),
        })
      )
      .length(3),

 suggestions: z
  .array(
    z.object({
      section: z.string(),
      recommendation: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    })
  )
  .length(3),
  }),
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/analyze-resume", async (req, res) => {
  try {
    const { resume } = req.body;

    const response = await openai.responses.parse({
      model: "gpt-5-mini",

      input: `
You are an expert ATS resume reviewer.

Analyze the following resume.

${JSON.stringify(resume, null, 2)}

Return your analysis using this structure:

overview
- atsScore (0-10)
- strengths (exactly 3)
- weaknesses (exactly 3)
- suggestions (exactly 3)

Rules:

ATS Score
- Return a number from 0 to 10.

Strengths
- Return exactly 3.
- Each strength must include:
  - title
  - description
- Focus on what the resume does well.

Weaknesses
- Return exactly 3.
- Each weakness must include:
  - section
  - issue
  - severity (low, medium, or high)
- Focus on ATS compatibility, readability, clarity, or missing information.

Suggestions
- Return exactly 3.
- Each suggestion must include:
  - section
  - recommendation
  - priority (high, medium, or low)
- Prioritize recommendations based on the impact they would have on improving the resume.
- Recommendations should be specific and actionable.

Evaluate the resume based on:
- ATS compatibility
- Clarity
- Readability
- Professional presentation
- Impact of accomplishments
- Use of measurable achievements
`,

      text: {
        format: zodTextFormat(
          ResumeAnalysisSchema,
          "resume_analysis"
        ),
      },
    });

    const analysis = response.output_parsed;

 

    res.json(analysis);
  } catch (error) {
    console.error("❌ Error:", error);

    res.status(500).json({
      error: "Failed to analyze resume.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});