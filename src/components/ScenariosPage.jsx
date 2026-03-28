import { useState } from 'react';
import { scenarios } from '../data/scenarios';

export default function ScenariosPage({ onComplete, scenariosCompleted }) {
  const [activeScenario, setActiveScenario] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const scenario = scenarios.find(s => s.id === activeScenario);
  const step = scenario?.steps[stepIndex];

  const handleSelect = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (step.options[index].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (stepIndex + 1 >= scenario.steps.length) {
      const finalScore = score;
      onComplete(activeScenario, finalScore);
      setDone(true);
      return;
    }
    setStepIndex(i => i + 1);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const reset = () => {
    setActiveScenario(null);
    setStepIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setDone(false);
  };

  // Scenario selection
  if (!activeScenario) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-in">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Palatino', serif" }}>
          Practice Scenarios
        </h1>
        <p className="text-ink/60 mb-6">Apply rhetoric in realistic situations. Each scenario walks you through a multi-step persuasive encounter.</p>

        <div className="space-y-4">
          {scenarios.map(s => {
            const completed = scenariosCompleted[s.id];
            return (
              <button
                key={s.id}
                onClick={() => { setActiveScenario(s.id); setDone(false); setScore(0); setStepIndex(0); setShowFeedback(false); setSelectedOption(null); }}
                className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all cursor-pointer border-l-4 border-gold"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{s.title}</h3>
                      {completed && <span className="text-xs bg-correct/10 text-correct px-2 py-0.5 rounded-full font-bold">✓ {completed.score}/{scenarios.find(sc => sc.id === s.id).steps.length}</span>}
                    </div>
                    <p className="text-sm text-ink/60 mt-1">{s.description}</p>
                    <p className="text-xs text-ink/40 mt-2">{s.steps.length} decisions to make</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Completion screen
  if (done) {
    const total = scenario.steps.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-in text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <span className="text-4xl">{scenario.icon}</span>
          <h2 className="text-2xl font-bold mt-3 mb-2">{scenario.title} Complete</h2>
          <p className="text-4xl font-bold text-gold mb-2">{score}/{total}</p>
          <p className="text-ink/60 mb-4">correct rhetorical moves</p>
          {pct >= 75 && <p className="text-correct font-bold mb-4">Masterful use of rhetoric! You navigated this beautifully.</p>}
          {pct >= 50 && pct < 75 && <p className="text-ethos font-bold mb-4">Solid instincts. Review the chapters on the tools you missed.</p>}
          {pct < 50 && <p className="text-pathos font-bold mb-4">Good attempt. Study the relevant chapters and try again.</p>}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setStepIndex(0); setScore(0); setDone(false); setShowFeedback(false); setSelectedOption(null); }}
              className="bg-white border border-parchment-dark px-5 py-2.5 rounded-lg font-bold cursor-pointer hover:bg-parchment-dark transition-colors"
            >
              Retry
            </button>
            <button
              onClick={reset}
              className="bg-gold text-ink px-5 py-2.5 rounded-lg font-bold cursor-pointer hover:bg-gold-dark transition-colors"
            >
              All Scenarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active scenario
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-in">
      <button onClick={reset} className="text-sm text-ink/40 hover:text-ink cursor-pointer mb-4">
        ← Back to scenarios
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{scenario.icon}</span>
        <div>
          <h1 className="text-xl font-bold">{scenario.title}</h1>
          <p className="text-xs text-ink/40">Step {stepIndex + 1} of {scenario.steps.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {scenario.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < stepIndex ? 'bg-gold' : i === stepIndex ? 'bg-gold animate-pulse-gold' : 'bg-parchment-dark'
            }`}
          />
        ))}
      </div>

      {/* Situation (show on first step) */}
      {stepIndex === 0 && (
        <div className="bg-white/80 rounded-lg p-4 mb-4 border-l-3 border-ink/20">
          <p className="text-xs uppercase tracking-wide text-ink/40 font-bold mb-1">Situation</p>
          <p className="text-sm italic">{scenario.situation}</p>
        </div>
      )}

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-parchment-dark">
          <h2 className="text-lg font-bold">{step.prompt}</h2>
        </div>

        <div className="p-4 space-y-2">
          {step.options.map((opt, i) => {
            let style = 'bg-parchment/50 hover:bg-parchment border-transparent';
            if (showFeedback) {
              if (opt.correct) style = 'bg-correct/10 border-correct';
              else if (i === selectedOption) style = 'bg-wrong/10 border-wrong';
              else style = 'bg-parchment/30 border-transparent opacity-50';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer text-sm ${style}`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="p-4 border-t border-parchment-dark">
            <div className={`p-3 rounded-lg text-sm ${step.options[selectedOption].correct ? 'bg-correct/10' : 'bg-wrong/10'}`}>
              <p className="font-bold mb-1">{step.options[selectedOption].correct ? '✓ Strong rhetorical move!' : '✗ Not the strongest choice.'}</p>
              <p className="text-ink/70">{step.options[selectedOption].feedback}</p>
              {!step.options[selectedOption].correct && (
                <p className="text-ink/50 mt-2 italic text-xs">
                  Best move: {step.options.find(o => o.correct).text}
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="mt-3 bg-gold text-ink px-5 py-2.5 rounded-lg font-bold cursor-pointer hover:bg-gold-dark transition-colors w-full"
            >
              {stepIndex + 1 >= scenario.steps.length ? 'See Results' : 'Next Decision →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
