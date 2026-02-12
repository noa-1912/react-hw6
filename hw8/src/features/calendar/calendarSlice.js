import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  dates: {
    "2026-01-01": {
      hebrew: "כ״א טבת תשפ״ו",
      events: []
    },
    "2026-01-02": {
      hebrew: "כ״ב טבת תשפ״ו",
      events: ["אירוע ראשון"]
    }
  }
}
export const fetchMonth = createAsyncThunk(
  "calendar/fetchMonth",
  async ({ month, year }) => {

    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)

    const formattedStartDate =
      firstDay.toLocaleDateString("en-CA")

    const formattedEndDate =
      lastDay.toLocaleDateString("en-CA")

    const response = await axios.get(
      `https://www.hebcal.com/converter?cfg=json&start=${formattedStartDate}&end=${formattedEndDate}&g2h=1`
    )

    return response.data
  }
)

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {

    addEvent: (state, action) => {
      const { date, event } = action.payload
      state.dates[date].events.push(event)
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchMonth.fulfilled, (state, action) => {
      const newDates = {}

      action.payload.forEach(item => {
        newDates[item.gy + "-" + 
                 String(item.gm).padStart(2,"0") + "-" +
                 String(item.gd).padStart(2,"0")] = {
          hebrew: item.hebrew,
          events: []
        }
      })

      state.dates = newDates
    })

    builder.addCase(fetchMonth.rejected, () => {
      alert("שגיאה בקבלת נתונים מהשרת")
    })
  }

  
})

export const { addEvent } = calendarSlice.actions
export default calendarSlice.reducer
