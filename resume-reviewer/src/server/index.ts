import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
// import { client } from "./openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = 3000;

app.use(cors()); // connects frontend and backend
app.use(express.json()); // lets express know that we are sending json data in the request body

app.post("/analyze-resume", async (req, res) => {
    console.log("Request received");
  const { resume } = req.body;

  const response = await openai.responses.create({
    model: "gpt-5-mini",
    input: `
You are an expert ATS resume reviewer.

Analyze this resume:

${JSON.stringify(resume, null, 2)}

Give me:
- ATS Score
- 3 strengths
- 3 weaknesses
`,
  });

  res.json({
    message: response.output_text,
  });

});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});