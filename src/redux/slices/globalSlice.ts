import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";
import {Board} from "../../models/Board";


interface globalState {
   board: Board | undefined,
   players: { whitePlayer: Player, blackPlayer: Player, currentPlayer: Player },
   showPopup: boolean,
   lostBlackFigures: Figure[],
   lostWhiteFigures: Figure[],
}

const initialState : globalState= {
   board:  undefined,
   players: {whitePlayer: new Player(Colors.WHITE, "Vlad", true), blackPlayer: new Player(Colors.BLACK, "Yourself", false), currentPlayer: new Player(Colors.WHITE, "", true)},
   showPopup: false,
   lostBlackFigures : [],
   lostWhiteFigures : []
}


export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setBoard: (state, action:PayloadAction<Board>) => {
         state.board = action.payload
      },
      switchCurrentPlayer: (state) => {
         if(state.players.whitePlayer.isCurrentPlayer) {
            state.players.whitePlayer.isCurrentPlayer = false
            state.players.blackPlayer.isCurrentPlayer = true
            state.players.currentPlayer = state.players.blackPlayer;
         } else {
            state.players.whitePlayer.isCurrentPlayer = true
            state.players.blackPlayer.isCurrentPlayer = false
            state.players.currentPlayer = state.players.whitePlayer;
         }
      },
      setShowPopup: (state, action:PayloadAction<boolean>) => {
         state.showPopup = action.payload
      },
      pushLostFigure : (state, action:PayloadAction<Figure>) => {
         if(action.payload.color === Colors.WHITE) state.lostWhiteFigures.push(action.payload)
         else state.lostBlackFigures.push(action.payload)
      }
   }
})

export const {setBoard, switchCurrentPlayer, setShowPopup, pushLostFigure} = globalSlice.actions
export const globalReducer = globalSlice.reducer;