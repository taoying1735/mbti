import React from 'react';
import { BrowserRouter, Routes, Route, Link, HashRouter, Navigate } from 'react-router-dom';
import { Brain, History, BookOpen } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { DetailedReportPage } from './pages/DetailedReportPage';
import { HistoryPage } from './pages/HistoryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { MBTIIntroductionPage } from './pages/MBTIIntroductionPage';
import { MBTITypesPage } from './pages/MBTITypesPage';

function App() {
  return (
    <HelmetProvider>
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
                <div className="flex items-center space-x-6">
                  <Link
                    to="/blog"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="ml-2 hidden sm:inline">知识博客</span>
                  </Link>
                  <Link
                    to="/history"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <History className="h-6 w-6" />
                    <span className="ml-2 hidden sm:inline">历史记录</span>
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
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route path="/about" element={<MBTIIntroductionPage />} />
            <Route path="/types" element={<MBTITypesPage />} />
          </Routes>
        </div>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;