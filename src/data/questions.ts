import { Question } from '../types/mbti';

// 简易版测试题目
export const easyQuestions: Question[] = [
  {
    id: 1,
    text: "你更倾向于在社交场合主动与他人交谈",
    dimension: "EI",
    direction: 1
  },
  {
    id: 2,
    text: "你喜欢关注具体细节而不是宏观概念",
    dimension: "SN",
    direction: 1
  },
  {
    id: 3,
    text: "在做决定时，你更依赖逻辑分析而不是个人感受",
    dimension: "TF",
    direction: 1
  },
  {
    id: 4,
    text: "你倾向于提前计划而不是随机应变",
    dimension: "JP",
    direction: 1
  },
  {
    id: 5,
    text: "你在团体中更喜欢倾听而不是发言",
    dimension: "EI",
    direction: -1
  },
  {
    id: 6,
    text: "你更相信直觉和可能性而不是现实和事实",
    dimension: "SN",
    direction: -1
  },
  {
    id: 7,
    text: "在处理冲突时，你更注重维护和谐而不是追求真相",
    dimension: "TF",
    direction: -1
  },
  {
    id: 8,
    text: "你喜欢保持选择的开放性而不是快速做出决定",
    dimension: "JP",
    direction: -1
  },
  {
    id: 9,
    text: "你更喜欢在热闹的环境中工作",
    dimension: "EI",
    direction: 1
  },
  {
    id: 10,
    text: "你更喜欢实践性的工作而不是创新性的工作",
    dimension: "SN",
    direction: 1
  },
  {
    id: 11,
    text: "你认为效率比人际关系更重要",
    dimension: "TF",
    direction: 1
  },
  {
    id: 12,
    text: "你喜欢按计划行事而不是随性而为",
    dimension: "JP",
    direction: 1
  },
  {
    id: 13,
    text: "你更喜欢独处的时光",
    dimension: "EI",
    direction: -1
  },
  {
    id: 14,
    text: "你常常关注事物的潜在可能性",
    dimension: "SN",
    direction: -1
  },
  {
    id: 15,
    text: "在评价他人时，你更看重善意而不是能力",
    dimension: "TF",
    direction: -1
  },
  {
    id: 16,
    text: "你喜欢灵活应对而不是严格遵守计划",
    dimension: "JP",
    direction: -1
  },
  {
    id: 17,
    text: "你喜欢成为注意力的焦点",
    dimension: "EI",
    direction: 1
  },
  {
    id: 18,
    text: "你更相信经验而不是理论",
    dimension: "SN",
    direction: 1
  },
  {
    id: 19,
    text: "你更重视客观标准而不是个人价值观",
    dimension: "TF",
    direction: 1
  },
  {
    id: 20,
    text: "你喜欢事先做好充分准备",
    dimension: "JP",
    direction: 1
  }
];

