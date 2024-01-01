import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParticipateCard from '../components/participate/ParticipateCard';
import CheckIcon from '../components/icons/CheckIcon';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

const Participate = () => {
  const [userQuestions, setUserQuestions] = useState([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();
//렌더링될 때 accesstoken?
    
useEffect(() => {
  axios.get(
    '/data/ParticipatePost.json'
    //{ headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((response) => {
      const surveyData = response.data.data.surveyData;
      const flattenedUserQuestions = surveyData.userQuestions;

      setUserQuestions(flattenedUserQuestions);

      if (flattenedUserQuestions.length > 0) {
        setTopic(surveyData.topic);
        setDescription(surveyData.description);
        // 초기에 모든 질문에 대한 경고를 숨기도록 빈 배열로 초기화
        setShowWarning(Array(flattenedUserQuestions.length).fill(false));
      }
    })
    .catch((error) => {
      console.error('데이터를 불러오는 동안 에러 발생:', error);
    });
}, []);

    

    

  const handleCardSubmit = (questionNum, selectedAnswer) => {

    const question = userQuestions.find((q) => q.question_num === questionNum);

    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionNum]: selectedAnswer,
    }));

    // 사용자가 응답한 질문에 대한 경고를 숨기도록 업데이트
    setShowWarning((prevShowWarning) => {
      const updatedShowWarning = [...prevShowWarning];
      updatedShowWarning[questionNum] = question.required && !selectedAnswer;
      return updatedShowWarning;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const missingRequired = userQuestions.reduce((acc, question) => {
      if (question.required && !responses[question.question_num]) {
        acc[question.question_num] = true;
        alert("모든 필수 입력 항목을 작성해주세요.");
      }
      return acc;
    }, {});
  
    if (Object.keys(missingRequired).length > 0) {
      setShowWarning((prevShowWarning) => {
        const updatedShowWarning = prevShowWarning.map(
          (value, index) => missingRequired[index] || false
        );
        return updatedShowWarning;
      });
      return;
    }
  
    setSubmitting(true);
  
    const formattedResponses = userQuestions.map((question) => {
      const userAnswer = responses[question.question_num];
    
      return {
        surveyQuestionId: question.question_num,
        content: question.question_type === 'SHORT_ANSWER' ? userAnswer : null,
        answer_id: question.question_type === 'MULTIPLE_CHOICE' ? userAnswer : null,
      };
    });
    

    console.log('서버에 보낼 응답 데이터:', formattedResponses);

    axios
      .post('/surveys/answerSubmit/${surveyId}', 
        formattedResponses,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((response) => {
        const newPath = "./complete";
        navigate(newPath);
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };
  

  return (
    <div className="flex lg:mx-24">
      <div className="flex-1 text-center">
        <div className="flex-1 flex px-32 pt-10">
          <div className="text-main_color text-3xl mr-4 pt-1">
          <CheckIcon/>
          </div>
          <div>
            <h1 className="text-main_color text-3xl text-left">설문 참여</h1>
            <div className="my-5">주어진 질문에 응답해주세요. 다른 사람들에게 중요한 설문일 수 있으니 신중하게 응답 부탁드립니다!</div>
          </div>
        </div>
        <hr className="mx-32 mb-5"></hr>
        <div className="flex justify-center mt-16 mb-4 text-main_color">
          <BiSolidQuoteAltLeft />
          <h2 className="text-2xl text-center font-semibold  px-2">{topic}</h2>
          <BiSolidQuoteAltRight />
        </div>
        <p className="text-center text-sm mb-10">{description}</p>
        <form 
          onSubmit={handleSubmit}>
          <div className="flex-1 mx-80" >
            {userQuestions.map((question, index) => (
              <ParticipateCard
                key={index}
                question={question.question}
                question_num={question.question_num}
                question_type={question.question_type}
                answers={question.answers || []}
                required={question.required}
                response={responses[question.question_num]}
                showWarning={showWarning[question.question_num]}
                onCardSubmit={(questionNum, selectedAnswer) => handleCardSubmit(questionNum, selectedAnswer)}
              />
            ))}
          </div>
          <div className='mx-32 text-right'>
            <button
              type="submit"
              className="px-7 py-2 mt-24 mb-60 bg-sub_text_color_4 text-white rounded-xl"
            >
              응답 제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Participate;