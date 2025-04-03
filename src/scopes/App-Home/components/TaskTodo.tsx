import clsx from 'clsx'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { cursorTo } from 'node:readline'
import { useState } from 'react'


export type TaskProps = {
    id: number
    value: string
    status: boolean
    deleteTask: (id: number) => void
    toggleTask: (id: number) => void
    className?: string
}

export const TaskTodo = ({ id, value, status, deleteTask, toggleTask, className }: TaskProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <>
            <div
                className="flex items-center w-full max-w-[700px] mx-auto text-xl py-2 rounded-lg my-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => toggleTask(id)}>

                <input 
                    type="checkbox"
                    checked={status}
                    className="mx-2 accent-gray-300"
                />

                <p
                    className={clsx(
                        status && 'line-through',
                        'flex-1 w-full',
                    )}
                    style={{ cursor: 'pointer', wordBreak: 'break-word' }}
                >
                    {value}
                </p>

                <button
                    onClick={() => deleteTask(id)}
                    className="mx-2">
                    <TrashIcon className="w-6 h-6 text-black/40"/>
                </button>

            </div>
        </>
    )
}

export default TaskTodo
