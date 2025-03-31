import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="w-full">
      {/* 进度条容器 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium">{current}</span>
          <span className="mx-1">/</span>
          <span>{total}</span>
          <span className="ml-2">题</span>
        </div>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};