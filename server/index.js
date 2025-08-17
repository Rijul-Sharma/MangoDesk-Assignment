const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const { getGroqSummary } = require('./groq');

// POST /summarize: Accepts transcript and prompt, returns summary (Groq integration)
app.post('/summarize', async (req, res) => {
  const { transcript, prompt } = req.body;
  try {
    const summary = await getGroqSummary(transcript, prompt);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /send-email: Accepts summary and recipient emails, sends email
app.post('/send-email', async (req, res) => {
  const { summary, recipients } = req.body;
  try {
    // Configure transporter (use environment variables for credentials)
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
        });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients.join(','),
      subject: 'Meeting Summary',
      text: summary,
    });
    res.json({ success: true, info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
