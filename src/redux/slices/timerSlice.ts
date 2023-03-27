import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface timerState {
   blackTime: number,
   whiteTime: number,

   initialTime: {blackTime: number, whiteTime: number}

}

const initialState : timerState= {
      blackTime: 900,
      whiteTime: 900,
      initialTime: {blackTime: 900, whiteTime: 900}
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
      setTimer : (state, action:PayloadAction<{blackTime: number, whiteTime: number}>) => {
         state.initialTime.blackTime = action.payload.blackTime;
         state.initialTime.whiteTime = action.payload.whiteTime;
         state.blackTime = action.payload.blackTime;
         state.whiteTime = action.payload.whiteTime;
      },
      resetTimer : (state) => {
         state.blackTime = state.initialTime.blackTime;
         state.whiteTime = state.initialTime.whiteTime;
      }
   }
})

export const {decrementBlackTime, decrementWhiteTime, setTimer, resetTimer} = timerSlice.actions
export const timerReducer = timerSlice.reducer;
