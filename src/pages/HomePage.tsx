import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Brain, Sparkles, Rocket, Clock, Users, BookOpen, CheckCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';

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

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "科学权威",
      description: "基于荣格心理类型理论，全球应用最广泛的人格评估工具"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "16种人格类型",
      description: "全面覆盖所有人格类型，深度解析每种性格特征"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "职业指导",
      description: "根据性格特征推荐最适合的职业方向和发展建议"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "完全免费",
      description: "提供三种版本的免费测试，无需注册即可使用"
    }
  ];

  const testimonials = [
    {
      content: "通过MBTI测试，我找到了适合自己的职业方向，现在工作更有动力了。",
      author: "李小姐",
      type: "ENFP"
    },
    {
      content: "测试结果非常准确，帮助我更好地了解自己的优势和需要改进的地方。",
      author: "张先生",
      type: "INTJ"
    },
    {
      content: "作为团队管理者，了解成员的MBTI类型极大地改善了我们的协作效率。",
      author: "王经理",
      type: "ESTJ"
    }
  ];

  return (
    <>
      <Helmet>
        <title>MBTI测试官网免费版 - 专业16型人格性格测试 | 立即测试</title>
        <meta name="description" content="免费MBTI职业性格测试官网，提供简易版、标准版、专业版三种测试，深入了解16型人格特征，获取专业职业建议和个人成长指导。完全免费，无需注册。" />
        <meta name="keywords" content="mbti测试,mbti官网,mbti免费,mbti测试免费,16型人格,mbti人格测试,mbti性格测试,mbti职业性格测试,免费mbti测评,mbti十六型人格,mbti是什么,mbti官网免费版,mbti免费完整版,mbti测试官网免费版,mbti人格测试免费,人格测试mbti免费,mbti稀有度排行,mbti官网入口,mbti免费测试入口,免费mbti测试,mbti职业性格测试免费,mbti性格测试免费,mbti人格官网免费版,mbti测试免费版,mbti官网免费版入口,mbti免费测评网站,mbti测试网站,人格测试mbti,mbti16型人格介绍,mbti16型人格免费测评,mbti免费版28题,mbti人格类型测试,mbti免费版官网入口,免费mbti性格测试官网,mbti测试结果,mbti解读,mbti分析,mbti八维,mbti人格官网,mbti测评免费版" />

        {/* Open Graph */}
        <meta property="og:title" content="MBTI测试官网免费版 - 专业16型人格性格测试" />
        <meta property="og:description" content="免费MBTI职业性格测试官网，提供三种版本测试，深入了解16型人格特征，获取专业职业建议。完全免费！" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Test Cards */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MBTI测试官网免费版
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                专业16型人格性格测试，深入了解你的性格特征、优势和发展方向
              </p>
            </div>

            {/* Test Cards - First Priority */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {testVersions.map((version, index) => (
                <div
                  key={version.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                    index === 1 ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                  }`}
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
                          <h3 className="text-2xl font-bold mb-2">{version.title}</h3>
                          <p className="opacity-90">{version.questions} 个测试题目</p>
                          {index === 1 && (
                            <span className="inline-block mt-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-medium">
                              推荐
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
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
                          {version.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
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

            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>完全免费</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>无需注册</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>即时结果</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>专业分析</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-white py-8 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                为什么MBTI如此重要？
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
                <p className="text-gray-600">的用户认为测试结果准确</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">70%</div>
                <p className="text-gray-600">的财富500强企业使用MBTI</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">2M+</div>
                <p className="text-gray-600">每月完成测试的用户</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">16</div>
                <p className="text-gray-600">种独特的人格类型</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                用户真实反馈
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{testimonial.author}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              准备好发现真实的自己了吗？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              加入数百万用户，开始你的MBTI探索之旅
            </p>
            <Link
              to="/test/professional"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              立即免费测试
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
              <span>🔒 完全免费</span>
              <span>📝 无需注册</span>
              <span>⚡ 即时结果</span>
              <span>📊 专业分析</span>
            </div>
          </div>
        </section>

        {/* Keywords Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900">热门搜索</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'MBTI测试免费版', 'MBTI十六型人格', '性格测试免费', 'MBTI职业性格测试',
                'MBTI官网免费版', '人格测试MBTI免费', '免费MBTI测评', 'MBTI是什么',
                'MBTI稀有度排行', '16型人格测试', 'MBTI免费版28题', 'MBTI人格测试免费版',
                'MBTI测试网站', '免费MBTI完整版', 'MBTI测试入口免费', 'MBTI官方免费版'
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};