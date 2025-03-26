import { useState, useEffect } from "react"
import TodoItem from "@/scopes/App-Home/components/TodoItem"
import TaskTodo from "@/scopes/App-Home/components/TaskTodo"
import { AddIcon } from "@/components/icons/AddIcon"

interface Task {
  id: number
  value: string
  status: boolean
}

export const Home = () => {
  const [todo, setTodo] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [done, setDone] = useState("")

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
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
    setTodo("")
  }

  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }
  const toggleTask = (id: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
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
  

  return (
    <>
      <div className="flex flex-wrap gap-4 py-4 justify-center dark:bg-gray-800 text-gray-800 dark:text-white ">
          <button className={`px-4 py-2 rounded-lg ${done === 'all' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
          onClick={() => setDone('all')}>Все</button>
          <button className={`px-4 py-2 rounded-lg ${done === 'active' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
          onClick={() => setDone('active')}>Активные</button>
          <button className={`px-4 py-2 rounded-lg ${done === 'complete' ? 'bg-gray-300 dark:bg-gray-400  text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white'}`}
          onClick={() => setDone('complete')}>Выполненные</button>
      </div>


      <div className=" w-full min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 pt-4 pb-40">
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

  <TodoItem todo={todo} setTodo={setTodo} addTask={addTask} />

  <AddIcon className="w-10 h-10"/>
</div>



    </>
  )
}

export default Home