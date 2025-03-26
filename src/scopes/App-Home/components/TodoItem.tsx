import { SendIcon } from '@/components/icons/SendIcon'

export type TodoItemProps = {
    todo: string
    setTodo: (value: string) => void
    addTask: () => void
    className?: string
}

export const TodoItem = ({ todo, setTodo, addTask, className }: TodoItemProps) => {

    const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            addTask()
        }
    }

    return (
        <div className="fixed bottom-4 left-0 w-full">
            <div className="relative max-w-xl mx-auto px-4">
        <textarea
            className="rounded-xl resize-none w-full h-32 p-2 text-left outline outline-1 outline-gray-300
                     focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-xl 
                     bg-white dark:bg-gray-800 text-black dark:text-white"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={handleEnterPress}
            placeholder="Введите текст задачи..."
        />
                <button
                    onClick={addTask}
                    className="absolute right-1 inset-y-1 px-2 py-2 rounded-full"
                >
                    <SendIcon className="h-6 md:h-8 lg:h-10 px-2"/>
                </button>
            </div>
        </div>
    )
}

export default TodoItem
