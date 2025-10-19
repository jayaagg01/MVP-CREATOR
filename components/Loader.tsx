import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Brewing up your MVP plan..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
       <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
       <p className="text-lg text-gray-300">{message}</p>
    </div>
  );
};

export default Loader;
