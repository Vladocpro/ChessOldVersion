import {Colors} from "../Colors";
import {Cell} from "../Cell";
const logo = require("../../assets/bk.png");

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

   public updateCellsToMove(cells:Cell[]) {
      this.cellsToMove = cells;
   }
   getAvailableCells() {

   }
   setAttackingCells(cells : Cell[]) {
      this.attackingCellsToMove = cells;
   }

   setUnderAttack(bool : boolean)  {
      if(bool) this.kingIsUnderAttack = true;
      else this.kingIsUnderAttack = false;
   }

   moveFigure(target: Cell) {

   }

}
