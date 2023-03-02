import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import Popup from "./Popup";
interface TimerProps {
    currentPlayer: Player | null;
    color : Colors;
    restart: () => void;
    playersNames: String[];
}

const Timer: FC<TimerProps> = ({currentPlayer, color,restart, playersNames}) => {
    const[blackTime, setBlackTime] = useState<number>(899);
    const[whiteTime, setWhiteTime] = useState<number>(899);
    const [popup, setPopup] = useState(false);
    const timer = useRef<null | ReturnType<typeof setInterval>>()

    useEffect(() => {
        // if(whiteTime > 0 && blackTime > 0)    // if something goes wrong after checkmate unslash this
            startTimer(true);
        // else startTimer(false)
    }, [currentPlayer])
    useEffect(() => {
        if(whiteTime <= 0 || blackTime <= 0) startTimer(false);
        switchWaiter()
    },[whiteTime,blackTime])
    function startTimer(going : boolean) {
        if(timer.current) {
            clearInterval(timer.current)
        }
        if(!going)  return;
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime
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
        setPopup(false);
        restart();
        startTimer(true);
    }
    function popupSwitch() {
        // setPopup(!!popup)
        if(!popup)  {
            setPopup(true);
        }
        else setPopup(false);
    }


    return (
        <div>
            <div className="timer">
                <div  className="timerChildren">
                    {(() => {
                        if (blackTime % 60 < 10) {
                            return (
                                <h2 className="timerSpan">{Math.floor(blackTime / 60)}:0{blackTime % 60}</h2>
                            )
                        } else if (blackTime % 60 >= 10) {
                            return (
                                <h2 className="timerSpan">{Math.floor(blackTime / 60)}:{blackTime % 60}</h2>
                            )
                        }
                    })()}
                </div>
                <button onClick={handleRestart} className="restartBtn">Restart Game</button>
                <div  className="timerChildren">
                    {(() => {
                        if (whiteTime % 60 < 10) {
                            return (
                                <h2  className="timerSpan">{Math.floor(whiteTime / 60)}:0{whiteTime % 60}</h2>
                            )
                        } else if (whiteTime % 60 >= 10) {
                            return (
                                <h2  className="timerSpan">{Math.floor(whiteTime / 60)}:{whiteTime % 60}</h2>
                            )
                        }
                    })()}

                </div>
            </div>
            {popup &&
                <Popup
                    currentPlayer={currentPlayer}
                    playersNames={playersNames}
                    handleRestart={handleRestart}
                    setPopup={setPopup}
                />
            }
        </div>
    );
};

export default Timer;