import React, { useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import TurnHistory from "./components/TurnHistory";

function App () {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [playersNames, setPlayersNames] = useState<String[]>(["Yourself","Vlad"]);

  useEffect(()=> {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])



    function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
       const cells = newBoard.getCells();
       // reset blockingCells
       for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
             cells[i][j].setBlockingKing(Colors.BLACK, false);
             cells[i][j].setBlockingKing(Colors.WHITE, false);
             if(cells[i][j].figure) { // @ts-ignore
                cells[i][j].figure.cellsToMove = [];
             }
          }
       }
    setBoard(newBoard);
       swapPlayer();
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }


  return (
    <div className='app'>
        <Timer
            color={Colors.BLACK}
            restart={restart}
            currentPlayer={currentPlayer}
            playersNames={playersNames}
        />
      <BoardComponent
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      swapPlayer={swapPlayer}
      lostBlackFigures={board.lostBlackFigures}
      lostWhiteFigures={board.lostWhiteFigures}
      playersNames={playersNames}
      handleRestart={restart}
      />
      <TurnHistory
          moveHist={board.moveHist}
      />
    </div>
  );
}

export default App;
