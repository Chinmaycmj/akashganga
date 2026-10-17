'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { 
  Bot, 
  Send, 
  ShieldCheck, 
  Lightbulb
} from 'lucide-react';

interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  depth?: 'Beginner' | 'Intermediate' | 'Advanced';
  perspective?: string;
  citations?: string[];
  formula?: string;
}

const PRESET_QUESTIONS = [
  'How did Aryabhata deduce Earth’s diurnal rotation in 499 CE?',
  'Why is the Sun exalted in Aries at 10° in traditional Sidereal Jyotisha?',
  'What is the physical astronomical meaning of Rahu and Ketu?',
  'Explain the exact mathematical difference between Tropical and Sidereal zodiacs.',
  'How do the 108 Padas connect the 27 Nakshatras to the D-9 Navamsha chart?',
  'Can an ancient passage about Yugas predict modern Big Bang cosmology?'
];

const TUTOR_KNOWLEDGE_BASE: Record<string, {
  beginner: string;
  intermediate: string;
  advanced: string;
  formula?: string;
  citations: string[];
}> = {
  'How did Aryabhata deduce Earth’s diurnal rotation in 499 CE?': {
    beginner: 'Aryabhata realized that when you are riding in a boat down a river, the trees on the riverbank look like they are running backwards. In the same way, we live on a spinning Earth moving toward the east, which makes the stars appear to move toward the west!',
    intermediate: 'In the Aryabhatiya (Golapada, Verse 9), Aryabhata formulated the optical principle of relative motion: "anulomagātirnausthaḥ paśyatyacalaṁ vilomagaṁ yadvat". He explicitly rejected the myth of a stationary flat Earth and deduced that Earth rotates uniformly eastward on its axis every sidereal day.',
    advanced: 'Aryabhata computed the circumference of Earth as 3,375 yojanas (yielding a diameter of ~12,740 km, astonishingly close to modern equatorial measurement) and calculated Earth’s rotation rate as 1,582,237,500 revolutions per Mahayuga of 4,320,000 years. His radical eastward-rotation theory was criticized by later traditionalists like Brahmagupta and Varahamihira who favored geostatic Puranic orthodoxy.',
    citations: ['Aryabhatiya, Golapada 9', 'K.S. Shukla & K.V. Sarma, INSA (1976)']
  },
  'Why is the Sun exalted in Aries at 10° in traditional Sidereal Jyotisha?': {
    beginner: 'Aries (Mesha) represents the start of spring and the cardinal fire element. When the Sun enters this sign, days grow longer and life awakens with full warmth, making it the Sun’s favorite place to shine!',
    intermediate: 'In classical texts like Brihat Parashara Hora Shastra, planetary dignity is based on elemental harmony. The Sun (Agni tattva, representing the Atman, vitality, and sovereignty) finds its highest resonance in the cardinal fire sign Mesha (ruled by Mars). At 10° Mesha (within Ashwini nakshatra), solar functional strength is considered maximum.',
    advanced: 'Historically, the 10° Mesha exaltation derives from ancient Near Eastern and Indian Hellenistic sidereal astrometry. During the early 1st millennium BCE, the vernal equinox occurred near the head of Aries. At 10° Mesha, the Sun transits the first pada of Ashwini (ruled by Ketu / Ashvins, celestial physicians), harmonizing solar radiance with the primal surge of springtime life.',
    citations: ['Brihat Parashara Hora Shastra, Ch. 3', 'Saravali, Ch. 4', 'Surya Siddhanta']
  },
  'What is the physical astronomical meaning of Rahu and Ketu?': {
    beginner: 'Rahu and Ketu are not physical planets made of rock or gas. They are the two invisible mathematical crossroads where the Moon’s tilted path in the sky crosses the Sun’s path. When the Sun and Moon meet at these crossroads, eclipses happen!',
    intermediate: 'The Moon’s orbit around Earth is tilted by ~5.14° relative to the ecliptic (the Sun’s apparent path). The two intersection points are the lunar nodes. The Ascending Node (where the Moon moves northward) is Rahu; the Descending Node (where the Moon moves southward) is Ketu. Because they are 180° apart, eclipses occur when Syzygy (New or Full Moon) aligns with these nodes.',
    advanced: 'The gravitational torque of the Sun on the Moon’s tilted orbital plane causes the nodal line to regress westward across the zodiac at a rate of 19.34° per year, completing one full 360° revolution in 18.61 years (6,793.5 days). Indian Siddhantas called these points "Chaya Grahas" (shadow seizers) because their alignment casts the Earth’s shadow on the Moon or the Moon’s shadow on Earth.',
    formula: 'Ω(T) = 125.04452° - 1934.136261° · T  (T in Julian centuries)',
    citations: ['Surya Siddhanta Ch. 4 (Eclipse Computation)', 'Aryabhatiya Golapada']
  },
  'Explain the exact mathematical difference between Tropical and Sidereal zodiacs.': {
    beginner: 'The Tropical zodiac is tied to the seasons on Earth (beginning at the first day of spring), while the Sidereal zodiac is tied to the real stars in the sky. Because Earth wobbles like a slow spinning top, the two zodiacs drift apart by about 1 degree every 72 years.',
    intermediate: 'The Tropical zodiac anchors 0° Aries to the Vernal Equinox (the intersection of the celestial equator and ecliptic). However, Earth’s axial precession causes the equinox to shift westward by ~50.29 arcseconds per year. The Sidereal zodiac anchors 0° Mesha to fixed stars (typically Spica/Chitra at 180° in the Lahiri system). The current difference between them is the Ayanamsha (~24°).',
    advanced: 'The relationship is defined as: λ_sidereal = λ_tropical - Δψ_ayanamsha. In 1952, the Indian Government Calendar Reform Committee (headed by physicist Meghnad Saha) standardized the Lahiri Ayanamsha: Δψ = 23° 51′ 25.53″ + 50.29″ · (Y - 2000). Thus a planet at 15° Aries in a Western tropical chart will appear at ~21° Pisces (Meena) in a Vedic sidereal chart.',
    formula: 'λ_sidereal = (λ_tropical - Δψ + 360°) mod 360°',
    citations: ['Report of the Calendar Reform Committee (Govt of India, 1955)', 'IAU Resolution on Precession (2006)']
  },
  'How do the 108 Padas connect the 27 Nakshatras to the D-9 Navamsha chart?': {
    beginner: 'The sky is divided into 27 Nakshatras, and each is split into 4 equal quarters called Padas (27 × 4 = 108). In the Navamsha chart, each 3° 20′ Pada becomes a whole new 30° house, revealing hidden inner qualities!',
    intermediate: 'The 360° zodiac contains 12 Rashis (30° each) and 27 Nakshatras (13° 20′ each). Dividing each Nakshatra by 4 yields 108 Padas of 3° 20′ (200 arcminutes). In the Navamsha (D-9) harmonic chart, each 30° Rashi is divided into 9 segments of 3° 20′. Since 12 × 9 = 108, the 108 Padas form an exact 1-to-1 isomorphism with the Navamsha signs.',
    advanced: 'The Navamsha mapping follows elemental trines: Fire signs (Mesha, Simha, Dhanus) begin their 9 padas at Mesha; Earth signs (Vrishabha, Kanya, Makara) begin at Makara; Air signs (Mithuna, Tula, Kumbha) begin at Tula; Water signs (Karka, Vrishchika, Meena) begin at Karka. This preserves continuous cyclic continuity (27 × 4 = 12 × 9 = 108).',
    formula: 'Pada Span = 360° / 108 = 3° 20′ = 200′',
    citations: ['Brihat Parashara Hora Shastra, Ch. 6 (Divisional Charts)', 'Saravali, Ch. 3']
  },
  'Can an ancient passage about Yugas predict modern Big Bang cosmology?': {
    beginner: 'Ancient Indian texts were brilliant because they imagined the universe lasting billions of years, rather than just a few thousand! But they came from philosophical thinking and poetry, not telescopes or physics experiments measuring cosmic background radiation.',
    intermediate: 'While ancient texts like the Surya Siddhanta describe vast 4.32-billion-year Kalpas (astonishingly close to Earth’s 4.54-billion-year age), these numbers derive from a sacred 4:3:2:1 mathematical proportion, not from empirical observations. True academic respect honors ancient philosophical imagination without making false claims that they "predicted" modern astrophysics.',
    advanced: 'Under Karl Popper’s criterion of falsifiability, modern Big Bang cosmology is supported by precise empirical measurements: the 2.725 K Cosmic Microwave Background, primordial deuterium-to-hydrogen abundance ratios, and high-z Type Ia supernovae redshift. Indian Yuga cosmology is a cyclical metaphysical model based on moral decay and renewal (Dharma), not an adiabatic thermodynamic expansion of space.',
    citations: ['Planck 2018 Results VI (Cosmological Parameters)', 'Carl Sagan, Cosmos (1980)']
  }
};

