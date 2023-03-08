import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setShowPopup} from "../redux/slices/globalSlice";
import {restart} from "../logic/boardLogic";



const Popup = () => {
    const {players, popup} = useSelector((state: RootState) => state.global)

    const dispatch = useDispatch()

    return (
    <div className="popup">
        <div className="popupBox">
            <div className="popupHeader">
                <h2 className="popupTitle">{players.currentPlayer.name} Won!</h2>
                <h2 className="popupSubTitle">{popup.subtitle}</h2>
            </div>
            <button className="popupClose" onClick={() => {
                restart();
                dispatch(setShowPopup({showPopup: false}));
            }}>Restart Game</button>
        </div>
    </div>


    );
};

export default Popup;