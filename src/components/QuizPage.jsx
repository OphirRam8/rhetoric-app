import { useState, useMemo } from 'react';
import { chapters } from '../data/chapters';
import { quizzes } from '../data/quizzes';

export default function QuizPage({ onRecordScore, quizScores }) {
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const questions = useMemo(() => {
    let qs = selectedChapter === 'all' ? [...quizzes] : quizzes.filter(q => q.chapterId === Number(selectedChapter));
    // Shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    return qs;
  }, [selectedChapter]);

  const question = questions[currentIndex];

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const correct = index === question.correct;
    const newCorrect = sessionCorrect + (correct ? 1 : 0);
    const newTotal = sessionTotal + 1;
    setSessionCorrect(newCorrect);
    setSessionTotal(newTotal);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setSessionDone(true);
      if (selectedChapter !== 'all') {
        onRecordScore(Number(selectedChapter), sessionCorrect, sessionTotal);
      }
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSessionDone(false);
  };

  const chapterTitle = (id) => chapters.find(c => c.id === id)?.title || '';

  if (sessionDone) {
    const pct = Math.round((sessionCorrect / sessionTotal) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-in text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-5xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '📚'}</div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-gold mb-2">{pct}%</p>
          <p className="text-ink/60 mb-6">{sessionCorrect} of {sessionTotal} correct</p>
          {pct >= 80 && <p className="text-correct font-bold mb-4">Excellent command of rhetoric!</p>}
          {pct >= 60 && pct < 80 && <p className="text-ethos font-bold mb-4">Good progress. Review the concepts you missed.</p>}
          {pct < 60 && <p className="text-pathos font-bold mb-4">Keep studying! Review the chapters and try again.</p>}
          <button
            onClick={restart}
            className="bg-gold text-ink px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-gold-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-in">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Palatino', serif" }}>
        Quiz
      </h1>
      <p className="text-ink/60 mb-6">Test your rhetoric knowledge. Select a chapter or quiz all topics.</p>

      {/* Chapter select */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={selectedChapter}
          onChange={e => { setSelectedChapter(e.target.value); restart(); }}
          className="bg-white border border-parchment-dark rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Topics ({quizzes.length} questions)</option>
          {chapters.filter(ch => quizzes.some(q => q.chapterId === ch.id)).map(ch => (
            <option key={ch.id} value={ch.id}>
              {ch.title} ({quizzes.filter(q => q.chapterId === ch.id).length}q)
              {quizScores[ch.id] ? ` — ${Math.round((quizScores[ch.id].correct / quizScores[ch.id].total) * 100)}%` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Progress bar */}
      <div className="bg-parchment-dark rounded-full h-2 mb-6">
        <div
          className="bg-gold rounded-full h-2 transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      {question && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-parchment-dark">
            <span className="text-xs text-ink/40 uppercase tracking-wide">
              Question {currentIndex + 1} of {questions.length} • {chapterTitle(question.chapterId)}
            </span>
            <h2 className="text-lg font-bold mt-2">{question.question}</h2>
          </div>

          <div className="p-4 space-y-2">
            {question.options.map((option, i) => {
              let style = 'bg-parchment/50 hover:bg-parchment border-transparent';
              if (showResult) {
                if (i === question.correct) style = 'bg-correct/10 border-correct text-correct';
                else if (i === selectedAnswer) style = 'bg-wrong/10 border-wrong text-wrong';
                else style = 'bg-parchment/30 border-transparent opacity-50';
              } else if (selectedAnswer === i) {
                style = 'bg-gold/20 border-gold';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${style} ${showResult ? '' : 'hover:shadow-md'}`}
                >
                  <span className="font-bold mr-2 text-ink/30">{String.fromCharCode(65 + i)}.</span>
                  {option}
                  {showResult && i === question.correct && <span className="float-right">✓</span>}
                  {showResult && i === selectedAnswer && i !== question.correct && <span className="float-right">✗</span>}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="p-4 border-t border-parchment-dark">
              <div className={`p-3 rounded-lg text-sm ${selectedAnswer === question.correct ? 'bg-correct/10' : 'bg-wrong/10'}`}>
                <p className="font-bold mb-1">{selectedAnswer === question.correct ? 'Correct!' : 'Not quite.'}</p>
                <p className="text-ink/70">{question.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="mt-3 bg-gold text-ink px-5 py-2.5 rounded-lg font-bold cursor-pointer hover:bg-gold-dark transition-colors w-full"
              >
                {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
              </button>
            </div>
          )}

          {/* Score tracker */}
          <div className="px-4 pb-3 flex justify-between text-xs text-ink/40">
            <span>Score: {sessionCorrect}/{sessionTotal}</span>
            <span>{sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
