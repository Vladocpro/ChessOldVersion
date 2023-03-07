import React, {FC, useEffect, useRef, useState} from 'react';
import {Colors} from "../models/Colors";
import Popup from "./Popup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setShowPopup} from "../redux/slices/globalSlice";

interface TimerProps {
    restart: () => void;
}

const Timer: FC<TimerProps> = ({restart}) => {
    const[blackTime, setBlackTime] = useState<number>(899);
    const[whiteTime, setWhiteTime] = useState<number>(899);
    const timer = useRef<null | ReturnType<typeof setInterval>>()
    const players = useSelector((state: RootState) => state.global.players)
    const popup = useSelector((state: RootState) => state.global.showPopup)
    const dispatch = useDispatch()

    useEffect(() => {
        // if(whiteTime > 0 && blackTime > 0)    // if something goes wrong after checkmate unslash this
            startTimer(true);
        // else startTimer(false)
    }, [players.currentPlayer])

    useEffect(() => {
        if(whiteTime <= 0 || blackTime <= 0) startTimer(false);
        switchWaiter()
    },[whiteTime,blackTime])
    function startTimer(going : boolean) {
        if(timer.current) {
            clearInterval(timer.current)
        }
        if(!going)  return;
        const callback = players.currentPlayer.color === Colors.WHITE? decrementWhiteTime : decrementBlackTime
        timer.current = setInterval(callback, 1000)
    }
    function switchWaiter() {
        if(blackTime === 0 || whiteTime === 0) popupSwitch();
    }
    function decrementBlackTime() {
        setBlackTime(prev =>  prev - 1);

    }
    function decrementWhiteTime() {
         setWhiteTime(prev => prev - 1);
    }

    const handleRestart = ()=> {
        setBlackTime(899);
        setWhiteTime(899);
        dispatch(setShowPopup(false))
        restart();
        startTimer(true);
    }
    function popupSwitch() {
        // setPopup(!!popup)
        if(!popup)  {
            dispatch(setShowPopup(true))
        }
        else dispatch(setShowPopup(false))

    }


    return (
        <div>
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
            {popup &&
                <Popup
                    handleRestart={handleRestart}
                    subTitle="on Time"
                />
            }
        </div>
    );
};

export default Timer;