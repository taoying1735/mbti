import { create } from 'zustand';
import { Answer, TestResult, Question, TestVersion } from '../types/mbti';
import { easyQuestions, standardQuestions, professionalQuestions } from '../data/questions';

interface TestStore {
  currentQuestionIndex: number;
  answers: Answer[];
  savedResults: TestResult[];
  questions: Question[];
  currentVersion: TestVersion | null;
  setAnswer: (questionId: number, score: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  calculateResult: () => TestResult;
  saveResult: (result: TestResult) => void;
  loadResults: () => void;
  clearHistory: () => void;
  startTest: (version: TestVersion) => void;
}

// Fisher-Yates 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 按维度分组并随机选择问题
function selectRandomQuestions(questions: Question[], targetCount: number): Question[] {
  // 按维度分组
  const questionsByDimension: { [key: string]: Question[] } = {
    'EI': questions.filter(q => q.dimension === 'EI'),
    'SN': questions.filter(q => q.dimension === 'SN'),
    'TF': questions.filter(q => q.dimension === 'TF'),
    'JP': questions.filter(q => q.dimension === 'JP')
  };

  // 计算每个维度需要的问题数量
  const questionsPerDimension = Math.ceil(targetCount / 4);

  // 从每个维度随机选择问题
  const selectedQuestions: Question[] = [];
  Object.values(questionsByDimension).forEach(dimensionQuestions => {
    const shuffled = shuffleArray(dimensionQuestions);
    selectedQuestions.push(...shuffled.slice(0, questionsPerDimension));
  });

  // 随机打乱最终的问题顺序
  return shuffleArray(selectedQuestions).slice(0, targetCount);
}

export const useTestStore = create<TestStore>((set, get) => ({
  currentQuestionIndex: 0,
  answers: [],
  savedResults: [],
  questions: [],
  currentVersion: null,

  startTest: (version) => {
    let questionPool;
    let targetCount;

    switch (version) {
      case 'standard':
        questionPool = standardQuestions;
        targetCount = 45;
        break;
      case 'professional':
        questionPool = professionalQuestions;
        targetCount = 93;
        break;
      default:
        questionPool = easyQuestions;
        targetCount = 20;
    }

    // 随机选择问题
    const selectedQuestions = selectRandomQuestions(questionPool, targetCount);

    set({ 
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: [],
      currentVersion: version
    });
  },

  setAnswer: (questionId: number, score: number) => {
    set((state) => {
      const answers = [...state.answers];
      const existingIndex = answers.findIndex(a => a.questionId === questionId);
      
      if (existingIndex >= 0) {
        answers[existingIndex] = { questionId, score };
      } else {
        answers.push({ questionId, score });
      }
      
      return { answers };
    });
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
    }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    }));
  },

  calculateResult: () => {
    const { answers, questions, currentVersion } = get();
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // 计算每个维度的得分
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const [first, second] = question.dimension.split('') as [keyof typeof scores, keyof typeof scores];
      const score = (answer.score - 3) * question.direction;
      
      if (score > 0) {
        scores[first] += Math.abs(score);
      } else {
        scores[second] += Math.abs(score);
      }
    });

    // 计算每个维度的百分比
    const total = {
      EI: Math.max(scores.E + scores.I, 1), // 避免除以零
      SN: Math.max(scores.S + scores.N, 1),
      TF: Math.max(scores.T + scores.F, 1),
      JP: Math.max(scores.J + scores.P, 1)
    };

    const percentages = {
      E: Math.round((scores.E / total.EI) * 100),
      I: Math.round((scores.I / total.EI) * 100),
      S: Math.round((scores.S / total.SN) * 100),
      N: Math.round((scores.N / total.SN) * 100),
      T: Math.round((scores.T / total.TF) * 100),
      F: Math.round((scores.F / total.TF) * 100),
      J: Math.round((scores.J / total.JP) * 100),
      P: Math.round((scores.P / total.JP) * 100)
    };

    // 确保每对维度的总和为100%
    if (percentages.E + percentages.I !== 100) {
      const diff = 100 - (percentages.E + percentages.I);
      if (percentages.E > percentages.I) {
        percentages.E += diff;
      } else {
        percentages.I += diff;
      }
    }

    if (percentages.S + percentages.N !== 100) {
      const diff = 100 - (percentages.S + percentages.N);
      if (percentages.S > percentages.N) {
        percentages.S += diff;
      } else {
        percentages.N += diff;
      }
    }

    if (percentages.T + percentages.F !== 100) {
      const diff = 100 - (percentages.T + percentages.F);
      if (percentages.T > percentages.F) {
        percentages.T += diff;
      } else {
        percentages.F += diff;
      }
    }

    if (percentages.J + percentages.P !== 100) {
      const diff = 100 - (percentages.J + percentages.P);
      if (percentages.J > percentages.P) {
        percentages.J += diff;
      } else {
        percentages.P += diff;
      }
    }

    const type = [
      percentages.E > percentages.I ? 'E' : 'I',
      percentages.S > percentages.N ? 'S' : 'N',
      percentages.T > percentages.F ? 'T' : 'F',
      percentages.J > percentages.P ? 'J' : 'P'
    ].join('') as MBTIResult;

    const result = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type,
      version: currentVersion || 'easy',
      scores: percentages
    };

    // 自动保存结果
    get().saveResult(result);

    return result;
  },

  saveResult: (result: TestResult) => {
    set((state) => {
      const savedResults = [...state.savedResults];
      const existingIndex = savedResults.findIndex(r => r.id === result.id);
      
      if (existingIndex >= 0) {
        savedResults[existingIndex] = result;
      } else {
        savedResults.unshift(result); // Add new results to the beginning
      }

      // 保存到 localStorage
      localStorage.setItem('mbti_results', JSON.stringify(savedResults));
      
      return { savedResults };
    });
  },

  loadResults: () => {
    try {
      const savedResults = JSON.parse(localStorage.getItem('mbti_results') || '[]');
      set({ savedResults });
    } catch (error) {
      console.error('Failed to load saved results:', error);
      set({ savedResults: [] });
    }
  },

  clearHistory: () => {
    localStorage.removeItem('mbti_results');
    set({ savedResults: [] });
  }
}));