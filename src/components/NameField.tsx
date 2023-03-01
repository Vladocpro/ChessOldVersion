import React, {FC} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import {Figure} from "../models/figures/Figure";
import ub from "../assets/ub.png";
import uw from "../assets/uw.png";
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
        <div style={{ paddingBottom: "8px", paddingTop: "8px"}}>
            <div className="nameFlex">
                {color === Colors.BLACK
                    ? <img src={ub} style={{width: "50px", height: "51px"}} alt=""/>
                    : <img src={uw} style={{width: "50px", height: "51px"}} alt=""/>
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