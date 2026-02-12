import { useDispatch } from "react-redux"
import { addEvent } from "./calendarSlice"

export default function Day({ dateKey, dateValue }) {

  const dispatch = useDispatch()

  const dateObj = new Date(dateKey)
  const dayInMonth = dateObj.getDate()

  const showEvents = () => {
    if (dateValue.events.length === 0) {
      alert("אין אירועים")
    } else {
      alert(dateValue.events.join("\n"))
    }
  }

  const handleAddEvent = () => {
    const text = prompt("הכניסי שם אירוע")
    if (text) {
      dispatch(addEvent({ date: dateKey, event: text }))
    }
  }

  // בדיקה אם זה יום מחודש קודם או הבא
  const isCurrentMonth = dateValue.hebrew !== ""

  return (
    <div style={{ 
      border: "1px solid #ddd", 
      padding: "10px",
      minHeight: "120px",
      backgroundColor: isCurrentMonth ? "white" : "#f9f9f9"
    }}>

      <div style={{ fontWeight: "bold", fontSize: "18px" }}>{dayInMonth}</div>
      {dateValue.hebrew && <div style={{ fontSize: "12px", color: "#666" }}>{dateValue.hebrew}</div>}

      <div
        style={{ color: "blue", cursor: "pointer", fontSize: "12px", marginTop: "5px" }}
        onClick={showEvents}
      >
        אירועים: {dateValue.events.length}
      </div>

      <button 
        onClick={handleAddEvent}
        style={{ marginTop: "5px", fontSize: "12px", padding: "5px 10px" }}
      >
        הוסף אירוע
      </button>

    </div>
  )
}
