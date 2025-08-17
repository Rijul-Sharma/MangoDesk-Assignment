import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editSummary, setEditSummary] = useState('');
  const [recipients, setRecipients] = useState(['']);
  const [emailStatus, setEmailStatus] = useState('');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setEmailStatus('');
    try {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, prompt }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setEditSummary(data.summary);
    } catch (err) {
      setSummary('Error generating summary.');
    }
    setIsLoading(false);
  };

  const handleSendEmail = async () => {
    setEmailStatus('Sending...');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: editSummary, recipients }),
      });
      const data = await res.json();
      if (data.success) setEmailStatus('Email sent!');
      else setEmailStatus('Failed to send email.');
    } catch (err) {
      setEmailStatus('Error sending email.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white shadow rounded p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-2">AI Notes Summarizer</h1>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={6}
          placeholder="Paste your meeting transcript here..."
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-2"
          type="text"
          placeholder="Custom prompt (optional)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleGenerateSummary}
          disabled={isLoading || !transcript}
        >
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </button>

        {summary && (
          <div className="mt-6">
            <label className="block font-semibold mb-1">Editable Summary:</label>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows={6}
              value={editSummary}
              onChange={e => setEditSummary(e.target.value)}
            />
            <div className="space-y-2 mb-2">
              {recipients.map((email, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="w-full border rounded p-2"
                    type="email"
                    placeholder={`Recipient email${recipients.length > 1 ? ` #${idx + 1}` : ''}`}
                    value={email}
                    onChange={e => {
                      const newRecipients = [...recipients];
                      newRecipients[idx] = e.target.value;
                      setRecipients(newRecipients);
                    }}
                  />
                  {recipients.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setRecipients(recipients.filter((_, i) => i !== idx));
                      }}
                      aria-label="Remove email"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                  {idx === recipients.length - 1 && (
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => setRecipients([...recipients, ''])}
                      aria-label="Add email"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSendEmail}
              disabled={!editSummary || recipients.some(email => !email)}
            >
              Share via Email
            </button>
            {emailStatus && <div className="mt-2 text-sm">{emailStatus}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
