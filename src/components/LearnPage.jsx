import { useState } from 'react';
import { chapters } from '../data/chapters';

const colorMap = {
  gold: { bg: 'bg-gold/10', border: 'border-gold', text: 'text-gold-dark', badge: 'bg-gold text-ink' },
  ethos: { bg: 'bg-ethos/10', border: 'border-ethos', text: 'text-ethos', badge: 'bg-ethos text-white' },
  pathos: { bg: 'bg-pathos/10', border: 'border-pathos', text: 'text-pathos', badge: 'bg-pathos text-white' },
  logos: { bg: 'bg-logos/10', border: 'border-logos', text: 'text-logos', badge: 'bg-logos text-white' },
};

function VisualDiagram({ chapterId }) {
  if (chapterId === 2) {
    return (
      <div className="my-6 p-4 bg-white rounded-lg shadow-inner">
        <h4 className="font-bold text-center mb-4 text-sm uppercase tracking-wide text-ink/60">The Tense Clock</h4>
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e8e0d0" strokeWidth="2" />
              {/* Past - left */}
              <path d="M 100 100 L 20 60" stroke="#c75146" strokeWidth="3" />
              <circle cx="20" cy="60" r="24" fill="#c75146" opacity="0.15" />
              <text x="20" y="55" textAnchor="middle" className="text-[9px] font-bold fill-pathos">PAST</text>
              <text x="20" y="67" textAnchor="middle" className="text-[7px] fill-pathos">Forensic</text>
              {/* Present - top */}
              <path d="M 100 100 L 100 15" stroke="#4a6fa5" strokeWidth="3" />
              <circle cx="100" cy="15" r="24" fill="#4a6fa5" opacity="0.15" />
              <text x="100" y="10" textAnchor="middle" className="text-[9px] font-bold fill-ethos">PRESENT</text>
              <text x="100" y="22" textAnchor="middle" className="text-[7px] fill-ethos">Demonstrative</text>
              {/* Future - right */}
              <path d="M 100 100 L 180 60" stroke="#2a9d8f" strokeWidth="3" />
              <circle cx="180" cy="60" r="24" fill="#2a9d8f" opacity="0.15" />
              <text x="180" y="55" textAnchor="middle" className="text-[9px] font-bold fill-logos">FUTURE</text>
              <text x="180" y="67" textAnchor="middle" className="text-[7px] fill-logos">Deliberative</text>
              {/* Center */}
              <circle cx="100" cy="100" r="8" fill="#c9a84c" />
              <text x="100" y="130" textAnchor="middle" className="text-[8px] fill-ink/50">Power moves HERE →</text>
              <path d="M 135 127 L 170 85" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrow)" />
              <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#c9a84c" /></marker></defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (chapterId === 3) {
    return (
      <div className="my-6 p-4 bg-white rounded-lg shadow-inner">
        <h4 className="font-bold text-center mb-4 text-sm uppercase tracking-wide text-ink/60">Aristotle's Three Appeals</h4>
        <div className="flex justify-center">
          <svg viewBox="0 0 240 200" className="w-72 h-52">
            {/* Triangle */}
            <polygon points="120,20 30,170 210,170" fill="none" stroke="#1a1a2e" strokeWidth="1.5" />
            {/* Ethos */}
            <circle cx="120" cy="20" r="30" fill="#4a6fa5" opacity="0.15" />
            <text x="120" y="16" textAnchor="middle" className="text-[11px] font-bold fill-ethos">ETHOS</text>
            <text x="120" y="28" textAnchor="middle" className="text-[8px] fill-ethos">Character</text>
            {/* Pathos */}
            <circle cx="30" cy="170" r="30" fill="#c75146" opacity="0.15" />
            <text x="30" y="166" textAnchor="middle" className="text-[11px] font-bold fill-pathos">PATHOS</text>
            <text x="30" y="178" textAnchor="middle" className="text-[8px] fill-pathos">Emotion</text>
            {/* Logos */}
            <circle cx="210" cy="170" r="30" fill="#2a9d8f" opacity="0.15" />
            <text x="210" y="166" textAnchor="middle" className="text-[11px] font-bold fill-logos">LOGOS</text>
            <text x="210" y="178" textAnchor="middle" className="text-[8px] fill-logos">Logic</text>
            {/* Center */}
            <text x="120" y="110" textAnchor="middle" className="text-[9px] fill-ink/40">Ethos wins</text>
            <text x="120" y="122" textAnchor="middle" className="text-[9px] fill-ink/40">when they conflict</text>
          </svg>
        </div>
      </div>
    );
  }

  if (chapterId === 10) {
    return (
      <div className="my-6 p-4 bg-white rounded-lg shadow-inner">
        <h4 className="font-bold text-center mb-4 text-sm uppercase tracking-wide text-ink/60">The Stasis Hierarchy</h4>
        <div className="space-y-2 max-w-sm mx-auto">
          {[
            { level: 1, name: 'Facts', desc: '"It didn\'t happen"', w: 'w-full' },
            { level: 2, name: 'Definition', desc: '"It\'s not what you think"', w: 'w-5/6' },
            { level: 3, name: 'Quality', desc: '"It\'s not that bad"', w: 'w-4/6' },
            { level: 4, name: 'Relevance', desc: '"Out of bounds"', w: 'w-3/6' },
          ].map(s => (
            <div key={s.level} className={`${s.w} mx-auto`}>
              <div className="bg-logos/10 border border-logos/30 rounded-lg px-3 py-2 text-center">
                <span className="text-xs text-logos font-bold">Level {s.level}</span>
                <div className="font-bold text-sm">{s.name}</div>
                <div className="text-xs text-ink/50">{s.desc}</div>
              </div>
            </div>
          ))}
          <div className="text-center text-xs text-ink/40 mt-2">← Strongest to Riskiest →</div>
        </div>
      </div>
    );
  }

  if (chapterId === 16) {
    return (
      <div className="my-6 p-4 bg-white rounded-lg shadow-inner">
        <h4 className="font-bold text-center mb-4 text-sm uppercase tracking-wide text-ink/60">Cicero's Five Canons</h4>
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {['Invention', 'Arrangement', 'Style', 'Memory', 'Delivery'].map((canon, i) => (
            <div key={canon} className="flex items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-gold/15 border-2 border-gold flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-gold-dark">{i + 1}</span>
                <span className="text-[10px] font-bold text-ink">{canon}</span>
              </div>
              {i < 4 && <span className="text-gold text-lg">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-1 text-xs">
          <span className="px-2 py-1 rounded bg-ethos/10 text-ethos font-bold">Ethos first</span>
          <span className="text-ink/30">→</span>
          <span className="px-2 py-1 rounded bg-logos/10 text-logos font-bold">Logos middle</span>
          <span className="text-ink/30">→</span>
          <span className="px-2 py-1 rounded bg-pathos/10 text-pathos font-bold">Pathos last</span>
        </div>
      </div>
    );
  }

  return null;
}

export default function LearnPage({ onMarkRead, chaptersRead }) {
  const [expandedId, setExpandedId] = useState(null);

  const parts = [...new Set(chapters.map(c => c.part))];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-in">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Palatino', serif" }}>
        Learn the Concepts
      </h1>
      <p className="text-ink/60 mb-6">Work through each chapter. Tap to expand and study the key ideas.</p>

      {parts.map(part => {
        const partChapters = chapters.filter(c => c.part === part);
        const partTitle = partChapters[0].partTitle;
        return (
          <div key={part} className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-ink/40 mb-3">
              Part {part}: {partTitle}
            </h2>
            <div className="space-y-3">
              {partChapters.map(ch => {
                const colors = colorMap[ch.color];
                const isExpanded = expandedId === ch.id;
                const isRead = !!chaptersRead[ch.id];
                return (
                  <div key={ch.id} className={`rounded-xl border ${colors.border} overflow-hidden transition-all`}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ch.id)}
                      className={`w-full text-left px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-white/50 transition-colors ${isExpanded ? 'bg-white' : ''}`}
                    >
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge}`}>{ch.subtitle}</span>
                      <span className="font-bold flex-1">{ch.title}</span>
                      {isRead && <span className="text-correct text-sm">✓</span>}
                      <span className="text-ink/30 text-lg">{isExpanded ? '−' : '+'}</span>
                    </button>

                    {isExpanded && (
                      <div className={`px-5 pb-5 ${colors.bg} animate-slide-in`}>
                        <p className="text-sm leading-relaxed mb-3">{ch.summary}</p>

                        <div className="bg-white/80 rounded-lg p-3 mb-4 border-l-3 border-gold">
                          <p className="text-xs uppercase tracking-wide text-gold-dark font-bold mb-1">Key Insight</p>
                          <p className="text-sm italic">{ch.keyInsight}</p>
                        </div>

                        <VisualDiagram chapterId={ch.id} />

                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-wide text-ink/40 font-bold mb-2">Key Concepts ({ch.concepts.length})</p>
                          <div className="space-y-2">
                            {ch.concepts.map((concept, i) => (
                              <div key={i} className="bg-white/80 rounded-lg p-3">
                                <span className={`font-bold text-sm ${colors.text}`}>{concept.term}</span>
                                <p className="text-sm text-ink/70 mt-0.5">{concept.definition}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {!isRead && (
                          <button
                            onClick={() => onMarkRead(ch.id)}
                            className="bg-gold text-ink px-4 py-2 rounded-lg font-bold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
                          >
                            Mark as Read ✓
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
