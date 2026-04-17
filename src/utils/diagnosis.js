// SpacesByTWC — Space Archetype Scoring Engine

export const ARCHETYPES = {
  SANCTUARY: {
    id: 'SANCTUARY',
    icon: '🕊',
    name: 'The Sanctuary',
    tagline: 'A space of deep rest and inner restoration',
    color: '#EBF5EC',
    borderColor: '#B8D9BC',
    textColor: '#3A6641',
    service: 'Wellbeing Space Design',
    serviceDesc: 'We recommend our Wellbeing Space Design service — crafting restorative environments that actively support your nervous system, rest, and emotional wellbeing.',
    description: 'Your space archetype is The Sanctuary. You are drawn to environments that feel safe, calm, and deeply restorative. Your ideal space is a refuge from the world — a place where you can exhale fully, reconnect with yourself, and let go of the noise of everyday life.',
    qualities: ['Restorative', 'Calm', 'Protective', 'Gentle', 'Deeply personal'],
    designPrinciples: [
      'Soft, layered lighting — warm tones, dimmers, and natural light as a primary feature',
      'Textures that invite touch — linen, velvet, natural wood, woven materials',
      'A limited, harmonious palette — nothing that competes for your attention',
      'Plants and natural elements to support a sense of aliveness without stimulation',
      'Intentional quiet zones — spaces within the space where you can fully decompress',
    ],
  },
  FOCUS: {
    id: 'FOCUS',
    icon: '🎯',
    name: 'The Focus Zone',
    tagline: 'A purposeful space built for clarity and output',
    color: '#EEF2FB',
    borderColor: '#B8C9F0',
    textColor: '#2D4270',
    service: 'Workplace Optimisation',
    serviceDesc: 'We recommend our Workplace Optimisation service — designing professional and home-office environments that eliminate distraction and support your best cognitive performance.',
    description: 'Your space archetype is The Focus Zone. You thrive when your environment is purposeful and uncluttered. You need your space to work as hard as you do — everything in its place, visual noise removed, and a clear structure that helps your mind stay sharp and directed.',
    qualities: ['Purposeful', 'Minimal', 'Efficient', 'Clear', 'Energising'],
    designPrinciples: [
      'Clean surfaces as a non-negotiable — designated storage for everything',
      'Cool, bright lighting to support alertness and concentration',
      'Ergonomic positioning — your workspace should serve your body as well as your mind',
      'A neutral palette with one intentional accent to anchor the space without distracting',
      'Technology integration — cables, devices, and tools hidden or beautifully organised',
    ],
  },
  SOCIAL: {
    id: 'SOCIAL',
    icon: '🤝',
    name: 'The Social Hub',
    tagline: 'A warm space that holds people together',
    color: '#FBF3EA',
    borderColor: '#E8C99A',
    textColor: '#6B4113',
    service: 'Home Transformation',
    serviceDesc: 'We recommend our Home Transformation service — reimagining your residential spaces to be genuinely welcoming, warm, and designed for the relationships that matter most to you.',
    description: 'Your space archetype is The Social Hub. You come alive when your space is full of people, warmth, and conversation. Your ideal environment holds others well — it is generous, comfortable, and expressive of who you are. A space that makes people want to stay.',
    qualities: ['Warm', 'Generous', 'Inviting', 'Expressive', 'Connected'],
    designPrinciples: [
      'Furniture arrangements that encourage face-to-face connection — no one left on the edges',
      'Warm, ambient lighting — multiple sources for flexible atmospheres',
      'Rich textures and layered materials that invite people to relax and settle in',
      'Generous seating — always room for one more person',
      'Personal touches throughout — art, objects, books that tell your story and invite conversation',
    ],
  },
  CREATIVE: {
    id: 'CREATIVE',
    icon: '🎨',
    name: 'The Creative Studio',
    tagline: 'An expressive space that unlocks your imagination',
    color: '#F9EEF5',
    borderColor: '#DDB8D5',
    textColor: '#5C2B5A',
    service: 'Creative Space Consultation',
    serviceDesc: 'We recommend our Creative Space Consultation — designing studios, ateliers, and expressive spaces that reflect your creative identity and remove every barrier between you and your best work.',
    description: 'Your space archetype is The Creative Studio. Your environment needs to inspire you — it should be as expressive, layered, and dynamic as your own creative mind. You do not want a space that constrains you; you want one that collaborates with you.',
    qualities: ['Expressive', 'Stimulating', 'Bold', 'Layered', 'Dynamic'],
    designPrinciples: [
      'Colour used with intention and confidence — not afraid of personality',
      'Display space for inspiration — mood boards, art, objects, collections',
      'Flexible layouts — the ability to rearrange, experiment, and evolve',
      'Good task lighting alongside atmospheric lighting for different creative modes',
      'Materials and tools beautifully organised but accessible — visible systems that energise rather than overwhelm',
    ],
  },
  FLOW: {
    id: 'FLOW',
    icon: '🌊',
    name: 'The Flow Space',
    tagline: 'An adaptable space that moves with your life',
    color: '#EAF4FB',
    borderColor: '#A8D0E8',
    textColor: '#1D4E6B',
    service: 'Space Audit & Redesign',
    serviceDesc: 'We recommend our Space Audit & Redesign — a full assessment of how your space is working, followed by a redesign that builds versatility and intentional flow into every area.',
    description: 'Your space archetype is The Flow Space. You need your environment to adapt with you — to support focus when you need to concentrate, rest when you need to recover, and connection when you want to share your space. Rigidity does not serve you; intelligent flexibility does.',
    qualities: ['Adaptable', 'Versatile', 'Intuitive', 'Flowing', 'Balanced'],
    designPrinciples: [
      'Multi-use furniture and zones that can shift function with ease',
      'Thoughtful storage that keeps spaces clear without being sterile',
      'A cohesive palette that works across different activities and moods',
      'Modular elements — shelving, seating, lighting — that can be reconfigured',
      'Strong spatial flow between zones so the space breathes and moves naturally',
    ],
  },
  RETREAT: {
    id: 'RETREAT',
    icon: '🌿',
    name: 'The Retreat',
    tagline: 'A nature-connected space for grounding and renewal',
    color: '#EDF5ED',
    borderColor: '#A8CCA8',
    textColor: '#2D5C2D',
    service: 'Outdoor Living Design',
    serviceDesc: 'We recommend our Outdoor Living Design service — transforming gardens, terraces, balconies, and courtyards into intentional living spaces that reconnect you to the natural world.',
    description: 'Your space archetype is The Retreat. You are deeply drawn to nature and need your space to honour that connection. Whether your retreat is a garden, a balcony, a therapy room, or a home interior, the through-line is always natural: organic materials, growing things, and a sense of being held by something larger than the everyday.',
    qualities: ['Grounded', 'Natural', 'Alive', 'Restorative', 'Connected'],
    designPrinciples: [
      'Generous planting — not decoration, but an active presence of life in the space',
      'Natural materials throughout: stone, timber, rattan, clay, linen',
      'Transitions between indoors and outdoors where possible — blurred boundaries',
      'Seasonal awareness built into the design — a space that evolves with the year',
      'Earthy, botanical colour palette drawn directly from the natural world',
    ],
  },
}

