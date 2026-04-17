import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav, Footer } from './Landing.jsx'
import { submitSpaces } from '../utils/api.js'

const C = {
  sage: '#7C9A84', sageDark: '#5E7A65', sand: '#C4956A', sandLight: '#F0E4D4',
  bg: '#F6F3EE', card: '#FDFCFA', border: '#E2DDD6', text: '#3A3530', muted: '#8A8480',
}

const css = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
  @keyframes spin { to { transform:rotate(360deg) } }
  @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
  .fade-up { animation: fadeUp 0.4s ease both; }
  .fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
  .fade-up-3 { animation: fadeUp 0.4s 0.2s ease both; }
  .fade-up-4 { animation: fadeUp 0.4s 0.3s ease both; }
  .spinner { animation: spin 1s linear infinite; }
  .pulse { animation: pulse 1.8s ease-in-out infinite; }
  .tip-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(124,154,132,0.12); }
`

function ScoreBar({ label, score, max = 10, color }) {
  const pct = Math.min(100, Math.round((score / max) * 100))
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 11, color: C.muted }}>{score}pts</span>
      </div>
      <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color || C.sage, borderRadius: 3, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  )
}

const ARCHETYPE_COLORS = {
  SANCTUARY: { bg: '#EBF5EC', border: '#B8D9BC', text: '#3A6641' },
  FOCUS:     { bg: '#EEF2FB', border: '#B8C9F0', text: '#2D4270' },
  SOCIAL:    { bg: '#FBF3EA', border: '#E8C99A', text: '#6B4113' },
  CREATIVE:  { bg: '#F9EEF5', border: '#DDB8D5', text: '#5C2B5A' },
  FLOW:      { bg: '#EAF4FB', border: '#A8D0E8', text: '#1D4E6B' },
  RETREAT:   { bg: '#EDF5ED', border: '#A8CCA8', text: '#2D5C2D' },
}

const SCORE_COLORS = ['#7C9A84','#C4956A','#7B9EC8','#C47B9A','#7BB5C4','#9A7CC4']

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('spaces_result')
    if (!raw) { navigate('/quiz'); return }
    setData(JSON.parse(raw))
  }, [navigate])

  useEffect(() => {
    if (data && !submitted) {
      setSubmitted(true)
      submitSpaces({ ...data.form, archetype: data.result.primary, secondaryArchetype: data.result.secondary }).catch(() => {})
    }
  }, [data, submitted])

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: 40, height: 40, border: `3px solid ${C.border}`, borderTopColor: C.sage, borderRadius: '50%', margin: '0 auto 16px' }} />
          <div style={{ fontSize: 14, color: C.muted }}>Preparing your results...</div>
        </div>
      </div>
    )
  }

  const { result, form } = data
  const { primaryData, secondaryData, snapshot, summaryLine, tips, scores } = result
  const archetypeStyle = ARCHETYPE_COLORS[result.primary] || ARCHETYPE_COLORS.SANCTUARY

  const maxScore = Math.max(...Object.values(scores))
  const archEntries = Object.entries(scores).sort((a, b) => b[1] - a[1])

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <style>{css}</style>
      <Nav />
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '36px 20px 80px' }}>

        {/* ARCHETYPE HERO */}
        <div className="fade-up" style={{
          background: archetypeStyle.bg, border: `2px solid ${archetypeStyle.border}`,
          borderRadius: 20, padding: '36px 32px', marginBottom: 18, textAlign: 'center'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: archetypeStyle.text, marginBottom: 12, opacity: 0.8 }}>
            Your Space Archetype
          </div>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{primaryData.icon}</div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700,
            color: archetypeStyle.text, marginBottom: 6, lineHeight: 1.2
          }}>{primaryData.name}</h1>
          <div style={{ fontSize: 14, color: archetypeStyle.text, opacity: 0.8, fontStyle: 'italic', marginBottom: 20 }}>
            {primaryData.tagline}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {primaryData.qualities.map(q => (
              <span key={q} style={{
                padding: '5px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.7)',
                border: `1px solid ${archetypeStyle.border}`, fontSize: 11, fontWeight: 600, color: archetypeStyle.text
              }}>{q}</span>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="fade-up-2" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 26px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 12 }}>Your Space Portrait</div>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.85 }}>{snapshot}</p>
          <div style={{ height: 1, background: C.border, margin: '16px 0' }} />
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, fontStyle: 'italic' }}>{summaryLine}</p>
        </div>

        {/* SERVICE RECOMMENDATION */}
        <div className="fade-up-2" style={{
          background: `linear-gradient(135deg, ${archetypeStyle.bg}, ${C.sandLight})`,
          border: `1.5px solid ${archetypeStyle.border}`, borderRadius: 16, padding: '24px 26px', marginBottom: 14
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sand, marginBottom: 10 }}>Matched Service</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>
            {primaryData.service}
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 18 }}>{primaryData.serviceDesc}</p>
          <button
            onClick={() => navigate('/book', { state: { service: primaryData.service, archetype: primaryData.name } })}
            style={{
              padding: '13px 24px', borderRadius: 10, border: 'none', background: C.sage,
              color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer'
            }}>
            Book a {primaryData.service} Consultation →
          </button>
        </div>

        {/* DESIGN PRINCIPLES */}
        <div className="fade-up-3" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 26px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Design Principles for Your Space</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tips.map((tip, i) => (
              <div key={i} className="tip-card" style={{
                display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12,
                background: '#F6F3EE', border: `1px solid ${C.border}`, transition: 'all 0.15s'
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8, background: C.sage,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 1
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.75 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECONDARY ARCHETYPE */}
        <div className="fade-up-3" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 26px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 12 }}>Secondary Archetype</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 32 }}>{secondaryData.icon}</div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{secondaryData.name}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                You also have strong {secondaryData.name} tendencies. {secondaryData.tagline}. A great design will honour both sides of your spatial identity.
              </div>
            </div>
          </div>
        </div>

        {/* SCORE BREAKDOWN */}
        <div className="fade-up-4" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 26px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Full Archetype Profile</div>
          {archEntries.map(([key, val], i) => {
            const names = { SANCTUARY:'The Sanctuary', FOCUS:'The Focus Zone', SOCIAL:'The Social Hub', CREATIVE:'The Creative Studio', FLOW:'The Flow Space', RETREAT:'The Retreat' }
            return (
              <ScoreBar key={key} label={names[key]} score={val} max={Math.max(maxScore, 1)} color={SCORE_COLORS[i]} />
            )
          })}
        </div>

        {/* CTA */}
        <div className="fade-up-4" style={{
          background: C.text, borderRadius: 18, padding: '32px 28px', textAlign: 'center', marginBottom: 14
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏛</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 10 }}>
            Ready to bring {primaryData.name} to life?
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: 22 }}>
            Book a consultation with Usi at SpacesByTWC and take the first step toward a space that truly reflects who you are.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/book', { state: { service: primaryData.service, archetype: primaryData.name } })}
              style={{
                padding: '14px 28px', borderRadius: 10, border: 'none', background: C.sand,
                color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer'
              }}>
              Book My Consultation
            </button>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '14px 24px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.3)',
                background: 'transparent', color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500, cursor: 'pointer'
              }}>
              Retake Assessment
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
