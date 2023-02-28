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
  const [correctAnswerScore, setCorrectAnswerScore] = useState(0);

  function startGame() {
    setStart(true);
    setShowAnswers(false);
    setCorrectAnswerScore(0);
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
        questions={questions}
        {...question}
      />
    ));
  }

  function attemptAnswer(id, e) {
    const selectedAnswer = e.currentTarget.textContent;
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === id) {
          return { ...question, user_answer: selectedAnswer };
        } else {
          return question;
        }
      });
    });
  }

  function checkAnswers() {
    setShowAnswers(true);
    let score = 0;
    for (let qs of questions) {
      if (qs.user_answer === qs.answer) {
        score++;
      }
    }
    return setCorrectAnswerScore(score);
  }
  return (
    <div className="container">
      <img className="blob-top" src={blobsTop} />
      <img className="blob-bottom" src={blobsBottom} />
      {start ? (
        <div>
          <div className="question-container">
            {renderQuestions()}
            {showAnswers ? (
              <div>
                <h2>Your score is: {correctAnswerScore}</h2>
                <button onClick={startGame}>Play again</button>
              </div>
            ) : (
              <button onClick={checkAnswers}>Check answers</button>
            )}
          </div>
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
