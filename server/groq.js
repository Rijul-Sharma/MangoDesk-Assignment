const { Groq } = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqSummary(transcript, prompt) {
  const userContent = prompt
    ? `${prompt}\n\nTranscript:\n${transcript}`
    : `Summarize the following transcript:\n${transcript}`;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: userContent,
        },
      ],
      model: 'gemma2-9b-it',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });
    return chatCompletion.choices[0]?.message?.content || '';
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getGroqSummary };
