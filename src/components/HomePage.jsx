import { chapters } from '../data/chapters';

function ProgressRing({ progress, size = 80, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e8e0d0" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="#c9a84c" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className="progress-ring"
      />
      <text
        x={size / 2} y={size / 2}
        textAnchor="middle" dominantBaseline="central"
        className="fill-ink font-bold transform rotate-90 origin-center"
        style={{ fontSize: size * 0.25 }}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
}

export default function HomePage({ onNavigate, stats }) {
  const totalChapters = chapters.length;
  const readPercent = (stats.chaptersRead / totalChapters) * 100;
  const quizPercent = stats.quizAvg * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-slide-in">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-ink mb-3 tracking-tight"
          style={{ fontFamily: "'Palatino', 'Book Antiqua', serif" }}
        >
          The Art of Argument
        </h1>
        <p className="text-lg text-ink/60 max-w-xl mx-auto">
          Master rhetoric, debate & negotiation through interactive learning.
          Based on <em>Thank You for Arguing</em> by Jay Heinrichs.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <div className="flex flex-col items-center">
            <ProgressRing progress={readPercent} />
            <span className="text-sm text-ink/60 mt-2">Chapters Read</span>
            <span className="font-bold">{stats.chaptersRead}/{totalChapters}</span>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing progress={Math.min(stats.totalConcepts / 80 * 100, 100)} />
            <span className="text-sm text-ink/60 mt-2">Cards Studied</span>
            <span className="font-bold">{stats.totalConcepts}</span>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing progress={quizPercent} />
            <span className="text-sm text-ink/60 mt-2">Quiz Average</span>
            <span className="font-bold">{stats.totalQuizzes > 0 ? `${Math.round(quizPercent)}%` : '--'}</span>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing progress={stats.totalScenarios / 3 * 100} />
            <span className="text-sm text-ink/60 mt-2">Scenarios</span>
            <span className="font-bold">{stats.totalScenarios}/3</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onNavigate('learn')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-gold"
        >
          <div className="text-2xl mb-2">🏛️</div>
          <h3 className="font-bold text-lg mb-1">Learn the Concepts</h3>
          <p className="text-sm text-ink/60">Read through 17 chapters covering the complete art of rhetoric, from foundations to advanced tools.</p>
        </button>
        <button
          onClick={() => onNavigate('flashcards')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-ethos"
        >
          <div className="text-2xl mb-2">🃏</div>
          <h3 className="font-bold text-lg mb-1">Flashcards</h3>
          <p className="text-sm text-ink/60">Memorize key terms and concepts with interactive flip cards. Study by chapter or all at once.</p>
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-logos"
        >
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-bold text-lg mb-1">Quiz Yourself</h3>
          <p className="text-sm text-ink/60">Test your knowledge with multiple-choice questions. Get instant feedback and explanations.</p>
        </button>
        <button
          onClick={() => onNavigate('scenarios')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-pathos"
        >
          <div className="text-2xl mb-2">🎭</div>
          <h3 className="font-bold text-lg mb-1">Practice Scenarios</h3>
          <p className="text-sm text-ink/60">Apply rhetoric in realistic situations: salary negotiations, team pivots, and conflict resolution.</p>
        </button>
      </div>

      {/* Quote */}
      <div className="text-center py-6 border-t border-parchment-dark">
        <blockquote className="text-lg italic text-ink/50">
          "You fight to win; you argue to achieve agreement."
        </blockquote>
        <cite className="text-sm text-ink/40 mt-1 block">— Jay Heinrichs</cite>
      </div>
    </div>
  );
}
