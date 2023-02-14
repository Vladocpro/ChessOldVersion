import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/bb.png"
import whiteLogo from "../../assets/wb.png"

export class Bishop extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.Bishop;
    }

    getAvailableCells() {
        let cellsToMove : Cell[] = [];
        let attackingCellsToMove : Cell[] = [];
        this.cell.diagonal(cellsToMove, attackingCellsToMove);
        this.cellsToMove = cellsToMove;
        this.attackingCellsToMove = attackingCellsToMove;
    }

    // canMove(target:Cell) : boolean {
    //     if(!super.canMove(target)) return false;
    //     if(this.cell.isEmptyDiagonal(target)) return true
    //     return false;
    // }
}