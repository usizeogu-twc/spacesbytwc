import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from './Landing.jsx'
import { generateSpacesDiagnosis } from '../utils/diagnosis.js'

const C = {
  sage: '#7C9A84', sageDark: '#5E7A65', sand: '#C4956A', sandLight: '#F0E4D4',
  bg: '#F6F3EE', card: '#FDFCFA', border: '#E2DDD6', text: '#3A3530', muted: '#8A8480',
}

const css = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
  .page { animation: fadeUp 0.3s ease both; }
  .space-card { transition: all 0.15s; cursor: pointer; }
  .space-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(124,154,132,0.15); }
  .choice-btn { transition: all 0.15s; cursor: pointer; }
  .choice-btn:hover { border-color: #7C9A84; background: #EFF5F1; }
  .scale-btn { transition: all 0.12s; cursor: pointer; }
  .scale-btn:hover { border-color: #7C9A84; background: #EFF5F1; }
`

const STEPS = [
  { id: 1, label: 'Your Space', tag: 'Step 1 of 6' },
  { id: 2, label: 'Right Now', tag: 'Step 2 of 6' },
  { id: 3, label: 'Desired Feeling', tag: 'Step 3 of 6' },
  { id: 4, label: 'How You Live', tag: 'Step 4 of 6' },
  { id: 5, label: 'Aesthetic', tag: 'Step 5 of 6' },
  { id: 6, label: 'About You', tag: 'Step 6 of 6' },
]

const SPACE_TYPES = [
  { value: 'home', icon: '🏡', label: 'Home', desc: 'Living rooms, bedrooms, kitchen, home office' },
  { value: 'workplace', icon: '💼', label: 'Workplace', desc: 'Office, studio, co-working, professional space' },
  { value: 'wellbeing', icon: '🌿', label: 'Wellbeing Space', desc: 'Therapy room, meditation space, healing room' },
  { value: 'outdoor', icon: '🌳', label: 'Outdoor', desc: 'Garden, balcony, terrace, courtyard' },
]

const CURRENT_STATES = [
  { value: 'cluttered', label: 'Cluttered and overwhelming', desc: 'There is too much — it is hard to think or breathe in here' },
  { value: 'uninspiring', label: 'Functional but uninspiring', desc: 'It works, but it does not lift me — it feels flat and forgettable' },
  { value: 'notright', label: 'Nice but not quite right', desc: 'There are good elements, but something is off — it does not feel like me' },
  { value: 'almost', label: 'Almost there', desc: 'Close to what I want — just needs refining and intentional finishing' },
]

const DESIRED_FEELINGS = [
  { value: 'restored', icon: '🕊', label: 'Restored and at peace', desc: 'Deep rest, quiet, and emotional recovery' },
  { value: 'focused', icon: '🎯', label: 'Focused and energised', desc: 'Clarity, purpose, and cognitive sharpness' },
  { value: 'creative', icon: '🎨', label: 'Creative and inspired', desc: 'Imagination unlocked, ideas flowing freely' },
  { value: 'connected', icon: '🤝', label: 'Connected and at ease', desc: 'Warmth, belonging, shared comfort' },
  { value: 'free', icon: '🌊', label: 'Free and adaptable', desc: 'Flexibility to shift, evolve, and move with life' },
  { value: 'grounded', icon: '🌿', label: 'Grounded and natural', desc: 'Connected to nature, earth, and the living world' },
]

const WHO_USES = [
  { value: 'solo', label: 'Just me', desc: 'This is my personal space' },
  { value: 'partner', label: 'Me and a partner or family member', desc: 'Shared between two people' },
  { value: 'family', label: 'My family or household', desc: 'Multiple people with different needs' },
  { value: 'clients', label: 'Clients, colleagues, or visitors', desc: 'A professional or shared space' },
]

const AESTHETICS = [
  { value: 'natural', icon: '🌾', label: 'Natural & organic', desc: 'Earthy textures, plants, raw materials, warm neutrals drawn from the natural world' },
  { value: 'minimal', icon: '◻️', label: 'Clean & minimal', desc: 'Uncluttered, breathing room, purposeful simplicity, nothing unnecessary' },
  { value: 'warm', icon: '🕯', label: 'Warm & layered', desc: 'Rich fabrics, collections, books, candlelight — a space with depth and story' },
  { value: 'bold', icon: '🎭', label: 'Bold & expressive', desc: 'Colour, art, personality — a space that makes a statement and feels alive' },
]

function ScaleQuestion({ label, min, max, minLabel, maxLabel, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6, fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.4 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className="scale-btn"
            onClick={() => onChange(n)}
            style={{
              flex: 1, padding: '14px 6px', borderRadius: 10, border: `1.5px solid ${value === n ? C.sage : C.border}`,
              background: value === n ? '#EFF5F1' : C.card, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
            }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: value === n ? C.sage : C.muted }}>{n}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, letterSpacing: '0.5px' }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  )
}

export default function Quiz() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    spaceType: '',
    currentSupport: 0,
    currentConnection: 0,
    currentState: '',
    desiredFeeling: '',
    whoUses: '',
    restFrequency: 0,
    aesthetic: '',
    firstName: '',
    lastName: '',
    email: '',
    followUp: true,
  })

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function canAdvance() {
    if (step === 1) return !!form.spaceType
    if (step === 2) return form.currentSupport > 0 && form.currentConnection > 0 && !!form.currentState
    if (step === 3) return !!form.desiredFeeling
    if (step === 4) return !!form.whoUses && form.restFrequency > 0
    if (step === 5) return !!form.aesthetic
    if (step === 6) return !!form.firstName && !!form.email
    return false
  }

  function advance() {
    if (step < 6) { setStep(s => s + 1); window.scrollTo(0, 0) }
    else {
      const result = generateSpacesDiagnosis(form)
      sessionStorage.setItem('spaces_result', JSON.stringify({ form, result }))
      navigate('/results')
    }
  }

  const progress = (step / 6) * 100

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <style>{css}</style>
      <Nav />
      <div style={{ maxWidth: 580, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage }}>
              {STEPS[step - 1].tag}
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>{Math.round(progress)}% complete</div>
          </div>
          <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: C.sage, borderRadius: 2, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* STEP 1 — Space Type */}
        {step === 1 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Space Identity</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 6 }}>
                Which space are you looking to transform?
              </h2>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Think about the specific space you most want to change or improve right now.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {SPACE_TYPES.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    className="space-card"
                    onClick={() => set('spaceType', s.value)}
                    style={{
                      padding: '18px 16px', borderRadius: 14, border: `2px solid ${form.spaceType === s.value ? C.sage : C.border}`,
                      background: form.spaceType === s.value ? '#EFF5F1' : C.card,
                      textAlign: 'left', fontFamily: 'inherit'
                    }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{s.desc}</div>
                    {form.spaceType === s.value && (
                      <div style={{ marginTop: 8, fontSize: 10, color: C.sage, fontWeight: 700 }}>✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Current State */}
        {step === 2 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Right Now</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 20 }}>
                Let us understand your space as it is today.
              </h2>

              <ScaleQuestion
                label="How well does your space currently support your daily life?"
                minLabel="Not at all"
                maxLabel="Completely"
                value={form.currentSupport}
                onChange={v => set('currentSupport', v)}
              />
              <ScaleQuestion
                label="How connected and at home do you feel in this space right now?"
                minLabel="Disconnected"
                maxLabel="Deeply at home"
                value={form.currentConnection}
                onChange={v => set('currentConnection', v)}
              />

              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12, fontFamily: 'Cormorant Garamond, serif' }}>
                  Which best describes your space right now?
                </div>
                {CURRENT_STATES.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    className="choice-btn"
                    onClick={() => set('currentState', s.value)}
                    style={{
                      display: 'block', width: '100%', padding: '14px 16px', borderRadius: 12, marginBottom: 8,
                      border: `1.5px solid ${form.currentState === s.value ? C.sage : C.border}`,
                      background: form.currentState === s.value ? '#EFF5F1' : C.card,
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Desired Feeling */}
        {step === 3 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Your Vision</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 6 }}>
                What do you most want to feel when you step into your transformed space?
              </h2>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Choose the one that resonates most deeply — not what you think you should say, but what your body genuinely longs for.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DESIRED_FEELINGS.map(f => (
                  <button
                    key={f.value}
                    type="button"
                    className="choice-btn"
                    onClick={() => set('desiredFeeling', f.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14,
                      border: `2px solid ${form.desiredFeeling === f.value ? C.sage : C.border}`,
                      background: form.desiredFeeling === f.value ? '#EFF5F1' : C.card,
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{f.label}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2, lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                    {form.desiredFeeling === f.value && (
                      <div style={{ marginLeft: 'auto', color: C.sage, fontSize: 16, fontWeight: 700, flexShrink: 0 }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — How You Live */}
        {step === 4 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Your Lifestyle</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 20 }}>
                Tell us about how you use this space.
              </h2>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12, fontFamily: 'Cormorant Garamond, serif' }}>
                  Who primarily uses this space?
                </div>
                {WHO_USES.map(w => (
                  <button
                    key={w.value}
                    type="button"
                    className="choice-btn"
                    onClick={() => set('whoUses', w.value)}
                    style={{
                      display: 'block', width: '100%', padding: '14px 16px', borderRadius: 12, marginBottom: 8,
                      border: `1.5px solid ${form.whoUses === w.value ? C.sage : C.border}`,
                      background: form.whoUses === w.value ? '#EFF5F1' : C.card,
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{w.label}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{w.desc}</div>
                  </button>
                ))}
              </div>

              <ScaleQuestion
                label="How often do you use this space for rest or restoration?"
                minLabel="Rarely"
                maxLabel="Daily"
                value={form.restFrequency}
                onChange={v => set('restFrequency', v)}
              />
            </div>
          </div>
        )}

        {/* STEP 5 — Aesthetic */}
        {step === 5 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Your Aesthetic</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 6 }}>
                Which aesthetic speaks to your ideal space?
              </h2>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Trust your instinct here — which one do you feel in your body, not just your head.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {AESTHETICS.map(a => (
                  <button
                    key={a.value}
                    type="button"
                    className="choice-btn"
                    onClick={() => set('aesthetic', a.value)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 18px', borderRadius: 14,
                      border: `2px solid ${form.aesthetic === a.value ? C.sage : C.border}`,
                      background: form.aesthetic === a.value ? '#EFF5F1' : C.card,
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                    <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{a.label}</div>
                      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{a.desc}</div>
                    </div>
                    {form.aesthetic === a.value && (
                      <div style={{ marginLeft: 'auto', color: C.sage, fontSize: 16, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6 — About You */}
        {step === 6 && (
          <div className="page">
            <div style={{ background: C.card, borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Almost There</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 6 }}>
                Who are we speaking to?
              </h2>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 22 }}>
                Your results are ready. Just tell us your name and email so we can send them to you and keep in touch.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.text }}>First Name *</label>
                  <input
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="Your first name"
                    style={{
                      display: 'block', width: '100%', padding: '12px 14px', borderRadius: 10,
                      border: `1.5px solid ${C.border}`, background: '#FAFAF8', fontSize: 13,
                      color: C.text, fontFamily: 'DM Sans, sans-serif', marginTop: 6, outline: 'none'
                    }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Last Name</label>
                  <input
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Your last name"
                    style={{
                      display: 'block', width: '100%', padding: '12px 14px', borderRadius: 10,
                      border: `1.5px solid ${C.border}`, background: '#FAFAF8', fontSize: 13,
                      color: C.text, fontFamily: 'DM Sans, sans-serif', marginTop: 6, outline: 'none'
                    }} />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    display: 'block', width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: `1.5px solid ${C.border}`, background: '#FAFAF8', fontSize: 13,
                    color: C.text, fontFamily: 'DM Sans, sans-serif', marginTop: 6, outline: 'none'
                  }} />
              </div>
              <div
                onClick={() => set('followUp', !form.followUp)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, border: `2px solid ${form.followUp ? C.sage : C.border}`,
                  background: form.followUp ? C.sage : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {form.followUp && <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                  I am happy for SpacesByTWC to follow up with me about my results
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => { setStep(s => s - 1); window.scrollTo(0, 0) }}
              style={{
                padding: '14px 20px', borderRadius: 10, border: `1.5px solid ${C.border}`,
                background: 'transparent', color: C.muted, fontSize: 14, fontWeight: 500, cursor: 'pointer'
              }}>
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            style={{
              flex: 1, padding: '15px 24px', borderRadius: 10, border: 'none',
              background: canAdvance() ? C.sage : C.border,
              color: canAdvance() ? 'white' : C.muted,
              fontSize: 15, fontWeight: 600, cursor: canAdvance() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s'
            }}>
            {step < 5 ? `Continue to Step ${step + 1} →` : step === 5 ? 'Almost Done →' : 'Reveal My Space Archetype ✦'}
          </button>
        </div>
      </div>
    </div>
  )
}
