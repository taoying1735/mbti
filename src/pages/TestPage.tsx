import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { BackButton } from '../components/BackButton';
import { useTestStore } from '../store/testStore';

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { version } = useParams<{ version: string }>();
  const {
    currentQuestionIndex,
    answers,
    questions,
    setAnswer,
    nextQuestion,
    previousQuestion,
    calculateResult,
    startTest,
  } = useTestStore();

  useEffect(() => {
    if (version) {
      startTest(version as 'easy' | 'standard' | 'professional');
    } else {
      navigate('/');
    }
  }, [version, navigate]);

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载测试题目...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.score;

  const handleAnswer = (score: number) => {
    setAnswer(currentQuestion.id, score);
    if (currentQuestionIndex === questions.length - 1) {
      const result = calculateResult();
      navigate(`/result/${result.id}`);
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <BackButton />
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">MBTI 人格测试</h1>
          <p className="text-gray-600">
            请根据您的真实想法选择最符合的选项
          </p>
        </div>

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <QuestionCard
          question={currentQuestion}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
        />

        <div className="text-center text-gray-500">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
};