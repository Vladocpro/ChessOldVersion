import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";

export class MoveHist {
    turnCounter:number = 1;
    whiteMove:String = "";
    blackMove:String = "";
    figure1: Figure | null;
    figure2: Figure | null;


    constructor(turnCounter: number, whiteMove: String, blackMove: String, figure1: Figure | null, figure2: Figure | null) {
        this.turnCounter = turnCounter;
        this.whiteMove = whiteMove;
        this.blackMove = blackMove;
        this.figure1 = figure1;
        this.figure2 = figure2;
    }
}