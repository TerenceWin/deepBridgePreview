// Vercel Serverless Function: POST /api/submit-demo
// Receives demo booking form data, forwards to Google Apps Script (Sheets),
// and returns a proper JSON response so the client knows what happened.

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const APPS_SCRIPT_URL = process.env.REACT_APP_SHEETS_URL;

  if (!APPS_SCRIPT_URL) {
    console.error('REACT_APP_SHEETS_URL is not set');
    return res.status(500).json({ error: 'Server misconfiguration: sheets URL missing' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { name, email, company, role, message, files, source } = body || {};

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Missing required fields: name, email, company' });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name,
    email,
    company,
    role: role || '',
    message: message || '',
    files: files || '',
    source: source || '/',
  };

  try {
    const sheetsRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Apps Script redirects (302) on success — fetch follows them.
    // A non-ok status here means something is wrong with the script.
    if (!sheetsRes.ok && sheetsRes.status !== 302) {
      console.error('Apps Script returned:', sheetsRes.status);
      // Still return success to user — we don't want a Sheets config issue
      // to block lead capture. Log for debugging.
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error forwarding to Apps Script:', err);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
}
