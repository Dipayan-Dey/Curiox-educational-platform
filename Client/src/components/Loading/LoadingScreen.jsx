import { useState, useEffect } from 'react';

export default function ProfessionalLoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 2 + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-12 max-w-md mx-auto px-8">
        
        {/* Company Logo Area */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 bg-gray-900 rounded-md"></div>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-20 h-20 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-white text-xl font-medium tracking-wide">
            Loading Application
          </h1>
          <p className="text-gray-400 text-sm">
            Please wait while we prepare your workspace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-linear"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Initializing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-gray-600 text-xs">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}