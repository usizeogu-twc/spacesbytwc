import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Nav, Footer } from './Landing.jsx'
import { submitBooking } from '../utils/api.js'

const C = {
  sage: '#7C9A84', sageDark: '#5E7A65', sand: '#C4956A', sandLight: '#F0E4D4',
  bg: '#F6F3EE', card: '#FDFCFA', border: '#E2DDD6', text: '#3A3530', muted: '#8A8480',
}

const css = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .page { animation: fadeUp 0.35s ease both; }
  input:focus, select:focus, textarea:focus { outline: none; border-color: #7C9A84 !important; box-shadow: 0 0 0 3px rgba(124,154,132,0.12); }
  .service-opt { transition: all 0.12s; cursor: pointer; }
  .service-opt:hover { border-color: #7C9A84; background: #EFF5F1; }
`

const SERVICES = [
  { value: 'Space Audit', label: '🔍 Space Audit', desc: 'Full assessment of your existing space' },
  { value: 'Home Transformation', label: '🏡 Home Transformation', desc: 'Residential redesign consultation' },
  { value: 'Workplace Optimisation', label: '💼 Workplace Optimisation', desc: 'Office or professional environment' },
  { value: 'Wellbeing Space Design', label: '🌿 Wellbeing Space Design', desc: 'Therapeutic or healing space' },
  { value: 'Outdoor Living Design', label: '🌳 Outdoor Living Design', desc: 'Garden, terrace, or balcony' },
  { value: 'Creative Space Consultation', label: '🎨 Creative Space Consultation', desc: 'Studio or expressive space' },
]

const HOW_DID = [
  'Space Quiz / Diagnosis', 'usi101.com', 'Instagram', 'Word of mouth / referral',
  'Google search', 'Another TWC app', 'Other'
]

export default function Book() {
  const location = useLocation()
  const navigate = useNavigate()
  const prefill = location.state || {}

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: prefill.service || '',
    archetype: prefill.archetype || '',
    spaceDescription: '',
    timeline: '',
    budget: '',
    location: '',
    howDidYouHear: '',
    message: '',
  })

  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  const valid = form.firstName && form.lastName && form.email && form.service && form.spaceDescription

  async function handleSubmit(e) {
    e.preventDefault()
    if (!valid) return
    setStatus('submitting')
    try {
      await submitBooking({ ...form, type: 'booking' })
      setStatus('success')
      window.scrollTo(0, 0)
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    display: 'block', width: '100%', padding: '12px 14px', borderRadius: 10,
    border: `1.5px solid ${C.border}`, background: C.card, fontSize: 13,
    color: C.text, fontFamily: 'DM Sans, sans-serif', marginTop: 6, transition: 'border 0.15s'
  }

  const labelStyle = { fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '0.3px' }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <Nav />
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '64px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🏛</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: C.text, marginBottom: 12 }}>
            Your enquiry is received.
          </h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
            Thank you for reaching out to SpacesByTWC. Usi will personally review your enquiry and be in touch within 2 business days to discuss your space and next steps.
          </p>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
            padding: '24px', marginBottom: 28, textAlign: 'left'
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.sage, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>What happens next</div>
            {[
              'Usi reviews your enquiry and space description',
              'You receive a personal email within 2 business days',
              'A discovery call is scheduled to explore your vision',
              'Your design journey begins',
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: C.sage, color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px', borderRadius: 10, border: 'none', background: C.sage,
              color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer'
            }}>
            Back to SpacesByTWC
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <style>{css}</style>
      <Nav />
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '36px 20px 80px' }} className="page">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          {prefill.archetype && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              borderRadius: 20, background: '#EFF5F1', border: `1px solid ${C.sage}`,
              fontSize: 11, fontWeight: 600, color: C.sage, marginBottom: 14,
              letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              ✦ {prefill.archetype}
            </div>
          )}
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: C.text, marginBottom: 8, lineHeight: 1.25 }}>
            Book a Consultation
          </h1>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8 }}>
            Tell us about your space and what you are looking to create. Usi will review your enquiry and be in touch personally.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 24px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 18 }}>Your Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input style={inputStyle} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Esther" required />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input style={inputStyle} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Usi" required />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 000000" />
            </div>
          </div>

          {/* Service */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 24px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Service Required *</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SERVICES.map(s => (
                <button
                  key={s.value}
                  type="button"
                  className="service-opt"
                  onClick={() => set('service', s.value)}
                  style={{
                    padding: '13px 14px', borderRadius: 12,
                    border: `1.5px solid ${form.service === s.value ? C.sage : C.border}`,
                    background: form.service === s.value ? '#EFF5F1' : C.card,
                    textAlign: 'left', fontFamily: 'inherit'
                  }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Space Details */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 24px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 18 }}>Your Space</div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Describe your space and what you want to achieve *</label>
              <textarea
                style={{ ...inputStyle, height: 110, resize: 'vertical' }}
                value={form.spaceDescription}
                onChange={e => set('spaceDescription', e.target.value)}
                placeholder="Tell us about the space — what it is, what is not working, and what you are hoping to create..."
                required />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Location (city / country)</label>
              <input style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. London, UK" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Timeline</label>
                <select style={inputStyle} value={form.timeline} onChange={e => set('timeline', e.target.value)}>
                  <option value="">Select...</option>
                  <option>As soon as possible</option>
                  <option>Within 1–3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Exploring options</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Budget range</label>
                <select style={inputStyle} value={form.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Under £1,000</option>
                  <option>£1,000 – £3,000</option>
                  <option>£3,000 – £7,500</option>
                  <option>£7,500 – £15,000</option>
                  <option>£15,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 18 }}>A Little More</div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>How did you hear about SpacesByTWC?</label>
              <select style={inputStyle} value={form.howDidYouHear} onChange={e => set('howDidYouHear', e.target.value)}>
                <option value="">Select...</option>
                {HOW_DID.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Anything else you would like us to know?</label>
              <textarea
                style={{ ...inputStyle, height: 90, resize: 'vertical' }}
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Any additional context, questions, or vision you would like to share..." />
            </div>
          </div>

          {status === 'error' && (
            <div style={{ background: '#FEF0EE', border: '1px solid #F5C5BE', borderRadius: 10, padding: '12px 16px', marginBottom: 14, fontSize: 13, color: '#8B3025' }}>
              Something went wrong. Please try again or email us directly at support@thewellbeingc.com
            </div>
          )}

          <button
            type="submit"
            disabled={!valid || status === 'submitting'}
            style={{
              width: '100%', padding: '16px', borderRadius: 12, border: 'none',
              background: valid && status !== 'submitting' ? C.sage : C.border,
              color: valid && status !== 'submitting' ? 'white' : C.muted,
              fontSize: 15, fontWeight: 700, cursor: valid ? 'pointer' : 'not-allowed',
              fontFamily: 'DM Sans, sans-serif'
            }}>
            {status === 'submitting' ? 'Sending your enquiry...' : 'Submit Consultation Enquiry'}
          </button>
          <div style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 10 }}>
            We will respond within 2 business days. Your information is kept private.
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
