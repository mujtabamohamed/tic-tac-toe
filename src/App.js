import Cell from "./components/Cell";
import { useEffect, useState } from "react";


function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", "",]);
  const[go, setGo] = useState("cross");
  const [winningMessage, setWinningMessage] = useState(null);

  const message = "It's now " + go + "'s go."

  function checkScore() {

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
      let circleWins = array.every(cell => cells[cell] === "circle");

      if(circleWins) {
        setWinningMessage("Circle Wins!");
        return;
      }
    });

    winningCombos.forEach(array => {
      let crossWins = array.every(cell => cells[cell] === "cross");
      if(crossWins) {
        setWinningMessage("Cross Wins!");
        return;
      }
    });

    if (cells.every(cell => cell !== "")) {
      setWinningMessage("It's a Draw!");
    }
  }

  useEffect(() => {
    checkScore();
  }, [cells] );


  function restartGame() {
    window.location.reload();
  }


  return (
    <div className="app">
    <p className="winning-message">{winningMessage || message}</p>
      <div className="gameboard">
        {cells.map((cell, index)=>
          <Cell 
            key = {index}
            id = {index}
            cell = {cell}
            go = {go}
            setGo = {setGo}
            cells = {cells}
            setCells = {setCells}
            winningMessage = {winningMessage}
          />
        )}
      </div>
      <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default App;
