import React, {FC, useEffect, useRef, useState} from 'react';
import {Colors} from "../models/Colors";
import Popup from "./Popup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import { setShowPopup} from "../redux/slices/globalSlice";
import {restart} from "../logic/boardLogic";
import {decrementBlackTime, decrementWhiteTime} from "../redux/slices/timerSlice";


const Timer  = () => {
    const {blackTime, whiteTime} = useSelector((state: RootState) => state.timer)
    const timer = useRef<null | ReturnType<typeof setInterval>>()
    const players = useSelector((state: RootState) => state.global.players)
    const popup = useSelector((state: RootState) => state.global.popup)
    const dispatch = useDispatch()

    useEffect(() => {
        //     // if something goes wrong after checkmate unslash this
        if(whiteTime > 0 && blackTime > 0) startTimer(true);
            if(!popup.showPopup) startTimer(true);
        // else startTimer(false)
    }, [players.currentPlayer, popup.showPopup])

    useEffect(() => {
        if(whiteTime <= 0 || blackTime <= 0) startTimer(false);
        switchWaiter()
    },[whiteTime,blackTime])
    function startTimer(going : boolean) {
        if(timer.current) {
            clearInterval(timer.current)
        }
        if(!going)  return;
        const callback = players.currentPlayer.color === Colors.WHITE? decWhiteTime : decBlackTime
        timer.current = setInterval(callback, 1000)
    }
    function switchWaiter() {
        if(blackTime === 0 || whiteTime === 0) popupSwitch();
    }
    function decBlackTime() {
        dispatch(decrementBlackTime())
    }
    function decWhiteTime() {
        dispatch(decrementWhiteTime())
    }

    const handleRestart = ()=> {
        dispatch(setShowPopup({showPopup:false}))
        restart();
        startTimer(true);
    }
    function popupSwitch() {
        // setPopup(!!popup)
        if(!popup.showPopup)  {
            dispatch(setShowPopup({showPopup:true, subtitle: "on Time"}))
        }
        else  dispatch(setShowPopup({showPopup:false}))

    }


    return (
            <div className="timer">
                <div  className="timerChildren">
                    {
                        blackTime % 60 >= 10 ?
                            <h2 className="timerSpan">{Math.floor(blackTime / 60)}:{blackTime % 60}</h2>
                         :
                            <h2 className="timerSpan">{Math.floor(blackTime / 60)}:0{blackTime % 60}</h2>
                    }
                </div>
                <button onClick={handleRestart} className="restartBtn">Restart Game</button>
                <div  className="timerChildren">
                    {
                        whiteTime % 60 >= 10 ?
                            <h2 className="timerSpan">{Math.floor(whiteTime / 60)}:{whiteTime % 60}</h2>
                            :
                            <h2 className="timerSpan">{Math.floor(whiteTime / 60)}:0{whiteTime % 60}</h2>
                    }

                </div>
            </div>
    );
};

export default Timer;
