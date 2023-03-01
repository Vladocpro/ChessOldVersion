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
  return (
   <div  className={['cell', cell.color, selected ? "selected" : "",
       cell.available && cell.figure && cell.figure.name !== FigureNames.King ? "attackingCircle" : "",
       ((cell.figure?.color === Colors.WHITE && cell.blockingWhiteKing) || (cell.figure?.color === Colors.BLACK && cell.blockingBlackKing)) && cell.figure?.name === FigureNames.King ? "kingIsUnderAttack" :""].join(' ')}
         onClick={() => click(cell)}
   >
    {cell.available && !cell.figure &&  <div className={"available"}/>}
    {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
       {(() => {
           const letters  = ["a","b","c","d","e","f","g","h"];
            if (cell.x === 0 && cell.y === 7) {
                return (
                    <>
                        <span className="notationLetterSpecial">{letters[0]}</span>
                        <span className="notationNumberSpecial">1</span>
                    </>

                )
            }
           for (let i = 1; i < 8; i++) {
               if (cell.x === i && cell.y === 7) {
                   if(i % 2 === 0) {
                       return (
                           <span className="notationLetter notationLetterWhite">{letters[i]}</span>
                       )
                   }
                   else {
                       return (
                           <span className="notationLetter notationLetterBlack">{letters[i]}</span>
                       )
                   }

               }
           }
           for (let i = 6, j = 2; i >= 0; i--,j++) {
               if (cell.x === 0 && cell.y === i) {
                   if(j % 2 !== 0) {
                       return (
                           <span className="notationNumber notationNumberWhite">{j}</span>
                       )
                   }
                   else {
                       return (
                           <span className="notationNumber notationNumberBlack">{j}</span>
                       )
                   }
               }
           }
       })()}
    </div>
  )
}

export default CellComponent