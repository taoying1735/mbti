import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '../types/mbti';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: number;
  onAnswer: (score: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}) => {
  const options = [
    { value: 1, label: '非常不同意' },
    { value: 2, label: '不同意' },
    { value: 3, label: '中立' },
    { value: 4, label: '同意' },
    { value: 5, label: '非常同意' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
      
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`w-full p-4 rounded-lg border transition-all ${
              currentAnswer === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center ${
            isFirst ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          上一题
        </button>
        <button
          onClick={onNext}
          disabled={isLast && !currentAnswer}
          className={`flex items-center ${
            isLast && !currentAnswer
              ? 'text-gray-400'
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          下一题
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};