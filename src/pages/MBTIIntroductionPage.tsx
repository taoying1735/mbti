import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Brain, Users, Target, BookOpen, CheckCircle, Star } from 'lucide-react';

export function MBTIIntroductionPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "科学理论依据",
      description: "基于荣格心理类型理论，经过数十年的发展和验证"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "16种人格类型",
      description: "详细解析每种类型的特征、优势和发展方向"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "职业规划指导",
      description: "根据性格特征推荐最适合的职业方向"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "个人成长建议",
      description: "提供针对性的发展和改进建议"
    }
  ];

  const dimensions = [
    {
      letter: "E",
      title: "外向 (Extraversion)",
      description: "从外部世界获得能量，喜欢社交和互动",
      opposite: "I",
      oppositeTitle: "内向 (Introversion)"
    },
    {
      letter: "S",
      title: "感觉 (Sensing)",
      description: "注重具体事实和细节，通过五官感知世界",
      opposite: "N",
      oppositeTitle: "直觉 (Intuition)"
    },
    {
      letter: "T",
      title: "思考 (Thinking)",
      description: "基于逻辑和客观分析做决定",
      opposite: "F",
      oppositeTitle: "情感 (Feeling)"
    },
    {
      letter: "J",
      title: "判断 (Judging)",
      description: "喜欢有计划、有组织的生活方式",
      opposite: "P",
      oppositeTitle: "知觉 (Perceiving)"
    }
  ];

  const testimonials = [
    {
      content: "通过MBTI测试，我第一次真正了解了自己的性格特点，这对我的职业选择帮助很大。",
      author: "张先生",
      type: "INTJ"
    },
    {
      content: "测试结果非常准确，让我明白了自己为什么在某些方面特别擅长，而在其他方面需要努力。",
      author: "李女士",
      type: "ENFP"
    },
    {
      content: "作为一个团队管理者，了解团队成员的MBTI类型极大地改善了我们的沟通和协作效率。",
      author: "王经理",
      type: "ESTJ"
    }
  ];

  return (
    <>
      <Helmet>
        <title>MBTI是什么意思？MBTI人格理论完整介绍 - 免费测试</title>
        <meta name="description" content="详细介绍MBTI人格理论、四个维度、16种人格类型。提供免费MBTI测试，帮助你了解自己的性格特征和优势，获取专业的职业规划建议。" />
        <meta name="keywords" content="mbti是什么,mbti是什么意思,MBTI人格理论,MBTI四个维度,16型人格,mbti测试,免费mbti测试,mbti官网,mbti人格类型,mbti性格测试,mbti分析" />

        {/* Open Graph */}
        <meta property="og:title" content="MBTI是什么意思？MBTI人格理论完整介绍" />
        <meta property="og:description" content="详细介绍MBTI人格理论，提供免费测试，了解你的性格类型。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/about`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/about`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                MBTI是什么？深入了解你的人格密码
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                MBTI（Myers-Briggs Type Indicator）是全球最权威的性格评估工具之一，帮助数百万人认识自己，找到适合的人生方向
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/test/professional"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  立即免费测试
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors"
                >
                  学习更多知识
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is MBTI Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  什么是MBTI？
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    MBTI（Myers-Briggs Type Indicator）是一种基于瑞士心理学家卡尔·荣格心理类型理论的人格评估工具。它由伊莎贝尔·迈尔斯和凯瑟琳·布里格斯在20世纪40年代开发，至今已成为全球应用最广泛的性格测试之一。
                  </p>
                  <p>
                    MBTI通过评估人们在四个维度上的偏好，将人格分为16种不同的类型。每种类型都有其独特的特征、优势和适合的发展方向。
                  </p>
                  <p>
                    这不是要给你贴标签，而是帮助你更好地理解自己和他人，从而在职业选择、人际关系和个人成长方面做出更明智的决定。
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">MBTI的应用领域</h3>
                    <p className="text-gray-600">被广泛用于各个领域</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['职业规划', '团队建设', '人际关系', '教育发展', '心理咨询', '领导力培训'].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Dimensions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                MBTI的四个维度
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                MBTI通过四个维度的不同组合，构成了16种独特的人格类型
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dimensions.map((dimension, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-bold text-lg">
                      {dimension.letter}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {dimension.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {dimension.description}
                  </p>
                  <div className="pt-4 border-t text-center">
                    <span className="text-sm text-gray-500">vs</span>
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full font-bold text-sm ml-2">
                      {dimension.opposite}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{dimension.oppositeTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                为什么选择我们的MBTI测试？
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                专业、准确、免费，帮助你更好地了解自己
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Test Versions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                三种测试版本，满足不同需求
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                从快速入门到深度分析，选择适合你的测试版本
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">简易版</h3>
                  <p className="text-gray-500 text-sm mb-4">快速了解</p>
                </div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">10个核心题目</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">5-10分钟完成</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">基础类型判断</span>
                  </li>
                </ul>
                <Link
                  to="/test/easy"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始测试
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-blue-200">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-2">
                    推荐
                  </span>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">标准版</h3>
                  <p className="text-gray-500 text-sm mb-4">准确可靠</p>
                </div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">45个精选题目</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">15-20分钟完成</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">详细分析报告</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">职业建议</span>
                  </li>
                </ul>
                <Link
                  to="/test/standard"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始测试
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">专业版</h3>
                  <p className="text-gray-500 text-sm mb-4">深度分析</p>
                </div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">93个全面题目</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">30-40分钟完成</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">完整性格分析</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">发展建议</span>
                  </li>
                </ul>
                <Link
                  to="/test/professional"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始测试
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                用户真实反馈
              </h2>
              <p className="text-xl text-gray-600">
                看看其他用户怎么说
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {testimonial.author}
                    </span>
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
              准备好发现你的性格密码了吗？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              加入数百万用户，开始你的自我发现之旅
            </p>
            <Link
              to="/test/professional"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              立即免费测试
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="mt-4 text-blue-100">
              完全免费 • 无需注册 • 即时结果
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                常见问题
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  MBTI测试准确吗？
                </h3>
                <p className="text-gray-700">
                  MBTI测试具有较高的信度和效度，但它评估的是你的心理偏好而非能力。测试结果的准确性取决于你回答的诚实程度和测试时的心态。建议多次测试以验证结果。
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  人格类型会改变吗？
                </h3>
                <p className="text-gray-700">
                  核心人格类型通常是稳定的，但表现方式可能会随着经历、年龄和环境而有所调整。MBTI类型描述的是你自然的倾向，而不是刻板的行为模式。
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  测试需要多长时间？
                </h3>
                <p className="text-gray-700">
                  我们提供三种版本：简易版约5-10分钟，标准版约15-20分钟，专业版约30-40分钟。你可以根据自己的需求选择适合的版本。
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  测试结果是保密的吗？
                </h3>
                <p className="text-gray-700">
                  是的，你的测试结果是完全保密的。我们不会将你的个人信息或测试结果分享给任何第三方。所有数据都存储在本地，你可以随时删除。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}