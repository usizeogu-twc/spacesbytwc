export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL_SPACES
  const token = process.env.DASHBOARD_SECRET_SPACES || 'UsiTwcSpaces2026'

  if (!scriptUrl) {
    return res.status(500).json({ error: 'Script URL not configured' })
  }

  const type = req.query.type || 'assessments'

  try {
    const url = `${scriptUrl}?token=${encodeURIComponent(token)}&type=${type}`
    const response = await fetch(url)
    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
