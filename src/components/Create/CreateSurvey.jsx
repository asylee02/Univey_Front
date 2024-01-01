import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "./CustomDatePicker";

const CreateSurvey = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [targetRespondents, setTargetRespondents] = useState("");
  const [validationStatus, setValidationStatus] = useState([
    true, // Topic
    true, // Description
    true, // Category
    true, // Age
    true, // Gender
    true, // Deadline
  ]);

  const [deadlineIsRequired, setDeadlineIsRequired] = useState(false);
  const [initialSubmission, setInitialSubmission] = useState(false);
  const [surveyId, setSurveyId] = useState(null);

  const handleValidation = (index, value) => {
    const newValidationStatus = [...validationStatus];
    newValidationStatus[index] = !!value;
    setValidationStatus(newValidationStatus);
  };

  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setInitialSubmission(true);

    // Validate the form
    const newValidationStatus = [
      !!topic,
      !!description,
      !!category,
      !!age,
      !!gender,
      !!deadline,
    ];

    setValidationStatus(newValidationStatus);

    const isDeadlineRequired = !newValidationStatus[5];
    setDeadlineIsRequired(isDeadlineRequired);

    // 모두 valid
    if (newValidationStatus.every((status) => status)) {
      // JSON data creation
      const surveyData = {
        topic,
        description,
        category,
        age,
        gender,
        deadline,
        targetRespondents,
      };
      console.log(surveyData);

      axios.post(
        '/surveys/create',
        surveyData, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((response) => {
        const newSurveyId = response.data.surveyId;
        setSurveyId(newSurveyId);
        // 성공적으로 제출되었을 때 페이지 이동
        const newPath = "./detail";
        navigate(newPath);
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
    } else {
      alert("모든 필수 입력 항목을 작성해주세요.");
    }
  };

  return (
    <div className="flex flex-col mx-4 lg:mx-72 mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <label className="flex flex-col space-y-2 text-xl font-semibold text-main_color mb-5">
        <span className="flex items-center">
          주제 입력
          <span className="text-red-500 ml-1" >*</span>
        </span>
        </label>
        <input
          className={`pb-2 ${
            !validationStatus[0]
              ? "border-2 rounded mb-2 border-red-400 pt-2 pl-1"
              : "border-b-2 mb-5 border-survey_border_color"
          } focus:outline-none`}
          type="text"
          placeholder="설문 조사의 주제를 입력해주세요." 
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            handleValidation(0, e.target.value);
          }}
        />

        {!validationStatus[0] && (
          <span className="text-red-400 text-sm">필수 항목을 입력해주세요.</span>
        )}

        <label className="flex flex-col space-y-2 text-xl font-semibold text-main_color mt-5 mb-5">
        <span className="flex items-center">
          상세 설명
          <span className="text-red-500 ml-1" >*</span>
        </span>
        </label>
        <input
          className={`pb-2 ${
            !validationStatus[1]
              ? "border-2 rounded mb-2 border-red-400 pt-2 pl-1"
              : "border-b-2 mb-5 border-survey_border_color"
          } focus:outline-none`}
          type="text"
          placeholder="설문 조사에 관한 상세 설명을 작성해주세요. (50자 내)"
          maxLength={50}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            handleValidation(1, e.target.value);
          }}
        />
        {!validationStatus[1] && (
          <span className="text-red-400 text-sm">필수 항목을 입력해주세요.</span>
        )}

        <label className="flex flex-col space-y-2 text-xl font-semibold text-main_color mt-5 mb-6">
        <span className="flex items-center">
          카테고리
          <span className="text-red-500 ml-1" >*</span>
        </span>
        </label>
        <div className="flex space-x-2 mb-3">
        <button
          type="button"
          className={`p-2 w-20 h-10 border-2 border-survey_border_color flex items-center justify-center ${
            category === "education"
              ? "bg-text_color text-white"
              : "bg-white text-text_color"
          } rounded-full hover:bg-text_color hover:text-white`}
          onClick={() => {
            setCategory("education");
            handleValidation(2, "education");
          }}
        >
          교육
        </button>
          <button
            type="button"
            className={`p-2 w-20 h-10 border-2 border-survey_border_color flex items-center justify-center ${
              category === "IT"
                ? "bg-text_color text-white"
                : "bg-white text-text_color"
            } rounded-full hover:bg-text_color hover:text-white`}
            onClick={() => {
              setCategory("IT");
              handleValidation(2, "IT");
            }}
          >
            IT
          </button>
          <button
            type="button"
            className={`p-2 w-20 h-10 border-2 border-survey_border_color flex items-center justify-center ${
              category === "economy"
                ? "bg-text_color text-white"
                : "bg-white text-text_color"
            } rounded-full hover:bg-text_color hover:text-white`}
            onClick={() => {
              setCategory("economy");
              handleValidation(2, "economy");
            }}
          >
            경제
          </button>
          <button
            type="button"
            className={`p-2 w-20 h-10 border-2 border-survey_border_color flex items-center justify-center  ${
              category === "society"
                ? "bg-text_color text-white"
                : "bg-white text-text_color"
            } rounded-full hover:bg-text_color hover:text-white`}
            onClick={() => {
              setCategory("society");
              handleValidation(2, "society");
            }}
          >
            사회
          </button>
          <button
            type="button"
            className={`p-2 w-20 h-10 border-2 border-survey_border_color flex items-center justify-center  ${
              category === "culture"
                ? "bg-text_color text-white"
                : "bg-white text-text_color"
            } rounded-full hover:bg-text_color hover:text-white`}
            onClick={() => {
              setCategory("culture");
              handleValidation(2, "culture");
            }}
          >
            문화
          </button>
        </div>
        {!validationStatus[2] && (
          <span className="text-red-400 text-sm">필수 항목을 입력해주세요.</span>
        )}

        <div className="flex flex-row space-x-4 mt-2 mb-6">
          <div className="flex-1">
            <label className="flex flex-col space-y-2 mt-3 mb-6 text-xl font-semibold text-main_color">
            <span className="flex items-center">
              연령대
              <span className="text-red-500 ml-1" >*</span>
            </span>
            </label>
            <select
              className={`pb-2 w-full ${
                !validationStatus[3]
                  ? "border-2 rounded border-red-400 pt-2 pl-1"
                  : `border-b-2 mb-2 border-survey_border_color ${age ? 'text-text_color' : 'text-sub_text_color'}`
              } focus:outline-none`}
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                handleValidation(3, e.target.value);
              }}
            >
              <option className="text-text_color" value="" disabled>
                연령대 선택
              </option>
              <option className="text-text_color" value={"all"}>전체</option>
              <option className="text-text_color" value={"10"}>10-19</option>
              <option className="text-text_color" value={"20"}>20-29</option>
              <option className="text-text_color" value={"30"}>30-39</option>
            </select>
            {!validationStatus[3] && (
              <span className="text-red-400 text-sm">필수 항목을 입력해주세요.</span>
            )}
          </div>

          <div className="flex-1" style={{ marginLeft: "50px" }}>
          <label className="flex flex-col space-y-2 mt-3 mb-6 text-xl font-semibold text-main_color">
          <span className="flex items-center">
            성별
            <span className="text-red-500 ml-1" >*</span>
          </span>
            </label>
            <select
              className={`pb-2 w-full ${
                !validationStatus[4]
                  ? "border-2 rounded border-red-400 pt-2 pl-1"
                  : `border-b-2 mb-2 border-survey_border_color ${gender ? 'text-text_color' : 'text-sub_text_color'}`
              } focus:outline-none`}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                handleValidation(4, e.target.value);
              }}
            >
              <option className="text-text_color" value="" disabled>
                성별 선택
              </option>
              <option className="text-text_color" value="all">전체</option>
              <option className="text-text_color" value="male">남자</option>
              <option className="text-text_color" value="female">여자</option>
            </select>
            {!validationStatus[4] && (
              <span className="text-red-400 text-sm">필수 항목을 입력해주세요.</span>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-4 mb-5">
          <div className="flex-1">
            <label className="flex flex-col space-y-2 mt-3 mb-6 text-xl font-semibold text-main_color">
            <span className="flex items-center">
              마감 기한
              <span className="text-red-500 ml-1" >*</span>
            </span>
            </label>
            <CustomDatePicker
              selectedDate={deadline}
              handleChange={(date) => {
                setDeadline(date);
                handleValidation(5, !!date);
                setDeadlineIsRequired(!date);
              }}
              isRequired={deadlineIsRequired}
              validationStatus={validationStatus[5]}
              handleValidation={handleValidation}
            />
            {deadlineIsRequired && !deadline && (
              <span className="text-red-400 text-sm block">필수 항목을 입력해주세요.</span>
            )}
          </div>

          <div className="flex-1" style={{ marginLeft: "50px" }}>
            <label className="flex flex-col space-y-2 mt-3 mb-6 text-xl font-semibold text-main_color">
              목표 응답자 수
            </label>
            <input
              className="pb-2 w-full border-b-2 border-survey_border_color focus:outline-none mb-3 text-sm"
              type="number"
              value={targetRespondents}
              onChange={(e) => setTargetRespondents(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="self-end px-7 py-2 mt-12 mb-60 bg-sub_text_color_4 text-white rounded-2xl "
        >
          설문 작성
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;