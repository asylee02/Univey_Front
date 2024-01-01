import React, { useState, useEffect, useRef } from 'react';
import CopyButtonIcon from "../icons/CopyButtonIcon";
import DeleteButtonIcon from "../icons/DeleteButtonIcon";
import MultipleChoiceIcon from '../icons/MultipleChoiceIcon';
import ShortAnswerIcon from '../icons/ShortAnswerIcon';
import ClickedAnswerIcon from '../icons/ClickedAnswerIcon';
import CreateCardTopAsset from '../icons/CreateCardTopAsset';
import { IoRadioButtonOff } from "react-icons/io5";

const EditQuestion = ({ 
  onCancel,
  onEditQuestion,
  onRemoveQuestion,
  onCopyEditQuestion,
  initialQuestion,
  index,
  userQuestions,
  setUserQuestions,
}) => {
  const [editedQuestion, setEditedQuestion] = useState({ ...initialQuestion });
  const [answer, setAnswer] = useState(initialQuestion.answer || ['']);
  const [questionType, setQuestionType] = useState(initialQuestion.question_type || 'multipleChoice');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState('');
  const inputRef = useRef(null);
  const [isRequired, setIsRequired] = useState(initialQuestion.isRequired);

  useEffect(() => {
    handleAddAnswer();
  }, []);

  const handleAddAnswer = () => {
    setAnswer((prevAnswer) => [...prevAnswer, '']);
  };

  const handleUpdateAnswer = (index, value) => {
    setAnswer((prevAnswer) => {
      return prevAnswer.map((prevValue, prevIndex) => (
        prevIndex === index ? value : prevValue));
    });

    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answer: [...answer],
    }));

    if (index === answer.length - 1 && value !== '') {
      handleAddAnswer();
    }

    setSelectedAnswerIndex(index);
  };

  const handleUpdateQuestionType = (value) => {
    setQuestionType(value);
  
    // shortAnswer로 변경될 때만 answer 초기화
  if (value === 'shortAnswer') {
    setAnswer(['']);
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      question_type: value,
      answer: [],
    }));
  } else {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      question_type: value,
    }));
  }
  };

  const handleRemoveQuestion = () => {
    onRemoveQuestion();
  };

  const handleCopyEditQuestion = () => {
    // 새로운 질문 추가
    const copiedQuestion = {
      ...editedQuestion,
      question_type: questionType,
      answer: answer.filter((value) => value !== ''),
      isRequired: isRequired,
    };

    copiedQuestion.question_num = userQuestions.length + 1;
  
    setUserQuestions((prevUserQuestions) => [...prevUserQuestions, copiedQuestion]);
  
    // 복사 이벤트 발생
    onCopyEditQuestion(copiedQuestion, index);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current) {
      const isInputEmpty = editedQuestion.question.trim() === '';

      if (
        !inputRef.current.contains(event.target) &&
        (event.target.className !== 'bg-question_card_bg' ||
          (event.target.className === 'bg-question_card_bg' && isInputEmpty))
      ) {
        if (editedQuestion.question.trim() !== '') {
          const updatedQuestion = {
            ...editedQuestion,
            question_type: questionType,
            answer: answer.filter((value) => value !== ''),
            isRequired: isRequired,
          };

          onEditQuestion(updatedQuestion, index);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel, editedQuestion, isRequired, questionType]);

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-start">
        <CreateCardTopAsset />
        <div ref={inputRef} className="mb-2 w-full rounded p-5 bg-question_card_bg">
          <div className="flex items-center space-x-8">
            <input
              className="flex-grow outline-none border-b border-question_card_grey bg-transparent text-l font-semibold  text-text_color"
              placeholder="질문을 작성해주세요"
              value={editedQuestion.question}
              onChange={(e) => setEditedQuestion((prev) => ({ ...prev, question: e.target.value }))}
            />
            <div className="flex items-center space-x-2 ">
              <input
                id="checked"
                type="checkbox"
                checked={isRequired}
                className="mr-1 mt-2 bg-transparent border border-text_color rounded w-4 h-4 "
                onChange={() => {
                  setIsRequired(!isRequired);
                }}
              />
              <label className="mb-0 mt-1">필수</label>
            </div>
            <div className="flex items-center mt-2">
              <select
                className="border-b border-question_card_grey bg-transparent text-text_color ml-2 pr-8"
                value={questionType}
                onChange={(e) => handleUpdateQuestionType(e.target.value)}
              >
                <option 
                  value="multipleChoice">
                    <MultipleChoiceIcon />
                    객관식
                </option>
                <option 
                  value="shortAnswer">
                  <ShortAnswerIcon />
                  주관식
                </option>
              </select>
            </div>
          </div>
          {questionType === 'multipleChoice' && (
            <div className="mt-2">
              
                {answer.map((value, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <div className='flex space-x-1'>
                    {index === selectedAnswerIndex && <ClickedAnswerIcon />}
                    <IoRadioButtonOff />
                    </div>
                    <input
                      className="w-full p-1 outline-none border-none border-question_card_grey bg-transparent text-text_color mr-2"
                      placeholder={'응답 추가'}
                      value={value !== undefined ? value : ''}
                      onClick={() => setSelectedAnswerIndex(index)}
                      onChange={(e) => handleUpdateAnswer(index, e.target.value, answer)}
                    />
                  </div>
                ))}
            </div>
          )}
          {questionType === 'shortAnswer' && (
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-1 border rounded border-question_card_grey bg-white text-text_color mr-2"
                placeholder={'주관식 서술 문항입니다. 자유롭게 작성해주세요.'}
                value={['']}
                disabled
              />
            </div>
          )}
          <hr className='mt-4 mb-2 py-2 border-question_card_grey'></hr>
          <div className='flex justify-end'>
            <button className='px-2'
              onClick={handleCopyEditQuestion}>
              <CopyButtonIcon />
            </button>
            <button className='pl-2'
              onClick={handleRemoveQuestion}>
              <DeleteButtonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;