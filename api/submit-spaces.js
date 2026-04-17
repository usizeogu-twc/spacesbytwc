export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL_SPACES
  if (!scriptUrl) {
    return res.status(500).json({ error: 'Script URL not configured' })
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const text = await response.text()
    return res.status(200).json({ ok: true, response: text })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
