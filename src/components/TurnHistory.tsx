import React, {FC, useState} from 'react';
import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Figure} from "../models/figures/Figure";
import {Cell} from "../models/Cell";
import {useDispatch, useSelector} from "react-redux";
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
            <div className="movesContainer" style={{overflowY: moveHist.length > 18 ? "scroll" : "hidden" }}>
                {moveHist.map(move =>
                <div key={move.turnCounter} className="movesRow">
                    <span>{move.turnCounter}</span>
                    <div>
                        {move.figure1?.logo && <img className="historyIcon" src={move.figure1.logo} alt=""/>}
                        <span>{move.whiteMove}</span>
                    </div>
                    <div>
                        {move.figure2?.logo && <img className="historyIcon" src={move.figure2.logo} alt=""/>}
                        <span>{move.blackMove}</span>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default TurnHistory;