import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/bk.png";
import whiteLogo from "../../assets/wk.png";

export class King extends Figure {


    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.King;
    }

    getAvailableCells() {
        let cellsToMove : Cell[] = [];

        if (this.cell.x + 1 < 8 && this.cell.y + 1 < 8) {
            if (this.cell.board.getCell(this.cell.x + 1, this.cell.y + 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1, this.cell.y + 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 1, this.cell.y + 1));
        }
        if (this.cell.x - 1 >= 0 && this.cell.y - 1 >= 0) {
            if (this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1)))
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1));
        }
        if(this.cell.x + 1 < 8 && this.cell.y - 1 >= 0) {
            if(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 1))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 1, this.cell.y - 1));
            }
        }
        if(this.cell.x - 1 >= 0 && this.cell.y + 1 < 8) {
            if(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 1))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 1, this.cell.y + 1));
            }
        }
        if(this.cell.x + 1 < 8) {
            if(this.cell.board.getCell(this.cell.x + 1,this.cell.y).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x + 1, this.cell.y));
            }
        }
        if(this.cell.x - 1 >= 0) {
            if(this.cell.board.getCell(this.cell.x - 1,this.cell.y).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x - 1, this.cell.y));
            }
        }
        if(this.cell.y + 1 < 8) {
            if(this.cell.board.getCell(this.cell.x,this.cell.y + 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x,this.cell.y + 1))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y + 1));
            }
        }
        if(this.cell.y - 1 >= 0) {
            if(this.cell.board.getCell(this.cell.x,this.cell.y - 1).isEmpty() || this.cell.isEnemy(this.cell.board.getCell(this.cell.x,this.cell.y - 1))) {
                cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y - 1));
            }
        }
        for (let i = 0; i < cellsToMove.length; i++) {
            if(cellsToMove[i].blockingKing) cellsToMove.splice(i,1);
        }
        this.cellsToMove = cellsToMove;
    }


}