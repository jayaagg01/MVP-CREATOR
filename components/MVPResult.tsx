import React, { useState } from 'react';
import type { MVPPlan } from '../types';
import ResultCard from './ResultCard';
import { BriefcaseIcon, CheckCircleIcon, ClipboardCopyIcon, CurrencyDollarIcon, LightBulbIcon, TagIcon, UserGroupIcon, UsersIcon } from './Icons';

interface MVPResultProps {
  plan: MVPPlan;
}

const MVPResult: React.FC<MVPResultProps> = ({ plan }) => {
    const [copied, setCopied] = useState(false);

    const planToText = () => {
        let text = `MVP Plan for: ${plan.projectName}\n\n`;
        text += `Summary:\n${plan.summary}\n\n`;
        text += `Core Features:\n${plan.coreFeatures.map(f => `- ${f}`).join('\n')}\n\n`;
        text += `User Personas:\n${plan.userPersonas.map(p => `- ${p}`).join('\n')}\n\n`;
        text += `Tech Stack:\n- Frontend: ${plan.techStack.frontend}\n- Backend: ${plan.techStack.backend}\n- Database: ${plan.techStack.database}\n\n`;
        text += `User Stories:\n${plan.userStories.map(s => `- ${s}`).join('\n')}\n\n`;
        text += `Monetization Strategies:\n${plan.monetizationStrategies.map(s => `- ${s}`).join('\n')}\n\n`;
        text += `Success Metrics:\n${plan.successMetrics.map(s => `- ${s}`).join('\n')}`;
        return text;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(planToText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="relative text-center p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{plan.projectName}</h2>
          <p className="mt-2 text-gray-300">{plan.summary}</p>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            aria-label="Copy plan to clipboard"
          >
            {copied ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <ClipboardCopyIcon className="w-5 h-5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="Core Features" icon={<LightBulbIcon />}>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {plan.coreFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
        </ResultCard>

        <ResultCard title="User Personas" icon={<UsersIcon />}>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {plan.userPersonas.map((persona, index) => <li key={index}>{persona}</li>)}
          </ul>
        </ResultCard>

        <ResultCard title="Tech Stack Suggestion" icon={<BriefcaseIcon />}>
          <div className="space-y-2 text-gray-300">
            <p><strong>Frontend:</strong> {plan.techStack.frontend}</p>
            <p><strong>Backend:</strong> {plan.techStack.backend}</p>
            <p><strong>Database:</strong> {plan.techStack.database}</p>
          </div>
        </ResultCard>

        <ResultCard title="User Stories" icon={<UserGroupIcon />}>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {plan.userStories.map((story, index) => <li key={index}>{story}</li>)}
            </ul>
        </ResultCard>

        <ResultCard title="Monetization Strategies" icon={<CurrencyDollarIcon />}>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {plan.monetizationStrategies.map((strategy, index) => <li key={index}>{strategy}</li>)}
            </ul>
        </ResultCard>

        <ResultCard title="Success Metrics" icon={<TagIcon />}>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {plan.successMetrics.map((metric, index) => <li key={index}>{metric}</li>)}
            </ul>
        </ResultCard>
      </div>
    </div>
  );
};

export default MVPResult;
