import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface PopupProps{
    currentPlayer: Player | null;
    playersNames: String[];
    handleRestart: ()=> void;
    setPopup: (bool : boolean)=>void;
    subTitle: string;
}

const Popup: FC<PopupProps> = ({currentPlayer, playersNames, handleRestart, setPopup, subTitle}) => {
    return (
    <div className="popup">
        <div className="popupBox">
            <div className="popupHeader">
                <h2 className="popupTitle">{currentPlayer?.color === Colors.WHITE ? playersNames[0]: playersNames[1]} Won!</h2>
                <h2 className="popupSubTitle">{subTitle}</h2>
            </div>
            <button className="popupClose" onClick={() => {
                handleRestart();
                setPopup(false);
            }}>Restart Game</button>
        </div>
    </div>


    );
};

export default Popup;