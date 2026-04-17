import { useState, useEffect } from 'react'
import { fetchSubmissions } from '../utils/api.js'

const C = {
  sage: '#7C9A84', sageDark: '#5E7A65', sand: '#C4956A', sandLight: '#F0E4D4',
  bg: '#F6F3EE', card: '#FDFCFA', border: '#E2DDD6', text: '#3A3530', muted: '#8A8480',
}

const PASSWORD = 'UsiTwcSpaces2026'

const ARCHETYPE_COLORS = {
  SANCTUARY: '#EBF5EC', FOCUS: '#EEF2FB', SOCIAL: '#FBF3EA',
  CREATIVE: '#F9EEF5', FLOW: '#EAF4FB', RETREAT: '#EDF5ED',
}
const ARCHETYPE_NAMES = {
  SANCTUARY: 'The Sanctuary', FOCUS: 'The Focus Zone', SOCIAL: 'The Social Hub',
  CREATIVE: 'The Creative Studio', FLOW: 'The Flow Space', RETREAT: 'The Retreat',
}

function exportCSV(rows, filename) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(','), ...rows.map(r =>
    headers.map(h => `"${String(r[h] || '').replace(/"/g, '""')}"`).join(',')
  )].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = filename
  a.click()
}

export default function Dashboard() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState('assessments')
  const [assessments, setAssessments] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  function login() {
    if (pw === PASSWORD) { setAuth(true); setPwError(false) }
    else setPwError(true)
  }

  useEffect(() => {
    if (!auth) return
    setLoading(true)
    Promise.all([
      fetchSubmissions('assessments'),
      fetchSubmissions('bookings'),
    ]).then(([a, b]) => {
      setAssessments(Array.isArray(a) ? a : [])
      setBookings(Array.isArray(b) ? b : [])
    }).finally(() => setLoading(false))
  }, [auth])

  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>🏛</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 6 }}>SpacesByTWC</h1>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 28, letterSpacing: '1px' }}>Admin Dashboard</div>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Enter dashboard password"
            style={{
              display: 'block', width: '100%', padding: '13px 16px', borderRadius: 10,
              border: `1.5px solid ${pwError ? '#E07070' : C.border}`, background: '#FAFAF8',
              fontSize: 14, marginBottom: 10, fontFamily: 'DM Sans, sans-serif',
              outline: 'none', color: C.text
            }} />
          {pwError && <div style={{ fontSize: 12, color: '#C0392B', marginBottom: 8 }}>Incorrect password. Please try again.</div>}
          <button
            onClick={login}
            style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              background: C.sage, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer'
            }}>
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const activeRows = tab === 'assessments' ? assessments : bookings
  const filtered = activeRows.filter(r => {
    const s = search.toLowerCase()
    return !s || Object.values(r).some(v => String(v).toLowerCase().includes(s))
  })

  // Stats
  const totalAssessments = assessments.length
  const totalBookings = bookings.length
  const archetypeCounts = {}
  assessments.forEach(r => {
    const a = r.archetype || r.Archetype
    if (a) archetypeCounts[a] = (archetypeCounts[a] || 0) + 1
  })
  const topArchetype = Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1])[0]

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏛</div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 17, color: C.text }}>SpacesByTWC Dashboard</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Admin</div>
          </div>
        </div>
        <button
          onClick={() => exportCSV(activeRows, `spaces-${tab}-${new Date().toISOString().split('T')[0]}.csv`)}
          style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, fontSize: 12, cursor: 'pointer' }}>
          ↓ Export CSV
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Total Assessments', value: totalAssessments, icon: '📋', color: C.sage },
            { label: 'Consultation Bookings', value: totalBookings, icon: '📅', color: C.sand },
            { label: 'Top Archetype', value: topArchetype ? ARCHETYPE_NAMES[topArchetype[0]] || topArchetype[0] : '—', icon: '🏆', color: '#7B9EC8', small: true },
            { label: 'Conversion Rate', value: totalAssessments ? `${Math.round((totalBookings / totalAssessments) * 100)}%` : '—', icon: '📈', color: '#9A7CC4' },
          ].map(s => (
            <div key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 500 }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontSize: s.small ? 15 : 22, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Archetype breakdown */}
        {Object.keys(archetypeCounts).length > 0 && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 22px', marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Archetype Distribution</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1]).map(([arch, count]) => (
                <div key={arch} style={{
                  padding: '8px 14px', borderRadius: 20,
                  background: ARCHETYPE_COLORS[arch] || '#F0EDE7',
                  border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.text
                }}>
                  {ARCHETYPE_NAMES[arch] || arch} — {count}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs + Search */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['assessments', 'bookings'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setExpanded(null) }}
                style={{
                  padding: '8px 18px', borderRadius: 8, border: `1px solid ${tab === t ? C.sage : C.border}`,
                  background: tab === t ? '#EFF5F1' : 'transparent',
                  color: tab === t ? C.sage : C.muted,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize'
                }}>
                {t} ({t === 'assessments' ? totalAssessments : totalBookings})
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              padding: '9px 14px', borderRadius: 8, border: `1px solid ${C.border}`,
              background: C.card, fontSize: 13, color: C.text, fontFamily: 'inherit',
              outline: 'none', width: 200
            }} />
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 40, color: C.muted, fontSize: 14 }}>Loading submissions...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: C.muted }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 14 }}>{search ? 'No results found for your search.' : 'No submissions yet.'}</div>
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
            {filtered.map((row, i) => {
              const name = row.firstName || row['First Name'] || row.name || row.Name || 'Anonymous'
              const lastName = row.lastName || row['Last Name'] || ''
              const email = row.email || row.Email || ''
              const archetype = row.archetype || row.Archetype || ''
              const service = row.service || row.Service || ''
              const ts = row.timestamp || row.Timestamp || ''
              const isOpen = expanded === i

              return (
                <div key={i} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div
                    onClick={() => setExpanded(isOpen ? null : i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                      cursor: 'pointer', background: isOpen ? '#F5F2ED' : 'transparent',
                      transition: 'background 0.12s'
                    }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: archetypeCounts[archetype] ? ARCHETYPE_COLORS[archetype] : C.bg,
                      border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 13, color: C.sage, flexShrink: 0
                    }}>
                      {(name[0] || '?').toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                        {name} {lastName}
                        {archetype && <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 10, background: ARCHETYPE_COLORS[archetype] || C.bg, color: C.sage, fontWeight: 600 }}>{ARCHETYPE_NAMES[archetype] || archetype}</span>}
                        {service && <span style={{ marginLeft: 6, fontSize: 10, padding: '2px 8px', borderRadius: 10, background: C.sandLight, color: C.sand, fontWeight: 600 }}>{service}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                        {email}{ts ? ` · ${new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      {email && <a href={`mailto:${email}`} onClick={e => e.stopPropagation()} style={{ padding: '6px 12px', borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 11, color: C.sage, textDecoration: 'none', fontWeight: 600 }}>Email</a>}
                      <div style={{ fontSize: 12, color: C.muted, padding: '6px 10px' }}>{isOpen ? '▲' : '▼'}</div>
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${C.border}` }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
                        {Object.entries(row).map(([k, v]) => v && k !== 'timestamp' && k !== 'Timestamp' ? (
                          <div key={k} style={{ background: C.bg, borderRadius: 8, padding: '10px 12px', border: `1px solid ${C.border}` }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginBottom: 3, textTransform: 'capitalize', letterSpacing: '0.5px' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5, wordBreak: 'break-word' }}>{String(v)}</div>
                          </div>
                        ) : null)}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
