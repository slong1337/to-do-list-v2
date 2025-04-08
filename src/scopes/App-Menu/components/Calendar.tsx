import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth,
    isSameDay
  } from "date-fns"
  import { ru } from "date-fns/locale"
  import { useState, useEffect } from "react"
  import clsx from "clsx"
  

  type CalendarProps = {
    currentDate: Date
    className?: string
  }
  
  export default function Calendar({ currentDate, className }: CalendarProps) {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek (monthStart, {locale:ru, weekStartsOn:1})
    const endDate = endOfWeek(monthEnd, {locale:ru, weekStartsOn:1})
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    function handleDayClick(date: Date) {
      setSelectedDate(date)
    }
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>(() => {
      const stored = localStorage.getItem("calendar-button-states")
      return stored ? JSON.parse(stored) : {}
    })
    const trueCount = Object.values(buttonStates).filter(Boolean).length


    useEffect(() => {
      localStorage.setItem("calendar-button-states", JSON.stringify(buttonStates))
    }, [buttonStates])

    const dateFormat = 'd'
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat, { locale: ru })
        const cloneDay = day
        const dateKey = cloneDay.toISOString()
        const isActive = buttonStates[dateKey] || false
        
        days.push(
          <button 
            key={cloneDay.toISOString()}
            value={String(isActive)}
            onClick={() => {
              setButtonStates(prev => ({
                ...prev,
                [dateKey]: !prev[dateKey]
              }))
            }}
            className={clsx("w-full aspect-square border text-center rounded-full transition",
              {
                "bg-blue-500 text-white hover:bg-blue-700": isActive,
                "hover:bg-gray-100": !isActive,
                "!text-gray-400": !isSameMonth(cloneDay, monthStart)
              }
            )}
          >
              {formattedDate}
            </button>
        )
        day = addDays(day, 1)
        }

        rows.push(
          <div 
            key={day.toISOString()}
            className="grid grid-cols-7">
              {days}
            </div>
        )

        days = []
    }

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

    return (

      <div className="max-w-md mx-auto p-4 shadow bg-slate-600">

        <h1 className="text-xl font-semibold text-center pb-2 text-white">
          Название привычки
        </h1>


        <div className="grid grid-cols-7 font-medium text-center">
          {weekDays.map(day => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>
        

        {rows}

        <p className="text-sm font-semibold text-right mt-4">
          {format(currentDate, "LLLL yyyy", { locale: ru })}
        </p>

        <p className=" text-sm text-gray-400 mb-2">
          Отмечено:
          <span className="font-semibold text-blue-300 px-2">
            {trueCount}
          </span>дней
        </p>

      </div>
    )
    
  }