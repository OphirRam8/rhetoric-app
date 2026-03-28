import { useState, useEffect, useCallback } from 'react';
import { useProgress } from './hooks/useProgress';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import LearnPage from './components/LearnPage';
import FlashcardsPage from './components/FlashcardsPage';
import QuizPage from './components/QuizPage';
import ScenariosPage from './components/ScenariosPage';
import ReferencePage from './components/ReferencePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const {
    progress,
    markFlashcardSeen,
    recordQuizScore,
    markScenarioCompleted,
    markChapterRead,
    getOverallStats,
  } = useProgress();

  // Keyboard shortcuts for flashcards
  const handleKeyDown = useCallback((e) => {
    if (activeTab !== 'flashcards') return;
    // The FlashcardsPage handles its own keyboard nav via this event
  }, [activeTab]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const stats = getOverallStats();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} stats={stats} />;
      case 'learn':
        return <LearnPage onMarkRead={markChapterRead} chaptersRead={progress.chaptersRead} />;
      case 'flashcards':
        return <FlashcardsPage onCardSeen={markFlashcardSeen} flashcardsStudied={progress.flashcardsStudied} />;
      case 'quiz':
        return <QuizPage onRecordScore={recordQuizScore} quizScores={progress.quizScores} />;
      case 'scenarios':
        return <ScenariosPage onComplete={markScenarioCompleted} scenariosCompleted={progress.scenariosCompleted} />;
      case 'reference':
        return <ReferencePage />;
      default:
        return <HomePage onNavigate={setActiveTab} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-20">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
