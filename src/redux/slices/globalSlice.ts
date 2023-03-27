import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";
import {Board} from "../../models/Board";

export enum winningPopupSubTitles {
   Time= "on Time",
   CheckMate= "by Checkmate"
}

interface showPopupAction {
   showPopup: boolean,
   subtitle?: string,
   winner?: null | Player,
}

interface globalState {
   players: { whitePlayer: Player, blackPlayer: Player, currentPlayer: Player },
   winningPopup: { showPopup: boolean, subtitle: string, winner: null | Player},
   timerPopup: { showPopup: boolean, blackTime: number, whiteTime: number },
   lostBlackFigures: Figure[],
   lostWhiteFigures: Figure[],
}

const initialState : globalState= {
   players: {whitePlayer: new Player(Colors.WHITE, "Vlad", true), blackPlayer: new Player(Colors.BLACK, "Yourself", false), currentPlayer: new Player(Colors.WHITE, "", true)},
   winningPopup: {showPopup: false, subtitle: "", winner: null},
   timerPopup: {showPopup: false, blackTime: 15, whiteTime: 15},
   lostBlackFigures : [],
   lostWhiteFigures : []
}


export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
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
      setWinningPopup: (state, action:PayloadAction<showPopupAction>) => {
         if(action.payload.subtitle) state.winningPopup.subtitle = action.payload.subtitle
         if (action.payload.winner) state.winningPopup.winner = action.payload.winner
         state.winningPopup.showPopup = action.payload.showPopup
      },
      setTimerPopup: (state, action:PayloadAction<boolean>) => {
         state.timerPopup.showPopup = action.payload
      },
      pushLostFigure : (state, action:PayloadAction<Figure>) => {
         if(action.payload.color === Colors.WHITE) state.lostWhiteFigures.push(action.payload)
         else state.lostBlackFigures.push(action.payload)
      },
      removeLostFigures : (state) => {
         state.lostBlackFigures = [];
         state.lostWhiteFigures = [];
      }
   }
})

export const {switchCurrentPlayer, setWinningPopup, setTimerPopup, pushLostFigure, removeLostFigures} = globalSlice.actions
export const globalReducer = globalSlice.reducer;
