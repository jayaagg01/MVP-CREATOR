import React from 'react';
import { LockClosedIcon } from './Icons';

interface PaywallProps {
  limit: number;
}

const Paywall: React.FC<PaywallProps> = ({ limit }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 sm:p-8 text-center animate-fade-in shadow-2xl shadow-purple-900/20">
      <div className="flex justify-center mb-4">
        <LockClosedIcon className="w-12 h-12 text-yellow-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">You've reached your daily limit</h2>
      <p className="text-gray-300">
        You've generated {limit} MVP plans for today. Please come back tomorrow to generate more!
      </p>
      <p className="text-sm text-gray-400 mt-4">
        This is a demo project to showcase AI capabilities.
      </p>
    </div>
  );
};

export default Paywall;
