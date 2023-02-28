import { useEffect, useState } from "react";

const Question = ({
  question,
  incorrect_answers,
  answer,
  user_answer,
  attemptAnswer,
  id,
  showAnswers,
  questions,
  start,
}) => {
  useEffect(() => {
    generateAnswerButtons();
    renderButtons();
  }, [showAnswers]);

  useEffect(() => {
    renderButtons();
  }, [showAnswers]);

  const [buttonArray, setButtonArray] = useState(generateAnswerButtons());
  const [answerButtons, setAnswerButtons] = useState(null);

  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  function generateAnswerButtons() {
    const buttons = [];
    for (let i = 0; i < incorrect_answers.length; i++) {
      buttons.push(incorrect_answers[i]);
    }
    buttons.push(answer);
    shuffleArray(buttons);

    return buttons;
  }

  function renderButtons() {
    const answerButtons = buttonArray.map((btn, index) => {
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
    console.log(answerButtons);

    setAnswerButtons(answerButtons);
  }

  function highlightButtonAnswers(user_answer, correct_answer, btnText) {
    if (!showAnswers) return;

    if (user_answer === btnText) {
      return "user-answer";
    } else if (correct_answer === btnText) {
      return "correct-answer";
    }
  }

  return (
    <div className="question">
      <p>{question}</p>
      {answerButtons}
    </div>
  );
};

export default Question;
