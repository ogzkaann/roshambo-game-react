import matchers from "@testing-library/jest-dom/matchers";
import { generate } from "@vue/compiler-core";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's Start");
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];
  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 2 && computerPoints <= 2) {
      if (
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock" ||
        comboMoves === "scissorspaper"
      ) {
        const updatedUserPoint = userPoints + 1;
        setUserPoints(updatedUserPoint);
        setTurnResult("user");
        if (updatedUserPoint === 3) {
          setGameOver(true);
          setResult("You Win");
        }
      }

      if (
        comboMoves === "paperscissors" ||
        comboMoves === "paperscissors" ||
        comboMoves === "rockpaper"
      ) {
        const updatedComputerPoint = computerPoints + 1;
        setComputerPoints(updatedComputerPoint);
        setTurnResult("computer");
        if (updatedComputerPoint === 3) {
          setGameOver(true);
          setResult("Computer Wins");
        }
      }

      if (
        comboMoves === "rockrock" ||
        comboMoves === "paperpaper" ||
        comboMoves === "scissorsscissors"
      ) {
        setTurnResult("draw");
      }
    }
  }, [userChoice, computerChoice]);

  const resultText = (turnResult) => {
    let responseText = [];
    if(turnResult === "user"){
      responseText = ["Easy Meat", "Blow-Off", "A Piece of Cake", "In the Bag"]
    } else if(turnResult === "computer"){
      responseText = ["Don't Quit Trying", "Never Say Die"]
    } else if(turnResult === "draw") {
        responseText = ["At Least You Tried", "Keep Trying"]
    }
    return <h1 className={turnResult}>{responseText[Math.floor(Math.random() * responseText.length)]}</h1>;
  };

  return (
    <div className="App">
      <h1 className="heading">Rock Paper Scissors</h1>

      <div className="score">
        <h1>You: {userPoints}</h1>
        <h1>Computer: {computerPoints}</h1>
      </div>

      <div className="choice">
        <div className="choice-user">
          <img className="user-hand" src={require(`../public/img/${userChoice}.png`)} />
        </div>
        <div className="choice-computer">
          <img className="computer-hand" src={require(`../public/img/${computerChoice}.png`)} />
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, index) => (
          <button
            className="button"
            key={index}
            onClick={() => handleOnClick(choice)}
            disabled={gameOver}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="turnResult">
        {!gameOver && resultText(turnResult)}
      </div>

      <div className="result">{gameOver && <h1 className={turnResult}>{result}</h1>}</div>

      <div className="button-div">
        {gameOver && (
          <button className="button btn-restart" onClick={() => reset()}>
            Restart Game?
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
