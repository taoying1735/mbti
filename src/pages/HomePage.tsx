import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Rocket, Clock, Users, BookOpen } from 'lucide-react';

interface TestVersion {
  id: 'easy' | 'standard' | 'professional';
  title: string;
  icon: React.ReactNode;
  questions: number;
  duration: string;
  difficulty: string;
  audience: string;
  features: string[];
  color: string;
  image: string;
}

const testVersions: TestVersion[] = [
  {
    id: 'easy',
    title: '简易版测试',
    icon: <Brain className="w-8 h-8" />,
    questions: 10,
    duration: '1分钟',
    difficulty: '基础',
    audience: '初次了解MBTI的人群',
    features: [
      '基础性格特征分析',
      '简明扼要的结果解读',
      '核心性格类型判定'
    ],
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'standard',
    title: '标准版测试',
    icon: <Sparkles className="w-8 h-8" />,
    questions: 45,
    duration: '5分钟',
    difficulty: '中等',
    audience: '想深入了解自己的人群',
    features: [
      '详细的性格维度分析',
      '职业发展建议',
      '人际关系指导',
      '全面的类型解读'
    ],
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'professional',
    title: '专业版测试',
    icon: <Rocket className="w-8 h-8" />,
    questions: 93,
    duration: '10分钟',
    difficulty: '专业',
    audience: '追求深度分析的专业人士',
    features: [
      '完整的MBTI类型分析',
      '深度性格特征解读',
      '详细的职业匹配建议',
      '个人成长发展规划',
      '人际关系深度分析',
      '团队协作建议'
    ],
    color: 'green',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startTest = (version: string) => {
    navigate(`/test/${version}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MBTI 人格类型测试
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            探索你的性格特质，发现真实的自己。选择适合你的测试版本，开启自我认知之旅。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testVersions.map((version) => (
            <div
              key={version.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div 
                className="h-48 relative overflow-hidden"
                style={{
                  backgroundImage: `url(${version.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="p-6 text-white h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      {version.icon}
                      <span className="text-sm font-semibold px-3 py-1 bg-white/20 rounded-full">
                        {version.difficulty}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{version.title}</h2>
                      <p className="opacity-90">{version.questions} 个测试题目</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>预计用时：{version.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>适用人群：{version.audience}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <BookOpen className="w-5 h-5 mr-2 mt-1" />
                    <div className="space-y-2">
                      <span className="block font-medium">包含功能：</span>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {version.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => startTest(version.id)}
                  className={`w-full py-4 px-6 text-white bg-${version.color}-600 hover:bg-${version.color}-700 rounded-lg transition-colors duration-300 text-lg font-semibold flex items-center justify-center gap-2`}
                >
                  <Brain className="w-5 h-5" />
                  开始测试
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};