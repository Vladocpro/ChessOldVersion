import React, {useEffect} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import Timer from "./components/Timer";
import TurnHistory from "./components/TurnHistory";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {restart} from "./lib/boardLogic";

function App () {
  const board = useSelector((state :RootState) => state.board.board);

  useEffect(()=> {
    restart();
  }, [])




  return (
    <div className='app'>
      <BoardComponent />
      <TurnHistory
          moveHist={board?.moveHist}
      />
    </div>
  );
}

export default App;
