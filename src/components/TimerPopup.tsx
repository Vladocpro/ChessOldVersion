import React, {useState} from 'react';
import {restart} from "../lib/boardLogic";
import {setTimerPopup, setWinningPopup} from "../redux/slices/globalSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setTimer} from "../redux/slices/timerSlice";

const arrowUp = require("../assets/arrowUp.png");
const arrowDown = require("../assets/arrowDown.png");

const TimerPopup = () => {

   const [blackTime, setBlackTime] = useState(15);
   const [whiteTime, setWhiteTime] = useState(15);
   const dispatch = useDispatch()


   return (
       <div className="popup">
          <div className="popupBox" style={{background: "#85A94E", height: "260px"}}>
             <span onClick={() =>  dispatch(setTimerPopup(false))} style={{position: "absolute", right: "14px", top: "8px", fontSize: "20px", fontWeight: "bold", cursor: "pointer"}}>X</span>
                <h2 className="popupTitle">Set Time</h2>
                <div style={{display: "inline-flex", alignItems: "center", margin: "5px 0"}}>
                   <h2 className="timerPopupBtn" style={{width: "90px"}}>Black</h2>
                   <h2 style={{fontSize: "25px"}}>{blackTime}</h2>
                   <div style={{marginLeft: "7px", display: "flex", flexDirection: "column"}}>
                      <img src={arrowUp} className="timerArrows" alt="" onClick={() =>  setBlackTime(prev => prev + 1)}/>
                      <img src={arrowDown} className="timerArrows" alt="" onClick={() =>  setBlackTime(prev => prev - 1)}/>
                   </div>
                </div>
                <div style={{display: "inline-flex", alignItems: "center", margin: "5px 0"}}>
                   <h2 className="timerPopupBtn" style={{width: "90px"}}>White</h2>
                   <h2 style={{fontSize: "25px"}}>{whiteTime}</h2>
                   <div style={{marginLeft: "7px", display: "flex", flexDirection: "column"}}>
                      <img src={arrowUp} className="timerArrows" alt="" onClick={() =>  setWhiteTime(prev => prev + 1)}/>
                      <img src={arrowDown} className="timerArrows" alt="" onClick={() =>  setWhiteTime(prev => prev - 1)}/>
                   </div>
                </div>
             <button className="popupClose" onClick={() => {
                restart();
                dispatch(setTimer({blackTime: blackTime * 60, whiteTime: whiteTime * 60}))
                dispatch(setTimerPopup(false));
             }}>Apply</button>
          </div>
       </div>
   );
};

export default TimerPopup;
