import { addDays, format } from "date-fns/fp"
import  Calendar  from '@/scopes/App-Menu/components/Calendar'
import { useState } from "react"
import { AddIcon } from "@/components/icons/AddIcon"
import {startOfMonth} from 'date-fns'


export const Tracker = () => {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [calendars, setCalendars] = useState<Date[]>([
        startOfMonth(new Date())
      ])

      function handleAddCalendar() {
        setCalendars(prev => [...prev, startOfMonth(new Date())])
      }


    return (
    <>
        <div className="px-4 bg-slate-800">
            <p className="py-4 text-xl text-white">Мои привычки</p>
                <div className="mb-6">
                    <Calendar currentDate={currentDate} />
                </div>
                
                <button 
                className="flex fixed bottom-2 right-4"
                onClick={handleAddCalendar}>
                    <AddIcon className="h-10 w-10 text-white"/>
                </button>

                {calendars.map((date, index) => (
                 <Calendar 
                 key={index} 
                 currentDate={date}/>
                ))}
        </div>
    </>
    )
}

export default Tracker