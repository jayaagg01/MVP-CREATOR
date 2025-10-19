import { useState, useCallback, useEffect } from 'react';

const USAGE_LIMIT = 5;
const STORAGE_KEY = 'mvp-generator-usage';

interface StoredUsage {
  count: number;
  date: string;
}

export const useUsageTracker = () => {
  const getUsageCount = (): number => {
    try {
      const storedUsage = localStorage.getItem(STORAGE_KEY);
      if (storedUsage) {
        const { count, date }: StoredUsage = JSON.parse(storedUsage);
        const today = new Date().toDateString();
        // Reset if the date is not today
        if (date !== today) {
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return count;
      }
    } catch (error) {
      console.error("Failed to read usage from local storage", error);
      // If parsing fails, reset it
      localStorage.removeItem(STORAGE_KEY);
    }
    return 0;
  };

  const [usageCount, setUsageCount] = useState<number>(0);

  useEffect(() => {
    setUsageCount(getUsageCount());
  }, []);

  const isLimitReached = usageCount >= USAGE_LIMIT;

  const incrementUsage = useCallback(() => {
    const currentCount = getUsageCount();
    const newCount = currentCount + 1;
    const today = new Date().toDateString();
    try {
      const newUsage: StoredUsage = { count: newCount, date: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
      setUsageCount(newCount);
    } catch (error) {
      console.error("Failed to write usage to local storage", error);
    }
  }, []);

  return { usageCount, incrementUsage, isLimitReached, USAGE_LIMIT };
};
