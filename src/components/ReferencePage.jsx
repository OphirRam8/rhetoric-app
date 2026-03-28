import { useState } from 'react';
import { quickRefPrinciples } from '../data/chapters';

const sections = [
  {
    id: 'principles',
    title: "Heinrichs' 12 Key Principles",
    icon: '📜',
  },
  {
    id: 'cheatsheet',
    title: 'Quick Cheat Sheet',
    icon: '⚡',
  },
  {
    id: 'flowchart',
    title: 'Decision Flowchart',
    icon: '🔀',
  },
];

export default function ReferencePage() {
  const [activeSection, setActiveSection] = useState('principles');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-in">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Palatino', serif" }}>
        Quick Reference
      </h1>
      <p className="text-ink/60 mb-6">Keep these handy for any persuasive encounter.</p>

      {/* Section tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeSection === s.id ? 'bg-gold text-ink' : 'bg-white border border-parchment-dark text-ink/60 hover:bg-parchment-dark'
            }`}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Principles */}
      {activeSection === 'principles' && (
        <div className="space-y-3">
          {quickRefPrinciples.map(p => (
            <div key={p.num} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start">
              <span className="bg-gold/10 text-gold-dark font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 text-sm">
                {p.num}
              </span>
              <div>
                <p className="font-bold text-sm">{p.principle}</p>
                <p className="text-xs text-ink/40 mt-1">Source: {p.source}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cheat sheet */}
      {activeSection === 'cheatsheet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-ethos mb-3">Ethos (Character) - Build Trust First</h3>
            <ul className="space-y-1.5 text-sm text-ink/70">
              <li><strong>Virtue:</strong> Show you share their values. Use their language.</li>
              <li><strong>Practical Wisdom:</strong> Demonstrate you know what works. Show experience.</li>
              <li><strong>Goodwill:</strong> Signal you have no personal stake. Use "we" not "I."</li>
              <li><strong>Decorum:</strong> Match tone, dress, and formality to the audience.</li>
              <li><strong>Tactical Flaw:</strong> Reveal a weakness that proves your dedication.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-pathos mb-3">Pathos (Emotion) - Shape Their Mood</h3>
            <ul className="space-y-1.5 text-sm text-ink/70">
              <li><strong>Volume Control:</strong> Underplay emotion for maximum effect.</li>
              <li><strong>Storytelling:</strong> First person narratives using their experiences.</li>
              <li><strong>The Backfire:</strong> Express their emotion before they can.</li>
              <li><strong>Dubitatio:</strong> Feign uncertainty to convey sincerity.</li>
              <li><strong>Simple Speech:</strong> Plain language when emotional. No fancy words.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-logos mb-3">Logos (Logic) - Build the Case</h3>
            <ul className="space-y-1.5 text-sm text-ink/70">
              <li><strong>Commonplace:</strong> Start from what they already believe.</li>
              <li><strong>Enthymeme:</strong> Leave the premise unstated. Let them fill it in.</li>
              <li><strong>Concession:</strong> Give away small points to win the big one.</li>
              <li><strong>Stasis:</strong> Choose your level - facts, definition, quality, or relevance.</li>
              <li><strong>Definition Control:</strong> Whoever defines the terms controls the argument.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gold-dark mb-3">Defense - Spot Bad Arguments</h3>
            <ul className="space-y-1.5 text-sm text-ink/70">
              <li><strong>Three Tests:</strong> Does proof hold up? Right # of choices? Proof → conclusion?</li>
              <li><strong>Red Herring:</strong> "That's separate from what we're deciding."</li>
              <li><strong>False Choice:</strong> "Actually, there's a third option."</li>
              <li><strong>Tautology:</strong> "You're restating your claim, not proving it."</li>
              <li><strong>One Rule:</strong> Never argue the inarguable. If it's a fight, you've lost.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Flowchart */}
      {activeSection === 'flowchart' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-center mb-6">Before Any Persuasive Encounter</h3>

          <div className="space-y-4 max-w-md mx-auto">
            {[
              { num: 1, text: 'Map the audience', detail: 'What do they value? What mood are they in?', color: 'bg-ethos/10 border-ethos' },
              { num: 2, text: 'Choose your goal', detail: 'Blame, values, or choice? (Almost always choice → future tense)', color: 'bg-gold/10 border-gold' },
              { num: 3, text: 'Audit your ethos', detail: 'Virtue? Practical wisdom? Disinterested goodwill?', color: 'bg-ethos/10 border-ethos' },
              { num: 4, text: 'Find the commonplace', detail: 'What belief do they already hold that supports your conclusion?', color: 'bg-logos/10 border-logos' },
              { num: 5, text: 'Build your enthymeme', detail: 'Core argument with the commonplace left unstated.', color: 'bg-logos/10 border-logos' },
              { num: 6, text: 'Choose stasis level', detail: 'Facts? Definition? Quality? Relevance?', color: 'bg-logos/10 border-logos' },
              { num: 7, text: 'Prepare concessions', detail: 'What will you give away? What do you want in return?', color: 'bg-gold/10 border-gold' },
              { num: 8, text: 'Read kairos & execute', detail: 'Is the timing right? Follow: Ethos → Logos → Pathos', color: 'bg-pathos/10 border-pathos' },
            ].map((step, i) => (
              <div key={step.num}>
                <div className={`rounded-xl p-4 border-l-4 ${step.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-ink/30 text-lg">{step.num}</span>
                    <div>
                      <p className="font-bold text-sm">{step.text}</p>
                      <p className="text-xs text-ink/50">{step.detail}</p>
                    </div>
                  </div>
                </div>
                {i < 7 && (
                  <div className="flex justify-center">
                    <span className="text-ink/20 text-lg">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gold/10 rounded-xl text-center">
            <p className="font-bold text-sm text-gold-dark">The Master Sequence</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm flex-wrap">
              <span className="px-3 py-1 bg-ethos/20 rounded-full text-ethos font-bold">Ethos (trust)</span>
              <span className="text-ink/30">→</span>
              <span className="px-3 py-1 bg-logos/20 rounded-full text-logos font-bold">Logos (prove)</span>
              <span className="text-ink/30">→</span>
              <span className="px-3 py-1 bg-pathos/20 rounded-full text-pathos font-bold">Pathos (move)</span>
            </div>
            <p className="text-xs text-ink/40 mt-2">"Logic convinces. Emotion compels."</p>
          </div>
        </div>
      )}

      {/* Footer quote */}
      <div className="text-center py-8 mt-4">
        <blockquote className="text-lg italic text-ink/40">
          "You fight to win; you argue to achieve agreement."
        </blockquote>
        <cite className="text-sm text-ink/30">— Jay Heinrichs</cite>
      </div>
    </div>
  );
}
