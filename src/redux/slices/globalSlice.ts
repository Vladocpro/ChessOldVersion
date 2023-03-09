import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";
import {Board} from "../../models/Board";

interface showPopupAction {
   showPopup: boolean,
   subtitle?: string
}

interface globalState {
   players: { whitePlayer: Player, blackPlayer: Player, currentPlayer: Player },
   popup: { showPopup: boolean, subtitle: string },
   lostBlackFigures: Figure[],
   lostWhiteFigures: Figure[],
}

const initialState : globalState= {
   players: {whitePlayer: new Player(Colors.WHITE, "Vlad", true), blackPlayer: new Player(Colors.BLACK, "Yourself", false), currentPlayer: new Player(Colors.WHITE, "", true)},
   popup: {showPopup: false, subtitle: ""},
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
      setShowPopup: (state, action:PayloadAction<showPopupAction>) => {
         if(action.payload.subtitle) state.popup.subtitle = action.payload.subtitle
         state.popup.showPopup = action.payload.showPopup
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

export const {switchCurrentPlayer, setShowPopup, pushLostFigure, removeLostFigures} = globalSlice.actions
export const globalReducer = globalSlice.reducer;