import { useState, useCallback, useEffect } from 'react';
import type { MVPPlan, LandingPageContent, HistoryEntry } from '../types';

const HISTORY_STORAGE_KEY = 'mvp-generator-history';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from local storage", error);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  const addHistoryEntry = useCallback((mvpPlan: MVPPlan, landingPageContent: LandingPageContent) => {
    const newEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      mvpPlan,
      landingPageContent,
      createdAt: new Date().toISOString(),
    };

    setHistory(prevHistory => {
      const updatedHistory = [newEntry, ...prevHistory];
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error("Failed to save history to local storage", error);
      }
      return updatedHistory;
    });
  }, []);
  
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear history from local storage", error);
    }
  }, []);

  return { history, addHistoryEntry, clearHistory };
};
