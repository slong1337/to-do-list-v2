import { Outlet } from "@remix-run/react";
import { useState, useEffect } from "react"


export function App() {
    const [done, setDone] = useState("")


    const [darkMode, setDarkMode] = useState(
        typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
      )

    useEffect(() => {
        if (typeof window !== "undefined") {
          const savedTheme = localStorage.getItem("theme")
          setDarkMode(savedTheme === "dark")
        }
      }, [])
    
      useEffect(() => {
        if (typeof window !== "undefined") {
          if (darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
          } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
          }
        }
      }, [darkMode])
      
      
    return (
        <>
            <div className="flex flex-wrap justify-around dark:bg-gray-800 text-gray-800 dark:text-white">
                <h1 className=" text-4xl">ToDoList</h1>

                <button
                onClick={() => setDarkMode(!darkMode)}
                className=" p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md">
                {darkMode ? "🌙" : "☀️"}
                </button>

            </div>
        <Outlet/>
        </>
    )
}
