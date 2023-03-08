import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setShowPopup} from "../redux/slices/globalSlice";
import {restart} from "../logic/boardLogic";

interface PopupProps{
    subTitle: string;
}

const Popup: FC<PopupProps> = ({ subTitle}) => {
    const players = useSelector((state: RootState) => state.global.players)
    const dispatch = useDispatch()

    return (
    <div className="popup">
        <div className="popupBox">
            <div className="popupHeader">
                <h2 className="popupTitle">{players.currentPlayer.name} Won!</h2>
                <h2 className="popupSubTitle">{subTitle}</h2>
            </div>
            <button className="popupClose" onClick={() => {
                restart();
                dispatch(setShowPopup(false));
            }}>Restart Game</button>
        </div>
    </div>


    );
};

export default Popup;