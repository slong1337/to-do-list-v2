import { Outlet } from "@remix-run/react"
import { useState, useEffect } from "react"
import { Link } from '@remix-run/react'
import { MenuIcon } from "@/components/icons/MenuIcon";



export function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className=" flex flex-wrap px-4 xl:justify-around dark:bg-gray-800 text-gray-800 dark:text-white pt-2 justify-between items-center">
            
            <MenuIcon 
                className="h-8 cursor-pointer" 
                onClick={toggleMenu} 
            />

                {isMenuOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-end z-50 transition-transform duration-300">

                    <div className="bg-white w-64 h-full p-4 flex flex-col justify-between">
                        <div>

                            <Link to="/">
                                <button className="rounded bg-gray-200 p-2 w-full mb-4"
                                onClick={toggleMenu}>
                                    Главная
                                </button>
                            </Link>

                            <Link to="/track">
                                <button className="rounded bg-gray-200 p-2 w-full mb-4"
                                onClick={toggleMenu}>
                                    Трекер привычек
                                </button>
                            </Link>

                        </div>

                        <button className="mb-4 p-6 bg-gray-200 rounded"
                            onClick={toggleMenu}
                        >
                            Закрыть меню
                        </button>

                    </div>
                </div>
                )}

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
