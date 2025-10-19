import React, { useState } from 'react';
import type { LandingPageContent } from '../types';
import { 
    CheckCircleIcon, CodeBracketIcon, GlobeAltIcon, 
    ZapIcon, ShieldCheckIcon, UsersIcon, StarIcon, TrendingUpIcon
} from './Icons';

interface LandingPageResultProps {
  content: LandingPageContent;
  projectName: string;
}

const featureIcons = {
    'zap': <ZapIcon className="w-8 h-8 text-yellow-400" />,
    'shield-check': <ShieldCheckIcon className="w-8 h-8 text-blue-400" />,
    'users': <UsersIcon className="w-8 h-8 text-teal-400" />,
    'globe': <GlobeAltIcon className="w-8 h-8 text-green-400" />,
    'trending-up': <TrendingUpIcon className="w-8 h-8 text-rose-400" />,
    'star': <StarIcon className="w-8 h-8 text-amber-400" />
};

const LandingPageResult: React.FC<LandingPageResultProps> = ({ content, projectName }) => {
    const [copied, setCopied] = useState(false);

    const generateHtml = () => {
        const featuresHtml = content.features.map(feature => `
            <div class="bg-gray-800 p-6 rounded-lg text-center">
                <h3 class="text-xl font-bold mb-2">${feature.title}</h3>
                <p class="text-gray-400">${feature.description}</p>
            </div>
        `).join('');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-text { background: linear-gradient(to right, #a78bfa, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto p-8">
        <header class="text-center py-16">
            <h1 class="text-5xl md:text-6xl font-extrabold mb-4">${content.headline}</h1>
            <p class="text-xl text-gray-300 mb-8">${content.subheading}</p>
            <a href="#" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">${content.ctaButton}</a>
        </header>
        <main>
            <section class="py-16">
                <div class="grid md:grid-cols-3 gap-8">
                    ${featuresHtml}
                </div>
            </section>
        </main>
        <footer class="text-center py-8 border-t border-gray-800">
            <p class="text-gray-500">&copy; ${new Date().getFullYear()} ${projectName}. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
        `;
    };

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(generateHtml());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


  return (
    <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-3">
            <GlobeAltIcon className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Landing Page Preview</h2>
        </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg relative">
        <div className="p-6">
            {/* Header / Hero */}
            <div className="text-center py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{content.headline}</h1>
                <p className="text-lg text-gray-300 mb-6">{content.subheading}</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">{content.ctaButton}</button>
            </div>
            
            {/* Features */}
            <div className="py-12">
                 <div className="grid md:grid-cols-3 gap-6">
                    {content.features.map((feature, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center">
                             <div className="mb-4">{featureIcons[feature.icon] || featureIcons['star']}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-100">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

             {/* Footer */}
            <div className="text-center py-6 border-t border-gray-700">
                 <p className="text-gray-500">&copy; {new Date().getFullYear()} {projectName}. All rights reserved.</p>
            </div>
        </div>

        <button
            onClick={handleCopyHtml}
            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            aria-label="Copy HTML"
          >
            {copied ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <CodeBracketIcon className="w-5 h-5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy HTML'}</span>
          </button>
      </div>
    </div>
  );
};

export default LandingPageResult;
