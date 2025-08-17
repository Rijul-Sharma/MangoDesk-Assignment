# MangoDesk AI Meeting Notes Summarizer

## Overview
A full-stack web application to upload meeting transcripts, generate AI-powered summaries (with custom prompts), edit them, and share via email.

## Features
- Upload/paste meeting transcript (text)
- Enter custom prompt/instruction for AI
- Generate summary using Groq AI (gemma2-9b-it model)
- Edit the generated summary
- Add multiple recipient emails dynamically
- Share summary via email

## Tech Stack
- **Frontend:** React JS, Vite, Tailwind CSS v3
- **Backend:** Node.js, Express
- **AI Integration:** Groq SDK (gemma2-9b-it)
- **Email:** Nodemailer (Gmail App Password)
- **Deployment:** Vercel (frontend), Render (backend)

## Setup Instructions

### 1. Clone the Repository
```
https://github.com/your-username/mangodesk-assignment
```

### 2. Frontend
```
cd client
npm install
```
- Set `VITE_BACKEND_URL` in `.env` to your backend URL
- Run locally: `npm run dev`

### 3. Backend
```
cd server
npm install
```
- Create `.env` file with:
  - `EMAIL_USER=your_email@gmail.com`
  - `EMAIL_PASS=your_gmail_app_password`
  - `GROQ_API_KEY=your_groq_api_key`
- Run locally: `npm start`

## Deployment
- **Frontend:** Deploy to Vercel (import project, set env vars)
- **Backend:** Deploy to Render (connect repo, set env vars)

## Usage
1. Paste/upload transcript
2. Enter custom prompt (optional)
3. Click "Generate Summary"
4. Edit summary if needed
5. Add recipient emails (use + icon)
6. Click "Share via Email"

## Notes
- For Gmail, use an App Password (not your regular password)
- Groq API key required for AI summarization
- SSL validation is bypassed for email (for assignment simplicity)

## License
MIT