// 标准版测试题目
export const standardQuestions: Question[] = [
  ...easyQuestions,
  {
    id: 21,
    text: "在团队中，你更喜欢担任领导者的角色",
    dimension: "EI",
    direction: 1
  },
  {
    id: 22,
    text: "你更关注当下的实际情况而不是未来的可能性",
    dimension: "SN",
    direction: 1
  },
  {
    id: 23,
    text: "你更看重公平性而不是同理心",
    dimension: "TF",
    direction: 1
  },
  {
    id: 24,
    text: "你喜欢按部就班地完成任务",
    dimension: "JP",
    direction: 1
  },
  {
    id: 25,
    text: "你更喜欢与人深入交谈而不是泛泛而谈",
    dimension: "EI",
    direction: -1
  },
  {
    id: 26,
    text: "你常常能看到事物之间的联系",
    dimension: "SN",
    direction: -1
  },
  {
    id: 27,
    text: "你在做决定时会考虑他人的感受",
    dimension: "TF",
    direction: -1
  },
  {
    id: 28,
    text: "你喜欢保持生活的自发性",
    dimension: "JP",
    direction: -1
  },
  {
    id: 29,
    text: "你喜欢参加社交活动",
    dimension: "EI",
    direction: 1
  },
  {
    id: 30,
    text: "你更相信事实而不是直觉",
    dimension: "SN",
    direction: 1
  },
  {
    id: 31,
    text: "你更重视逻辑一致性",
    dimension: "TF",
    direction: 1
  },
  {
    id: 32,
    text: "你喜欢有条理的生活方式",
    dimension: "JP",
    direction: 1
  },
  {
    id: 33,
    text: "你需要独处来恢复能量",
    dimension: "EI",
    direction: -1
  },
  {
    id: 34,
    text: "你喜欢探索新的可能性",
    dimension: "SN",
    direction: -1
  },
  {
    id: 35,
    text: "你在决策时会考虑情感因素",
    dimension: "TF",
    direction: -1
  },
  {
    id: 36,
    text: "你喜欢保持选择的灵活性",
    dimension: "JP",
    direction: -1
  },
  {
    id: 37,
    text: "你在群体中容易表达自己",
    dimension: "EI",
    direction: 1
  },
  {
    id: 38,
    text: "你更关注细节而不是整体",
    dimension: "SN",
    direction: 1
  },
  {
    id: 39,
    text: "你更重视真实而不是和谐",
    dimension: "TF",
    direction: 1
  },
  {
    id: 40,
    text: "你喜欢提前做好决定",
    dimension: "JP",
    direction: 1
  },
  {
    id: 41,
    text: "你喜欢与人分享自己的想法",
    dimension: "EI",
    direction: 1
  },
  {
    id: 42,
    text: "你更相信实践经验",
    dimension: "SN",
    direction: 1
  },
  {
    id: 43,
    text: "你更重视公正性",
    dimension: "TF",
    direction: 1
  },
  {
    id: 44,
    text: "你喜欢按计划行事",
    dimension: "JP",
    direction: 1
  },
  {
    id: 45,
    text: "你在社交场合感到自在",
    dimension: "EI",
    direction: 1
  }
];

