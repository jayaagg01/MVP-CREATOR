import React from 'react';
import type { HistoryEntry } from '../types';
import HistoryItem from './HistoryItem';
import { TrashIcon } from './Icons';

interface HistorySectionProps {
  history: HistoryEntry[];
  onClear: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onClear }) => {
  return (
    <div className="mt-12 md:mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-200">Your Past Plans</h2>
        {history.length > 0 && (
            <button 
                onClick={onClear} 
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Clear all history"
            >
                <TrashIcon className="w-4 h-4" />
                Clear All
            </button>
        )}
      </div>
      <div className="space-y-4">
        {history.map(entry => (
          <HistoryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
