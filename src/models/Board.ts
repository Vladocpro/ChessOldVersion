import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Figure, FigureNames} from "./figures/Figure";
import {MoveHist} from "./MoveHist";

export class Board {
   cells: Cell[][] = []
   lostBlackFigures: Figure[] = [];
   lostWhiteFigures: Figure[] = [];
   moveHist: MoveHist[] = [];

   public initCells() {
      const letters  = ["a","b","c","d","e","f","g","h"];
      for (let i = 0; i < 8; i++) {
         const row : Cell[] = []
         for (let j = 0; j < 8; j++) {
            if((i + j) % 2 !== 0) {
               row.push(new Cell(this, j, i, Colors.BLACK, null, letters[j] + (9-i-1))) // black cells
            } else {
               row.push(new Cell(this, j, i, Colors.WHITE, null,letters[j] + (9-i-1))) // white cells
            }
            
         }
         this.cells.push(row);
         
      }
   }

   public getCopyBoard(): Board {
      const newBoard = new Board();
      newBoard.cells = this.cells;
      newBoard.moveHist = this.moveHist;
      newBoard.lostWhiteFigures = this.lostWhiteFigures;
      newBoard.lostBlackFigures = this.lostBlackFigures;
      return newBoard;
   }
   public highlightCells(selectedCell: Cell | null) {
      if(selectedCell?.figure) {
         for (let i = 0; i < selectedCell.figure?.cellsToMove.length; i++) {
            // possible bug with coordinates
            this.cells[selectedCell.figure?.cellsToMove[i].y][selectedCell.figure?.cellsToMove[i].x].available = true;
         }
      }
   }
   public unHighlightCells(selectedCell: Cell | null) {
      if(selectedCell?.figure) {
         for (let i = 0; i < selectedCell.figure?.cellsToMove.length; i++) {
            // possible bug with coordinates
            this.cells[selectedCell.figure?.cellsToMove[i].y][selectedCell.figure?.cellsToMove[i].x].available = false;
         }
      }
   }

   public getCells() : Cell[][]{
      return this.cells;
   }

   public getKing(color : Colors ) : Cell  {
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
            if(this.cells[i][j].figure?.name === FigureNames.King && this.cells[i][j].figure?.color !== color)  return this.cells[i][j];
         }
      }
      return this.cells[7][7];
   }


   public getCell(x: number, y: number){
      return this.cells[y][x];
   }
   private addPawns() {
      for (let i = 0; i < 8; i++) {
         new Pawn(Colors.BLACK, this.getCell(i,1));
         new Pawn(Colors.WHITE, this.getCell(i,6));
      }
   }

   private addKnights() {
      new Knight(Colors.BLACK, this.getCell(1,0));
      new Knight(Colors.BLACK, this.getCell(6,0));
      new Knight(Colors.WHITE, this.getCell(1,7));
      new Knight(Colors.WHITE, this.getCell(6,7));
   }

   private addBishops() {
      new Bishop(Colors.BLACK, this.getCell(2,0));
      new Bishop(Colors.BLACK, this.getCell(5,0));
      new Bishop(Colors.WHITE, this.getCell(2,7));
      new Bishop(Colors.WHITE, this.getCell(5,7));
   }

   private addRooks() {
      new Rook(Colors.BLACK, this.getCell(0,0));
      new Rook(Colors.BLACK, this.getCell(7,0));
      new Rook(Colors.WHITE, this.getCell(0,7));
      new Rook(Colors.WHITE, this.getCell(7,7));
   }

   private addQueens() {
      new Queen(Colors.BLACK, this.getCell(3,0));
      new Queen(Colors.WHITE, this.getCell(3,7));
   }

   private addKings() {
         new King(Colors.BLACK, this.getCell(4,0));
         new King(Colors.WHITE, this.getCell(4,7));

   }

   // public addFisherFigures() {
   //
   // }


   public addFigures() {
      this.addPawns();
      this.addKnights();
      this.addBishops();
      this.addRooks();
      this.addQueens();
      this.addKings();
   }

}