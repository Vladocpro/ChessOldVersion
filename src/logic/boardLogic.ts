import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import {FigureNames} from "../models/figures/Figure";
import {store} from "../redux/store";
import {setBoard, switchCurrentPlayer} from "../redux/slices/globalSlice";
import {Board} from "../models/Board";



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

export function restart() {
   const currentPlayer = store.getState().global.players.currentPlayer;
   const newBoard = new Board();
   newBoard.initCells();
   newBoard.addFigures();
   store.dispatch(setBoard(newBoard));
   if(currentPlayer.color !== Colors.WHITE) {
      store.dispatch(switchCurrentPlayer())
   }
}




