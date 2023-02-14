import {Colors} from "../Colors";
import logo from "../../assets/bk.png"
import {Cell} from "../Cell";

export enum FigureNames {
   Figure = "Figure",
   Pawn = "Pawn",
   Knight = "Knight",
   Bishop = "Bishop",
   Rook = "Rook",
   Queen = "Queen",
   King = "King",

}

export class Figure {
   color: Colors;
   logo: typeof logo | null;
   cell: Cell;
   name: FigureNames;
   id: number;
   kingIsUnderAttack:  boolean = false;
   cellsToMove: Cell[] = [];
   attackingCellsToMove: Cell[] = [];
   constructor(color: Colors, cell: Cell) {
      this.color = color;
      this.cell = cell;
      this.cell.figure = this;
      this.logo = null;
      this.name = FigureNames.Figure;
      this.id = Math.random();
   }

   // kingIsUnderAttack(target: Cell) {
   //    const cells: Cell[][] = this.cell.board.getCells();
   //    const kingCells : Cell[] = this.cell.board.getKings();
   //
   // }
   public updateCellsToMove(cells:Cell[]) {
      this.cellsToMove = cells;
   }
   getAvailableCells() {

   }
   setAttackingCells(cells : Cell[]) {
      this.attackingCellsToMove = cells;
   }
   // canMove(target: Cell) : boolean {
   //    if(target.figure?.color === this.color) return false;
   //    // if(target.figure?.name === FigureNames.King)  target.figure.setUnderAttack();
   //
   //
   //    // if(target.figure?.name === FigureNames.King)  { return true; }
   //    // if(target.available) target.figure?.setUnderAttack();
   //
   //    // target.board.getKing(this.color).figure?.setUnderAttack();
   //
   //    // if(target.figure && !target.figure?.isKingUnderAttack()) {
   //    //    target.figure.kingIsUnderAttack = false;
   //    // }
   //    //if king is under attack
   //    // const cells: Cell[][] = this.cell.board.getCells();
   //    // const kingCells : Cell[] = this.cell.board.getKings();
   //    return true;
   // }
   setUnderAttack(bool : boolean)  {
      if(bool) this.kingIsUnderAttack = true;
      else this.kingIsUnderAttack = false;
   }

   moveFigure(target: Cell) {
      
   }

}