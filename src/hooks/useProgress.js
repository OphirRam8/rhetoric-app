import { useState, useEffect, useRef, useCallback } from 'react';
import { trpc } from '../lib/trpc';

const STORAGE_KEY = 'rhetoric-app-progress';

const defaultProgress = {
  flashcardsStudied: {},
  quizScores: {},
  scenariosCompleted: {},
  chaptersRead: {},
};

function mergeProgress(local, server) {
  if (!server) return local;
  const merged = { ...defaultProgress };

  // Flashcards: union of keys, prefer higher seen count
  const allFlashcards = new Set([
    ...Object.keys(local.flashcardsStudied || {}),
    ...Object.keys(server.flashcardsStudied || {}),
  ]);
  for (const key of allFlashcards) {
    const l = local.flashcardsStudied?.[key];
    const s = server.flashcardsStudied?.[key];
    if (!l) merged.flashcardsStudied[key] = s;
    else if (!s) merged.flashcardsStudied[key] = l;
    else merged.flashcardsStudied[key] = (l.lastSeen || 0) >= (s.lastSeen || 0) ? l : s;
  }

  // Quiz scores: prefer most recent attempt
  const allQuizzes = new Set([
    ...Object.keys(local.quizScores || {}),
    ...Object.keys(server.quizScores || {}),
  ]);
  for (const key of allQuizzes) {
    const l = local.quizScores?.[key];
    const s = server.quizScores?.[key];
    if (!l) merged.quizScores[key] = s;
    else if (!s) merged.quizScores[key] = l;
    else merged.quizScores[key] = (l.lastAttempt || 0) >= (s.lastAttempt || 0) ? l : s;
  }

  // Scenarios: prefer completed
  const allScenarios = new Set([
    ...Object.keys(local.scenariosCompleted || {}),
    ...Object.keys(server.scenariosCompleted || {}),
  ]);
  for (const key of allScenarios) {
    const l = local.scenariosCompleted?.[key];
    const s = server.scenariosCompleted?.[key];
    if (!l) merged.scenariosCompleted[key] = s;
    else if (!s) merged.scenariosCompleted[key] = l;
    else merged.scenariosCompleted[key] = l.completed ? l : s;
  }

  // Chapters: prefer most recent timestamp
  const allChapters = new Set([
    ...Object.keys(local.chaptersRead || {}),
    ...Object.keys(server.chaptersRead || {}),
  ]);
  for (const key of allChapters) {
    const l = local.chaptersRead?.[key] || 0;
    const s = server.chaptersRead?.[key] || 0;
    merged.chaptersRead[key] = Math.max(l, s);
  }

  return merged;
}

export function useProgress(isLoggedIn = false) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  const mergedRef = useRef(false);
  const saveTimerRef = useRef(null);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Load server progress and merge
  const { data: serverProgress } = trpc.progress.load.useQuery(undefined, {
    enabled: isLoggedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (serverProgress && !mergedRef.current) {
      mergedRef.current = true;
      setProgress(prev => mergeProgress(prev, serverProgress));
    }
  }, [serverProgress]);

  // Reset merge flag when auth state changes
  useEffect(() => {
    if (!isLoggedIn) mergedRef.current = false;
  }, [isLoggedIn]);

  // Debounced save to server
  const saveMutation = trpc.progress.save.useMutation();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveMutation.mutate({ data: progress });
    }, 2000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [progress, isLoggedIn]);

  const markFlashcardSeen = useCallback((conceptKey) => {
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
  }, []);

  const recordQuizScore = useCallback((chapterId, correct, total) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [chapterId]: { correct, total, lastAttempt: Date.now() },
      },
    }));
  }, []);

  const markScenarioCompleted = useCallback((scenarioId, score) => {
    setProgress(prev => ({
      ...prev,
      scenariosCompleted: {
        ...prev.scenariosCompleted,
        [scenarioId]: { completed: true, score },
      },
    }));
  }, []);

  const markChapterRead = useCallback((chapterId) => {
    setProgress(prev => ({
      ...prev,
      chaptersRead: {
        ...prev.chaptersRead,
        [chapterId]: Date.now(),
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    if (isLoggedIn) {
      saveMutation.mutate({ data: defaultProgress });
    }
  }, [isLoggedIn]);

  const getOverallStats = useCallback(() => {
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
  }, [progress]);

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