// 专业版测试题目
export const professionalQuestions: Question[] = [
  ...standardQuestions,
  {
    id: 46,
    text: "你经常会为未来做详细的计划和安排",
    dimension: "JP",
    direction: 1
  },
  {
    id: 47,
    text: "你更喜欢处理具体的问题而不是抽象的概念",
    dimension: "SN",
    direction: 1
  },
  {
    id: 48,
    text: "你在做决定时更依赖客观分析",
    dimension: "TF",
    direction: 1
  },
  {
    id: 49,
    text: "你喜欢在大型社交场合中与人互动",
    dimension: "EI",
    direction: 1
  },
  {
    id: 50,
    text: "你更看重实际效果而不是创新想法",
    dimension: "SN",
    direction: 1
  },
  {
    id: 51,
    text: "你在解决问题时更注重逻辑推理",
    dimension: "TF",
    direction: 1
  },
  {
    id: 52,
    text: "你喜欢有明确的规划和目标",
    dimension: "JP",
    direction: 1
  },
  {
    id: 53,
    text: "你更喜欢一个人完成工作",
    dimension: "EI",
    direction: -1
  },
  {
    id: 54,
    text: "你常常能想到创新的解决方案",
    dimension: "SN",
    direction: -1
  },
  {
    id: 55,
    text: "你在决策时会考虑对他人的影响",
    dimension: "TF",
    direction: -1
  },
  {
    id: 56,
    text: "你喜欢保持生活的自由度",
    dimension: "JP",
    direction: -1
  },
  {
    id: 57,
    text: "你在陌生环境中容易建立新的关系",
    dimension: "EI",
    direction: 1
  },
  {
    id: 58,
    text: "你更相信数据和事实",
    dimension: "SN",
    direction: 1
  },
  {
    id: 59,
    text: "你更重视效率和成果",
    dimension: "TF",
    direction: 1
  },
  {
    id: 60,
    text: "你喜欢有序和可预测的生活",
    dimension: "JP",
    direction: 1
  },
  {
    id: 61,
    text: "你需要大量社交活动来保持活力",
    dimension: "EI",
    direction: 1
  },
  {
    id: 62,
    text: "你更关注现实可行性",
    dimension: "SN",
    direction: 1
  },
  {
    id: 63,
    text: "你在评价时更看重客观标准",
    dimension: "TF",
    direction: 1
  },
  {
    id: 64,
    text: "你喜欢提前做好安排",
    dimension: "JP",
    direction: 1
  },
  {
    id: 65,
    text: "你喜欢与多人同时交往",
    dimension: "EI",
    direction: 1
  },
  {
    id: 66,
    text: "你更相信亲身经历",
    dimension: "SN",
    direction: 1
  },
  {
    id: 67,
    text: "你更重视理性分析",
    dimension: "TF",
    direction: 1
  },
  {
    id: 68,
    text: "你喜欢按既定计划执行",
    dimension: "JP",
    direction: 1
  },
  {
    id: 69,
    text: "你在团队中倾向于主导讨论",
    dimension: "EI",
    direction: 1
  },
  {
    id: 70,
    text: "你更看重实际应用",
    dimension: "SN",
    direction: 1
  },
  {
    id: 71,
    text: "你在冲突中更注重事实",
    dimension: "TF",
    direction: 1
  },
  {
    id: 72,
    text: "你喜欢有明确的规则和流程",
    dimension: "JP",
    direction: 1
  },
  {
    id: 73,
    text: "你更喜欢安静的环境",
    dimension: "EI",
    direction: -1
  },
  {
    id: 74,
    text: "你常常能预见事物的发展趋势",
    dimension: "SN",
    direction: -1
  },
  {
    id: 75,
    text: "你更重视人际和谐",
    dimension: "TF",
    direction: -1
  },
  {
    id: 76,
    text: "你喜欢灵活应对变化",
    dimension: "JP",
    direction: -1
  },
  {
    id: 77,
    text: "你需要时间独处来思考",
    dimension: "EI",
    direction: -1
  },
  {
    id: 78,
    text: "你喜欢探索新的可能性",
    dimension: "SN",
    direction: -1
  },
  {
    id: 79,
    text: "你在决策时会考虑个人价值观",
    dimension: "TF",
    direction: -1
  },
  {
    id: 80,
    text: "你喜欢保持选择的开放性",
    dimension: "JP",
    direction: -1
  },
  {
    id: 81,
    text: "你更喜欢深度的一对一交谈",
    dimension: "EI",
    direction: -1
  },
  {
    id: 82,
    text: "你常常能想到创新的方案",
    dimension: "SN",
    direction: -1
  },
  {
    id: 83,
    text: "你更重视情感需求",
    dimension: "TF",
    direction: -1
  },
  {
    id: 84,
    text: "你喜欢随机应变",
    dimension: "JP",
    direction: -1
  },
  {
    id: 85,
    text: "你在社交场合需要时间热身",
    dimension: "EI",
    direction: -1
  },
  {
    id: 86,
    text: "你喜欢思考抽象概念",
    dimension: "SN",
    direction: -1
  },
  {
    id: 87,
    text: "你在评价时会考虑情境因素",
    dimension: "TF",
    direction: -1
  },
  {
    id: 88,
    text: "你喜欢保持生活的自发性",
    dimension: "JP",
    direction: -1
  },
  {
    id: 89,
    text: "你需要独处来恢复精力",
    dimension: "EI",
    direction: -1
  },
  {
    id: 90,
    text: "你更关注未来的可能性",
    dimension: "SN",
    direction: -1
  },
  {
    id: 91,
    text: "你更重视人际关系",
    dimension: "TF",
    direction: -1
  },
  {
    id: 92,
    text: "你喜欢即兴决定",
    dimension: "JP",
    direction: -1
  },
  {
    id: 93,
    text: "你在群体中更喜欢观察",
    dimension: "EI",
    direction: -1
  }
];