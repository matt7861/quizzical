const Question = ({ question, incorrect_answers, answer, id }) => {
  function renderAnswerButtons() {
    const buttonArray = [];

    for (let i = 0; i < incorrect_answers.length; i++) {
      buttonArray.push(incorrect_answers[i]);
    }
    buttonArray.push(answer);
    shuffleArray(buttonArray);

    return buttonArray.map((btn, index) => {
      return <button key={index}>{btn}</button>;
    });
  }

  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  return (
    <div className="question">
      <p>{question}</p>
      {renderAnswerButtons()}
    </div>
  );
};

export default Question;
