import { useEffect } from "react";

const Question = ({
  question,
  incorrect_answers,
  answer,
  user_answer,
  attemptAnswer,
  id,
  showAnswers,
  start,
}) => {
  useEffect(() => {
    renderAnswerButtons();
  }, [start]);

  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  function renderAnswerButtons() {
    const buttonArray = [];

    for (let i = 0; i < incorrect_answers.length; i++) {
      buttonArray.push(incorrect_answers[i]);
    }
    buttonArray.push(answer);
    shuffleArray(buttonArray);

    return buttonArray.map((btn, index) => {
      return (
        <button
          className={highlightButtonAnswers(user_answer, answer, btn)}
          onClick={(e) => attemptAnswer(id, e)}
          key={index}
        >
          {btn}
        </button>
      );
    });
  }

  function highlightButtonAnswers(user_answer, correct_answer, btnText) {
    if (showAnswers) {
      if (user_answer === btnText) {
        return "user-answer";
      } else if (correct_answer === btnText) {
        return "correct-answer";
      }
    }
  }

  return (
    <div className="question">
      <p>{question}</p>
      {renderAnswerButtons()}
    </div>
  );
};

export default Question;
