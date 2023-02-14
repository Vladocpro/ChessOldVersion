import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/bn.png";
import whiteLogo from "../../assets/wn.png";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.Knight;
    }

    getAvailableCells() {
        let cellsToMove : Cell[] = [];
        if(this.cell.x + 1 < 8 && this.cell.y - 2 >= 0) {
            if(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 2).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 2)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 2));
        }
        if(this.cell.x + 2 < 8 && this.cell.y - 1 >= 0) {
            if(this.cell.board.getCell(this.cell.x + 2,this.cell.y - 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 2,this.cell.y - 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 2,this.cell.y - 1));
        }
        if(this.cell.x + 2 < 8 && this.cell.y + 1 < 8) {
            if(this.cell.board.getCell(this.cell.x + 2,this.cell.y + 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 2,this.cell.y + 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 2,this.cell.y + 1));
        }
        if(this.cell.x + 1 < 8 && this.cell.y + 2 < 8) {
            if(this.cell.board.getCell(this.cell.x + 1,this.cell.y + 2).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y + 2)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 1,this.cell.y + 2));
        }
        if(this.cell.x - 1 >= 0 && this.cell.y + 2 < 8) {
            if(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 2).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 2)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 2));
        }
        if(this.cell.x - 2 >= 0 && this.cell.y + 1 < 8) {
            if(this.cell.board.getCell(this.cell.x - 2,this.cell.y + 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 2,this.cell.y + 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 2,this.cell.y + 1));
        }
        if(this.cell.x - 2 >= 0 && this.cell.y - 1 >= 0) {
            if(this.cell.board.getCell(this.cell.x - 2,this.cell.y - 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 2,this.cell.y - 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 2,this.cell.y - 1));
        }
        if(this.cell.x - 1 >= 0 && this.cell.y - 2 >= 0) {
            if(this.cell.board.getCell(this.cell.x - 1,this.cell.y - 2).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y - 2)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 1,this.cell.y - 2));
        }
        this.cellsToMove = cellsToMove;

    }

    // canMove(target:Cell) : boolean {
    //     if(!super.canMove(target)) return false;
    //     const dx = Math.abs(this.cell.x - target.x)
    //     const dy = Math.abs(this.cell.y - target.y)
    //     return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    // }

}