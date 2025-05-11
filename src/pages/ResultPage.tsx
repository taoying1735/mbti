import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Share2, Download, History, Copy, Check, Brain, Users, Briefcase, 
  Heart, Lightbulb, Target, RefreshCw, Book, Star, Coffee, Zap,
  Compass, Palette, Award, MessageCircle, Shield, Smile,
  Home, ChevronRight, CheckCircle2, XCircle, Rocket, FileText
} from 'lucide-react';
import { useTestStore } from '../store/testStore';
import { TestResult } from '../types/mbti';
import { toPng } from 'html-to-image';
import { typeDescriptions } from '../data/typeDescriptions';
import { BackButton } from '../components/BackButton';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedResults, saveResult: saveResultToStore } = useTestStore();
  const [copied, setCopied] = React.useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const resultFromState = location.state?.resultFromTest as TestResult | undefined;

  useEffect(() => {
    if (resultFromState && resultFromState.id === id) {
      // 如果 state 中有结果，并且 id 匹配，确保它被保存到 store
      saveResultToStore(resultFromState);
    }
  }, [resultFromState, id, saveResultToStore]);

  // 总是尝试从 store 中获取最新的结果
  const result = savedResults.find(r => r.id === id);

  useEffect(() => {
    // 这个 effect 依赖于 `result` (从 store 获取) 和 `resultFromState`
    // 以决定是否应该导航。
    if (!result) {
      // 如果 store 中没有结果，我们需要检查 resultFromState。
      // 如果 resultFromState 也是无效的 (null, undefined, or id mismatch), 那么导航。
      if (!resultFromState || resultFromState.id !== id) {
        // console.error(`ResultPage: No valid result in state or store for ID ${id}. Navigating to home.`);
        navigate('/');
        return;
      }
      // 如果 resultFromState 有效，但 store 中还没有 (result is falsy)，
      // 这意味着上面的 useEffect (saveResultToStore) 可能还没来得及更新 store 并触发重渲染。
      // 在这种情况下，我们可能不应该立即导航，而是等待 store 更新。
      // 然而，为了避免无限循环或复杂的状态等待，如果 store 中没有，
      // 并且 resultFromState 也不能立即解决问题（例如，它不是最新的），则导航。
      // 目前的逻辑是：如果 store 中没有，并且 state 中也没有有效数据，则导航。
      // 如果 state 中有数据，上面的 effect 会尝试保存它，这个 effect 应该在下一次渲染时拿到 store 中的数据。
      // 如果第一次渲染时 store 中没有，并且 state 中也没有，则导航是合理的。
    }
    
    // 保留此检查，以防 result.type 确实是完全无效的（例如，不是4个字母）
    // 但主要依赖下面的渲染逻辑来处理缺失的描述
    // if (result && !typeDescriptions[result.type]) {
    //   // console.warn(`ResultPage: Description for MBTI type ${result.type} not found. Displaying basic info.`);
    // }
  }, [result, navigate, id, resultFromState]);

  if (!result) {
    // 如果 result 无效（例如，store 未更新或 state 中无有效数据）
    // useEffect 应该已经处理了重定向或正在等待 store 更新。
    return null;
  }

  const description = typeDescriptions[result.type]; // 这可能是 undefined

  // 如果类型描述不存在，提供一个默认的结构或提示
  const safeDescription = description || {
    title: '未知类型',
    subtitle: '详细描述正在完善中',
    description: '您的MBTI类型分析结果已生成，但该类型的详细描述信息暂未提供。请关注后续更新。',
    characteristics: [],
    strengths: [],
    weaknesses: [],
    careers: [],
    growth: [],
    relationships: { strengths: [], challenges: [] },
    workStyle: { preferences: [], challenges: [] },
    learningStyle: { preferences: [], strategies: [] },
    stressManagement: { triggers: [], copingStrategies: [] },
    communicationStyle: { strengths: [], challenges: [], tips: [] },
    values: [],
    hobbies: [],
    inspirationalFigures: []
  };

  const handleSave = async () => {
    if (resultRef.current) {
      try {
        const dataUrl = await toPng(resultRef.current, {
          quality: 1.0,
          backgroundColor: '#F9FAFB',
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }
        });

        const link = document.createElement('a');
        link.download = `MBTI-${result.type}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('保存截图失败:', error);
        alert('保存截图失败，请稍后重试');
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('复制链接失败，请手动复制。');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'MBTI 测试结果',
      text: `我的MBTI类型是 ${result.type} - ${description.title}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard(
          `${shareData.title}\n${shareData.text}\n查看详情：${shareData.url}`
        );
      }
    } catch (error: any) {
      if (error.name === 'SecurityError' || error.name === 'NotAllowedError') {
        alert('分享功能需要安全连接（HTTPS）或相应权限。已切换到复制链接方式。');
        await copyToClipboard(
          `${shareData.title}\n${shareData.text}\n查看详情：${shareData.url}`
        );
      } else {
        console.error('分享失败:', error);
        alert('分享失败，已切换到复制链接方式。');
        await copyToClipboard(
          `${shareData.title}\n${shareData.text}\n查看详情：${shareData.url}`
        );
      }
    }
  };

  // Helper function to get dimension description
  const getDimensionDescription = (dimension: string) => {
    const descriptions: { [key: string]: string[] } = {
      EI: [
        '需要独处时间恢复精力',
        '倾向于深度的一对一交谈',
        '在行动前喜欢深入思考',
        '更喜欢书面表达'
      ],
      SN: [
        '注重具体细节和事实',
        '相信实践经验',
        '专注于现实问题',
        '喜欢循序渐进的方法'
      ],
      TF: [
        '重视逻辑和客观分析',
        '追求公平和效率',
        '直接表达观点',
        '以目标为导向'
      ],
      JP: [
        '喜欢计划和组织',
        '注重期限和规划',
        '追求确定性',
        '倾向于快速做出决定'
      ]
    };

    return descriptions[dimension] || [];
  };

  // 假设结果对象中包含测试版本信息
  const testVersion = result.version || 'basic';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <BackButton />
        <div ref={resultRef} className="bg-white rounded-lg shadow-lg p-8">
          {/* Title and description */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {result.type} - {safeDescription.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">{safeDescription.subtitle}</p>
            <p className="text-gray-600">{safeDescription.description}</p>
          </div>

          {/* Personality Analysis */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              性格维度分析
            </h2>
            <div className="space-y-8">
              {/* E-I Dimension */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">外向-内向倾向分析</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">外向 (E)</span>
                    <span className="font-medium">内向 (I)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${result.scores.E}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">主要特征</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getDimensionDescription('EI').map((trait, index) => (
                        <li key={index} className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* S-N Dimension */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">感知-直觉倾向分析</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">感知 (S)</span>
                    <span className="font-medium">直觉 (N)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${result.scores.S}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-800 mb-2">主要特征</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getDimensionDescription('SN').map((trait, index) => (
                        <li key={index} className="flex items-start gap-2 bg-purple-50 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* T-F Dimension */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">思维-情感倾向分析</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">思维 (T)</span>
                    <span className="font-medium">情感 (F)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${result.scores.T}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">主要特征</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getDimensionDescription('TF').map((trait, index) => (
                        <li key={index} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* J-P Dimension */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">判断-知觉倾向分析</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">判断 (J)</span>
                    <span className="font-medium">知觉 (P)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-rose-600 h-2.5 rounded-full"
                      style={{ width: `${result.scores.J}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-rose-800 mb-2">主要特征</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getDimensionDescription('JP').map((trait, index) => (
                        <li key={index} className="flex items-start gap-2 bg-rose-50 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional sections based on version */}
          {result.version !== 'easy' && (
            <>
              {/* Career Development */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                  职业发展建议
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {safeDescription.careers.slice(0, result.version === 'standard' ? 6 : 8).map((career, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow text-center transform transition-transform hover:scale-105"
                    >
                      <Rocket className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                      <p className="text-gray-800">{career}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    个人优势
                  </h3>
                  <div className="space-y-3">
                    {safeDescription.strengths.slice(0, result.version === 'standard' ? 4 : 6).map((strength, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-amber-600" />
                    成长挑战
                  </h3>
                  <div className="space-y-3">
                    {safeDescription.weaknesses.slice(0, result.version === 'standard' ? 4 : 6).map((weakness, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg flex items-start gap-2"
                      >
                        <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Professional version exclusive sections */}
          {result.version === 'professional' && (
            <>
              {/* Learning Style */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Book className="w-6 h-6 mr-2 text-violet-600" />
                  学习风格分析
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-4">学习偏好</h3>
                    <div className="space-y-3">
                      {safeDescription.learningStyle.preferences.map((pref, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg flex items-start gap-2"
                        >
                          <Star className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <span>{pref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4">学习策略</h3>
                    <div className="space-y-3">
                      {safeDescription.learningStyle.strategies.map((strategy, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg flex items-start gap-2"
                        >
                          <ChevronRight className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <span>{strategy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Communication Style */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-rose-600" />
                  沟通风格分析
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-4">沟通优势</h3>
                    <div className="space-y-3">
                      {safeDescription.communicationStyle.strengths.map((strength, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4">沟通挑战</h3>
                    <div className="space-y-3">
                      {safeDescription.communicationStyle.challenges.map((challenge, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg flex items-start gap-2"
                        >
                          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4">改进建议</h3>
                    <div className="space-y-3">
                      {safeDescription.communicationStyle.tips.map((tip, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg flex items-start gap-2"
                        >
                          <Lightbulb className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <Share2 className="w-5 h-5 mr-2" />
              )}
              {copied ? '已复制' : '分享结果'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              保存图片
            </button>
            {savedResults.length > 0 && (
              <button
                onClick={() => navigate('/history')}
                className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <History className="w-5 h-5 mr-2" />
                查看历史
              </button>
            )}
            {(testVersion === 'professional') && (
              <Link to={`/report/${result.id}`} className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                查看详细报告
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};