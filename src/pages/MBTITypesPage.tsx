import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Users, Brain, Heart, Target, Zap } from 'lucide-react';

const mbtiTypes = [
  {
    group: '分析师 (NT)',
    icon: <Brain className="h-8 w-8 text-purple-600" />,
    description: '理性分析型，重视逻辑和效率',
    types: [
      {
        code: 'INTJ',
        name: '建筑师',
        color: 'purple',
        description: '富有想象力和战略性的思想家，凡事都有周详的计划',
        traits: ['战略性', '独立', '完美主义', '创新'],
        careers: ['软件架构师', '科学家', '投资分析师', '律师']
      },
      {
        code: 'INTP',
        name: '逻辑学家',
        color: 'blue',
        description: '富有创造力的发明家，对知识有着止不住的渴望',
        traits: ['逻辑性强', '好奇', '理论化', '适应性强'],
        careers: ['研究员', '程序员', '数据分析师', '大学教授']
      },
      {
        code: 'ENTJ',
        name: '指挥官',
        color: 'red',
        description: '大胆、富有想象力的强势领导者，总能找到或创造解决方法',
        traits: ['领导力', '目标导向', '果断', '战略性'],
        careers: ['企业高管', '项目经理', '创业家', '咨询顾问']
      },
      {
        code: 'ENTP',
        name: '辩论家',
        color: 'orange',
        description: '聪明好奇的思想者，不会放弃智力挑战',
        traits: ['创新', '善于辩论', '适应性强', '思维敏捷'],
        careers: ['产品经理', '市场总监', '公关专家', '创业家']
      }
    ]
  },
  {
    group: '外交官 (NF)',
    icon: <Heart className="h-8 w-8 text-green-600" />,
    description: '理想主义型，重视和谐与价值观',
    types: [
      {
        code: 'INFJ',
        name: '提倡者',
        color: 'teal',
        description: '安静而神秘，同时鼓舞人心的理想主义者',
        traits: ['理想主义', '洞察力强', '助人为乐', '有远见'],
        careers: ['心理咨询师', '作家', '社会工作者', '教育工作者']
      },
      {
        code: 'INFP',
        name: '调停者',
        color: 'pink',
        description: '诗意、善良的利他主义者，总是热忱地为正当事业服务',
        traits: ['价值观驱动', '创意丰富', '关怀他人', '真实'],
        careers: ['心理学家', '艺术家', '编辑', '非营利组织工作者']
      },
      {
        code: 'ENFJ',
        name: '主人公',
        color: 'emerald',
        description: '有魅力、鼓舞人心的领导者，有感召听众的能力',
        traits: ['有魅力', '善于激励', '关心成长', '沟通能力强'],
        careers: ['培训师', '人力资源总监', '教师', '政治家']
      },
      {
        code: 'ENFP',
        name: '竞选者',
        color: 'yellow',
        description: '热情、有创造力、社交能力强，受欢迎的自由精神',
        traits: ['热情', '创意无限', '人际关系好', '乐观'],
        careers: ['市场专员', '公关经理', '销售代表', '活动策划']
      }
    ]
  },
  {
    group: '守护者 (SJ)',
    icon: <Users className="h-8 w-8 text-blue-600" />,
    description: '稳健务实型，重视传统和责任',
    types: [
      {
        code: 'ISTJ',
        name: '物流师',
        color: 'indigo',
        description: '实用主义、注重事实、可靠的个人',
        traits: ['认真负责', '有条理', '务实', '传统'],
        careers: ['会计师', '银行家', '工程师', '律师']
      },
      {
        code: 'ISFJ',
        name: '守护者',
        color: 'sky',
        description: '非常专注、温暖的守护者，时刻准备保护爱的人',
        traits: ['细心周到', '忠诚可靠', '服务他人', '有责任感'],
        careers: ['护士', '教师', '人力资源', '行政助理']
      },
      {
        code: 'ESTJ',
        name: '总经理',
        color: 'navy',
        description: '出色的管理者，在管理事物或人的方面无与伦比',
        traits: ['组织能力强', '务实', '果断决策', '目标导向'],
        careers: ['企业管理者', '项目经理', '军官', '银行经理']
      },
      {
        code: 'ESFJ',
        name: '执政官',
        color: 'rose',
        description: '极有同情心、受欢迎、和谐的合作者',
        traits: ['善于合作', '关心他人', '组织能力强', '和谐导向'],
        careers: ['销售经理', '护士长', '人力资源经理', '教师']
      }
    ]
  },
  {
    group: '探险家 (SP)',
    icon: <Zap className="h-8 w-8 text-orange-600" />,
    description: '自由适应型，重视行动和体验',
    types: [
      {
        code: 'ISTP',
        name: '鉴赏家',
        color: 'amber',
        description: '大胆而实际的实验家，擅长使用各种工具',
        traits: ['动手能力强', '冷静', '适应性好', '独立'],
        careers: ['工程师', '技术员', '消防员', '外科医生']
      },
      {
        code: 'ISFP',
        name: '探险家',
        color: 'lime',
        description: '灵活、有魅力的艺术家，时刻准备探索新的可能性',
        traits: ['艺术天赋', '敏感', '追求自由', '有美感'],
        careers: ['设计师', '摄影师', '心理咨询师', '作家']
      },
      {
        code: 'ESTP',
        name: '企业家',
        color: 'orange',
        description: '聪明、精力充沛、非常善于与人交往',
        traits: ['行动导向', '冒险精神', '适应性强', '乐观'],
        careers: ['销售代表', '创业家', '体育教练', '股票交易员']
      },
      {
        code: 'ESFP',
        name: '表演者',
        color: 'red',
        description: '自发的、精力充沛、热情的娱乐者——生活从不枯燥',
        traits: ['善于社交', '乐观向上', '喜欢关注', '活泼'],
        careers: ['销售人员', '活动策划', '演艺人员', '旅游导游']
      }
    ]
  }
];

