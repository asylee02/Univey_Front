export const copyQuestion = (question, onCopyQuestion) => {
  // 복사된 질문 객체 생성
  const copiedQuestion = {
    question: question.question,
    questionType: question.questionType,
    isRequired: question.isRequired,
    answer: question.answers.filter((answer) => answer.trim() !== ""),
  };

  // 부모 컴포넌트로 복사된 질문 추가
  onCopyQuestion(copiedQuestion);
};
