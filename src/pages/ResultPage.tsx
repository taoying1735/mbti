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
  const { savedResults, saveResult } = useTestStore();
  const [copied, setCopied] = React.useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const resultFromState = location.state?.resultFromTest as TestResult | undefined;
  const resultFromStore = savedResults.find(r => r.id === id);

  // 优先使用从路由状态传递过来的 result，如果不存在，再尝试从 savedResults 中查找
  // 如果两者都存在，确保它们是同一个结果，或者优先使用 state 中的，因为它更新鲜
  const result = resultFromState && resultFromState.id === id ? resultFromState : resultFromStore;


  // 如果找不到结果，重定向到首页
  useEffect(() => {
    if (!result) {
      // 如果 state 中有但 id 不匹配，或者 store 中没有，则可能是一个问题
      // 但主要情况是 result 为空
      if (!resultFromState && !resultFromStore) {
          navigate('/');
          return;
      }
      // 如果 resultFromState 存在但 id 不匹配当前 url 的 id，这不应该发生
      // 如果 resultFromStore 不存在，但 resultFromState 存在且匹配，则使用它
    }
    
    // 确保 result 存在才继续
    if (result && !typeDescriptions[result.type]) {
      console.error(`Invalid MBTI type: ${result.type} for result ID: ${result.id}`);
      navigate('/');
    }
  }, [result, navigate, id, resultFromState, resultFromStore]);

  if (!result || !typeDescriptions[result.type]) {
    // 避免在重定向前渲染，或者在数据不一致时渲染
    // 如果 resultFromState 存在且有效，但 result (最终选择的) 无效，则可能是 store 查找失败
    // 这种情况应该由上面的 useEffect 处理重定向
    return null;
  }

  const description = typeDescriptions[result.type];

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
              {result.type} - {description.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">{description.subtitle}</p>
            <p className="text-gray-600">{description.description}</p>
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
                  {description.careers.slice(0, result.version === 'standard' ? 6 : 8).map((career, index) => (
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
                    {description.strengths.slice(0, result.version === 'standard' ? 4 : 6).map((strength, index) => (
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
                    {description.weaknesses.slice(0, result.version === 'standard' ? 4 : 6).map((weakness, index) => (
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
                      {description.learningStyle.preferences.map((pref, index) => (
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
                      {description.learningStyle.strategies.map((strategy, index) => (
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
                      {description.communicationStyle.strengths.map((strength, index) => (
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
                      {description.communicationStyle.challenges.map((challenge, index) => (
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
                      {description.communicationStyle.tips.map((tip, index) => (
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