import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import {Figure} from "../models/figures/Figure";
const ub = require("../assets/ub.png");
const uw = require("../assets/uw.png");
interface NameFieldProps {
    color: Colors;
    currentPlayer : Player | null;
    lostBlackFigures : Figure[];
    lostWhiteFigures : Figure[];
    name: String;
}
const NameField: FC<NameFieldProps> = ({color, lostBlackFigures,lostWhiteFigures,name})  => {
    // window.localStorage.clear();
    // if(window.localStorage.getItem("name1"))  window.localStorage.setItem("name2" , `${name}`);
    // else   window.localStorage.setItem("name1" , `${name}`);
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
                    <span className="nameSpan">{name}</span>
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