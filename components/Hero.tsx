
import React, { useState } from 'react';

interface HeroProps {
  onGenerate: (idea: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onGenerate, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(idea);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 sm:p-8 shadow-2xl shadow-purple-900/20">
      <form onSubmit={handleSubmit}>
        <label htmlFor="business-idea" className="block text-lg font-semibold mb-3 text-gray-300">
          Enter your business idea
        </label>
        <textarea
          id="business-idea"
          rows={4}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-200 placeholder-gray-500 text-white"
          placeholder="e.g., A subscription box service for artisanal coffee from around the world."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate MVP Plan'
          )}
        </button>
      </form>
    </div>
  );
};

export default Hero;
