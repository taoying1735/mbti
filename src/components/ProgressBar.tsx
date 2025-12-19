import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current: currentVal, total: totalVal }) => {
  const cNum: number = Number(currentVal);
  const tNum: number = Number(totalVal);

  // 使用明确转换和赋值后的变量进行计算
  const calculatedPercentage: number = (tNum > 0) ? Math.min(Math.max((cNum / tNum) * 100, 0), 100) : 0;

  return (
    <div className="w-full">
      {/* 进度条容器 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${calculatedPercentage}%` }}
        />
      </div>

      {/* 进度指示器 */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium">{cNum}</span>
          <span className="mx-1">/</span>
          <span>{tNum}</span>
          <span className="ml-2">题</span>
        </div>
        {/* 百分比已隐藏 */}
      </div>
    </div>
  );
};