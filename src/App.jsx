import { useState } from "react";
import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);

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
        data.results.map((result, index) => {
          return {
            id: index + 1,
            question: result.question,
            answer: result.correct_answer,
            incorrect_answers: result.incorrect_answers,
          };
        })
      );
      console.log(questions);
    }
    requestQuiz();
    console.log(questions);
  }

  return (
    <div className="container">
      <img className="blob-top" src={blobsTop} />
      <img className="blob-bottom" src={blobsBottom} />
      {start ? (
        <h1>test</h1>
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
