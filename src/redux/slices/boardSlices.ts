import {Board} from "../../models/Board";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface globalState {
   board: Board
}

const initialState : globalState= {
   board: new Board()
}


export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setBoard: (state, action:PayloadAction<Board>) => {
         state.board = action.payload
      }
   }
})

export const {setBoard} = globalSlice.actions
export const globalReducer = globalSlice.reducer;