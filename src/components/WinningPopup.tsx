import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setWinningPopup, winningPopupSubTitles} from "../redux/slices/globalSlice";
import {restart} from "../lib/boardLogic";
import {Colors} from "../models/Colors";


const WinningPopup = () => {
    const winningPopup = useSelector((state: RootState) => state.global.winningPopup)
    const dispatch = useDispatch()


    return (
    <div className="popup">
        <div className="popupBox">
            <div className="popupHeader">
                <h2 className="popupTitle">{winningPopup.winner?.name} Won!</h2>
                <h2 className="popupSubTitle">{winningPopup.subtitle}</h2>
            </div>
            <span className="popupClose" onClick={() => {
                restart();
                dispatch(setWinningPopup({showPopup: false}));
            }}>Restart Game</span>
        </div>
    </div>
    );
};

export default WinningPopup;
