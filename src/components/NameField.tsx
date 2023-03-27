import React, {FC} from 'react';
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import Timer from "./Timer";

const user = require("../assets/user1.png");
interface NameFieldProps {
    color: Colors;
}
const NameField: FC<NameFieldProps> = ({color})  => {
    const {players, lostBlackFigures, lostWhiteFigures} = useSelector((state :RootState) => state.global);

    return (
        <div style={{ marginBottom: "8px", marginTop: "8px"}}>
            <div className="nameFlex">

                <div style={{display: "flex", position: "relative", alignItems: "center"}}>
                   <img src={user} className="nameImg"  alt=""/>
                      <span className="nameSpan">{color === Colors.BLACK ? players.blackPlayer.name : players.whitePlayer.name}</span>
                      <Timer color={color === Colors.BLACK ? Colors.BLACK : Colors.WHITE}/>
                   {color === Colors.WHITE
                       ? <LostFigures figures={lostBlackFigures}/>
                       : <LostFigures figures={lostWhiteFigures}/>
                   }
                </div>

            </div>
        </div>
    );
};

export default NameField;
