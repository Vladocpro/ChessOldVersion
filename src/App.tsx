import React, { useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import TurnHistory from "./components/TurnHistory";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {setBoard} from "./redux/slices/boardSlices";

function App () {
  const board = useSelector((state :RootState) => state.global.board);
  // Player name integration !!!
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE, "Vlad"));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK, "Yourself"));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [playersNames, setPlayersNames] = useState<String[]>(["Yourself","Vlad"]);

  const dispatch = useDispatch();

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
    dispatch(setBoard(newBoard));
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
