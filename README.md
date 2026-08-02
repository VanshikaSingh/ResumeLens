# resume-reviewer<img width="898" height="773" alt="Screenshot 2026-08-02 at 6 53 14 PM" src="https://github.com/user-attachments/assets/70a19ba4-bff1-4b10-b487-5fcfd14ec6fa" />


ResumeLens AI is an AI-powered resume analysis platform that helps job seekers improve their resumes by providing ATS feedback, identifying missing skills, and comparing resumes against job descriptions.

The application combines document parsing, AI-powered analysis, and an intuitive dashboard to generate structured, actionable feedback for improving resumes.

---

## Features

### Resume Analysis

- Upload resumes in PDF, DOC, or DOCX format
- AI-powered ATS compatibility analysis
- ATS score (0–10)
- Resume strengths
- Resume weaknesses
- Personalized improvement recommendations

### Job Match Analysis

- Compare resume against any job description
- Job match score
- Matched skills
- Missing skills
- Missing keywords
- Experience gap analysis
- Top prioritized improvements

### User Experience

- Responsive dashboard
- Smooth animations with Framer Motion
- Loading screen during AI analysis
- Friendly error handling
- Clean, modern UI

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express
- OpenAI Responses API
- Zod

### Document Parsing

- react-pdftotext
- Mammoth

---

## Architecture

```text
                  Resume Upload
                        │
                        ▼
             PDF / DOC / DOCX Parsing
                        │
                        ▼
           Structured Resume Sections
                        │
                        ▼
              Node.js + Express API
                        │
                        ▼
              OpenAI Responses API
                        │
                        ▼
         Structured JSON Response (Zod)
                        │
                        ▼
          ResumeLens AI Dashboard
```

---

# Screenshots


## Landing Page



---

## Resume Overview

> Add screenshot here

---

## Job Match Analysis

> Add screenshot here

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/resumelens-ai.git
cd resumelens-ai
```

---

### 2. Install dependencies

Frontend

```bash
npm install
```

Backend

```bash
cd server
npm install
```

---

### 3. Create a `.env` file

Inside the **server** folder, create a file named:

```text
.env
```

Add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key
```

This key is required for the backend to communicate with the OpenAI API.

---

### 4. Start the backend

```bash
cd server
npm run dev
```

---

### 5. Start the frontend

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## Project Structure

```text
ResumeLens-AI
│
├── src
│   ├── components
│   │   ├── overview
│   │   ├── job-match
│   │   └── common
│   │
│   ├── pages
│   ├── types
│   ├── utils
│   └── assets
│
├── server
│   ├── prompts
│   ├── schemas
│   ├── services
│   └── index.ts
│
├── public
│
└── README.md
```

---

## Future Improvements

- AI-powered resume bullet rewriting
- Interactive resume editor
- Cover letter generation
- Resume version comparison
- Download optimized resume
- User authentication
- Saved analysis history
- Dark mode
- Drag-and-drop resume upload

---

## License

This project is licensed under the MIT License.
