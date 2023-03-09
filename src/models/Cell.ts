import {Board} from "./Board";
import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Queen} from "./figures/Queen";
import {store} from "../redux/store";
import {pushLostFigure} from "../redux/slices/globalSlice";
import {setBoard} from "../redux/slices/boardSlice";

export class Cell {
   readonly x: number;
   readonly y: number;
   readonly color: Colors;
   figure: Figure | null;
   board: Board;
   available: boolean;
   id: number;
   blockingWhiteKing : boolean = false;
   blockingBlackKing : boolean = false;
   notationCoordinate:string = "";
   kingIsBeingAttacked : boolean = false;
   
   constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null, notationCoordinate: string) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.figure = figure;
      this.board = board;
      this.available = false;
      this.id = Math.random();
      this.notationCoordinate = notationCoordinate;
   }
   isEmpty(): boolean  {
      return this.figure === null;
   }

   isEnemy(target: Cell): boolean {
      if(target.figure) return this.figure?.color !== target.figure.color;
      return false;
   }
   public horizontalAndVertical(cellsToMove : Cell[], attackingCellsToMove: Cell[]) {
      let isAttackingCells = false;
      for (let x = this.x + 1; x < 8; x++) {
         if(this?.figure && this.board.getCell(x,this.y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,this.y));
            if(!isAttackingCells) attackingCellsToMove.push(this.board.getCell(x,this.y));
            continue;
         }
         if(this?.figure &&this.isEnemy(this.board.getCell(x,this.y))){
            cellsToMove.push(this.board.getCell(x,this.y));
            if(this.board.getCell(x,this.y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
      for (let x = this.x - 1; x >= 0; x--) {
         if(this?.figure &&this.board.getCell(x,this.y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,this.y));
            if(!isAttackingCells) attackingCellsToMove.push(this.board.getCell(x,this.y));
            continue;
         }
         if(this?.figure &&this.isEnemy(this.board.getCell(x,this.y))){
            cellsToMove.push(this.board.getCell(x,this.y));
            if(this.board.getCell(x,this.y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         }else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }

      for (let y = this.y + 1; y < 8; y++) {
         if(this?.figure &&this.board.getCell(this.x,y).isEmpty()){
            cellsToMove.push(this.board.getCell(this.x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(this.x,y));
            continue;
         }
         if(this?.figure &&this.isEnemy(this.board.getCell(this.x,y))){
            cellsToMove.push(this.board.getCell(this.x,y));
            if(this.board.getCell(this.x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
      for (let y = this.y - 1; y >= 0; y--) {
         if(this?.figure &&this.board.getCell(this.x,y).isEmpty()) {
            cellsToMove.push(this.board.getCell(this.x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(this.x,y));
            continue;
         }
         if(this?.figure &&this.isEnemy(this.board.getCell(this.x,y))) {
            cellsToMove.push(this.board.getCell(this.x,y));
            if(this.board.getCell(this.x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         }else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
   }
   public diagonal(cellsToMove : Cell[], attackingCellsToMove: Cell[]) {
      let isAttackingCells = false;
      if(this.figure && attackingCellsToMove.length > 0)  isAttackingCells = true;
      for (let x = this.x + 1,  y = this.y + 1; x < 8 && y < 8; x++,y++) {
         if(this.board.getCell(x,y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(x,y));
            continue;
         }
         if(this.isEnemy(this.board.getCell(x,y))){
            cellsToMove.push(this.board.getCell(x,y));
            if(this.board.getCell(x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
      for (let x = this.x - 1,  y = this.y - 1; x >= 0 && y >= 0; x--,y--) {
         if(this.board.getCell(x,y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(x,y));
            continue;
         }
         if(this.isEnemy(this.board.getCell(x,y))){
            cellsToMove.push(this.board.getCell(x,y));
            if(this.board.getCell(x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }

      for (let x = this.x + 1,  y = this.y - 1; x < 8 && y >= 0; x++,y--) {
         if(this.board.getCell(x,y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(x,y));
            continue;
         }
         if(this.isEnemy(this.board.getCell(x,y))){
            cellsToMove.push(this.board.getCell(x,y));
            if(this.board.getCell(x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
      for (let x = this.x - 1,  y = this.y + 1; x >= 0 && y < 8; x--,y++) {
         if(this.board.getCell(x,y).isEmpty()) {
            cellsToMove.push(this.board.getCell(x,y));
            if(!isAttackingCells)attackingCellsToMove.push(this.board.getCell(x,y));
            continue;
         }
         if(this.isEnemy(this.board.getCell(x,y))){
            cellsToMove.push(this.board.getCell(x,y));
            if(this.board.getCell(x,y).figure?.name !== FigureNames.King && !isAttackingCells) attackingCellsToMove = [];
            else  isAttackingCells = true;
            break;
         } else {
            if(!isAttackingCells) attackingCellsToMove = [];
            break;
         }
      }
   }
   setFigure(figure: Figure) {
      this.board.unHighlightCells(figure.cell);
      if((this.y === 7 || this.y === 0) && figure.name === FigureNames.Pawn) {
         this.figure = new Queen(figure.color, this)
      } else {
         this.figure = figure;
         figure.cellsToMove = [];
         this.figure.cell = this;
      }
   }

   setBlockingKing(color : Colors, bool : boolean) {
      if(bool) {
         if(color === Colors.BLACK) this.blockingBlackKing = true
         else this.blockingWhiteKing = true
      }
      else {
         if(color === Colors.BLACK) this.blockingBlackKing = false
         else this.blockingWhiteKing = false
      }
   }

   addMoves(target : Cell, hadFigure: boolean) {
      let cellMove = target.notationCoordinate;
      if(hadFigure) cellMove = "x" + cellMove;
      let counter = this.board.moveHist.length + 1;
      for (let i = 0; i < this.board.moveHist.length; i++) {
         if(this.board.moveHist[i].whiteMove !== "" && this.board.moveHist[i].blackMove !== "") continue;
         if(this.board.moveHist[i].whiteMove === "") {
            this.board.moveHist[i] = {...this.board.moveHist[i],whiteMove: cellMove, figure1: target.figure};
            return;
         } else {
            this.board.moveHist[i]= {...this.board.moveHist[i],blackMove: cellMove, figure2: target.figure};
            return;
         }
      }
      if(target.figure?.color === Colors.WHITE) target.board.moveHist.push({turnCounter: counter, whiteMove: cellMove, blackMove: "", figure1:target.figure, figure2: null});
      else target.board.moveHist.push({turnCounter: counter, whiteMove: "", blackMove: cellMove, figure1:null, figure2: target.figure});
   }

   moveFigure(target: Cell) {
      let hadFigure = false;
      if(this.figure) {
         this.figure.moveFigure(target);
         if(target.figure) {
            store.dispatch(pushLostFigure(target.figure));
            hadFigure = true;
         }
         target.setFigure(this.figure);
         this.addMoves(target, hadFigure);
         if(target.figure) this.figure = null;
      }
      // if not working setBoard a new object!!!
      store.dispatch(setBoard(this.board))
   }

}