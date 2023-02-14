import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface PopupProps{
    currentPlayer: Player | null;
    playersNames: String[];
    handleRestart: ()=> void;
}

const Popup: FC<PopupProps> = ({currentPlayer, playersNames, handleRestart}) => {
    return (
    <div className="popup">
        <div className="popupBox">
            <h2 className="popupTitle">{currentPlayer?.color === Colors.WHITE ? playersNames[0]: playersNames[1]} has won the game</h2>
            <button className="popupClose" onClick={handleRestart}>Restart Game</button>
        </div>
    </div>


    );
};

export default Popup;