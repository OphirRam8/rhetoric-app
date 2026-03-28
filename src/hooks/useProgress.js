import { useState, useEffect } from 'react';

const STORAGE_KEY = 'rhetoric-app-progress';

const defaultProgress = {
  flashcardsStudied: {},   // { conceptKey: { seen: number, lastSeen: timestamp } }
  quizScores: {},          // { chapterId: { correct: number, total: number, lastAttempt: timestamp } }
  scenariosCompleted: {},  // { scenarioId: { completed: boolean, score: number } }
  chaptersRead: {},        // { chapterId: timestamp }
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markFlashcardSeen = (conceptKey) => {
    setProgress(prev => ({
      ...prev,
      flashcardsStudied: {
        ...prev.flashcardsStudied,
        [conceptKey]: {
          seen: (prev.flashcardsStudied[conceptKey]?.seen || 0) + 1,
          lastSeen: Date.now(),
        },
      },
    }));
  };

  const recordQuizScore = (chapterId, correct, total) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [chapterId]: { correct, total, lastAttempt: Date.now() },
      },
    }));
  };

  const markScenarioCompleted = (scenarioId, score) => {
    setProgress(prev => ({
      ...prev,
      scenariosCompleted: {
        ...prev.scenariosCompleted,
        [scenarioId]: { completed: true, score },
      },
    }));
  };

  const markChapterRead = (chapterId) => {
    setProgress(prev => ({
      ...prev,
      chaptersRead: {
        ...prev.chaptersRead,
        [chapterId]: Date.now(),
      },
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const getOverallStats = () => {
    const totalConcepts = Object.keys(progress.flashcardsStudied).length;
    const totalQuizzes = Object.keys(progress.quizScores).length;
    const totalScenarios = Object.keys(progress.scenariosCompleted).length;
    const chaptersRead = Object.keys(progress.chaptersRead).length;

    let quizAvg = 0;
    const scores = Object.values(progress.quizScores);
    if (scores.length > 0) {
      quizAvg = scores.reduce((sum, s) => sum + (s.correct / s.total), 0) / scores.length;
    }

    return { totalConcepts, totalQuizzes, totalScenarios, chaptersRead, quizAvg };
  };

  return {
    progress,
    markFlashcardSeen,
    recordQuizScore,
    markScenarioCompleted,
    markChapterRead,
    resetProgress,
    getOverallStats,
  };
}
