import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import {Figure, FigureNames} from "../models/figures/Figure";
import {store} from "../redux/store";
import {removeLostFigures, switchCurrentPlayer} from "../redux/slices/globalSlice";
import {Board} from "../models/Board";
import {resetTimer} from "../redux/slices/timerSlice";
import {setBoard, setFigureAttackingBlackKing, setFigureAttackingWhiteKing} from "../redux/slices/boardSlice";


export function resetBlockingCells(board: Board) {
   for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         board.cells[i][j].setBlockingKing(Colors.BLACK, false);
         board.cells[i][j].setBlockingKing(Colors.WHITE, false);
         if(board.cells[i][j].figure) {
            // @ts-ignore
            board.cells[i][j].figure.cellsToMove = [];
         }
      }
   }
}

export function boardAnalysis  (cell : Cell) {

   let board = Object.assign({},store.getState().board.board);
   // store.getState().board.figureAttackingWhiteKing;
   // store.getState().board.figureAttackingBlackKing;
   let figuresProtectingWhiteKing = Object.assign([],store.getState().board.figuresProtectingWhiteKing);
   let figuresPreventingWhiteCheckmate = Object.assign([],store.getState().board.figuresPreventingWhiteCheckmate);
   let figuresProtectingBlackKing = Object.assign([],store.getState().board.figuresProtectingBlackKing);
   let figuresPreventingBlackCheckmate = Object.assign([],store.getState().board.figuresPreventingBlackCheckmate);
   let currentPlayerColor = store.getState().global.players.currentPlayer.color;
   if (board === undefined) return;
   resetBlockingCells(board);



   let bool = false;
   for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         const target = board.cells[i][j];
         if(target.figure?.color === currentPlayerColor) {
            if(target.figure?.name === FigureNames.Pawn) {
               setBlockingCellsAsPawns(board,target);
            } else {
               target.figure?.getAvailableCells();
               // UNSLASH
               // if(target.figure)setBlockingCells(figureAttackingKing,target.figure);
            }
         }
      }
   }
   const newBoard = new Board();
   Object.assign(newBoard, board)
   store.dispatch(setBoard(newBoard));
}
export function setBlockingCellsAsPawns(board: Board,cell: Cell) {
   if (cell?.figure?.color === Colors.BLACK) {
      if (cell.x !== 7) {
         const cellTarget = board.cells[cell.y + 1][cell.x + 1];
         cellTarget.setBlockingKing(Colors.WHITE, true);
         if(cellTarget.figure?.name === FigureNames.King && cellTarget.figure?.color === Colors.WHITE){
            store.dispatch(setFigureAttackingWhiteKing(cell.figure));
         }
      }
      if (cell.x !== 0) {
         const cellTarget = board.cells[cell.y + 1][cell.x - 1];
         cellTarget.setBlockingKing(Colors.WHITE,true);
         if(cellTarget.figure?.name === FigureNames.King && cellTarget.figure?.color === Colors.WHITE){
            store.dispatch(setFigureAttackingWhiteKing(cell.figure));
         }
      }
   } else {
      if (cell.x !== 7) {
         const cellTarget = board.cells[cell.y - 1][cell.x + 1];
         cellTarget.setBlockingKing(Colors.BLACK,true);
         if(cell.figure && cellTarget.figure?.name === FigureNames.King && cellTarget.figure?.color === Colors.BLACK){
            store.dispatch(setFigureAttackingBlackKing(cell.figure));
         }
      }
      if (cell.x !== 0) {
         const cellTarget = board.cells[cell.y - 1][cell.x - 1];
         cellTarget.setBlockingKing(Colors.BLACK,true);
         if(cell.figure && cellTarget.figure?.name === FigureNames.King && cellTarget.figure?.color === Colors.BLACK){
            store.dispatch(setFigureAttackingBlackKing(cell.figure));
         }
      }
   }
}


export function setBlockingCells(figureAttackingKing: Figure | null,figure : Figure) {
   if(figure) {
      for (let i = 0; i < figure.cellsToMove.length; i++) {
         if(figure.cellsToMove[i].figure?.name === FigureNames.King && figure.color !== figure.cellsToMove[i].figure?.color) {
            // setFigureAttackingKing(figure);
            figureAttackingKing = figure;
         }
         figure.cellsToMove[i].setBlockingKing(figure.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK,true);
      }
   }
}

export function restart() {
   const currentPlayer = store.getState().global.players.currentPlayer;
   const newBoard = new Board();
   newBoard.initCells();
   newBoard.addFigures();
   store.dispatch(setBoard(newBoard));
   store.dispatch(removeLostFigures());
   if(currentPlayer.color !== Colors.WHITE) {
      store.dispatch(switchCurrentPlayer())
   }
   store.dispatch(resetTimer())
}




