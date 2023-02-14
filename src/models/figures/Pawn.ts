import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/bp.png";
import whiteLogo from "../../assets/wp.png";

export class Pawn extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.Pawn;
    }

    pawnEnemy(goDown : boolean) {
        if(goDown) {
            if(this.cell.x !== 7) {
                if(this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y + 1)))
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x +1, this.cell.y + 1));
            }
            if(this.cell.x !== 0) {
                if(this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y + 1)))
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x - 1, this.cell.y + 1));
            }
        }
        else {
            if(this.cell.x !== 7) {
                if(this.cell.isEnemy(this.cell.board.getCell(this.cell.x + 1,this.cell.y - 1)))
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x + 1, this.cell.y - 1));
            }
            if(this.cell.x !== 0) {
                if(this.cell.isEnemy(this.cell.board.getCell(this.cell.x - 1,this.cell.y - 1)))
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1));
            }
        }
    }
    pawnEmpty(goDown : boolean) {
        if(goDown){
            if(this.cell.y + 1 < 8) {
                if(this.cell.board.getCell(this.cell.x,this.cell.y + 1).isEmpty())
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y + 1));
                this.pawnEnemy(true)
            }
        } else {
            if(this.cell.y - 1 >= 0) {
                if(this.cell.board.getCell(this.cell.x,this.cell.y - 1).isEmpty()) {
                    this.cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y - 1));
                }
                this.pawnEnemy(false)
            }
        }

    }
    getAvailableCells() {

        if (this.color === Colors.BLACK){
            if(this.isFirstStep) {
                this.pawnEmpty(true);
                if(this.cell.y + 2 < 8) {
                    if(this.cell.board.getCell(this.cell.x,this.cell.y + 2).isEmpty())
                        this.cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y + 2));
                    this.pawnEnemy(true)
                }
                return;
            }else {
                this.pawnEmpty(true);
            }
        }
        else {
            if(this.isFirstStep) {
                this.pawnEmpty(false);
                if(this.cell.y - 2 < 8) {
                    if(this.cell.board.getCell(this.cell.x,this.cell.y - 2).isEmpty())
                        this.cellsToMove.push(this.cell.board.getCell(this.cell.x, this.cell.y - 2));
                    this.pawnEnemy(false)
                }
                return;
            } else {
                this.pawnEmpty(false);
            }
        }
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

}