// --- Scoring Engine ---

export function generateSpacesDiagnosis(form) {
  const scores = { SANCTUARY: 0, FOCUS: 0, SOCIAL: 0, CREATIVE: 0, FLOW: 0, RETREAT: 0 }

  // STEP 1 — Space type
  const spaceType = form.spaceType
  if (spaceType === 'home') { scores.SANCTUARY += 2; scores.SOCIAL += 1 }
  if (spaceType === 'workplace') { scores.FOCUS += 2; scores.CREATIVE += 1 }
  if (spaceType === 'wellbeing') { scores.SANCTUARY += 2; scores.RETREAT += 1 }
  if (spaceType === 'outdoor') { scores.RETREAT += 3; scores.FLOW += 1 }

  // STEP 2 — Current state scales (1–5)
  const support = parseInt(form.currentSupport) || 3      // How well does space support your life?
  const connection = parseInt(form.currentConnection) || 3  // How connected do you feel to it?
  // Low support scores boost FLOW (needs redesign / audit)
  if (support <= 2) scores.FLOW += 2
  if (support >= 4) scores.SANCTUARY += 1
  // Low connection boosts CREATIVE (needs more personal expression)
  if (connection <= 2) scores.CREATIVE += 1
  if (connection >= 4) scores.SANCTUARY += 1

  // STEP 2 — Current state description
  const currentState = form.currentState
  if (currentState === 'cluttered') scores.FLOW += 2
  if (currentState === 'uninspiring') scores.CREATIVE += 2
  if (currentState === 'almost') scores.FOCUS += 1
  if (currentState === 'notright') scores.SANCTUARY += 1

  // STEP 3 — Desired feeling (most direct mapping)
  const desired = form.desiredFeeling
  if (desired === 'restored') scores.SANCTUARY += 3
  if (desired === 'focused') scores.FOCUS += 3
  if (desired === 'creative') scores.CREATIVE += 3
  if (desired === 'connected') scores.SOCIAL += 3
  if (desired === 'free') scores.FLOW += 3
  if (desired === 'grounded') scores.RETREAT += 3

  // STEP 4 — Who uses the space
  const users = form.whoUses
  if (users === 'solo') { scores.SANCTUARY += 1; scores.FOCUS += 1 }
  if (users === 'partner') { scores.SANCTUARY += 1; scores.SOCIAL += 1 }
  if (users === 'family') { scores.SOCIAL += 2; scores.FLOW += 1 }
  if (users === 'clients') { scores.FOCUS += 1; scores.CREATIVE += 1 }

  // STEP 4 — Rest/restoration frequency (scale 1–5)
  const restFreq = parseInt(form.restFrequency) || 3
  if (restFreq >= 4) scores.SANCTUARY += 2
  if (restFreq <= 2) scores.FOCUS += 1

  // STEP 5 — Aesthetic preference
  const aesthetic = form.aesthetic
  if (aesthetic === 'natural') { scores.RETREAT += 2; scores.SANCTUARY += 1 }
  if (aesthetic === 'minimal') { scores.FOCUS += 2; scores.FLOW += 1 }
  if (aesthetic === 'warm') { scores.SOCIAL += 2; scores.SANCTUARY += 1 }
  if (aesthetic === 'bold') { scores.CREATIVE += 2; scores.FLOW += 1 }

  // Find primary archetype
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primary = sorted[0][0]
  const secondary = sorted[1][0]

  const primaryData = ARCHETYPES[primary]
  const secondaryData = ARCHETYPES[secondary]

  const snapshot = buildSnapshot(primaryData, form)
  const summaryLine = buildSummaryLine(primaryData, secondaryData)
  const tips = buildTips(primaryData, form)

  return { primary, secondary, snapshot, summaryLine, tips, scores, primaryData, secondaryData }
}

