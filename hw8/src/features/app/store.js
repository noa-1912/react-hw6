import { configureStore } from "@reduxjs/toolkit"
import calendarReducer from "../calendar/calendarSlice"

export const store = configureStore({
  reducer: {
    calendar: calendarReducer
  }
})
