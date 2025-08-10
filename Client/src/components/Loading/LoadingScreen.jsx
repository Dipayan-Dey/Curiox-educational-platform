import React, { useState, useEffect } from 'react';
import logo from "../../assets/curiox logo 1.png"
export default function ProfessionalLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing secure connection...",
    "Authenticating credentials...",
    "Loading enterprise dashboard...",
    "Preparing workspace...",
    "Ready"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 8 + 2, 100);
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-lg w-full px-8">
        
        {/* Corporate Logo */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-white/10 backdrop-blur border border-white/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
            {/* <div className="w-10 h-10 border-2 border-white/80 rounded-lg"></div> */}
            <img src={logo} alt="" />
          </div>
          <h1 className="font-bold text-4xl  text-white tracking-wide">
         CurioX
          </h1>
          <div className="w-16 h-0.5 bg-white/30 mx-auto mt-2"></div>
        </div>

        {/* Main Loading Interface */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-700 ease-out"
                opacity="0.9"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">
                  {Math.floor(progress)}%
                </div>
                <div className="text-xs text-white/60 uppercase tracking-widest">
                  LOADING
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-6">
            <h2 className="text-lg font-light text-white mb-4 tracking-wide">
              {steps[currentStep]}
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-1 mb-4 overflow-hidden">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step Counter */}
            <div className="text-xs text-white/50 uppercase tracking-widest">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Step Progress Indicators */}
          <div className="flex justify-center space-x-4 mb-6">
            {steps.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-white border-white' 
                      : 'border-white/30'
                  }`}
                />
                <div 
                  className={`w-8 h-0.5 mt-2 transition-all duration-500 ${
                    index < currentStep ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              </div>
            ))}
          </div>

        </div>

        {/* Footer Information */}
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
            Secure Enterprise Environment
          </p>
          <div className="flex justify-center items-center space-x-4 text-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs">System Status: Operational</span>
          </div>
        </div>

      </div>
    </div>
  );
}