import { useState, useEffect } from 'react'
import TextArea from '@/scopes/App-Home/components/TextArea'
import TaskTodo from '@/scopes/App-Home/components/TaskTodo'
import { AddIcon } from '@/components/icons/AddIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { motion, AnimatePresence } from "framer-motion"

interface Task {
    id: number
    value: string
    status: boolean
}

export const Home = () => {
    const [todo, setTodo] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])
    const [done, setDone] = useState('')
    const [show, setShow] = useState(false)



    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
    }, [])

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks])

    let copiTasks = tasks

    const addTask = () => {
        if (!todo.trim()) return

        const newTask: Task = {
            id: Math.random(),
            value: todo,
            status: false,
        }

        setTasks([newTask, ...tasks])
        setTodo('')
    }

    const deleteTask = (id: number) => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    const toggleTask = (id: number) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === id ? { ...task, status: !task.status } : task,
            )

            return updatedTasks.sort((a, b) => Number(a.status) - Number(b.status))
        })
    }

    switch (done) {
        case 'all':
            copiTasks = tasks
            break
        case 'active':
            copiTasks = tasks.filter(task => task.status === false)
            break
        case 'complete':
            copiTasks = tasks.filter(task => task.status === true)
            break
        default:
            break
    }

    const handleAddTask = () => {
        addTask();
        setShow(false);
      };


    return (
        <>
            <div className="flex flex-wrap xl:gap-4 md:gap-4 md:justify-center justify-between py-4 xl:justify-center px-4 dark:bg-gray-800 text-gray-800 dark:text-white ">
                <button className={`px-4 py-2 rounded-lg ${done === 'all' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
                        onClick={() => setDone('all')}>Все
                </button>
                <button className={`px-4 py-2 rounded-lg ${done === 'active' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
                        onClick={() => setDone('active')}>Активные
                </button>
                <button className={`px-4 py-2 rounded-lg ${done === 'complete' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
                        onClick={() => setDone('complete')}>Выполненные
                </button>
            </div>


            <div className=" w-full min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 ">
                <div className="flex-1 w-full max-w-xl px-4">
                    {copiTasks.map((task) => (
                        <TaskTodo
                            key={task.id}
                            id={task.id}
                            value={task.value}
                            status={task.status}
                            deleteTask={deleteTask}
                            toggleTask={toggleTask}
                        />
                    ))}
                </div>

                <AnimatePresence>   
                
                {show && 

                    <motion.div
                    className="fixed bottom-0 w-full"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    >
                        
                    <TextArea
                    todo={todo} 
                    setTodo={setTodo} 
                    addTask={handleAddTask}
                    /> 

                    </motion.div>
}
                </AnimatePresence>   

                <button 
                    className='sm:hidden sticky bottom-1'
                    onClick={() => setShow(!show)}>
                        {show ? (
                            <TrashIcon className="h-10 w-10 text-white bg-slate-900 rounded-full"/>
                        ) : (
                            <AddIcon className="h-10 w-10 text-white bg-slate-900 rounded-full"/>
                        )
                        }
                </button> 

                
            </div>


        </>
    )
}

export default Home