function buildSnapshot(archetype, form) {
  const spaceLabels = { home: 'your home', workplace: 'your workplace', wellbeing: 'your wellbeing space', outdoor: 'your outdoor space' }
  const spaceLabel = spaceLabels[form.spaceType] || 'your space'
  return `Based on your responses, ${spaceLabel} is calling for a ${archetype.name} transformation. ${archetype.description}`
}

function buildSummaryLine(primary, secondary) {
  return `You are primarily ${primary.name} with strong echoes of ${secondary.name} — a combination that calls for spaces that are ${primary.qualities[0].toLowerCase()} and ${secondary.qualities[0].toLowerCase()}.`
}

function buildTips(primary, form) {
  const tips = [...primary.designPrinciples]

  // Personalise based on space type
  if (form.spaceType === 'outdoor' && primary.id !== 'RETREAT') {
    tips.push('Consider how your outdoor areas could mirror and extend the feeling of your interior spaces.')
  }
  if (form.spaceType === 'wellbeing') {
    tips.push('For a therapeutic space, scent and sound design are as important as visual elements — consider all the senses.')
  }

  // Personalise based on who uses the space
  if (form.whoUses === 'family') {
    tips.push('With multiple people sharing the space, design storage and zones that give each person a sense of ownership and belonging.')
  }
  if (form.whoUses === 'clients') {
    tips.push('Client-facing spaces need to communicate your values immediately — first impressions are spatial.')
  }

  return tips.slice(0, 5)
}
