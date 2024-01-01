import React from 'react';
import { IoRadioButtonOff } from "react-icons/io5";

const QuestionCard = ({ question, question_num, question_type, answer, onClick }) => {
  const renderAnswer = () => {
    if (!answer) {
      return <p>No answer available</p>;
    }

    return (
      <div>
        {Object.entries(answer).map(([key, value], index) => (
          <p key={index} className='flex items-center'>
            <IoRadioButtonOff className='mr-1'/> {value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-question_card_bg p-4 mb-4 rounded cursor-pointer" onClick={onClick}>
      <p className='text-l font-semibold mb-2'>{question_num}.{question}</p>
        {question_type === 'multipleChoice' && (
            <div className='text-l font-normal'>{renderAnswer()}</div>
        )}
        {question_type === 'shortAnswer' && (
            <div className="mt-2">
            <input
              type="text"
              className="w-full p-1 border rounded border-question_card_grey bg-white text-text_color mr-2"
              placeholder={'주관식 서술 문항입니다. 자유롭게 작성해주세요.'}
              value={answer['']}
              disabled
            />
          </div>
        )}
    </div>
  );
};

export default QuestionCard;