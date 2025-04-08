import  Calendar  from '@/scopes/App-Menu/components/Calendar'
import { useState, useEffect } from "react"
import { AddIcon } from "@/components/icons/AddIcon"
import {startOfMonth} from 'date-fns'

type CalendarData = {
    id: number
    currentDate: Date
  }

  const STORAGE_KEY = "my-calendars"


export const Tracker = () => {

    const [calendars, setCalendars] = useState<CalendarData[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: CalendarData[] = JSON.parse(stored)
          return parsed.map(c => ({
            ...c,
            currentDate: new Date(c.currentDate)
          }))
        } else {
          return []
        }
      })

      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(calendars))
      }, [calendars])
    
      function handleAddCalendar() {
        const newCalendar: CalendarData = {
          id: Date.now(),
          currentDate: startOfMonth(new Date())
        }
        setCalendars(prev => [...prev, newCalendar])
      }


    return (
    <>
        <div className="px-4 dark:bg-slate-800 min-h-screen">
            <p className="py-4 text-xl dark:text-white">Мои привычки</p>
                
                <button 
                className="flex fixed bottom-2 right-4"
                onClick={handleAddCalendar}>
                    <AddIcon className="h-10 w-10 text-white"/>
                </button>
                
                {calendars.map((calendar) => (
                <Calendar
                key={calendar.id}
                currentDate={calendar.currentDate}
                calendarId={calendar.id}
                />
                ))}
        </div>
    </>
    )
}

export default Tracker
