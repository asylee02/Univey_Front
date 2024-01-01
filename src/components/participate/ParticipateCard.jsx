import React, { useState, useEffect } from 'react';

const ParticipateCard = ({ question, question_num, question_type, answers, required=false, response, showWarning, onCardSubmit }) => {
  const [loadedAnswers, setLoadedAnswers] = useState([]);

  useEffect(() => {
    // answers가 비어있지 않으면 loadedAnswers에 설정
    if (answers && answers.length > 0) {
      setLoadedAnswers(answers);
    }
  }, [answers]);

  const hasError = showWarning && required && !response;

  const renderAnswer = () => {
    if (question_type === 'MULTIPLE_CHOICE') {
      // 객관식 질문 렌더링
      return (
        <div>
          {loadedAnswers.map((answer) => (
            <label key={answer.answer_id} className="flex items-center">
              <input
                id={answer.answer_id}
                type="radio"
                name={`question_${question_num}`}
                value={answer.answer_id}
                onChange={() => onCardSubmit(question_num, answer.answer_id)}
              />
              <span className="ml-2">{answer.answer}</span>
            </label>
          ))}
        </div>
      );
    } else if (question_type === 'SHORT_ANSWER') {
      // 주관식 질문 렌더링
      return (
        <div className={"mt-2"}>
          <input
            type="text"
            className="w-full p-1 border rounded outline-none border-question_card_grey bg-white text-text_color mr-2"
            placeholder={'주관식 서술 문항입니다. 자유롭게 작성해주세요.'}
            onChange={(e) => onCardSubmit(question_num, e.target.value)}
          />
        </div>
      );
    } else {
      return <p>{question_type === 'MULTIPLE_CHOICE' ? '답변이 없습니다.' : '렌더링 실패'}</p>;
    }
  };

  return (
    <div>
      <div className={`bg-question_card_bg p-4 mt-3 rounded cursor-pointer 
      ${hasError ? 'border border-red-500' : ''}`}>
        <p className="text-left text-l font-semibold mb-2">
          {question_num}.{question}
          {required && <span className="text-red-500 pl-1"> *</span>}
        </p>
        {question_type === 'MULTIPLE_CHOICE' && (
          <div className={`text-l pl-2 font-normal`}>
            {renderAnswer()}
          </div>
        )}
        {question_type === 'SHORT_ANSWER' && (
          <div className={"ml-2"}>
            {renderAnswer()}
          </div>
        )}
      </div>
      {hasError && <p className="text-red-500 mt-1 text-left text-sm">필수 항목입니다. 설문에 응답해 주세요.</p>}
    </div>
  );
};

export default ParticipateCard;
