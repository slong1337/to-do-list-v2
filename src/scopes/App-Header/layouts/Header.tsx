import { Outlet } from "@remix-run/react";
import { useState, useEffect } from "react"


export function App() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])


    return (
        <>
            <div className="flex flex-wrap px-4 xl:justify-around dark:bg-gray-800 text-gray-800 dark:text-white pt-2 justify-between">
                <h1 className=" text-4xl">ToDoList</h1>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md dark:border dark:border-white/10"
                >
                    {darkMode ? "🌙" : "☀️"}
                </button>

            </div>
        <Outlet/>
        </>
    )
}
