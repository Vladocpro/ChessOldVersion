import {configureStore} from "@reduxjs/toolkit";
import {globalReducer} from "./slices/globalSlice";
import {timerReducer} from "./slices/timerSlice";


export const store = configureStore({
   reducer: {
      global: globalReducer,
      timer: timerReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;