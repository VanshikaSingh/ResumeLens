import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { buildResumeAnalysisPrompt } from "./prompts/resumeAnalysisPrompt";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MissingSkillSchema = z.object({
  skill: z.string(),
  importance: z.enum(["high", "medium", "low"]),
});

const MissingKeywordSchema = z.object({
  keyword: z.string(),
  importance: z.enum(["high", "medium", "low"]),
});

const ExperienceGapSchema = z.string();

const ImprovementSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

const JobMatchAnalysisSchema = z.object({
  matchScore: z.number().min(0).max(100),

  matchedSkills: z.array(z.string()),

  missingSkills: z.array(MissingSkillSchema),

  missingKeywords: z.array(MissingKeywordSchema),

  experienceGap: ExperienceGapSchema,

  topImprovements: z.array(ImprovementSchema).length(3),
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
  .min(1)
  .max(3),

 suggestions: z
  .array(
    z.object({
      section: z.string(),
      recommendation: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    })
  )
  .min(1)
  .max(3),
  }),

  jobMatch: JobMatchAnalysisSchema.nullable(),
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  
  try {
    const { resume, jobDescription } = req.body;

    const prompt = buildResumeAnalysisPrompt(
      resume,
      jobDescription
    );

    const response = await openai.responses.parse({
      model: "gpt-5-mini",

      input: prompt,

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
  error:
    error instanceof Error
      ? error.message
      : "Internal server error",
});
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});