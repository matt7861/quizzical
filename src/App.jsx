import { useState } from "react";
import { uid } from "uid";
import Question from "./components/Question";
import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  function startGame() {
    setStart(true);
    newGame();
  }
  function newGame() {
    async function requestQuiz() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
      );
      const data = await response.json();

      setQuestions(
        data.results.map((result) => {
          return {
            id: uid(),
            question: result.question,
            answer: result.correct_answer,
            incorrect_answers: result.incorrect_answers,
            user_answer: "",
          };
        })
      );
    }
    requestQuiz();
  }

  function renderQuestions() {
    return questions.map((question, index) => (
      <Question
        key={index}
        id={question.id}
        attemptAnswer={attemptAnswer}
        showAnswers={showAnswers}
        start={start}
        {...question}
      />
    ));
  }

  function attemptAnswer(id, e) {
    const selectedAnswer = e.currentTarget.textContent;

    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === id
          ? { ...question, user_answer: selectedAnswer }
          : question;
      });
    });
  }

  function checkAnswers(questions) {
    setShowAnswers(true);
  }

  return (
    <div className="container">
      <img className="blob-top" src={blobsTop} />
      <img className="blob-bottom" src={blobsBottom} />
      {start ? (
        <div className="question-container">
          {renderQuestions()}
          <button onClick={checkAnswers}>Check answers</button>
        </div>
      ) : (
        <div className="intro">
          <h1>Quizzical</h1>
          <p>Press start to begin the quiz!</p>
          <button className="btn intro__button" onClick={startGame}>
            Start quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
