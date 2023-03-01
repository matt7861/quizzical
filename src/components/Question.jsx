import { useEffect, useMemo } from "react";

const Question = ({
  question,
  incorrect_answers,
  answer,
  user_answer,
  attemptAnswer,
  id,
  showAnswers,
  playing,
}) => {
  // useEffect to re-render the answer buttons when the playing or showAnswers props change
  useEffect(() => {
    renderButtons();
  }, [playing, showAnswers]);

  // useMemo to memoize the answerButtons array, which only changes when incorrect_answers or answer props change
  const answerButtons = useMemo(() => {
    return generateAnswerButtons();
  }, [incorrect_answers, answer]);

  // Shuffle array using Fisher-Yates algorithm
  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  // Function to generate answer buttons array
  function generateAnswerButtons() {
    const buttons = [];
    for (let i = 0; i < incorrect_answers.length; i++) {
      buttons.push(incorrect_answers[i]);
    }
    buttons.push(answer);
    shuffleArray(buttons);

    return buttons;
  }

  // Function to highlight the user's answer and the correct answer with different colors
  function highlightButtonAnswers(user_answer, correct_answer, btnText) {
    if (!showAnswers) {
      if (user_answer === btnText) {
        return "user-attempt";
      }
    } else {
      if (user_answer === btnText) {
        return "user-answer";
      } else if (correct_answer === btnText) {
        return "correct-answer";
      }
    }
  }

  // Function to render the answer buttons with highlighting
  function renderButtons() {
    const buttons = answerButtons.map((btn, index) => {
      return (
        <button
          className={`${highlightButtonAnswers(
            user_answer,
            answer,
            btn
          )} answer-btn`}
          onClick={(e) => attemptAnswer(id, e)}
          key={index}
        >
          {btn}
        </button>
      );
    });

    return buttons;
  }

  // Render the question and the answer buttons
  return (
    <div className="question">
      <p className="question__text">{question}</p>
      {renderButtons()}
    </div>
  );
};

export default Question;
