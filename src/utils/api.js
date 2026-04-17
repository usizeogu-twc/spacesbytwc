export async function submitSpaces(data) {
  const res = await fetch('/api/submit-spaces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, type: 'assessment' }),
  })
  if (!res.ok) throw new Error('Submit failed')
  return res.json()
}

export async function submitBooking(data) {
  const res = await fetch('/api/submit-spaces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, type: 'booking' }),
  })
  if (!res.ok) throw new Error('Submit failed')
  return res.json()
}

export async function fetchSubmissions(type = 'assessments') {
  const res = await fetch(`/api/clients-spaces?type=${type}`)
  if (!res.ok) throw new Error('Fetch failed')
  return res.json()
}
