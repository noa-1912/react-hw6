import { useEffect, useLayoutEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchMonth } from "./calendarSlice"
import Day from "./Day"

export default function Calendar() {
    const [orderedDates, setOrderedDates] = useState([])

    const dates = useSelector(state => state.calendar.dates)
    const firstKey = Object.keys(dates)[0]
    const currentDate = firstKey ? new Date(firstKey) : null
    const monthName = currentDate
      ? currentDate.toLocaleDateString("he-IL", { month: "long" })
      : ""

    const yearNumber = currentDate
      ? currentDate.getFullYear()
      : ""

    const dispatch = useDispatch()

    useEffect(() => {
        const now = new Date()
        dispatch(fetchMonth({
            month: now.getMonth() + 1,
            year: now.getFullYear()
        }))
    }, [dispatch])

    useLayoutEffect(() => {

        const entries = Object.entries(dates)
        if (entries.length === 0) return

        const result = [...entries]

        // היום הראשון בחודש
        const firstDate = new Date(entries[0][0])
        const firstDayOfWeek = firstDate.getDay() // 0=ראשון

        // הוספת ימים מתחילת השבוע מחודש קודם
        for (let i = 0; i < firstDayOfWeek; i++) {
            const d = new Date(firstDate)
            d.setDate(d.getDate() - (firstDayOfWeek - i))
            result.unshift([d.toISOString().slice(0, 10), { hebrew: "", events: [] }])
        }

        // היום האחרון בחודש
        const lastDate = new Date(entries[entries.length - 1][0])
        const lastDayOfWeek = lastDate.getDay()

        // הוספת ימים מסוף החודש הבא
        for (let i = lastDayOfWeek; i < 6; i++) {
            const d = new Date(lastDate)
            d.setDate(d.getDate() + (i - lastDayOfWeek + 1))
            result.push([d.toISOString().slice(0, 10), { hebrew: "", events: [] }])
        }

        setOrderedDates(result)

    }, [dates])



    const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

    return (
        <div>
            <h1>{monthName} {yearNumber}</h1>

            <h2>לוח שנה</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}>
                {dayNames.map(dayName => (
                    <div key={dayName} style={{ 
                        border: "1px solid #333", 
                        padding: "10px", 
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#f0f0f0"
                    }}>
                        {dayName}
                    </div>
                ))}
                {orderedDates.map(([dateKey, dateValue]) => (
                    <Day
                        key={dateKey}
                        dateKey={dateKey}
                        dateValue={dateValue}
                    />
                ))}
            </div>
        </div>
    )
}
