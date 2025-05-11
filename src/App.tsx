import React from 'react';
import { BrowserRouter, Routes, Route, Link, HashRouter, Navigate } from 'react-router-dom';
import { Brain, History } from 'lucide-react';  // 添加 History 图标
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { DetailedReportPage } from './pages/DetailedReportPage';
import { HistoryPage } from './pages/HistoryPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    MBTI测试
                  </span>
                </Link>
              </div>
              {/* 添加历史记录入口 */}
              <div className="flex items-center">
                <Link 
                  to="/history" 
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <History className="h-6 w-6" />
                  <span className="ml-2">历史记录</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/easy" element={<TestPage version="easy" title="简易版" description="10个测试题目" />} />
          <Route path="/test/standard" element={<TestPage version="standard" title="标准版" description="45个测试题目" />} />
          <Route path="/test/professional" element={<TestPage version="professional" title="专业版" description="93个测试题目" />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/report/:id" element={<DetailedReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;