import { useState } from "react";
import { uid } from "uid"; // import uid function to generate unique ID
import he from "he"; // import the he packages to fix the encoding problem
import Question from "./components/Question";
import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";
import "./App.css";

function App() {
  const [start, setStart] = useState(false); // state to track if the quiz has started
  const [playing, setPlaying] = useState(false); // state to track if the user is currently playing the quiz
  const [questions, setQuestions] = useState([]); // state to store the quiz questions
  const [showAnswers, setShowAnswers] = useState(false); // state to track if the answers should be shown
  const [correctAnswerScore, setCorrectAnswerScore] = useState(0); // state to store the number of correct answers

  function startGame() {
    setStart(true); // set the quiz to started
    newGame(); // start a new game
  }

  async function resetGame() {
    setPlaying(true); // set playing to true to start a new game
    setShowAnswers(false); // hide the answers
    setCorrectAnswerScore(0); // reset the score
    await newGame(); // start a new game
  }

  async function newGame() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
    );
    const data = await response.json();

    setQuestions(
      data.results.map((result) => {
        return {
          id: uid(), // generate a unique ID for the question
          question: he.decode(result.question),
          answer: he.decode(result.correct_answer),
          incorrect_answers: result.incorrect_answers,
          user_answer: "", // initialize the user's answer to an empty string
        };
      })
    );
  }

  function renderQuestions() {
    return questions.map((question, index) => (
      <Question
        key={index} // set the key to the question's index in the array
        id={question.id}
        attemptAnswer={attemptAnswer}
        showAnswers={showAnswers}
        playing={playing}
        {...question} // pass in all the properties of the question object as props to the Question component
      />
    ));
  }

  function attemptAnswer(id, e) {
    const selectedAnswer = e.currentTarget.textContent; // get the text content of the selected answer button
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === id) {
          return { ...question, user_answer: selectedAnswer }; // update the user's answer for the selected question
        } else {
          return question;
        }
      });
    });
  }

  function checkAnswers() {
    setShowAnswers(true); // show the answers
    let score = 0;
    for (let qs of questions) {
      if (qs.user_answer === qs.answer) {
        // if the user's answer matches the correct answer, increment the score
        score++;
      }
    }
    setPlaying(false); // set playing to false to indicate that the quiz is over
    return setCorrectAnswerScore(score); // update the correct answer score
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
              <div className="results">
                <p className="results__text">
                  You scored {correctAnswerScore}/5 correct answers
                </p>
                <button className="btn game-btn" onClick={resetGame}>
                  Play again
                </button>
              </div>
            ) : (
              <button className="btn game-btn" onClick={checkAnswers}>
                Check answers
              </button>
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
