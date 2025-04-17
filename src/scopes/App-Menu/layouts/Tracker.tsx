import  Calendar  from '@/scopes/App-Menu/components/Calendar'
import { useState, useEffect } from "react"
import { AddIcon } from "@/components/icons/AddIcon"
import {startOfMonth} from 'date-fns'

type CalendarData = {
    id: number
    currentDate: Date
    title: string
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
        const title = prompt("Введите название привычки")
        if (!title) return
      
        const newCalendar: CalendarData = {
          id: Date.now(),
          title,
          currentDate: startOfMonth(new Date())
        }
      
        setCalendars(prev => [...prev, newCalendar])
      }

      function handleDeleteCalendar(id: number) {
        setCalendars(prev => prev.filter(calendar => calendar.id !== id))
      }


    return (
    <>
    
        <div className="px-4 dark:bg-slate-800 min-h-screen">
            <p className="py-4 text-xl dark:text-white">Мои привычки</p>
                <div className='m'>

                  <button 
                    className="flex fixed bottom-2 right-4"
                    onClick={handleAddCalendar}>
                        <AddIcon className="h-10 w-10 dark:text-white text-black"/>
                  </button>

                  <div className=''>
                    {calendars.map((calendar,index) => (
                      <div>
                        <Calendar
                        key={calendar.id}
                        currentDate={calendar.currentDate}
                        calendarId={calendar.id}
                        title={calendar.title}
                        onDelete={() => handleDeleteCalendar(calendar.id)}
                        />
                      </div>
                    ))}
                  </div>

                </div>
        </div>
    </>
    )
}

export default Tracker
