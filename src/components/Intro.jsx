const Intro = () => {
  return (
    <div className="intro">
      <h1>Quizzical</h1>
      <p>Press start to begin the quiz!</p>
      <button className="btn intro__button" onClick={startGame}>
        Start quiz
      </button>
    </div>
  );
};

export default Intro;
