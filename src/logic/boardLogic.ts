import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import {FigureNames} from "../models/figures/Figure";
import {Board} from "../models/Board";


export function getKing(color : Colors, board : Board ) : Cell  {
   for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         if(board.cells[i][j].figure?.name === FigureNames.King && board.cells[i][j].figure?.color !== color)  return board.cells[i][j];
      }
   }
   return board.cells[7][7];
}




