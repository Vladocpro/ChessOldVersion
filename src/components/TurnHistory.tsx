import React, {FC, useState} from 'react';
import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Figure} from "../models/figures/Figure";
import {Cell} from "../models/Cell";
import {MoveHist} from "../models/MoveHist";
import "../App.css"
import {restart} from "../lib/boardLogic";
import {setTimerPopup, setWinningPopup} from "../redux/slices/globalSlice";
import {useDispatch} from "react-redux";
interface TurnHistoryProps {
    moveHist:MoveHist[] | undefined;
}
const restartGameIcon = require("../assets/refresh-arrow.png");
const timer = require("../assets/timer.png");
const TurnHistory: FC<TurnHistoryProps> = ({moveHist}) => {
    // const moveHist:MoveHist[] =[];
       const dispatch = useDispatch()

    return (
        <div className="historyMainBlock">
            <div className="turnHistoryLabel">Chess Moves</div>
            <hr className="hrTurnHistory"/>
            <div className="movesContainer">
                {moveHist?.map((move, index) =>
                <div key={move.turnCounter} className="movesRow" style={{ borderRadius: index > 13 && moveHist.length -1 === index ? "0 0 0 6px" : ""}}>
                    <span className="historySpan">{move.turnCounter}</span>
                    <div className="historyContainer">
                        {move.figure1?.logo && <img className="historyIcon" src={move.figure1.logo} alt=""/>}
                        <span className="historySpan">{move.whiteMove}</span>
                    </div>
                    <div className="historyContainer">
                        {move.figure2?.logo && <img className="historyIcon" src={move.figure2.logo} alt=""/>}
                        <span className="historySpan">{move.blackMove}</span>
                    </div>
                </div>
                )}
            </div>
           <div className="controlButtons">
              <div style={{cursor: "pointer", display: "flex", alignItems: "center"}} onClick={() => dispatch(setTimerPopup(true))}>
                 <img src={timer} style={{height: "24px", marginRight: "4px"}} alt=""/>
                 <span>Set Time</span>
              </div>
              <div style={{cursor: "pointer", display: "flex", alignItems: "center"}} onClick={restart}>
                 <img src={restartGameIcon} style={{height: "24px", marginRight: "4px"}} alt=""/>
                 <span>Restart Game</span>
              </div>
           </div>
        </div>
    );
};

export default TurnHistory;
