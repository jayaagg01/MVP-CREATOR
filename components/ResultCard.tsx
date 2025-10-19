
import React from 'react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-purple-400">{icon}</span>
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ResultCard;