const colors = {
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  sky: 'bg-sky-100 text-sky-700 border-sky-200',
  navy: 'bg-blue-900 text-white border-blue-900',
  rose: 'bg-rose-100 text-rose-700 border-rose-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  lime: 'bg-lime-100 text-lime-700 border-lime-200'
};

export function MBTITypesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');

  const filteredTypes = mbtiTypes.flatMap(group =>
    (selectedGroup === 'all' || group.group === selectedGroup)
      ? group.types.map(type => ({
          ...type,
          group: group.group,
          groupIcon: group.icon,
          groupDescription: group.description
        }))
      : []
  ).filter(type =>
    searchTerm === '' ||
    type.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>MBTI十六型人格完整介绍 - 16种性格类型详细解析</title>
        <meta name="description" content="详细介绍MBTI16种人格类型，包括分析师、外交官、守护者、探险家四大类型。了解每种性格特征、优势、适合职业，找到你的MBTI类型。" />
        <meta name="keywords" content="mbti十六型人格,16型人格,mbti人格类型,mbti16型人格介绍,mbti16型人格免费测评,mbti人格测试,16种性格类型,mbti类型分析,人格测试mbti" />

        {/* Open Graph */}
        <meta property="og:title" content="MBTI十六型人格完整介绍 - 16种性格类型详细解析" />
        <meta property="og:description" content="详细介绍MBTI16种人格类型，了解每种性格特征、优势、适合职业。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/types`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/types`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              MBTI十六型人格完整介绍
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              深入了解16种MBTI人格类型，发现你的独特性格特征和优势
            </p>
            <Link
              to="/test/professional"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              测试你的类型
            </Link>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="bg-white py-8 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="搜索人格类型..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGroup('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedGroup === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                {mbtiTypes.map((group) => (
                  <button
                    key={group.group}
                    onClick={() => setSelectedGroup(group.group)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedGroup === group.group
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {group.group.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Types Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTypes.map((type) => (
                <Link
                  key={type.code}
                  to={`/blog/${type.code.toLowerCase()}-personality-type`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r from-${type.color}-500 to-${type.color}-600`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[type.color]}`}>
                        {type.code}
                      </span>
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        {type.groupIcon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {type.description}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">主要特征</h4>
                        <div className="flex flex-wrap gap-1">
                          {type.traits.slice(0, 3).map((trait, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">适合职业</h4>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {type.careers.slice(0, 3).join('、')}等
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredTypes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">没有找到匹配的人格类型</p>
              </div>
            )}
          </div>
        </section>

        {/* Groups Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                四大气质类型
              </h2>
              <p className="text-xl text-gray-600">
                MBTI将16种人格类型分为四大气质类型
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mbtiTypes.map((group) => (
                <div key={group.group} className="text-center">
                  <div className="flex justify-center mb-4">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {group.group}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {group.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {group.types.map((type) => (
                      <div
                        key={type.code}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border ${colors[type.color]}`}
                      >
                        {type.code}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                人格类型分布统计
              </h2>
              <p className="text-xl text-gray-600">
                基于全球大规模调查的统计数据
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">11.6%</h3>
                <p className="text-gray-600">最常见类型：ISTJ</p>
                <p className="text-sm text-gray-500 mt-2">稳重可靠、注重事实</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">1.5%</h3>
                <p className="text-gray-600">最稀有类型：INFJ</p>
                <p className="text-sm text-gray-500 mt-2">理想主义、富有洞察力</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-2">46.6%</h3>
                <p className="text-gray-600">内向型人群比例</p>
                <p className="text-sm text-gray-500 mt-2">需要更多独处时间充电</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              想知道你是哪种人格类型吗？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              完成我们的专业MBTI测试，深入了解你的性格特征和优势
            </p>
            <Link
              to="/test/professional"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              开始免费测试
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}