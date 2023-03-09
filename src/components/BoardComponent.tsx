import React, { useEffect, useState} from 'react'
import {Board} from '../models/Board'
import CellComponent from './CellComponent';
import {Cell} from "../models/Cell";
import NameField from "./NameField";
import {Figure, FigureNames} from "../models/figures/Figure";
import {Colors} from "../models/Colors";
import Popup from "./Popup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import { setShowPopup, switchCurrentPlayer} from "../redux/slices/globalSlice";
import {boardAnalysis, restart} from "../logic/boardLogic";
import {setBoard} from "../redux/slices/boardSlice";



const BoardComponent = () => {
      const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
      let figureAttackingKing :Figure | null = null;
      const {popup, players} = useSelector((state :RootState) => state.global);
      const board = useSelector((state :RootState) => state.board.board);
      const figuresProtectingWhiteKing = useSelector((state :RootState) => state.board.figuresProtectingWhiteKing);
      const dispatch = useDispatch()
   // useEffect(() => {
   //    console.log(figuresProtectingWhiteKing)
   // }, [figuresProtectingWhiteKing]);


     function click(cell : Cell) {
        //  selectingCell
        if(cell.figure?.color === players.currentPlayer.color) {
            cell.figure?.getAvailableCells();
            if(selectedCell && board) board.unHighlightCells(selectedCell);
            setSelectedCell(cell);
            return;
        }
        //   movingPiece
        if(selectedCell?.figure && selectedCell !== cell && cell.figure?.name !== FigureNames.King) {
            for (let i = 0; i < selectedCell.figure?.cellsToMove.length; i++) {
                if(cell.x === selectedCell.figure?.cellsToMove[i].x && cell.y === selectedCell.figure?.cellsToMove[i].y) {
                   if(figureAttackingKing !== null) {
                      console.log(figureAttackingKing.cellsToMove)
                   }
                   selectedCell.moveFigure(cell);
                   boardAnalysis(cell);
                    if(figureAttackingKing !== null) {
                       // if checkMate
                        if(gameStatus()?.bool) {
                            // updateBoard();
                           setSelectedCell(null);
                           dispatch(setShowPopup({showPopup: true, subtitle: "by Checkmate"}));
                           restart();
                        }
                    }
                        dispatch(switchCurrentPlayer())
                        setSelectedCell(null);
                        updateBoard();
                }
            }
        }
    }

    function gameStatus()  {
         if(board === undefined) return ;
         let whiteKing = board.getKing(Colors.BLACK, board);
         let blackKing = board.getKing(Colors.WHITE, board);
         whiteKing.figure?.getAvailableCells();
         blackKing.figure?.getAvailableCells();
         let obj = {
             bool : false,
             color: Colors.WHITE
         }
         if(whiteKing.figure && whiteKing.figure.color !== figureAttackingKing?.color && whiteKing.figure?.cellsToMove.length > 0 ) {
            obj.bool = false;
            return obj;
         }

         if(blackKing.figure && blackKing.figure.color !== figureAttackingKing?.color && blackKing.figure?.cellsToMove.length > 0 ) {
            obj.bool =false;
            return obj;
         }
         if(whiteKing.figure?.cellsToMove.length === 0 && whiteKing.blockingWhiteKing) {
             obj.bool = false;
             obj.color = Colors.BLACK;
             // return obj;
         }
         else  if(blackKing.figure?.cellsToMove.length === 0 && blackKing.blockingBlackKing) {
             obj.bool = false;
             obj.color = Colors.WHITE;
             // return obj;
         }
         else {
             // setFigureAttackingKing(null); // if no one attacking king we should set that to null to avoid bugs
              figureAttackingKing = null; // if no one attacking king we should set that to null to avoid bugs
         }
         if(!obj.bool) {   // if no one attacking king there is no point in doing that
             const cells = board.getCells();
             let cellsToMove = figureAttackingKing?.cellsToMove;
             for (let i = 0; i < 8; i++) {
                 for (let j = 0; j < 8; j++) {
                     const target = cells[i][j];
                     if(target.figure?.color !== figureAttackingKing?.color) {
                         target.figure?.getAvailableCells();
                         if(!preventCheckMate(target.figure?.cellsToMove)) {
                             return obj;
                         }

                     }
                 }
             }
             obj.bool = true;
         }
        function preventCheckMate(targetCellsToMove : Cell[] | undefined) : boolean {
             if (figureAttackingKing && targetCellsToMove){
                 for (let i = 0; i < targetCellsToMove.length; i++) {
                     for (let j = 0; j < figureAttackingKing?.attackingCellsToMove.length; j++) {
                            if(targetCellsToMove[i] === figureAttackingKing.attackingCellsToMove[j] || targetCellsToMove[i] === figureAttackingKing?.cell) {
                                obj.bool = false;
                                return false;
                            }
                     }
                 }
             }
             return true;
        }
         return obj;
    }

    useEffect( () => {
        if(selectedCell) highlightCells(selectedCell);
    }, [selectedCell])

    function highlightCells(selectedCell : Cell) {
        board?.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
       const newBoard : Board = new Board();
       Object.assign(newBoard, board)
       dispatch(setBoard(newBoard))
    }

  return (
      <div>
         {popup.showPopup && <Popup/>}
          <NameField color={Colors.BLACK}/>
          <div className='board' >
              {board?.cells.map((row, index) =>
                  <React.Fragment key={index}>
                      {row.map(cell =>
                          <CellComponent
                              click={click}
                              cell={cell}
                              key={cell.id}
                              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                          />
                      )}
                  </React.Fragment>
              )}
          </div>
          <NameField color={Colors.WHITE}/>
      </div>

  );
};

export default BoardComponent