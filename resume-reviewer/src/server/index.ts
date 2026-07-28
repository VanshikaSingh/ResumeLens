import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// import { client } from "./openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
//schema
const ResumeAnalysisSchema = z.object({
  atsScore: z.number(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
});
const app = express();
const PORT = 3000;

app.use(cors()); // connects frontend and backend
app.use(express.json()); // lets express know that we are sending json data in the request body

app.post("/analyze-resume", async (req, res) => {
  try {
    const { resume } = req.body;

    const response = await openai.responses.parse({
      model: "gpt-5-mini",
      input: `
You are an expert ATS resume reviewer.

Analyze the following resume.

${JSON.stringify(resume, null, 2)}
`,
      text: {
        format: zodTextFormat(
          ResumeAnalysisSchema,
          "resume_analysis"
        ),
      },
    });

    const analysis = response.output_parsed;

    console.log(analysis);

    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});