import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Clock, ArrowRight, Trash2, AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useTestStore } from '../store/testStore';
import { BackButton } from '../components/BackButton';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedResults, clearHistory } = useTestStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (savedResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-6">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              暂无测试历史
            </h1>
            <p className="text-gray-600 mb-8">
              您还没有完成任何MBTI测试，开始一次测试来了解自己吧！
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              开始测试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="w-7 h-7 text-blue-600 mr-2" />
              测试历史记录
            </h1>
            <button
              onClick={clearHistory}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              清空历史
            </button>
          </div>

          <div className="space-y-6">
            {savedResults.map((result) => (
              <div
                key={result.id}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {result.type} 型人格
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(result.date)}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/result/${result.id}`)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    查看详情
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">外向-内向</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">E</span>
                          <div className="mx-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all"
                              style={{ width: `${result.scores.E}%` }}
                            />
                          </div>
                          <span className="text-sm">I</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{result.scores.E}%</span>
                          <span>{result.scores.I}%</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">感知-直觉</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">S</span>
                          <div className="mx-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-600 transition-all"
                              style={{ width: `${result.scores.S}%` }}
                            />
                          </div>
                          <span className="text-sm">N</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{result.scores.S}%</span>
                          <span>{result.scores.N}%</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">思维-情感</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">T</span>
                          <div className="mx-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 transition-all"
                              style={{ width: `${result.scores.T}%` }}
                            />
                          </div>
                          <span className="text-sm">F</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{result.scores.T}%</span>
                          <span>{result.scores.F}%</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">判断-知觉</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">J</span>
                          <div className="mx-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-rose-600 transition-all"
                              style={{ width: `${result.scores.J}%` }}
                            />
                          </div>
                          <span className="text-sm">P</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{result.scores.J}%</span>
                          <span>{result.scores.P}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};