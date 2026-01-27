import React from 'react'
import Day from './Day'

export default function Calendar() {
    return (
        <div>
            <h1>לוח שנה</h1>
            <p>בחירת חודש ושנה</p>
            <Day />
            <Day />
            <Day />
        </div>
    )
}
