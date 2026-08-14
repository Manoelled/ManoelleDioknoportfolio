import React, { useState } from 'react';
import { AdSize } from './adTypes';

interface QuizFunnelAdProps {
  size: AdSize;
  accentColor?: string;
}

interface QuizStep {
  question: string;
  options: string[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    question: 'WHAT IS YOUR PRIMARY DESIGN OBJECTIVE?',
    options: ['Rapid Prototyping', 'Brand System', 'Conversion Optimization'],
  },
  {
    question: 'WHICH TARGET METRIC MATTERS MOST?',
    options: ['User Engagement', 'Load Velocity', 'Visual Craftsmanship'],
  },
];

export default function QuizFunnelAd({ size, accentColor = '#0284C7' }: QuizFunnelAdProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, or 2 (Result)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);

    setTimeout(() => {
      const updated = [...selectedAnswers, option];
      setSelectedAnswers(updated);
      setSelectedOption(null);

      if (currentStep < QUIZ_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setCurrentStep(QUIZ_STEPS.length);
      }
    }, 250);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
  };

  // 320x50 variant
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none cursor-pointer"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <span className="text-[12px] font-extrabold text-neutral-900 tracking-tight truncate max-w-[210px] uppercase">
          DESIGN PROFILE QUIZ
        </span>

        <button
          className="px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase border transition-colors cursor-pointer"
          style={{
            borderRadius: 0,
            borderColor: accentColor,
            color: '#FFFFFF',
            backgroundColor: accentColor,
            ...fontStyle,
          }}
        >
          FIND OUT →
        </button>
      </div>
    );
  }

  // 320x100 variant
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-2.5 border border-neutral-200 select-none relative"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {currentStep < QUIZ_STEPS.length ? (
          <div key={currentStep} className="flex flex-col gap-1.5 my-auto transition-all duration-200">
            <span className="text-[10px] font-extrabold text-neutral-900 tracking-tight leading-tight uppercase">
              {QUIZ_STEPS[currentStep].question}
            </span>

            <div className="grid grid-cols-3 gap-1">
              {QUIZ_STEPS[currentStep].options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className="p-1 text-[8.5px] font-extrabold border text-center transition-all duration-150 cursor-pointer uppercase tracking-tight"
                    style={{
                      borderRadius: 0,
                      borderColor: isSelected ? accentColor : 'rgba(0,0,0,0.15)',
                      backgroundColor: isSelected ? accentColor : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#171717',
                      transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                      ...fontStyle,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between my-auto">
            <span className="text-xs font-extrabold uppercase tracking-tight" style={{ color: accentColor }}>
              RECOMMENDATION READY
            </span>
            <button
              onClick={handleReset}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-neutral-300 text-neutral-800 cursor-pointer"
              style={fontStyle}
            >
              RESTART
            </button>
          </div>
        )}
      </div>
    );
  }

  // 728x90 Horizontal Leaderboard variant
  if (size === '728x90') {
    return (
      <div
        data-size="728x90"
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {currentStep < QUIZ_STEPS.length ? (
          <div key={currentStep} className="flex items-center justify-between w-full transition-all duration-200">
            <span className="text-xs font-extrabold text-neutral-900 truncate max-w-[320px] uppercase tracking-tight">
              {QUIZ_STEPS[currentStep].question}
            </span>

            <div className="flex items-center gap-2">
              {QUIZ_STEPS[currentStep].options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className="px-3 py-1.5 text-xs font-extrabold border transition-all duration-150 cursor-pointer whitespace-nowrap uppercase tracking-wider"
                    style={{
                      borderRadius: 0,
                      borderColor: isSelected ? accentColor : 'rgba(0,0,0,0.15)',
                      backgroundColor: isSelected ? accentColor : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#171717',
                      transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                      ...fontStyle,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-extrabold text-neutral-900 uppercase tracking-tight">
              YOUR OPTIMIZED SOLUTION IS READY
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black underline cursor-pointer"
                style={fontStyle}
              >
                RESTART
              </button>
              <button
                className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest border cursor-pointer"
                style={{
                  borderRadius: 0,
                  borderColor: accentColor,
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  ...fontStyle,
                }}
              >
                VIEW PROFILE →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vertical & Standard Rectangles: 300x250, 336x280, 300x600
  const isTall = size === '300x600';
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : isTall ? 600 : 250;

  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 flex flex-col justify-between p-5 border border-neutral-200 select-none relative overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: 0, ...fontStyle }}
    >
      <style>{`
        @keyframes quizSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Question or Final Screen with Slide/Fade Transition */}
      <div
        key={currentStep}
        className="flex-1 flex flex-col justify-center my-auto"
        style={{ animation: 'quizSlideIn 250ms ease-out forwards' }}
      >
        {currentStep < QUIZ_STEPS.length ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug uppercase tracking-tight">
              {QUIZ_STEPS[currentStep].question}
            </h3>

            <div className="flex flex-col gap-2 mt-1">
              {QUIZ_STEPS[currentStep].options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className="w-full text-left p-3 text-xs font-extrabold border transition-all duration-150 cursor-pointer flex items-center justify-between uppercase tracking-wider"
                    style={{
                      borderRadius: 0,
                      borderColor: isSelected ? accentColor : 'rgba(0,0,0,0.12)',
                      backgroundColor: isSelected ? accentColor : 'rgba(245,245,245,0.8)',
                      color: isSelected ? '#FFFFFF' : '#171717',
                      transform: isSelected ? 'scale(0.97)' : 'scale(1)',
                      ...fontStyle,
                    }}
                  >
                    <span>{opt}</span>
                    <span className="text-[10px]">{isSelected ? '✓' : '→'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Final Result Screen */
          <div className="flex flex-col items-center text-center p-2">
            <h3 className="text-base font-extrabold text-neutral-900 tracking-tight uppercase">
              ASSESSMENT COMPLETE
            </h3>
            <p className="text-xs font-semibold text-neutral-600 mt-2 leading-relaxed max-w-[220px]">
              Based on your responses, we generated your custom execution strategy.
            </p>

            <button
              className="w-full py-2.5 px-4 text-xs font-extrabold tracking-widest uppercase border transition-all duration-200 cursor-pointer mt-5"
              style={{
                borderRadius: 0,
                borderColor: accentColor,
                backgroundColor: accentColor,
                color: '#FFFFFF',
                ...fontStyle,
              }}
            >
              CLAIM YOUR RESULT →
            </button>

            <button
              onClick={handleReset}
              className="text-[10px] font-bold uppercase text-neutral-500 hover:text-black underline mt-3 cursor-pointer tracking-wider"
              style={fontStyle}
            >
              RESTART QUIZ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
