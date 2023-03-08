import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface timerState {
   blackTime: number,
   whiteTime: number,

   initialTime: number

}

const initialState : timerState= {
      blackTime: 899,
      whiteTime: 899,
      initialTime: 899
}


export const timerSlice = createSlice({
   name: "timer",
   initialState,
   reducers: {
      decrementBlackTime: (state) => {
         state.blackTime -= 1
      },
      decrementWhiteTime : (state) => {
         state.whiteTime -= 1
      },
      setTimer : (state, action:PayloadAction<number>) => {
         state.blackTime = action.payload;
         state.whiteTime = action.payload;
         state.initialTime = action.payload;
      },
      resetTimer : (state) => {
         state.blackTime = state.initialTime;
         state.whiteTime = state.initialTime;
      }
   }
})

export const {decrementBlackTime, decrementWhiteTime, setTimer, resetTimer} = timerSlice.actions
export const timerReducer = timerSlice.reducer;