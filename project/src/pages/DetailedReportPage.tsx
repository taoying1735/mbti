import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Brain, Target, Zap, Briefcase, Book, MessageCircle,
  Coffee, Shield, Lightbulb, Users, Heart, Star, Award, Compass,
  Palette, Crown, ChevronRight, Sparkles, LineChart, PieChart,
  BarChart, CheckCircle2, XCircle, Rocket, Glasses, Smile,
  Download, Check
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { typeDescriptions } from '../data/typeDescriptions';
import { BackButton } from '../components/BackButton';

export const DetailedReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // In a real app, we would fetch the result from storage using the ID
  const result = {
    type: 'INTJ',
    scores: {
      E: 30, I: 70,
      S: 40, N: 60,
      T: 65, F: 35,
      J: 55, P: 45
    }
  };

  const description = typeDescriptions[result.type];

  const handleSaveReport = async () => {
    if (!reportRef.current) return;

    try {
      setSaving(true);
      const dataUrl = await toPng(reportRef.current, {
        quality: 1.0,
        backgroundColor: '#F9FAFB',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
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

  // 性格维度解释
  const dimensionDescriptions = {
    EI: {
      title: '能量来源',
      left: { label: '外向 (E)', desc: '从外部世界获取能量，喜欢社交互动' },
      right: { label: '内向 (I)', desc: '从内心世界获取能量，需要独处时间' }
    },
    SN: {
      title: '信息获取',
      left: { label: '感知 (S)', desc: '关注具体的事实和细节' },
      right: { label: '直觉 (N)', desc: '关注可能性和未来发展' }
    },
    TF: {
      title: '决策方式',
      left: { label: '思维 (T)', desc: '基于逻辑和客观分析做决定' },
      right: { label: '情感 (F)', desc: '基于价值观和他人感受做决定' }
    },
    JP: {
      title: '生活方式',
      left: { label: '判断 (J)', desc: '喜欢计划和有序的生活' },
      right: { label: '知觉 (P)', desc: '喜欢灵活和自发的生活' }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* 返回和保存按钮 */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleSaveReport}
            disabled={saving}
            className={`flex items-center px-6 py-3 ${
              saving 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } rounded-lg transition-colors`}
          >
            {saving ? (
              <>
                <Check className="w-5 h-5 mr-2" />
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
        <div ref={reportRef}>
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
                报告生成日期：{new Date().toLocaleDateString('zh-CN')}
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
                        <span>{leftScore}%</span>
                        <span>{rightScore}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 font-medium">
                          <CheckCircle2 className="w-5 h-5" />
                          {desc.left.label}
                        </div>
                        <p className="text-gray-600">{desc.left.desc}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-purple-600 font-medium">
                          <CheckCircle2 className="w-5 h-5" />
                          {desc.right.label}
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
              {description.characteristics.map((trait, index) => (
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
                {description.strengths.map((strength, index) => (
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
                {description.weaknesses.map((weakness, index) => (
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
              {description.careers.map((career, index) => (
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
                <li>充分发挥您的分析能力和战略思维</li>
                <li>寻找能够持续学习和创新的工作环境</li>
                <li>注重建立专业网络和人际关系</li>
                <li>保持对新技术和行业趋势的关注</li>
                <li>在团队中承担领导或指导角色</li>
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
                  {description.learningStyle.preferences.map((pref, index) => (
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
                  {description.learningStyle.strategies.map((strategy, index) => (
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
                  {description.relationships.strengths.map((strength, index) => (
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
                  {description.relationships.challenges.map((challenge, index) => (
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
                    <li>保持开放态度</li>
                    <li>积极倾听</li>
                    <li>表达共情</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">情感连接</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>表达关心</li>
                    <li>分享感受</li>
                    <li>建立信任</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">社交平衡</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>保持边界感</li>
                    <li>适度社交</li>
                    <li>维护空间</li>
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
              {description.growth.map((tip, index) => (
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
              {description.inspirationalFigures.map((figure, index) => (
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
      </div>
    </div>
  );
};

// 辅助函数：根据成长建议生成具体行动建议
function getActionSuggestion(tip: string): string {
  // 这里可以根据不同的建议返回相应的具体行动
  // 示例实现
  if (tip.includes('同理心')) {
    return '每天花时间倾听他人的想法和感受';
  }
  if (tip.includes('社交')) {
    return '每周参加一次社交活动或小组讨论';
  }
  if (tip.includes('情感')) {
    return '尝试写日记记录每天的情感体验';
  }
  if (tip.includes('灵活')) {
    return '制定备选计划，接受计划变更';
  }
  return '设定每周小目标，循序渐进地实践';
}

// 辅助函数：获取名人简短描述
function getPersonDescription(name: string): string {
  // 示例实现
  const descriptions: { [key: string]: string } = {
    '埃隆·马斯克': 'Tesla和SpaceX创始人，创新思维的代表',
    '斯蒂芬·霍金': '著名物理学家，科学探索的典范',
    '弗里德里希·尼采': '哲学家，独立思考的代表人物',
    '阿兰·图灵': '计算机科学之父，逻辑思维的大师',
    '尼古拉·特斯拉': '发明家，创新精神的化身',
    '马克·扎克伯格': 'Meta创始人，战略思维的典范'
  };
  return descriptions[name] || '在各自领域做出重要贡献的代表人物';
}