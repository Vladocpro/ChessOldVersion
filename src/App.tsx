import React, { useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import Timer from "./components/Timer";
import TurnHistory from "./components/TurnHistory";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {setBoard, switchCurrentPlayer} from "./redux/slices/globalSlice";

function App () {
  const {board, players} = useSelector((state :RootState) => state.global);
  const dispatch = useDispatch();

  useEffect(()=> {
    restart();
  }, [])

    function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    dispatch(setBoard(newBoard));
    dispatch(switchCurrentPlayer())
  }


  return (
    <div className='app'>
        <Timer
            restart={restart}
        />
      <BoardComponent
      lostBlackFigures={board.lostBlackFigures}
      lostWhiteFigures={board.lostWhiteFigures}
      handleRestart={restart}
      />
      <TurnHistory
          moveHist={board.moveHist}
      />
    </div>
  );
}

export default App;
