import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import Loader from './components/Loader';
import MVPResult from './components/MVPResult';
import LandingPageResult from './components/LandingPageResult';
import Paywall from './components/Paywall';
import HistorySection from './components/HistorySection';
import { generateMVPPlan, generateLandingPageContent } from './services/geminiService';
import { useUsageTracker } from './hooks/useUsageTracker';
import { useHistory } from './hooks/useHistory';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isLimitReached, incrementUsage, USAGE_LIMIT } = useUsageTracker();
  const { history, addHistoryEntry, clearHistory } = useHistory();

  const handleGenerate = useCallback(async (submittedIdea: string) => {
    if (isLoading || isLimitReached) return;

    setIsLoading(true);
    setError(null);

    try {
      const plan = await generateMVPPlan(submittedIdea);
      const content = await generateLandingPageContent(submittedIdea, plan);
      
      addHistoryEntry(plan, content);
      incrementUsage();
    } catch (err) {
      setError("Something went wrong while generating the plan. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isLimitReached, incrementUsage, addHistoryEntry]);

  const latestResult = history.length > 0 ? history[0] : null;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            MVP Launchpad
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Turn your business idea into a comprehensive MVP plan and a stunning landing page with the power of AI.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {isLimitReached ? (
              <Paywall limit={USAGE_LIMIT} />
            ) : (
              <Hero onGenerate={handleGenerate} isLoading={isLoading} />
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                <p>{error}</p>
              </div>
            )}

            {isLoading && <Loader message="Brewing up your masterpiece..." />}

            {!isLoading && latestResult && (
              <div className="space-y-8 md:space-y-12 animate-fade-in">
                  <MVPResult plan={latestResult.mvpPlan} />
                  <LandingPageResult content={latestResult.landingPageContent} projectName={latestResult.mvpPlan.projectName} />
              </div>
            )}
          </div>

          {!isLoading && history.length > 0 && (
            <HistorySection history={history} onClear={clearHistory} />
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
