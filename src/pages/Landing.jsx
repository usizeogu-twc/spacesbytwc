import { Link, useNavigate } from 'react-router-dom'

const C = {
  sage: '#7C9A84',
  sageDark: '#5E7A65',
  sand: '#C4956A',
  sandLight: '#F0E4D4',
  bg: '#F6F3EE',
  card: '#FDFCFA',
  border: '#E2DDD6',
  text: '#3A3530',
  muted: '#8A8480',
  teal: '#009C84',
}

const css = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
  @keyframes float { 0%,100% { transform:translateY(0px) } 50% { transform:translateY(-6px) } }
  .fade-up { animation: fadeUp 0.5s ease both; }
  .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }
  .fade-up-3 { animation: fadeUp 0.5s 0.2s ease both; }
  .fade-up-4 { animation: fadeUp 0.5s 0.3s ease both; }
  .float-icon { animation: float 3s ease-in-out infinite; }
  .archetype-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(124,154,132,0.18); }
  .service-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(124,154,132,0.15); }
  .nav-link:hover { color: #7C9A84; }
  .btn-primary:hover { background: #5E7A65; }
  .btn-outline:hover { background: #EFF5F1; }
`

export function Nav() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 32px', background: C.card, borderBottom: `1px solid ${C.border}`,
      position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 12px rgba(58,53,48,0.06)'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src="/spaces-logo.png"
          alt="SpacesByTWC"
          style={{ height: 52, objectFit: 'contain', display: 'block' }}
        />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/quiz" className="nav-link" style={{ fontSize: 13, fontWeight: 500, color: C.text, textDecoration: 'none', transition: 'color 0.15s' }}>Space Quiz</Link>
        <Link to="/book" className="nav-link" style={{ fontSize: 13, fontWeight: 500, color: C.text, textDecoration: 'none', transition: 'color 0.15s' }}>Book a Consultation</Link>
        <Link to="/quiz" style={{
          padding: '9px 20px', borderRadius: 8, background: C.sage, color: 'white',
          fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'background 0.15s'
        }} className="btn-primary">Begin Assessment</Link>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer style={{ background: C.text, color: 'rgba(255,255,255,0.75)', padding: '48px 32px 32px', marginTop: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 22, color: 'white', marginBottom: 10 }}>SpacesByTWC</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
              We design spaces that work for you — not just aesthetically, but emotionally, functionally, and intentionally. Every space tells a story. Let us help you write yours.
            </p>
            <div style={{ marginTop: 16, fontSize: 12, color: C.sand }}>support@thewellbeingc.com</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sand, marginBottom: 14 }}>Navigate</div>
            {['Space Quiz', 'Our Services', 'Book a Consultation'].map(l => (
              <div key={l} style={{ fontSize: 13, marginBottom: 8, color: 'rgba(255,255,255,0.65)' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sand, marginBottom: 14 }}>TWC Family</div>
            {[
              { label: 'BodyByTWC', href: 'https://bodybytw c-mk-profile.vercel.app' },
              { label: 'MindByTWC', href: 'https://mindbytwc.vercel.app' },
              { label: 'TWC Diagnosis', href: 'https://twc-diagnosis-app.vercel.app' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12 }}>© {new Date().getFullYear()} The Wellbeing Cognoscente. All rights reserved.</div>
          <a href="https://www.usi101.com/spaces-by-twc/" target="_blank" rel="noreferrer"
            style={{ fontSize: 12, color: C.sand, textDecoration: 'none' }}>usi101.com/spaces-by-twc</a>
        </div>
      </div>
    </footer>
  )
}

const archetypes = [
  { icon: '🕊', name: 'The Sanctuary', desc: 'A restorative haven designed for deep rest, healing, and inner calm.', color: '#EBF5EC' },
  { icon: '🎯', name: 'The Focus Zone', desc: 'A purposeful, minimal environment built for clarity and sustained productivity.', color: '#EEF2FB' },
  { icon: '🤝', name: 'The Social Hub', desc: 'A warm, welcoming space that fosters genuine connection and belonging.', color: '#FBF3EA' },
  { icon: '🎨', name: 'The Creative Studio', desc: 'An expressive, inspiring space that unlocks imagination and creative flow.', color: '#F9EEF5' },
  { icon: '🌊', name: 'The Flow Space', desc: 'An adaptable, versatile environment that shifts effortlessly with your life.', color: '#EAF4FB' },
  { icon: '🌿', name: 'The Retreat', desc: 'A nature-connected space — indoors or out — for grounding and renewal.', color: '#EDF5ED' },
]

const services = [
  { icon: '🔍', title: 'Space Audit', desc: 'A comprehensive assessment of your current space — identifying what is and is not working for your wellbeing and lifestyle.', tag: 'Starting point' },
  { icon: '🏡', title: 'Home Transformation', desc: 'Full residential redesign — from concept to execution. We reimagine living spaces that truly feel like home.', tag: 'Most popular' },
  { icon: '💼', title: 'Workplace Optimisation', desc: 'Designing professional environments that support focus, collaboration, and staff wellbeing.', tag: 'Business' },
  { icon: '🌿', title: 'Wellbeing Space Design', desc: 'Therapeutic, healing, and restorative spaces — for practitioners, retreat spaces, and home sanctuaries.', tag: 'Specialist' },
  { icon: '🌳', title: 'Outdoor Living Design', desc: 'Transforming gardens, terraces, balconies, and courtyards into intentional outdoor living spaces.', tag: 'Outdoor' },
  { icon: '🎨', title: 'Creative Space Consultation', desc: 'Studios, ateliers, and expressive spaces designed to unlock your creative potential.', tag: 'Creative' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'DM Sans, sans-serif' }}>
      <style>{css}</style>
      <Nav />

      {/* HERO */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 32px 64px', textAlign: 'center' }}>
        <div className="fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
          borderRadius: 20, background: C.sandLight, border: `1px solid ${C.sand}`,
          fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sand, marginBottom: 24
        }}>
          <span>✦</span> Your Space, Intentionally Designed
        </div>
        <h1 className="fade-up-2" style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 6vw, 64px)',
          color: C.text, fontWeight: 700, lineHeight: 1.15, marginBottom: 20, maxWidth: 720, margin: '0 auto 20px'
        }}>
          Your environment shapes<br /><em style={{ color: C.sage }}>how you think, feel, and live.</em>
        </h1>
        <p className="fade-up-3" style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 36px' }}>
          SpacesByTWC designs homes, workplaces, wellbeing spaces, and outdoor environments with one intention — to support the life you are trying to live.
        </p>
        <div className="fade-up-4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary"
            style={{
              padding: '14px 32px', borderRadius: 10, border: 'none', background: C.sage,
              color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s'
            }}>
            Discover Your Space Archetype
          </button>
          <button
            onClick={() => navigate('/book')}
            className="btn-outline"
            style={{
              padding: '14px 32px', borderRadius: 10, border: `1.5px solid ${C.sage}`,
              background: 'transparent', color: C.sage, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s'
            }}>
            Book a Consultation
          </button>
        </div>

        {/* Space type pills */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          {['🏡 Home', '💼 Workplace', '🌿 Wellbeing', '🌳 Outdoor'].map(t => (
            <div key={t} style={{
              padding: '8px 16px', borderRadius: 20, background: C.card,
              border: `1px solid ${C.border}`, fontSize: 13, color: C.text, fontWeight: 500
            }}>{t}</div>
          ))}
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section style={{ background: C.sage, padding: '64px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Our Philosophy</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'white', fontWeight: 600, lineHeight: 1.4, marginBottom: 20 }}>
            "A space is never just a room.<br />It is a context for your becoming."
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, maxWidth: 580, margin: '0 auto 32px' }}>
            We believe the spaces around you are not passive. They influence your nervous system, your relationships, your productivity, and your sense of self. Intentional design is not a luxury — it is a form of self-care.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 600, margin: '0 auto' }}>
            {[
              { icon: '🧠', label: 'Wellbeing-led', desc: 'Every decision grounded in how spaces affect the mind and body' },
              { icon: '🏛', label: 'Intentional', desc: 'Nothing is placed without purpose — beauty and function as one' },
              { icon: '🌱', label: 'Deeply personal', desc: 'Designed around you — your life, your rhythms, your vision' },
            ].map(v => (
              <div key={v.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{v.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>{v.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHETYPES */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Space Archetypes</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: C.text, fontWeight: 700, marginBottom: 12 }}>Which space are you?</h2>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: '0 auto' }}>Every person has a spatial identity. Take our assessment to discover yours — and unlock a personalised design direction.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 40 }}>
          {archetypes.map(a => (
            <div key={a.name} className="archetype-card" style={{
              background: a.color, borderRadius: 16, padding: '24px 22px',
              border: `1px solid ${C.border}`, transition: 'all 0.2s', cursor: 'default'
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary"
            style={{
              padding: '14px 36px', borderRadius: 10, border: 'none', background: C.sage,
              color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s'
            }}>
            Take the Space Assessment
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: '#F0EDE7', padding: '72px 32px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>Our Services</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: C.text, fontWeight: 700, marginBottom: 12 }}>Every space, every need</h2>
            <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: '0 auto' }}>Whether you are starting from scratch or refining what you have, we have a service designed for your journey.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {services.map(s => (
              <div key={s.title} className="service-card" style={{
                background: C.card, borderRadius: 16, padding: '26px 24px',
                border: `1px solid ${C.border}`, transition: 'all 0.2s'
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                <div style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 12,
                  background: C.sandLight, color: C.sand, fontSize: 10, fontWeight: 600,
                  letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10
                }}>{s.tag}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.75 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              onClick={() => navigate('/book')}
              className="btn-primary"
              style={{
                padding: '14px 36px', borderRadius: 10, border: 'none', background: C.sage,
                color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s'
              }}>
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: C.sage, marginBottom: 10 }}>The Process</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: C.text, fontWeight: 700 }}>How we work together</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { num: '01', title: 'Discover your space archetype', desc: 'Take our 5-step assessment. We learn how you live, what your space needs, and what your spatial identity is.' },
            { num: '02', title: 'Receive your personalised report', desc: 'Instantly see your space archetype, a matched service recommendation, and design insights tailored to your life.' },
            { num: '03', title: 'Book your consultation', desc: 'Connect with Usi directly to discuss your space, your vision, and how SpacesByTWC can bring it to life.' },
            { num: '04', title: 'Transform your space', desc: 'We design, guide, and support the transformation — from concept to a space that truly feels like yours.' },
          ].map((step, i) => (
            <div key={step.num} style={{
              display: 'flex', gap: 24, alignItems: 'flex-start',
              paddingBottom: i < 3 ? 32 : 0, marginBottom: i < 3 ? 32 : 0,
              borderBottom: i < 3 ? `1px solid ${C.border}` : 'none'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: C.sage,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 700, color: 'white', flexShrink: 0
              }}>{step.num}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6, fontFamily: 'Cormorant Garamond, serif' }}>{step.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: C.text, padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: 'white', fontWeight: 700, marginBottom: 16 }}>
            Ready to meet your space?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 32 }}>
            Take the free assessment and discover the space you are meant to inhabit.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              padding: '16px 40px', borderRadius: 10, border: 'none', background: C.sand,
              color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s'
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            Begin Your Space Assessment
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
