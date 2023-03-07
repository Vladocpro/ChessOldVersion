import {Board} from "../../models/Board";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";

interface globalState {
   board: Board,
   players: { whitePlayer: Player, blackPlayer: Player, currentPlayer: Player },
   showPopup: boolean
}

const initialState : globalState= {
   board: new Board(),
   players: {whitePlayer: new Player(Colors.WHITE, "", true), blackPlayer: new Player(Colors.BLACK, "", false), currentPlayer: new Player(Colors.WHITE, "", true)},
   showPopup: false
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
   }
})

export const {setBoard, switchCurrentPlayer, setShowPopup} = globalSlice.actions
export const globalReducer = globalSlice.reducer;