import { useState, useMemo } from 'react';
import { chapters } from '../data/chapters';

export default function FlashcardsPage({ onCardSeen, flashcardsStudied }) {
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState('browse'); // browse | shuffle

  const allCards = useMemo(() => {
    const cards = [];
    const source = selectedChapter === 'all' ? chapters : chapters.filter(c => c.id === Number(selectedChapter));
    source.forEach(ch => {
      ch.concepts.forEach(concept => {
        cards.push({
          ...concept,
          chapterId: ch.id,
          chapterTitle: ch.title,
          color: ch.color,
          key: `${ch.id}-${concept.term}`,
        });
      });
    });
    if (mode === 'shuffle') {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }
    return cards;
  }, [selectedChapter, mode]);

  const card = allCards[currentIndex];

  const next = () => {
    if (card) onCardSeen(card.key);
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i + 1) % allCards.length), 100);
  };

  const prev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i - 1 + allCards.length) % allCards.length), 100);
  };

  const studiedCount = Object.keys(flashcardsStudied).length;

  const colorBg = {
    gold: 'from-gold/20 to-gold/5',
    ethos: 'from-ethos/20 to-ethos/5',
    pathos: 'from-pathos/20 to-pathos/5',
    logos: 'from-logos/20 to-logos/5',
  };

  const colorBorder = {
    gold: 'border-gold',
    ethos: 'border-ethos',
    pathos: 'border-pathos',
    logos: 'border-logos',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-in">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Palatino', serif" }}>
        Flashcards
      </h1>
      <p className="text-ink/60 mb-6">{studiedCount} concepts studied so far. Tap a card to flip it.</p>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={selectedChapter}
          onChange={e => { setSelectedChapter(e.target.value); setCurrentIndex(0); setIsFlipped(false); }}
          className="bg-white border border-parchment-dark rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Chapters ({chapters.reduce((s, c) => s + c.concepts.length, 0)} cards)</option>
          {chapters.map(ch => (
            <option key={ch.id} value={ch.id}>{ch.title} ({ch.concepts.length})</option>
          ))}
        </select>
        <button
          onClick={() => { setMode(m => m === 'browse' ? 'shuffle' : 'browse'); setCurrentIndex(0); }}
          className={`px-3 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
            mode === 'shuffle' ? 'bg-gold text-ink' : 'bg-white border border-parchment-dark text-ink/60'
          }`}
        >
          {mode === 'shuffle' ? '🔀 Shuffled' : '📖 In Order'}
        </button>
      </div>

      {/* Card */}
      {card && (
        <>
          <div className="card-flip mb-6" style={{ minHeight: 280 }}>
            <div
              className={`card-flip-inner cursor-pointer ${isFlipped ? 'flipped' : ''}`}
              onClick={() => { setIsFlipped(!isFlipped); if (!isFlipped) onCardSeen(card.key); }}
              style={{ minHeight: 280 }}
            >
              {/* Front */}
              <div className={`card-front absolute inset-0 rounded-2xl border-2 ${colorBorder[card.color]} bg-gradient-to-br ${colorBg[card.color]} p-8 flex flex-col items-center justify-center shadow-lg`}>
                <span className="text-xs uppercase tracking-widest text-ink/40 mb-4">{card.chapterTitle}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-center">{card.term}</h2>
                <span className="text-xs text-ink/30 mt-6">tap to reveal</span>
              </div>
              {/* Back */}
              <div className={`card-back absolute inset-0 rounded-2xl border-2 ${colorBorder[card.color]} bg-white p-8 flex flex-col items-center justify-center shadow-lg`}>
                <span className="text-xs uppercase tracking-widest text-ink/40 mb-2">{card.term}</span>
                <p className="text-lg text-center leading-relaxed">{card.definition}</p>
                <span className="text-xs text-ink/30 mt-6">tap to flip back</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              className="bg-white border border-parchment-dark rounded-lg px-4 py-2 font-bold cursor-pointer hover:bg-parchment-dark transition-colors"
            >
              ← Prev
            </button>
            <span className="text-sm text-ink/50">
              {currentIndex + 1} / {allCards.length}
              {flashcardsStudied[card.key] && (
                <span className="ml-2 text-correct">● studied {flashcardsStudied[card.key].seen}x</span>
              )}
            </span>
            <button
              onClick={next}
              className="bg-gold text-ink rounded-lg px-4 py-2 font-bold cursor-pointer hover:bg-gold-dark transition-colors"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* Keyboard hint */}
      <p className="text-center text-xs text-ink/30 mt-6">
        Tip: Use ← → arrow keys to navigate, Space to flip
      </p>
    </div>
  );
}
