import React, { useState } from 'react';
import type { HistoryEntry } from '../types';
import MVPResult from './MVPResult';
import LandingPageResult from './LandingPageResult';
import { ChevronDownIcon } from './Icons';

interface HistoryItemProps {
  entry: HistoryEntry;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ entry }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(entry.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex-1 mr-4">
            <h3 className="font-bold text-lg text-white">{entry.mvpPlan.projectName}</h3>
            <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-700 animate-fade-in">
          <div className="space-y-8 md:space-y-12">
            <MVPResult plan={entry.mvpPlan} />
            <LandingPageResult content={entry.landingPageContent} projectName={entry.mvpPlan.projectName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
