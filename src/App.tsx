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
import {setBoard, switchCurrentPlayer} from "./redux/slices/globalSlice";
import {resetBlockingCells} from "./logic/boardLogic";

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
