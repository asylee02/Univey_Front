import React from 'react';
import QuestionCard from './QuestionCard';

const RecommendedQuestions = ({ recommendedQuestions, onAddQuestion, onAddAllQuestions }) => {
  return (
    <div className="flex-1 p-4 mt-12">
      <div className="text-xl font-semibold text-main_color mb-4">추천질문</div>
      <p className="mb-1 text-sm">
        AI가 입력받은 주제를 바탕으로 질문을 추천해줍니다. 어떤 질문을 구성해야 할지 고민이 된다면 참고해보세요!
        원하는 질문을 선택해보세요! 자동으로 문항에 추가됩니다.
      </p>
      <div className="flex justify-between items-center mb-3">
        <div></div> {/* 버튼 오른쪽 정렬용 div.. */}
        <button 
          onClick={() => onAddAllQuestions(recommendedQuestions)} 
          className="text-main_color border border-main_color rounded-xl px-5">
          전체 선택
        </button>
      </div>
      <div className='overflow-x-hidden'>
      {recommendedQuestions.map((recommendedQuestion) => (
        <QuestionCard
          key={recommendedQuestion.question_num}
          question_num={recommendedQuestion.question_num.toString()}
          question={recommendedQuestion.question}
          question_type={recommendedQuestion.question_type}
          answer={recommendedQuestion.answer}
          onClick={() => onAddQuestion(recommendedQuestion)}
        />
        ))}
      </div>
    </div>
  );
};

export default RecommendedQuestions;