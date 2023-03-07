import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
const blackLogo = require("../../assets/bk.png");
const whiteLogo = require("../../assets/wk.png");

export class King extends Figure {


    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.King;
    }

    getAvailableCells() {
        let cellsToMove : Cell[] = [];
        if(this.color === Colors.WHITE){
            if (this.cell.x + 1 < 8 && this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x + 1, this.cell.y + 1)
                if ((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingWhiteKing)
                    cellsToMove.push(cell);
            }
            if (this.cell.x - 1 >= 0 && this.cell.y - 1 >= 0) {
                let cell = this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1)
                if ((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingWhiteKing)
                    cellsToMove.push(cell);
            }
            if(this.cell.x + 1 < 8 && this.cell.y - 1 >= 0) {
                let cell = this.cell.board.getCell(this.cell.x + 1,this.cell.y - 1);
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x - 1 >= 0 && this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x - 1,this.cell.y + 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x + 1 < 8) {
                let cell =this.cell.board.getCell(this.cell.x + 1,this.cell.y)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x - 1 >= 0) {
                let cell =this.cell.board.getCell(this.cell.x - 1,this.cell.y)
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x,this.cell.y + 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.y - 1 >= 0) {
                let cell =this.cell.board.getCell(this.cell.x,this.cell.y - 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingWhiteKing) {
                    cellsToMove.push(cell);
                }
            }
        }
        else {
            if (this.cell.x + 1 < 8 && this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x + 1, this.cell.y + 1)
                if ((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingBlackKing)
                    cellsToMove.push(cell);
            }
            if (this.cell.x - 1 >= 0 && this.cell.y - 1 >= 0) {
                let cell = this.cell.board.getCell(this.cell.x - 1, this.cell.y - 1)
                if ((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingBlackKing)
                    cellsToMove.push(cell);
            }
            if(this.cell.x + 1 < 8 && this.cell.y - 1 >= 0) {
                let cell = this.cell.board.getCell(this.cell.x + 1,this.cell.y - 1);
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x - 1 >= 0 && this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x - 1,this.cell.y + 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x + 1 < 8) {
                let cell =this.cell.board.getCell(this.cell.x + 1,this.cell.y)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.x - 1 >= 0) {
                let cell =this.cell.board.getCell(this.cell.x - 1,this.cell.y)
                if((cell.isEmpty() || this.cell.isEnemy(cell)) && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.y + 1 < 8) {
                let cell = this.cell.board.getCell(this.cell.x,this.cell.y + 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
            if(this.cell.y - 1 >= 0) {
                let cell =this.cell.board.getCell(this.cell.x,this.cell.y - 1)
                if((cell.isEmpty() || this.cell.isEnemy(cell))  && !cell.blockingBlackKing) {
                    cellsToMove.push(cell);
                }
            }
        }

        this.cellsToMove = cellsToMove;
    }


}