import React, {FC, useState} from 'react';
import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Figure} from "../models/figures/Figure";
import {Cell} from "../models/Cell";
import {MoveHist} from "../models/MoveHist";
import "../App.css"
interface TurnHistoryProps {
    moveHist:MoveHist[];
}

const TurnHistory: FC<TurnHistoryProps> = ({moveHist}) => {
    // const moveHist:MoveHist[] =[];

    return (
        <div className="historyMainBlock">
            <div className="turnHistoryLabel">Chess Moves</div>
            <hr className="hrTurnHistory"/>
            <div className="movesContainer" style={{overflowY: moveHist.length > 14 ? "scroll" : "hidden" }}>
                {moveHist.map((move, index) =>
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
        </div>
    );
};

export default TurnHistory;