import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import CreateQuestion from './CreateQuestion';
import EditQuestion from './EditQuestion';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { BiSolidQuoteAltRight } from 'react-icons/bi';
import AddButtonIcon from '../icons/AddButtonIcon';

const UserQuestions = ({
  userQuestions,
  setUserQuestions,
  onAddQuestion,
  onEditQuestion,
  topic,
  description,
}) => {
  const [creatingQuestion, setCreatingQuestion] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(['']); 
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();

  const handleAddQuestion = (question) => {
    if (editingIndex !== null) {
      const updatedQuestions = [...userQuestions];
      updatedQuestions[editingIndex] = { ...question, question_num: editingIndex + 1 };
      onEditQuestion(updatedQuestions);
    } else {
      const newQuestion = {
        question_num: userQuestions.length + 1,
        ...question,
        question_type: question.questionType,
        isRequired: question.isRequired,
        answer: question.answer || {},
      };

      console.log('New Question:', newQuestion);
      onAddQuestion(newQuestion);  // 직접 newQuestion 전달

      setQuestion('');
      setAnswer(['']);
    }

    setCreatingQuestion(false);
    setEditingIndex(null);
  };

  const handleCopyCreateQuestion = (question) => {
    if (editingIndex !== null) {
      const updatedQuestions = [...userQuestions];
      updatedQuestions[editingIndex] = { ...question, question_num: editingIndex + 1 };
      onEditQuestion(updatedQuestions);
    } else {
      const newQuestion = {
        question_num: userQuestions.length + 1,
        ...question,
        question_type: question.questionType,
        isRequired: question.isRequired,
        answer: question.answer || {},
      };
      onAddQuestion(newQuestion);  // 직접 newQuestion 전달
    }

    setCreatingQuestion(true);
  };

  const handleCopyEditQuestion = () => {
  };

  const handleUpdateQuestion = (updatedQuestion, index) => {
    const updatedQuestions = [...userQuestions];
    updatedQuestions[index] = updatedQuestion;

    setUserQuestions(updatedQuestions);

    if (typeof onEditQuestion === 'function') {
      onEditQuestion(updatedQuestions);
    }

    setEditingIndex(null);
  };

  const handleEditQuestion = (index) => {
    setCreatingQuestion(false);
    setEditingIndex(index === editingIndex ? null : index);
  };

  // 선택한 질문 삭제
  const handleRemoveQuestion = (index) => {
    // userQuestions 배열에서 선택한 인덱스의 질문을 제외한 새로운 배열 생성 (splice 대신 filter 사용)
    const updatedQuestions = userQuestions.filter((_, i) => i !== index);

    // 업데이트된 question_num 적용
    const updatedQuestionsWithNum = updatedQuestions.map((question, i) => ({
      ...question,
      question_num: i + 1,
    }));
    
    // setUserQuestions 함수를 사용하여 상위 컴포넌트의 userQuestions 상태를 업데이트
    setUserQuestions(updatedQuestionsWithNum);
    // 현재 편집 중인 질문이 있을 경우 편집 상태 종료
    setEditingIndex(null);
  };

  const handleClick = () => {
    setCreatingQuestion((prev) => !prev);
    setEditingIndex(null);
  };

  const handleClickOutside = (event) => {
    const inputElement = inputRef.current?.querySelector('input');

    if (
      inputElement &&
      inputElement.value.trim() === '' &&
      !inputRef.current.contains(event.target) &&
      (creatingQuestion || editingIndex !== null)
    ) {
      setCreatingQuestion(false);
      setEditingIndex(null);
    }
  };

  const handleSubmit = () => {
    axios.post(
      '/surveys/create/details/${surveyId}',
      { userQuestions },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((response) => {
        // 서버 응답 확인
        console.log('백엔드 응답:', response.data);
  
        // userQuestions 초기화
        setUserQuestions([]);
  
        // 다음 페이지로 이동
        // navigate('/qr');
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [creatingQuestion, editingIndex]);

  console.log('userQuestions:', userQuestions); 

  return (
    <div className="flex-1 p-4 mt-20">
      <div className="flex justify-center">
      <BiSolidQuoteAltLeft className="text-main_color" />
        <h2 className="text-2xl font-semibold text-main_color mb-4 px-2">{topic}</h2>
        <BiSolidQuoteAltRight className="text-main_color" />
      </div>
      <p className="text-center text-sm mb-7">{description}</p>

      {userQuestions.map((userQuestion, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <EditQuestion
            onCancel={handleClick}
            onEditQuestion={(updatedQuestion) => handleUpdateQuestion(updatedQuestion, index)}
            onCopyEditQuestion={(copiedQuestion) => 
              handleCopyEditQuestion(copiedQuestion, index)
            }       
            onRemoveQuestion={() => handleRemoveQuestion(index)}     
            initialQuestion={userQuestion}
            userQuestions={userQuestions}
            setUserQuestions={setUserQuestions}
          />
          ) : (
            <QuestionCard
              question={userQuestion.question}
              question_num={userQuestion.question_num}
              question_type={userQuestion.question_type}
              answer={userQuestion.answer}
              onClick={() => handleEditQuestion(index)}
              isEditing={editingIndex !== null}
            />
          )}
        </div>
      ))}
      <div className="mt-4 flex" ref={inputRef}>
        {creatingQuestion ? (
          <CreateQuestion 
            onCancel={handleClick} 
            onAddQuestion={handleAddQuestion} 
            onCopyCreateQuestion={handleCopyCreateQuestion}/>
        ) : (
          <div className="flex items-center w-full">
            <button className="text-main_color pr-2 font-bold p-2 mb-4">
                <AddButtonIcon />
            </button>
            <div
                onClick={handleClick}
                className="flex-grow p-2 mb-4 bg-question_card_bg rounded text-sub_text_color cursor-pointer"
            >
                문항을 선택해 주세요.
            </div>
        </div>
        )}
      </div>
      <div className='text-right mt-10'>
        <button 
          className='px-9 py-1 rounded-xl border border-sub_text_color_4 text-sub_text_color_4'
          onClick={handleSubmit}
          >
          다음
        </button>
    </div>
    </div>
  );
};

export default UserQuestions;
