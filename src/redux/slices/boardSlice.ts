import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";
import {Board} from "../../models/Board";

interface showPopupAction {
   showPopup: boolean,
   subtitle?: string
}

interface boardState {
   board: Board | undefined,
   figureAttackingWhiteKing: Figure | undefined,
   figuresProtectingWhiteKing: Figure[],
   figuresPreventingWhiteCheckmate: Figure[],
   figureAttackingBlackKing: Figure | undefined,
   figuresProtectingBlackKing: Figure[],
   figuresPreventingBlackCheckmate: Figure[],

}

const initialState : boardState= {
   board:  undefined,
   figureAttackingWhiteKing: undefined,
   figuresProtectingWhiteKing: [],
   figuresPreventingWhiteCheckmate: [],
   figureAttackingBlackKing: undefined,
   figuresProtectingBlackKing: [],
   figuresPreventingBlackCheckmate: [],
}


export const boardSlice = createSlice({
   name: "board",
   initialState,
   reducers: {
      setBoard: (state, action:PayloadAction<Board>) => {
         state.board = action.payload
      },
      setFigureAttackingWhiteKing : (state, action:PayloadAction<Figure>) => {
         state.figureAttackingWhiteKing = action.payload;
      },
      setFigureAttackingBlackKing : (state, action:PayloadAction<Figure>) => {
         state.figureAttackingBlackKing = action.payload;
      },
      setFiguresProtectingWhiteKing : (state, action:PayloadAction<Figure[]>) => {
         state.figuresProtectingWhiteKing = action.payload;
      },
      setFiguresProtectingBlackKing : (state, action:PayloadAction<Figure[]>) => {
         state.figuresProtectingBlackKing = action.payload;
      },
      setFiguresPreventingWhiteCheckmate : (state, action:PayloadAction<Figure[]>) => {
         state.figuresPreventingWhiteCheckmate = action.payload;
      },
      setFiguresPreventingBlackCheckmate : (state, action:PayloadAction<Figure[]>) => {
         state.figuresPreventingBlackCheckmate = action.payload;
      },
   }
})

export const {setBoard, setFigureAttackingWhiteKing, setFigureAttackingBlackKing, setFiguresProtectingWhiteKing, setFiguresProtectingBlackKing, setFiguresPreventingWhiteCheckmate, setFiguresPreventingBlackCheckmate} = boardSlice.actions
export const boardReducer = boardSlice.reducer;