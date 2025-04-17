import { Outlet } from "@remix-run/react"
import { useState, useEffect } from "react"
import { Link } from '@remix-run/react'
import { MenuIcon } from "@/components/icons/MenuIcon"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"




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
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const toggleMenu = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
        setTimeout(() => setIsMenuVisible(false), 300)
      }
      else {
        setIsMenuVisible(true)
        setTimeout(()=> setIsMenuOpen(true),10)
      }
    }
    

    return (
        <>
          <div className="flex flex-wrap px-4 xl:justify-around dark:bg-gray-800 text-gray-800 dark:text-white pt-2 justify-between items-center">
            
            <MenuIcon 
              className="h-8 cursor-pointer" 
              onClick={toggleMenu} 
            />
      
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={toggleMenu}
                  />
      
                  <motion.div
                    className="fixed top-0 left-0 h-full lg:w-1/3 w-3/4 bg-white dark:bg-slate-600 z-50 p-4 flex flex-col justify-between"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.4 }}
                  >
                    <div>
                      <Link to="/">
                        <button className="rounded bg-gray-200 dark:bg-slate-400 p-2 w-full mb-4" onClick={toggleMenu}>
                          Главная
                        </button>
                      </Link>
      
                      <Link to="/track">
                        <button className="rounded bg-gray-200 dark:bg-slate-400 p-2 w-full mb-4" onClick={toggleMenu}>
                          Трекер привычек
                        </button>
                      </Link>
                    </div>
      
                    <button 
                      className="mb-4 p-6 bg-gray-200 dark:bg-slate-400 rounded"
                      onClick={toggleMenu}
                    >
                      Закрыть меню
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
      
            <h1 className="text-4xl">ToDoList</h1>
      
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md dark:border dark:border-white/10"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
      
          <Outlet />
        </>
      )
    }
    