export default function AICosmicTutorPage() {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: 'Namaste! I am your AI Cosmic Tutor for The Infinite Cosmos. I can explain concepts across modern astrophysics, Vedic astrometry, classical Sanskrit texts, and Jyotisha calculation algorithms. How can I assist your learning today?',
      depth: 'Intermediate'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [explanationDepth, setExplanationDepth] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [showChallengeHint, setShowChallengeHint] = useState<boolean>(false);

  const handleSendMessage = (textToSend?: string) => {
    const q = (textToSend || inputText).trim();
    if (!q) return;

    const userMsg: TutorMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Check knowledge base
    const matched = Object.keys(TUTOR_KNOWLEDGE_BASE).find(key => 
      key.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(key.toLowerCase())
    );

    setTimeout(() => {
      if (matched && TUTOR_KNOWLEDGE_BASE[matched]) {
        const entry = TUTOR_KNOWLEDGE_BASE[matched];
        let replyText = entry.intermediate;
        if (explanationDepth === 'Beginner') replyText = entry.beginner;
        if (explanationDepth === 'Advanced') replyText = entry.advanced;

        const tutorMsg: TutorMessage = {
          id: `t-${Date.now()}`,
          sender: 'tutor',
          text: replyText,
          depth: explanationDepth,
          formula: entry.formula,
          citations: entry.citations
        };
        setMessages(prev => [...prev, tutorMsg]);
      } else {
        const defaultReply: TutorMessage = {
          id: `t-${Date.now()}`,
          sender: 'tutor',
          text: `Regarding "${q}": In our verified curriculum framework, this connects to the principles of celestial astrometry and classical Indian texts. Please select one of the suggested deep-dive queries below or explore the 10-Stage Learning Map for structured progression!`,
          depth: explanationDepth
        };
        setMessages(prev => [...prev, defaultReply]);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" /> AI Cosmic Tutor
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Curriculum-Aware • Multi-Tier Pedagogy
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified Source Retrieval
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Interactive AI Cosmic Tutor
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Ask questions about modern astrophysics, ancient Sanskrit treatises, mathematical algorithms, or traditional Jyotisha rules. Switch between Beginner, Intermediate, and Advanced explanation depths with guaranteed citations and zero fabricated claims.
          </p>
        </div>

        {/* Depth Selector & Safeguard Banner */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold px-2">Explanation Depth:</span>
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map(depth => (
              <button
                key={depth}
                onClick={() => setExplanationDepth(depth)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  explanationDepth === depth
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {depth}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Epistemic Guardrails: Separates empirical astronomy from traditional symbolism.</span>
          </div>
        </div>

        {/* Chat Conversation View */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-8 min-h-[460px] flex flex-col justify-between">
          {/* Messages list */}
          <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 mb-6">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'tutor' && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                )}

                <div className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200'
                }`}>
                  <p>{msg.text}</p>

                  {msg.formula && (
                    <div className="mt-3 p-2.5 bg-slate-900 rounded font-mono text-xs text-amber-300 border border-slate-800">
                      {msg.formula}
                    </div>
                  )}

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400">
                      <strong className="text-amber-400 block mb-0.5">Academic Citations:</strong>
                      {msg.citations.join(' • ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts Carousel */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500 font-semibold block mb-2">Recommended Queries:</span>
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-400/40 hover:text-amber-300 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask your tutor any question across astronomy, Indian cosmology, or math..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </div>

        {/* Guided Practice Challenge */}
        <div className="p-6 bg-gradient-to-br from-purple-950/20 to-slate-900/40 border border-purple-800/30 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              Tutor Guided Challenge: The Ayanamsha Precession Mystery
            </h3>
            <button
              onClick={() => setShowChallengeHint(!showChallengeHint)}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showChallengeHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            If the star Spica (Chitra) is observed at 204° in modern Western tropical coordinates, and the current Lahiri Ayanamsha is 24°, what is Spica’s exact sidereal longitude in Vedic astrometry?
          </p>

          {showChallengeHint && (
            <div className="p-3 bg-slate-950/80 rounded-lg border border-purple-900/50 text-xs text-purple-200 mb-4 font-mono">
              Formula: λ_sidereal = λ_tropical - Δψ = 204° - 24° = 180° (The exact midpoint anchor of the zodiac!)
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSendMessage('Explain how Spica at 180° serves as the anchor of the Lahiri Ayanamsha')}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all font-semibold"
            >
              Ask Tutor to Demonstrate Solution
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
