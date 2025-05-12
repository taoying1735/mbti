import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Brain, Target, Zap, Briefcase, Book, MessageCircle,
  Coffee, Shield, Lightbulb, Users, Heart, Star, Award, Compass,
  Palette, Crown, ChevronRight, Sparkles, LineChart, PieChart,
  BarChart, CheckCircle2, XCircle, Rocket, Glasses, Smile,
  Download, Check, Home, Share2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { typeDescriptions } from '../data/typeDescriptions';
import { BackButton } from '../components/BackButton';
import { useTestStore } from '../store/testStore'; // Import useTestStore
import { TestResult } from '../types/mbti'; // Import TestResult type

export const DetailedReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedResults } = useTestStore(); // Get savedResults from store
  const [saving, setSaving] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const result: TestResult | undefined = savedResults.find(r => r.id === id);

  useEffect(() => {
    if (!result) {
      // console.error(`DetailedReportPage: No result found for ID ${id}. Navigating to home.`);
      navigate('/');
    }
  }, [result, id, navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">正在加载报告或报告不存在...</p>
      </div>
    );
  }

  const description = typeDescriptions[result.type];

  if (!description) {
    // This case should ideally not happen if typeDescriptions is complete
    // and result.type is always valid.
    // console.error(`DetailedReportPage: No description found for type ${result.type}.`);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">无法加载类型 {result.type} 的描述信息。</p>
      </div>
    );
  }

  const handleSaveReport = async () => {
    if (!reportRef.current) return;

    try {
      setSaving(true);
      const element = reportRef.current;
      const dataUrl = await toPng(element, {
        quality: 0.98,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
        // Attempt to use the element's full scroll dimensions
        canvasWidth: element.scrollWidth,
        canvasHeight: element.scrollHeight,
        // Set a higher pixelRatio for better resolution, but not excessively high
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });

      const link = document.createElement('a');
      link.download = `MBTI-${result.type}-详细报告-${new Date().toLocaleDateString('zh-CN')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('保存报告失败:', error);
      alert('保存报告失败，请稍后重试');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    // Implement the share functionality
    const shareUrl = window.location.href;
    const shareText = `来看看我的MBTI (${result.type} - ${description.title}) 深度解析报告！`;
    if (navigator.share) {
      navigator.share({
        title: `MBTI深度解析报告 - ${result.type}`,
        text: shareText,
        url: shareUrl,
      })
      .then(() => console.log('分享成功'))
      .catch((error) => console.log('分享失败', error));
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 性格维度解释
  const dimensionDescriptions = {
    EI: {
      title: '能量来源 (E/I)',
      left: { label: '外向 (E)', desc: '从外部世界获取能量，喜欢社交互动，行动导向。' },
      right: { label: '内向 (I)', desc: '从内心世界获取能量，需要独处时间，思考导向。' }
    },
    SN: {
      title: '信息获取 (S/N)',
      left: { label: '感知 (S)', desc: '关注具体的事实、细节和实际经验，活在当下。' },
      right: { label: '直觉 (N)', desc: '关注可能性、模式和未来发展，富有想象力。' }
    },
    TF: {
      title: '决策方式 (T/F)',
      left: { label: '思维 (T)', desc: '基于逻辑、客观分析和原则做决定，追求公平。' },
      right: { label: '情感 (F)', desc: '基于价值观、人际和谐和他人感受做决定，追求共情。' }
    },
    JP: {
      title: '生活方式 (J/P)',
      left: { label: '判断 (J)', desc: '喜欢计划、组织和掌控，倾向于有序和结构化的生活。' },
      right: { label: '知觉 (P)', desc: '喜欢灵活、自发和开放，倾向于适应和探索性的生活。' }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* 返回和保存按钮 */}
        <div className="flex justify-end mb-8 space-x-4">
          <button
            onClick={handleShare}
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            {copied ? <Check className="w-5 h-5 mr-2" /> : <Share2 className="w-5 h-5 mr-2" />}
            {copied ? '链接已复制' : '分享报告'}
          </button>
          {/* 隐藏保存图片按钮 */}
          <button
            onClick={handleSaveReport}
            disabled={saving}
            className="hidden"
          >
            {saving ? (
              <>
                <Check className="w-5 h-5 mr-2 animate-pulse" />
                保存中...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                保存图片
              </>
            )}
          </button>
        </div>

        {/* 报告内容 - 添加 ref */}
        <div ref={reportRef} className="bg-white p-2 rounded-2xl"> {/* Added padding to parent for better image capture */}
          {/* 封面部分 */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-12 text-white mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
                <Crown className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                MBTI 性格类型深度解析报告
              </h1>
              <div className="text-3xl font-semibold mb-4">
                {result.type} - {description.title}
              </div>
              <p className="text-xl text-white/90 mb-8">{description.subtitle}</p>
              <div className="inline-block px-6 py-3 bg-white/20 rounded-full">
                报告生成日期：{new Date(result.date).toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>

          {/* 性格类型概述 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 p-4 bg-blue-100 rounded-full">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">性格类型概述</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {description.description}
                </p>
              </div>
            </div>
          </div>

          {/* 性格维度分析 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-100 rounded-full">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">性格维度深度分析</h2>
            </div>

            <div className="space-y-8">
              {Object.entries(dimensionDescriptions).map(([dim, desc]) => {
                const [left, right] = dim.split('');
                const leftScore = result.scores[left as keyof typeof result.scores];
                const rightScore = result.scores[right as keyof typeof result.scores];

                return (
                  <div key={dim} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      {desc.title}
                    </h3>
                    <div className="relative mb-6">
                      <div className="h-4 bg-gray-200 rounded-full">
                        <div
                          className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${leftScore}%` }}
                        />
                      </div>
                      <div className="absolute top-6 left-0 right-0 flex justify-between text-sm text-gray-600">
                        <span>{desc.left.label}: {leftScore}%</span>
                        <span>{desc.right.label}: {rightScore}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 font-medium">
                          <CheckCircle2 className="w-5 h-5" />
                          倾向 {desc.left.label}
                        </div>
                        <p className="text-gray-600">{desc.left.desc}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-purple-600 font-medium">
                          <CheckCircle2 className="w-5 h-5" />
                           倾向 {desc.right.label}
                        </div>
                        <p className="text-gray-600">{desc.right.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 核心特征 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 rounded-full">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">核心特征解析</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {description.characteristics.map((trait: string, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl flex items-start gap-4 transform transition-transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-medium">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 优势和挑战 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">个人优势</h2>
              </div>
              <div className="space-y-4">
                {description.strengths.map((strength: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/60 p-4 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold">成长挑战</h2>
              </div>
              <div className="space-y-4">
                {description.weaknesses.map((weakness: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/60 p-4 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 职业发展 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-100 rounded-full">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">职业发展指南</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {description.careers.map((career: string, index: number) => (
                <div
                  key={index}
                  className="bg-white/60 p-6 rounded-xl text-center transform transition-transform hover:scale-105"
                >
                  <Rocket className="w-6 h-6 text-purple-600 mx-auto mb-3" />
                  <p className="text-gray-800 font-medium">{career}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/60 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Glasses className="w-5 h-5 text-purple-600" />
                职业发展建议
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {description.growth.slice(0,5).map((g: string, i: number) => <li key={`career-growth-${i}`}>{g}</li>)}
              </ul>
            </div>
          </div>

          {/* 学习风格 */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Book className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">学习风格分析</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-indigo-600" />
                  学习偏好
                </h3>
                <div className="space-y-4">
                  {description.learningStyle.preferences.map((pref: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/60 p-4 rounded-lg flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800">{pref}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                  学习策略
                </h3>
                <div className="space-y-4">
                  {description.learningStyle.strategies.map((strategy: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/60 p-4 rounded-lg flex items-start gap-3"
                    >
                      <ChevronRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/60 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">学习效率提升建议</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <PieChart className="w-5 h-5" />
                    <span className="font-medium">短期目标</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>建立清晰的学习计划</li>
                    <li>创建知识体系框架</li>
                    <li>定期复习和总结</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <BarChart className="w-5 h-5" />
                    <span className="font-medium">长期发展</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>持续深入专业领域</li>
                    <li>跨领域知识整合</li>
                    <li>实践应用与反馈</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 人际关系 */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-rose-100 rounded-full">
                <Users className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold">人际关系指南</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  关系优势
                </h3>
                <div className="space-y-4">
                  {description.relationships.strengths.map((strength: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/60 p-4 rounded-lg flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-rose-600" />
                  关系挑战
                </h3>
                <div className="space-y-4">
                  {description.relationships.challenges.map((challenge: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/60 p-4 rounded-lg flex items-start gap-3"
                    >
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/60 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">关系维护建议</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">沟通技巧</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {description.communicationStyle.tips.slice(0,3).map((tip:string, i:number) => <li key={`comm-tip-${i}`}>{tip}</li>)}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">情感连接</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                     {description.communicationStyle.tips.slice(3,6).map((tip:string, i:number) => <li key={`comm-tip-emo-${i}`}>{tip}</li>)}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">社交平衡</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>保持个人空间与独立性</li>
                    <li>选择性参与社交活动</li>
                    <li>尊重彼此的社交需求差异</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 成长建议 */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Lightbulb className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold">个人成长路线图</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {description.growth.map((tip: string, index: number) => (
                <div
                  key={index}
                  className="bg-white/60 p-6 rounded-xl flex items-start gap-4"
                >
                  <Award className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800">{tip}</p>
                    <div className="mt-3 text-sm text-emerald-600">
                      建议行动：{getActionSuggestion(tip)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 名人案例 */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-violet-100 rounded-full">
                <Smile className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold">杰出人物案例分析</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {description.inspirationalFigures.map((figure: string, index: number) => (
                <div
                  key={index}
                  className="bg-white/60 p-6 rounded-xl text-center transform transition-transform hover:scale-105"
                >
                  <Crown className="w-8 h-8 text-violet-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-800">{figure}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {getPersonDescription(figure)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部按钮容器 */}
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
            {copied ? '链接已复制!' : '分享报告'}
          </button>
          
          <button
            onClick={handleSaveReport}
            disabled={saving}
            className={`flex items-center px-6 py-3 ${
              saving 
                ? 'bg-green-400 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-700'
            } text-white rounded-lg transition-colors`}
          >
            {saving ? (
              <>
                <Check className="w-5 h-5 mr-2 animate-pulse" />
                保存中...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                保存图片
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function (can be moved to a utils file)
function getActionSuggestion(tip: string): string {
  if (tip.includes('分析能力') || tip.includes('战略思维')) return '参与需要深度思考的讨论或项目。';
  if (tip.includes('学习和创新')) return '每天安排固定时间学习新知识或技能。';
  if (tip.includes('专业网络')) return '积极参加行业会议，拓展人脉。';
  if (tip.includes('新技术')) return '订阅行业资讯，关注前沿动态。';
  if (tip.includes('领导或指导')) return '在团队中主动承担责任，分享经验。';
  if (tip.includes('同理心') || tip.includes('他人感受')) return '尝试换位思考，理解他人立场。';
  if (tip.includes('放松标准')) return '允许不完美，专注于完成而非极致。';
  if (tip.includes('社交技能')) return '多参与社交活动，练习沟通技巧。';
  if (tip.includes('即兴情况')) return '尝试参与即兴表演或辩论活动。';
  if (tip.includes('团队合作')) return '主动与同事协作，共同完成目标。';
  return '从小处着手，逐步实践。';
}

function getPersonDescription(name: string): string {
  const descriptions: Record<string, string> = {
    '埃隆·马斯克': '创新企业家，特斯拉、SpaceX创始人。',
    '斯蒂芬·霍金': '杰出理论物理学家，宇宙学家。',
    // Add more descriptions as needed
  };
  return descriptions[name] || '一位杰出的人物。';
}