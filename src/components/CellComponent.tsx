import React, {FC} from 'react'
import {Cell} from '../models/Cell'
import {FigureNames} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  const notationString : string[] = cell.notationCoordinate.split("");
  return (
   <div  className={['cell', cell.color, selected && "selected",
       cell.available && cell.figure && cell.figure.name !== FigureNames.King && "attackingCircle",
       ((cell.figure?.color === Colors.WHITE && cell.blockingWhiteKing) || (cell.figure?.color === Colors.BLACK && cell.blockingBlackKing)) && cell.figure?.name === FigureNames.King && "kingIsUnderAttack"].join(' ')}
         onClick={() => click(cell)}
   >
    {cell.available && !cell.figure &&  <div className={"available"}/>}
    {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
      {cell.y === 7 && (
          <span className={`notationLetter ${cell.color === Colors.WHITE ? "notationColorBlack" : "notationColorWhite"}`}>
            {notationString[0]}
          </span>
      )}
      {cell.x === 0  && (
          <span className={`notationNumber ${cell.color === Colors.WHITE ? "notationColorBlack" : "notationColorWhite"}`}>
            {notationString[1]}
          </span>
      )}
    </div>
  )
}

export default CellComponent