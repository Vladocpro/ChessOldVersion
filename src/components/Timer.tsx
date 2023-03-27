import React, {FC, useEffect, useRef} from 'react';
import {Colors} from "../models/Colors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setWinningPopup, winningPopupSubTitles} from "../redux/slices/globalSlice";
import {restart} from "../lib/boardLogic";
import {decrementBlackTime, decrementWhiteTime} from "../redux/slices/timerSlice";

interface TimerProps {
    color: Colors;
}

const Timer : FC<TimerProps>  = ({color}) => {
    const {blackTime, whiteTime} = useSelector((state: RootState) => state.timer)
    const timer = useRef<null | ReturnType<typeof setInterval>>()
    const players = useSelector((state: RootState) => state.global.players)
    const popup = useSelector((state: RootState) => state.global.winningPopup)
    const colorIsWhite = color === Colors.WHITE;
    const dispatch = useDispatch()

    useEffect(() => {
        if(whiteTime > 0 && blackTime > 0) startTimer(true);
        if(!popup.showPopup) startTimer(true);
        else startTimer(false)
    }, [players.currentPlayer, popup.showPopup])

    useEffect(() => {
        if(whiteTime <= 0 || blackTime <= 0) {
            startTimer(false);
            popupSwitch();
        }
        // switchWaiter()
    },[whiteTime,blackTime])
    function startTimer(going : boolean) {
        if(timer.current) {
            clearInterval(timer.current)
        }
        if(!going)  return;
        // debugger
        if(color === Colors.WHITE) {
            const callback = players.currentPlayer.color === Colors.WHITE ? decWhiteTime : decBlackTime
            timer.current = setInterval(callback, 1000)
        }
    }
    function decBlackTime() {
        dispatch(decrementBlackTime())
    }
    function decWhiteTime() {
        dispatch(decrementWhiteTime())
    }

    // const handleRestart = ()=> {
    //     dispatch(setWinningPopup({showPopup:false}))
    //     restart();
    //     startTimer(true);
    // }
    function popupSwitch() {
        if(!popup.showPopup)  {
            dispatch(setWinningPopup(
                {showPopup:true,
                    subtitle: winningPopupSubTitles.Time,
                    winner: players.currentPlayer.color === players.whitePlayer.color ? players.blackPlayer : players.whitePlayer}
                )
            )

        }
        else  dispatch(setWinningPopup({showPopup:false}))
    }


    return (
            <div className="timer" >
                {
                    !colorIsWhite ?
                        (
                            <div  className="timerChildren">
                                {
                                    blackTime % 60 >= 10 ?
                                        <h2 className="timerSpan">{Math.floor(blackTime / 60)}:{blackTime % 60}</h2>
                                        :
                                        <h2 className="timerSpan">{Math.floor(blackTime / 60)}:0{blackTime % 60}</h2>
                                }
                            </div>
                        ) :
                        (<div  className="timerChildren">
                            {
                                whiteTime % 60 >= 10 ?
                                    <h2 className="timerSpan">{Math.floor(whiteTime / 60)}:{whiteTime % 60}</h2>
                                    :
                                    <h2 className="timerSpan">{Math.floor(whiteTime / 60)}:0{whiteTime % 60}</h2>
                            }

                        </div>)
                }
            </div>
    );
};

export default Timer;
