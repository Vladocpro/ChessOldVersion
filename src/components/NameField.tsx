import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import {Figure} from "../models/figures/Figure";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
const ub = require("../assets/ub.png");
const uw = require("../assets/uw.png");
interface NameFieldProps {
    color: Colors;
    lostBlackFigures : Figure[];
    lostWhiteFigures : Figure[];
}
const NameField: FC<NameFieldProps> = ({color, lostBlackFigures,lostWhiteFigures})  => {
    const  players = useSelector((state :RootState) => state.global.players);

    let names = [];
    function pushNames() {
        if(names.length <= 2)
        names.push(name);
    }
    pushNames();
    return (
        <div style={{ marginBottom: "8px", marginTop: "8px"}}>
            <div className="nameFlex">
                {color === Colors.BLACK
                    ? <img src={ub} style={{width: "54px", height: "54px", borderRadius: "10px 0 0 10px"}} alt=""/>
                    : <img src={uw} style={{width: "54px", height: "54px", borderRadius: "10px 0 0 10px"}} alt=""/>
                }
                <div>
                    <span className="nameSpan">{Colors.BLACK ? players.blackPlayer.name : players.whitePlayer.name}</span>
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