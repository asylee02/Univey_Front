import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserQuestions from '../components/create_detail/UserQuestions';
import RecommendedQuestions from '../components/create_detail/RecommendedQuestions';

const CreateDetail = () => {
  const [userQuestions, setUserQuestions] = useState([]);
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    axios.get(
      '/data/Mock.json',
      { headers: { Authorization: `Bearer ${accessToken}` } }
      ) // /surveys/create/details/${surveyId}
      .then((response) => {
        const surveyData = response.data.surveyData;

        if (surveyData.length > 0) {
          setTopic(surveyData[0].topic);
          setDescription(surveyData[0].description);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('/data/recommend.json',
    { headers: { Authorization: `Bearer ${accessToken}` } }
    )  //post('/chat-gpt/question') 
      .then((response) => {
        const recommendedQuestions = response.data.recommendedQuestions;
        //response.data.recommendedQuestions -> response.data
        const flattenedRecommendedQuestions = recommendedQuestions.map(recommendedQuestion => ({
          question_num: recommendedQuestion[0],
          question: recommendedQuestion[1],
          question_type: 'multipleChoice', 
          isRequired: true,
          answer: recommendedQuestion.slice(2),  
        }));

        setRecommendedQuestions(flattenedRecommendedQuestions);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleAddQuestion = (recommendedQuestion) => {
    // 추천질문에서 추출
    const { question, question_type, isRequired, answer } = recommendedQuestion;

    const newUserQuestion = {
      question_num: userQuestions.length + 1,
      question,
      question_type,
      isRequired,
      answer,
    };

    setUserQuestions((prevUserQuestions) => [...prevUserQuestions, newUserQuestion]);
  };

  const handleAddAllQuestions = () => {
    // 전체선택
    setUserQuestions((prevUserQuestions) => [
      ...prevUserQuestions,
      ...recommendedQuestions.map((recommendedQuestion, index) => ({
        ...recommendedQuestion,
        question_num: prevUserQuestions.length + 1 + index,
      })),
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...userQuestions];
    updatedQuestions.splice(index, 1);
    setUserQuestions(updatedQuestions);
  };

  return (
    <div className="flex items-stretch lg:mx-28">
      <div className="flex-1">
        <UserQuestions 
          userQuestions={userQuestions}
          setUserQuestions={setUserQuestions} 
          onRemoveQuestion={handleRemoveQuestion}
          topic={topic} 
          description={description} 
          onAddQuestion={handleAddQuestion}
        />
      </div>
      <div className="border-l border-main_color m-10"></div>
      <div className="flex-1">
        <RecommendedQuestions
          recommendedQuestions={recommendedQuestions}
          onAddQuestion={handleAddQuestion}
          onAddAllQuestions={handleAddAllQuestions}
        />
      </div>
    </div>
  );
};

export default CreateDetail;
