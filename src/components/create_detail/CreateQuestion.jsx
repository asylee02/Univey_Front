import React, { useState } from 'react';
import AddButtonIcon from '../icons/AddButtonIcon';
import CopyButtonIcon from '../icons/CopyButtonIcon';
import DeleteButtonIcon from '../icons/DeleteButtonIcon';
import MultipleChoiceIcon from '../icons/MultipleChoiceIcon';
import ShortAnswerIcon from '../icons/ShortAnswerIcon';
import ClickedAnswerIcon from '../icons/ClickedAnswerIcon';
import CreateCardTopAsset from '../icons/CreateCardTopAsset';
import { IoRadioButtonOff } from "react-icons/io5";

const CreateQuestion = ({ onCancel, onAddQuestion, onCopyCreateQuestion }) => {
  const [question, setQuestion] = useState(''); // 질문 내용
  const [questionType, setQuestionType] = useState('multipleChoice'); // 질문 유형
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState('');
  const [showComponent, setShowComponent] = useState(true);
  const [answers, setAnswers] = useState(['']); // 객관식일 때 각 응답 옵션
  const [isRequired, setIsRequired] = useState(false); // 필수질문 여부

  // 질문 추가
  const handleAddQuestion = () => {
    // 질문이 있을 때만 추가
    if (question.trim() !== '') {
      // 새로운 질문 객체 생성
      const newQuestion = {
        question,
        questionType,
        isRequired,
        answer: answers.filter(answer => answer.trim() !== ''), // 비어있는 응답은 필터링
      };

      // 부모 컴포넌트로 새로운 질문 추가
      onAddQuestion(newQuestion);

      setQuestion('');
      setAnswers(['']);
    }
  };

  // 복사 버튼 클릭 시 실행되는 함수
  const handleCopyCreateQuestion = () => {
    // 복사된 질문 객체 생성
    const copiedQuestion = {
      question,
      questionType,
      isRequired,
      answer: answers.filter(answer => answer.trim() !== ''),
    };

    // 부모 컴포넌트로 복사된 질문 추가
    onCopyCreateQuestion(copiedQuestion);
  };

  // 컴포넌트 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = () => {
    // 컴포넌트 숨기기
    setShowComponent(false);
    // 부모 컴포넌트로 취소 이벤트 전달
    onCancel();
  };

  // 응답 옵션 업데이트
  const handleUpdateAnswer = (index, value) => {
    // 기존 응답 배열 복사
    const updatedAnswers = [...answers];
    // 주어진 인덱스의 응답 업데이트된 값으로 변경
    updatedAnswers[index] = value;

    // 마지막 응답이 비어 있지 않으면 새로운 응답 추가
    if (index === updatedAnswers.length - 1 && value.trim() !== '') {
      updatedAnswers.push('');
    }

    setSelectedAnswerIndex(index);
    setAnswers(updatedAnswers);
  };

  return showComponent ? (
    <div className="flex w-full">
      {/* "+" 버튼 클릭 시 질문 추가 함수 호출 */}
      <button onClick={handleAddQuestion} className=" text-main_color pr-2 font-bold">
        <AddButtonIcon />
      </button>
      <div className="flex flex-col items-start">
        <CreateCardTopAsset />
        <div className="mb-2 w-full rounded p-5 bg-question_card_bg">
          <div className="flex items-center space-x-4">
            <input
              className="flex-grow p-1 outline-none border-b border-question_card_grey bg-transparent text-l font-semibold text-text_color"
              placeholder="질문을 작성해주세요"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input
                id="checked"
                type="checkbox"
                value={''}
                className="mr-1 mt-2 bg-transparent border border-text_color rounded w-4 h-4 "
                onChange={() => {
                  console.log('Checkbox clicked. Current value:', !isRequired);
                  setIsRequired(!isRequired);
                }}
              />
              <label className="mb-0 mt-1">필수</label>
            </div>
            <div className="flex items-center mt-2">
              <select
                className="border-b border-question_card_grey bg-transparent text-text_color ml-2 pr-8"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="multipleChoice">
                  <MultipleChoiceIcon className="pr-1" />
                  객관식
                </option>
                <option value="shortAnswer">
                  <ShortAnswerIcon className="pr-1" />
                  주관식
                </option>
              </select>
            </div>
          </div>
          {questionType === 'multipleChoice' && (
            <div className="mt-2">
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center mt-2">
                  <div className='flex space-x-1'>
                    {index === selectedAnswerIndex && <ClickedAnswerIcon />}
                    <IoRadioButtonOff />
                    </div>
                  <input
                    className="w-full p-1 outline-none border-none border-question_card_grey bg-transparent text-text_color mr-2"
                    placeholder={'응답 추가'}
                    value={answer}
                    onClick={() => setSelectedAnswerIndex(index)}
                    onChange={(e) => handleUpdateAnswer(index, e.target.value)}
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
                value={answers['']}
                disabled
              />
            </div>
          )}
          <hr className="my-4 py-2 border-question_card_grey"></hr>
          <div className="flex justify-end mt-2">
            <button 
              className="px-2"
              onClick={handleCopyCreateQuestion}>
              <CopyButtonIcon />
            </button>
            <button className="pl-2"
              onClick={handleDelete}>
              <DeleteButtonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateQuestion;
