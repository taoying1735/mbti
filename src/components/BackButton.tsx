import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      返回上一页
    </button>
  );
};