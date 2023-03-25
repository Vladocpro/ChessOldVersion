import React, {FC} from 'react';
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
const ub = require("../assets/ub.png");
const uw = require("../assets/uw.png");
interface NameFieldProps {
    color: Colors;
}
const NameField: FC<NameFieldProps> = ({color})  => {
    const {players, lostBlackFigures, lostWhiteFigures} = useSelector((state :RootState) => state.global);

    return (
        <div style={{ marginBottom: "8px", marginTop: "8px"}}>
            <div className="nameFlex">
                {color === Colors.BLACK
                    ? <img src={ub} className="nameImg"  alt=""/>
                    : <img src={uw} className="nameImg"  alt=""/>
                }
                <div>
                    <span className="nameSpan">{color === Colors.BLACK ? players.blackPlayer.name : players.whitePlayer.name}</span>
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
